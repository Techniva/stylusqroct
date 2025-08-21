import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function resetAutoIncrement() {
  try {
    console.log('Resetting auto-increment IDs for all tables...');

    // Reset auto-increment for all tables
    await prisma.$executeRaw`ALTER TABLE AdminUser AUTO_INCREMENT = 1`;
    console.log('✅ AdminUser ID reset to 1');

    await prisma.$executeRaw`ALTER TABLE AdminAction AUTO_INCREMENT = 1`;
    console.log('✅ AdminAction ID reset to 1');

    await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    console.log('✅ User ID reset to 1');

    await prisma.$executeRaw`ALTER TABLE QRCode AUTO_INCREMENT = 1`;
    console.log('✅ QRCode ID reset to 1');

    await prisma.$executeRaw`ALTER TABLE ScanLog AUTO_INCREMENT = 1`;
    console.log('✅ ScanLog ID reset to 1');

    await prisma.$executeRaw`ALTER TABLE DownloadLog AUTO_INCREMENT = 1`;
    console.log('✅ DownloadLog ID reset to 1');

    await prisma.$executeRaw`ALTER TABLE ProfileUpdateLog AUTO_INCREMENT = 1`;
    console.log('✅ ProfileUpdateLog ID reset to 1');

    await prisma.$executeRaw`ALTER TABLE Subscription AUTO_INCREMENT = 1`;
    console.log('✅ Subscription ID reset to 1');

    await prisma.$executeRaw`ALTER TABLE PricingPlan AUTO_INCREMENT = 1`;
    console.log('✅ PricingPlan ID reset to 1');

    await prisma.$executeRaw`ALTER TABLE Payment AUTO_INCREMENT = 1`;
    console.log('✅ Payment ID reset to 1');

    console.log('🎉 All auto-increment IDs have been reset to start from 1!');
  } catch (error) {
    console.error('Error resetting auto-increment IDs:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAutoIncrement(); 