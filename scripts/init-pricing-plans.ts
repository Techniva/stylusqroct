import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function initializePricingPlans() {
  try {
    console.log('Initializing default pricing plans...');

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
        priceMonthly: 299, // ₹299 in rupees
        priceYearly: 2990, // ₹2,990 in rupees
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
        priceMonthly: 599, // ₹599 in rupees
        priceYearly: 5990, // ₹5,990 in rupees
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
        console.log(`✅ Created plan: ${plan.name}`);
      } else {
        console.log(`⏭️  Plan already exists: ${plan.name}`);
      }
    }

    console.log('✅ Pricing plans initialization completed!');
  } catch (error) {
    console.error('❌ Error initializing pricing plans:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializePricingPlans(); 