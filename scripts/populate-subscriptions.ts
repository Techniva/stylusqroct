import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function populateSubscriptions() {
  try {
    console.log('Populating Subscription table...');

    // Get all pricing plans
    const pricingPlans = await prisma.pricingPlan.findMany({
      where: { isActive: true }
    });

    console.log('Found pricing plans:', pricingPlans.length);

    for (const plan of pricingPlans) {
      // Check if subscription already exists
      const existingSubscription = await prisma.subscription.findFirst({
        where: { name: plan.name }
      });

      if (!existingSubscription) {
        // Create subscription record
        const subscription = await prisma.subscription.create({
          data: {
            name: plan.name,
            description: plan.description,
            priceMonthly: plan.priceMonthly,
            priceYearly: plan.priceYearly,
            qrCodesLimit: plan.qrCodesLimit,
            features: plan.features,
            isActive: plan.isActive,
          }
        });
        console.log(`Created subscription: ${subscription.name}`);
      } else {
        console.log(`Subscription already exists: ${existingSubscription.name}`);
      }
    }

    console.log('Subscription table populated successfully!');
  } catch (error) {
    console.error('Error populating subscriptions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateSubscriptions(); 