import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const { admin } = await getAdminAuth();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const subscription = searchParams.get('subscription') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (subscription) {
      where.subscription = { name: subscription };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          subscription: {
            select: { name: true, description: true }
          },
          qrCodes: {
            select: { id: true, qrData: true, createdAt: true }
          }
        }
      }),
      prisma.user.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { admin } = await getAdminAuth();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { userId, action, data } = body;

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'User ID and action are required' },
        { status: 400 }
      );
    }

    let result;
    let oldValue = null;

    switch (action) {
      case 'update_subscription':
        const plan = await prisma.pricingPlan.findFirst({
          where: { name: data.planName, isActive: true }
        });
        
        if (!plan) {
          return NextResponse.json(
            { error: 'Plan not found' },
            { status: 404 }
          );
        }

        // Get current user data
        const currentUser = await prisma.user.findUnique({
          where: { id: userId },
          include: { subscription: true }
        });

        oldValue = JSON.stringify({
          subscription: currentUser?.subscription?.name,
          qrCodesLimit: currentUser?.qrCodesLimit,
          isActive: currentUser?.isActive
        });

        // Create or update subscription record
        let subscription;
        if (currentUser?.subscriptionId) {
          // Update existing subscription
          subscription = await prisma.subscription.update({
            where: { id: currentUser.subscriptionId },
            data: {
              name: plan.name,
              description: plan.description,
              priceMonthly: plan.priceMonthly,
              priceYearly: plan.priceYearly,
              qrCodesLimit: plan.qrCodesLimit,
              features: plan.features,
              isActive: plan.isActive
            }
          });
        } else {
          // Create new subscription
          subscription = await prisma.subscription.create({
            data: {
              name: plan.name,
              description: plan.description,
              priceMonthly: plan.priceMonthly,
              priceYearly: plan.priceYearly,
              qrCodesLimit: plan.qrCodesLimit,
              features: plan.features,
              isActive: plan.isActive
            }
          });
        }

        result = await prisma.user.update({
          where: { id: userId },
          data: {
            subscriptionId: subscription.id,
            qrCodesLimit: plan.qrCodesLimit,
            isActive: data.isActive !== undefined ? data.isActive : true
          }
        });
        break;

      case 'suspend_user':
        oldValue = JSON.stringify({ isActive: true });
        result = await prisma.user.update({
          where: { id: userId },
          data: { isActive: false }
        });
        break;

      case 'activate_user':
        oldValue = JSON.stringify({ isActive: false });
        result = await prisma.user.update({
          where: { id: userId },
          data: { isActive: true }
        });
        break;

      case 'reset_qr_count':
        // Get current user data first
        const currentUserForReset = await prisma.user.findUnique({
          where: { id: userId }
        });
        
        oldValue = JSON.stringify({ qrCodesUsed: currentUserForReset?.qrCodesUsed });
        result = await prisma.user.update({
          where: { id: userId },
          data: { qrCodesUsed: 0 }
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    // Log admin action
    await prisma.adminAction.create({
      data: {
        adminId: admin.id,
        userId: userId,
        actionType: action,
        description: `Admin ${admin.username} performed ${action} on user ${userId}`,
        oldValue: oldValue ? oldValue.substring(0, 1000) : null, // Limit to 1000 characters
        newValue: JSON.stringify({
          id: result.id,
          fullName: result.fullName,
          email: result.email,
          isActive: result.isActive,
          qrCodesUsed: result.qrCodesUsed,
          qrCodesLimit: result.qrCodesLimit,
          subscriptionId: result.subscriptionId
        }).substring(0, 1000) // Limit to 1000 characters
      }
    });

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      user: result
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
} 