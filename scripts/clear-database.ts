import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    console.log('Starting database cleanup...');

    // Clear all tables except AdminUser
    console.log('Clearing AdminAction...');
    await prisma.adminAction.deleteMany({});

    console.log('Clearing DownloadLog...');
    await prisma.downloadLog.deleteMany({});

    console.log('Clearing ScanLog...');
    await prisma.scanLog.deleteMany({});

    console.log('Clearing QRCode...');
    await prisma.qRCode.deleteMany({});

    console.log('Clearing Payment...');
    await prisma.payment.deleteMany({});

    console.log('Clearing Subscription...');
    await prisma.subscription.deleteMany({});

    console.log('Clearing ProfileUpdateLog...');
    await prisma.profileUpdateLog.deleteMany({});

    console.log('Clearing User...');
    await prisma.user.deleteMany({});

    console.log('Clearing PricingPlan...');
    await prisma.pricingPlan.deleteMany({});

    console.log('Database cleanup completed successfully!');
    console.log('AdminUser table preserved.');
  } catch (error) {
    console.error('Error clearing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase(); 