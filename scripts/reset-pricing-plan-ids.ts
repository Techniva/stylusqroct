import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function resetPricingPlanIds() {
  try {
    console.log('Deleting existing pricing plans...');
    
    // Delete all existing pricing plans
    await prisma.pricingPlan.deleteMany({});
    console.log('✅ All existing pricing plans deleted');

    // Reset auto-increment to 1
    await prisma.$executeRaw`ALTER TABLE PricingPlan AUTO_INCREMENT = 1`;
    console.log('✅ PricingPlan auto-increment reset to 1');

    console.log('Recreating pricing plans with IDs starting from 1...');

    // Free Plan (ID: 1)
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
    console.log('✅ Free plan added (ID: 1)');

    // Basic Plan (ID: 2)
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
    console.log('✅ Basic plan added (ID: 2)');

    // Pro Plan (ID: 3)
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
    console.log('✅ Pro plan added (ID: 3)');

    console.log('🎉 Pricing plans recreated with IDs starting from 1!');

    // Verify the results
    const plans = await prisma.pricingPlan.findMany({
      orderBy: { id: 'asc' }
    });

    console.log(`\nFinal pricing plans (${plans.length} total):`);
    plans.forEach(plan => {
      console.log(`ID: ${plan.id}, Name: ${plan.name}, Price: ₹${plan.priceMonthly/100}/month`);
    });

  } catch (error) {
    console.error('Error resetting pricing plan IDs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPricingPlanIds(); 