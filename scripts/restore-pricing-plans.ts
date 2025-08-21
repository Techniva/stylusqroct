import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function restorePricingPlans() {
  try {
    console.log('Restoring pricing plans...');

    // Free Plan
    await prisma.pricingPlan.create({
      data: {
        name: 'Free',
        description: 'Perfect for getting started with QR codes',
        priceMonthly: 0,
        priceYearly: 0,
        qrCodesLimit: 5,
        features: JSON.stringify([
          '5 QR codes',
          'Basic generation',
          'Analytics',
          'Email support'
        ]),
        isActive: true
      }
    });

    // Basic Plan
    await prisma.pricingPlan.create({
      data: {
        name: 'Basic',
        description: 'Great for small businesses and individuals',
        priceMonthly: 29900, // ₹299 in paise
        priceYearly: 299000, // ₹2,990 in paise
        qrCodesLimit: 50,
        features: JSON.stringify([
          '50 QR codes',
          'Advanced customization',
          'Detailed analytics',
          'Priority support',
          'Custom branding',
          'Bulk generation'
        ]),
        isActive: true
      }
    });

    // Pro Plan
    await prisma.pricingPlan.create({
      data: {
        name: 'Pro',
        description: 'Perfect for growing businesses and teams',
        priceMonthly: 99900, // ₹999 in paise
        priceYearly: 999000, // ₹9,990 in paise
        qrCodesLimit: -1, // Unlimited
        features: JSON.stringify([
          'Unlimited QR codes',
          'Premium customization',
          'Advanced analytics',
          'Priority support',
          'Custom branding',
          'Bulk generation',
          'API access',
          'White-label',
          'Team collaboration',
          'Security features'
        ]),
        isActive: true
      }
    });

    console.log('Pricing plans restored successfully!');
  } catch (error) {
    console.error('Error restoring pricing plans:', error);
  } finally {
    await prisma.$disconnect();
  }
}

restorePricingPlans(); 