import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const plans = await prisma.pricingPlan.findMany({
      where: { isActive: true },
      orderBy: { priceMonthly: 'asc' }
    });

    // Return prices in rupees format (no conversion needed)
    const formattedPlans = plans.map(plan => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      priceMonthly: plan.priceMonthly, // Already in rupees
      priceYearly: plan.priceYearly, // Already in rupees
      qrCodesLimit: plan.qrCodesLimit,
      features: JSON.parse(plan.features || '[]'),
      isActive: plan.isActive
    }));

    return NextResponse.json({
      success: true,
      plans: formattedPlans
    });
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing plans' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, priceMonthly, priceYearly, qrCodesLimit, features } = body;

    // Validate required fields
    if (!name || !description || priceMonthly === undefined || priceYearly === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store prices in rupees format
    const plan = await prisma.pricingPlan.create({
      data: {
        name,
        description,
        priceMonthly: parseFloat(priceMonthly), // Store in rupees
        priceYearly: parseFloat(priceYearly), // Store in rupees
        qrCodesLimit: qrCodesLimit || 5,
        features: JSON.stringify(features || [])
      }
    });

    return NextResponse.json({
      success: true,
      plan: {
        ...plan,
        priceMonthly: plan.priceMonthly, // Already in rupees
        priceYearly: plan.priceYearly, // Already in rupees
        features: JSON.parse(plan.features)
      }
    });
  } catch (error) {
    console.error('Error creating pricing plan:', error);
    return NextResponse.json(
      { error: 'Failed to create pricing plan' },
      { status: 500 }
    );
  }
} 