import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Get user authentication
    const { user } = await getAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { paymentId, planName, billingCycle, amount } = body;

    // Validate required fields
    if (!paymentId || !planName || !billingCycle || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get subscription plan from Subscription table
    const subscription = await prisma.subscription.findFirst({
      where: { name: planName, isActive: true },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Invalid subscription plan' },
        { status: 400 }
      );
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        subscriptionId: subscription.id, // Using PricingPlan ID
        amount: amount,
        currency: 'INR',
        status: 'pending',
        paymentMethod: 'manual',
        transactionId: paymentId,
      },
    });

    // Log admin action for approval
    await prisma.adminAction.create({
      data: {
        adminId: 1, // Default admin ID
        userId: user.id,
        actionType: 'payment_approval',
        description: `Payment ID ${paymentId} submitted for ${planName} plan`,
        oldValue: JSON.stringify({ status: 'pending' }),
        newValue: JSON.stringify({ 
          paymentId, 
          planName, 
          billingCycle, 
          amount,
          paymentRecordId: payment.id 
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Payment ID submitted successfully for admin approval',
      paymentId: payment.id,
    });

  } catch (error) {
    console.error('Payment submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 