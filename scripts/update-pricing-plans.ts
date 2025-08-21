import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function updatePricingPlans() {
  try {
    console.log('Updating pricing plans with correct prices...');

    // Update Basic plan
    await prisma.pricingPlan.updateMany({
      where: { name: 'Basic' },
      data: {
        priceMonthly: 29900, // ₹299 in paise
        priceYearly: 299000, // ₹2,990 in paise
      }
    });
    console.log('✅ Updated Basic plan prices');

    // Update Pro plan
    await prisma.pricingPlan.updateMany({
      where: { name: 'Pro' },
      data: {
        priceMonthly: 59900, // ₹599 in paise
        priceYearly: 599000, // ₹5,990 in paise
      }
    });
    console.log('✅ Updated Pro plan prices');

    console.log('✅ Pricing plans update completed!');
  } catch (error) {
    console.error('❌ Error updating pricing plans:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePricingPlans(); 