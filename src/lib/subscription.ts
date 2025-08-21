import { prisma } from './prisma';

export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  qrCodesLimit: number;
  features: string[];
  isActive: boolean;
}

export interface UserSubscription {
  name: string;
  qrCodesUsed: number;
  qrCodesLimit: number;
  isActive: boolean;
  subscriptionStart?: Date;
  subscriptionEnd?: Date;
}

export class SubscriptionManager {
  // Get all active pricing plans
  static async getPricingPlans(): Promise<SubscriptionPlan[]> {
    const plans = await prisma.pricingPlan.findMany({
      where: { isActive: true },
      orderBy: { priceMonthly: 'asc' }
    });

    return plans.map(plan => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      priceMonthly: plan.priceMonthly / 100,
      priceYearly: plan.priceYearly / 100,
      qrCodesLimit: plan.qrCodesLimit,
      features: JSON.parse(plan.features || '[]'),
      isActive: plan.isActive
    }));
  }

  // Get user's current subscription
  static async getUserSubscription(userId: number): Promise<UserSubscription | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true }
    });

    if (!user) return null;

    return {
      name: user.subscription?.name || 'Free',
      qrCodesUsed: user.qrCodesUsed,
      qrCodesLimit: user.qrCodesLimit,
      isActive: user.isActive,
      subscriptionStart: user.subscriptionStart || undefined,
      subscriptionEnd: user.subscriptionEnd || undefined
    };
  }

  // Check if user can create more QR codes
  static async canCreateQRCode(userId: number): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) return false;

    return user.qrCodesLimit === -1 || user.qrCodesUsed < user.qrCodesLimit;
  }

  // Increment QR codes used count
  static async incrementQRCodeCount(userId: number): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        qrCodesUsed: {
          increment: 1
        }
      }
    });
  }

  // Update user subscription
  static async updateSubscription(
    userId: number, 
    planName: string, 
    billingCycle: 'monthly' | 'yearly'
  ): Promise<boolean> {
    try {
      const plan = await prisma.pricingPlan.findFirst({
        where: { name: planName, isActive: true }
      });

      if (!plan) return false;

      const now = new Date();
      const subscriptionEnd = new Date(now);
      
      if (billingCycle === 'yearly') {
        subscriptionEnd.setFullYear(subscriptionEnd.getFullYear() + 1);
      } else {
        subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionId: plan.id,
          subscriptionStart: now,
          subscriptionEnd: subscriptionEnd,
          qrCodesLimit: plan.qrCodesLimit,
          isActive: true
        }
      });

      return true;
    } catch (error) {
      console.error('Error updating subscription:', error);
      return false;
    }
  }

  // Initialize default pricing plans
  static async initializeDefaultPlans(): Promise<void> {
    const defaultPlans = [
      {
        name: 'Free',
        description: 'Perfect for getting started',
        priceMonthly: 0,
        priceYearly: 0,
        qrCodesLimit: 5,
        features: [
          '5 QR codes',
          'Basic analytics',
          'Standard templates',
          'Email support'
        ]
      },
      {
        name: 'Basic',
        description: 'Great for small businesses',
        priceMonthly: 29900, // ₹299 in paise
        priceYearly: 299900, // ₹2,999 in paise
        qrCodesLimit: 50,
        features: [
          '50 QR codes',
          'Advanced analytics',
          'Custom branding',
          'Priority support',
          'Bulk generation'
        ]
      },
      {
        name: 'Pro',
        description: 'For growing businesses',
        priceMonthly: 59900, // ₹599 in paise
        priceYearly: 599900, // ₹5,999 in paise
        qrCodesLimit: -1, // Unlimited
        features: [
          'Unlimited QR codes',
          'API access',
          'White-label options',
          'Priority support',
          'Advanced analytics',
          'Custom domains'
        ]
      }
    ];

    for (const plan of defaultPlans) {
      const existingPlan = await prisma.pricingPlan.findFirst({
        where: { name: plan.name }
      });

      if (!existingPlan) {
        await prisma.pricingPlan.create({
          data: {
            name: plan.name,
            description: plan.description,
            priceMonthly: plan.priceMonthly,
            priceYearly: plan.priceYearly,
            qrCodesLimit: plan.qrCodesLimit,
            features: JSON.stringify(plan.features)
          }
        });
      }
    }
  }
} 