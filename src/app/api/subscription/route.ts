import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { user } = await getAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userWithSubscription = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        subscription: true
      }
    });

    if (!userWithSubscription) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      subscription: {
        name: userWithSubscription.subscription?.name || 'Free',
        qrCodesUsed: userWithSubscription.qrCodesUsed,
        qrCodesLimit: userWithSubscription.qrCodesLimit,
        isActive: userWithSubscription.isActive,
        subscriptionStart: userWithSubscription.subscriptionStart,
        subscriptionEnd: userWithSubscription.subscriptionEnd
      }
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await getAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { planName, billingCycle } = body;

    // Get the selected plan
    const plan = await prisma.pricingPlan.findFirst({
      where: { name: planName, isActive: true }
    });

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }

    // Calculate subscription dates
    const now = new Date();
    const subscriptionEnd = new Date(now);
    if (billingCycle === 'yearly') {
      subscriptionEnd.setFullYear(subscriptionEnd.getFullYear() + 1);
    } else {
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);
    }

    // Update user subscription
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionId: plan.id,
        subscriptionStart: now,
        subscriptionEnd: subscriptionEnd,
        qrCodesLimit: plan.qrCodesLimit,
        isActive: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Subscription updated successfully',
      subscription: {
        name: plan.name,
        qrCodesLimit: plan.qrCodesLimit,
        subscriptionEnd: subscriptionEnd
      }
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
} 