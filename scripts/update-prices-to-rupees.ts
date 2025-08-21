import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function updatePricesToRupees() {
  try {
    console.log('Updating pricing plans to use rupee format...');

    // Update Basic plan
    await prisma.pricingPlan.updateMany({
      where: { name: 'Basic' },
      data: {
        priceMonthly: 299, // ₹299 in rupees
        priceYearly: 2990, // ₹2,990 in rupees
      }
    });
    console.log('✅ Updated Basic plan prices to rupees');

    // Update Pro plan
    await prisma.pricingPlan.updateMany({
      where: { name: 'Pro' },
      data: {
        priceMonthly: 599, // ₹599 in rupees
        priceYearly: 5990, // ₹5,990 in rupees
      }
    });
    console.log('✅ Updated Pro plan prices to rupees');

    console.log('✅ Pricing plans updated to rupee format!');
  } catch (error) {
    console.error('❌ Error updating pricing plans:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePricesToRupees(); 