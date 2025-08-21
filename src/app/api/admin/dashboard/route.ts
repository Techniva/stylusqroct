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

    // Get dashboard statistics
    const [
      totalUsers,
      totalQRCodes,
      totalSubscriptions,
      recentUsers,
      recentQRCodes,
      subscriptionStats
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      
      // Total QR codes
      prisma.qRCode.count(),
      
      // Total active subscriptions
      prisma.user.count({
        where: { isActive: true, subscriptionId: { not: null } }
      }),
      
      // Recent users (last 7 days)
      prisma.user.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          fullName: true,
          email: true,
          createdAt: true,
          qrCodesUsed: true,
          subscription: {
            select: { name: true }
          }
        }
      }),
      
      // Recent QR codes
      prisma.qRCode.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          user: {
            select: { fullName: true, email: true }
          }
        }
      }),
      
      // Subscription statistics
      prisma.user.groupBy({
        by: ['subscriptionId'],
        _count: { id: true },
        where: { isActive: true }
      })
    ]);

    // Get subscription plan names
    const subscriptionPlans = await prisma.pricingPlan.findMany({
      select: { id: true, name: true }
    });

    const subscriptionBreakdown = subscriptionPlans.map(plan => ({
      name: plan.name,
      count: subscriptionStats.find(stat => stat.subscriptionId === plan.id)?._count.id || 0
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalQRCodes,
        totalSubscriptions,
        recentUsers,
        recentQRCodes,
        subscriptionBreakdown
      }
    });
  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 