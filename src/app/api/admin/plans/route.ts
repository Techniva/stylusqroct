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

    const plans = await prisma.pricingPlan.findMany({
      orderBy: { priceMonthly: 'asc' }
    });

    return NextResponse.json({
      success: true,
      plans
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { admin } = await getAdminAuth();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, priceMonthly, priceYearly, qrCodesLimit, features, isActive } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const plan = await prisma.pricingPlan.create({
      data: {
        name,
        description,
        priceMonthly: parseFloat(priceMonthly),
        priceYearly: parseFloat(priceYearly),
        qrCodesLimit: parseInt(qrCodesLimit),
        features: JSON.stringify(
          JSON.parse(features).filter((f: string) => f.trim() !== '')
        ),
        isActive
      }
    });

    // Log admin action
    await prisma.adminAction.create({
      data: {
        adminId: admin.id,
        actionType: 'plan_created',
        description: `Admin ${admin.username} created plan "${name}"`,
        newValue: JSON.stringify({
          id: plan.id,
          name: plan.name,
          priceMonthly: plan.priceMonthly,
          priceYearly: plan.priceYearly,
          qrCodesLimit: plan.qrCodesLimit,
          isActive: plan.isActive
        }).substring(0, 1000) // Limit to 1000 characters
      }
    });

    return NextResponse.json({
      success: true,
      plan
    });
  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json(
      { error: 'Failed to create plan' },
      { status: 500 }
    );
  }
} 