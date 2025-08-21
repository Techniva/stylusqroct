import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get pending payments with user and subscription details
    const pendingPayments = await prisma.payment.findMany({
      where: { status: 'pending' },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            createdAt: true,
          },
        },
        subscription: {
          select: {
            id: true,
            name: true,
            description: true,
            qrCodesLimit: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Format the response
    const formattedPayments = pendingPayments.map(payment => ({
      id: payment.id,
      userId: payment.userId,
      user: {
        id: payment.user.id,
        fullName: payment.user.fullName,
        email: payment.user.email,
        createdAt: payment.user.createdAt,
      },
      subscription: {
        id: payment.subscription.id,
        name: payment.subscription.name,
        description: payment.subscription.description,
        qrCodesLimit: payment.subscription.qrCodesLimit,
      },
      amount: payment.amount,
      currency: payment.currency,
      transactionId: payment.transactionId,
      paymentMethod: payment.paymentMethod,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      payments: formattedPayments,
      count: formattedPayments.length,
    });

  } catch (error) {
    console.error('Error fetching pending payments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 