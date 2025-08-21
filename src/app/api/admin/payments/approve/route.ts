import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { paymentId, action } = await request.json();

    if (!paymentId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    // Get payment with user and subscription details
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(paymentId) },
      include: {
        user: true,
        subscription: true,
      },
    });

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    if (payment.status !== 'pending') {
      return NextResponse.json(
        { error: 'Payment is not pending approval' },
        { status: 400 }
      );
    }

    if (action === 'approve') {
      // Update payment status
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'completed' },
      });

      // Calculate subscription dates
      const now = new Date();
      const subscriptionEnd = new Date(now);
      subscriptionEnd.setFullYear(now.getFullYear() + 1); // Default to yearly

      // Update user subscription
      await prisma.user.update({
        where: { id: payment.userId },
        data: {
          subscriptionId: payment.subscriptionId,
          subscriptionStart: now,
          subscriptionEnd: subscriptionEnd,
          qrCodesLimit: payment.subscription.qrCodesLimit,
        },
      });

      // Log admin action
      await prisma.adminAction.create({
        data: {
          adminId: 1, // Default admin ID
          userId: payment.userId,
          actionType: 'payment_approved',
          description: `Payment ${payment.transactionId} approved for ${payment.subscription.name} plan`,
          oldValue: JSON.stringify({ status: 'pending' }),
          newValue: JSON.stringify({ 
            status: 'completed',
            subscriptionId: payment.subscriptionId,
            subscriptionEnd: subscriptionEnd.toISOString()
          }),
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Payment approved and subscription activated',
        paymentId: payment.id,
        userId: payment.userId,
      });

    } else if (action === 'reject') {
      // Update payment status
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'failed' },
      });

      // Log admin action
      await prisma.adminAction.create({
        data: {
          adminId: 1, // Default admin ID
          userId: payment.userId,
          actionType: 'payment_rejected',
          description: `Payment ${payment.transactionId} rejected for ${payment.subscription.name} plan`,
          oldValue: JSON.stringify({ status: 'pending' }),
          newValue: JSON.stringify({ status: 'failed' }),
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Payment rejected',
        paymentId: payment.id,
        userId: payment.userId,
      });
    }

  } catch (error) {
    console.error('Payment approval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 