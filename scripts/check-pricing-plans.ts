import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function checkPricingPlans() {
  try {
    console.log('Checking current pricing plans...');

    const plans = await prisma.pricingPlan.findMany({
      orderBy: { id: 'asc' }
    });

    console.log(`Found ${plans.length} pricing plans:`);
    plans.forEach(plan => {
      console.log(`ID: ${plan.id}, Name: ${plan.name}, Price: ₹${plan.priceMonthly/100}/month`);
    });

  } catch (error) {
    console.error('Error checking pricing plans:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPricingPlans(); 