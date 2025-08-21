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

    // Get the actual limit from the subscription table
    let qrCodesLimit = userWithSubscription.qrCodesLimit;
    if (userWithSubscription.subscription) {
      qrCodesLimit = userWithSubscription.subscription.qrCodesLimit;
    }

    const canCreate = qrCodesLimit === -1 || 
                     userWithSubscription.qrCodesUsed < qrCodesLimit;

    return NextResponse.json({
      success: true,
      canCreate,
      qrCodesUsed: userWithSubscription.qrCodesUsed,
      qrCodesLimit: qrCodesLimit,
      remaining: qrCodesLimit === -1 ? 'Unlimited' : 
                 qrCodesLimit - userWithSubscription.qrCodesUsed
    });
  } catch (error) {
    console.error('Error checking subscription limit:', error);
    return NextResponse.json(
      { error: 'Failed to check subscription limit' },
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

    // Increment QR codes used count
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        qrCodesUsed: {
          increment: 1
        }
      }
    });

    return NextResponse.json({
      success: true,
      qrCodesUsed: updatedUser.qrCodesUsed,
      qrCodesLimit: updatedUser.qrCodesLimit
    });
  } catch (error) {
    console.error('Error updating QR codes count:', error);
    return NextResponse.json(
      { error: 'Failed to update QR codes count' },
      { status: 500 }
    );
  }
} 