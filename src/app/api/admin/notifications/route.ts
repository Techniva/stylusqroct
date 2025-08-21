import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

interface Notification {
  id: string;
  type: 'payment' | 'user' | 'plan';
  title: string;
  message: string;
  timestamp: Date;
  status?: string;
  data: any;
}

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get recent notifications
    const notifications = await prisma.$transaction(async (tx) => {
      // Get recent payments (last 24 hours)
      const recentPayments = await tx.payment.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          },
          status: 'pending'
        },
        include: {
          user: {
            select: {
              fullName: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      });

      // Get recent user registrations (last 24 hours)
      const recentUsers = await tx.user.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          }
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          createdAt: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      });

      // Get recent plan updates (last 24 hours)
      const recentPlans = await tx.pricingPlan.findMany({
        where: {
          updatedAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          }
        },
        select: {
          id: true,
          name: true,
          priceMonthly: true,
          priceYearly: true,
          updatedAt: true
        },
        orderBy: {
          updatedAt: 'desc'
        },
        take: 10
      });

      return {
        payments: recentPayments,
        users: recentUsers,
        plans: recentPlans
      };
    });

    // Format notifications
    const formattedNotifications: Notification[] = [];

    // Add payment notifications
    notifications.payments.forEach(payment => {
      formattedNotifications.push({
        id: `payment-${payment.id}`,
        type: 'payment',
        title: 'New Payment Pending',
        message: `${payment.user?.fullName || 'User'} submitted a payment of ₹${payment.amount}`,
        timestamp: payment.createdAt,
        status: payment.status,
        data: payment
      });
    });

    // Add user registration notifications
    notifications.users.forEach(user => {
      formattedNotifications.push({
        id: `user-${user.id}`,
        type: 'user',
        title: 'New User Registered',
        message: `${user.fullName} (${user.email}) joined StylusQR`,
        timestamp: user.createdAt,
        data: user
      });
    });

    // Add plan update notifications
    notifications.plans.forEach(plan => {
      formattedNotifications.push({
        id: `plan-${plan.id}`,
        type: 'plan',
        title: 'Plan Updated',
        message: `${plan.name} plan was updated`,
        timestamp: plan.updatedAt,
        data: plan
      });
    });

    // Sort by timestamp (newest first)
    formattedNotifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({ 
      notifications: formattedNotifications,
      unreadCount: formattedNotifications.length
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 