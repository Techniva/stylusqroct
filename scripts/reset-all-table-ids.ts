import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function resetAllTableIds() {
  try {
    console.log('🧹 Starting complete database reset...');
    console.log('Clearing all data and resetting auto-increment for all tables...\n');

    // Clear all data from all tables (except AdminUser)
    console.log('🗑️  Clearing all data...');
    
    await prisma.adminAction.deleteMany({});
    console.log('✅ AdminAction data cleared');
    
    await prisma.downloadLog.deleteMany({});
    console.log('✅ DownloadLog data cleared');
    
    await prisma.scanLog.deleteMany({});
    console.log('✅ ScanLog data cleared');
    
    await prisma.qRCode.deleteMany({});
    console.log('✅ QRCode data cleared');
    
    await prisma.payment.deleteMany({});
    console.log('✅ Payment data cleared');
    
    await prisma.subscription.deleteMany({});
    console.log('✅ Subscription data cleared');
    
    await prisma.profileUpdateLog.deleteMany({});
    console.log('✅ ProfileUpdateLog data cleared');
    
    await prisma.user.deleteMany({});
    console.log('✅ User data cleared');
    
    await prisma.pricingPlan.deleteMany({});
    console.log('✅ PricingPlan data cleared');

    console.log('\n🔄 Resetting auto-increment for all tables...');
    
    // Reset auto-increment for all tables
    await prisma.$executeRaw`ALTER TABLE AdminUser AUTO_INCREMENT = 1`;
    console.log('✅ AdminUser auto-increment reset to 1');
    
    await prisma.$executeRaw`ALTER TABLE AdminAction AUTO_INCREMENT = 1`;
    console.log('✅ AdminAction auto-increment reset to 1');
    
    await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    console.log('✅ User auto-increment reset to 1');
    
    await prisma.$executeRaw`ALTER TABLE QRCode AUTO_INCREMENT = 1`;
    console.log('✅ QRCode auto-increment reset to 1');
    
    await prisma.$executeRaw`ALTER TABLE ScanLog AUTO_INCREMENT = 1`;
    console.log('✅ ScanLog auto-increment reset to 1');
    
    await prisma.$executeRaw`ALTER TABLE DownloadLog AUTO_INCREMENT = 1`;
    console.log('✅ DownloadLog auto-increment reset to 1');
    
    await prisma.$executeRaw`ALTER TABLE ProfileUpdateLog AUTO_INCREMENT = 1`;
    console.log('✅ ProfileUpdateLog auto-increment reset to 1');
    
    await prisma.$executeRaw`ALTER TABLE Subscription AUTO_INCREMENT = 1`;
    console.log('✅ Subscription auto-increment reset to 1');
    
    await prisma.$executeRaw`ALTER TABLE PricingPlan AUTO_INCREMENT = 1`;
    console.log('✅ PricingPlan auto-increment reset to 1');
    
    await prisma.$executeRaw`ALTER TABLE Payment AUTO_INCREMENT = 1`;
    console.log('✅ Payment auto-increment reset to 1');

    console.log('\n📊 Database Status:');
    console.log('✅ All data cleared (except AdminUser)');
    console.log('✅ All auto-increment counters reset to 1');
    console.log('✅ AdminUser table preserved');
    
    console.log('\n🎉 Complete database reset successful!');
    console.log('All tables now start with ID 1 for new records.');

  } catch (error) {
    console.error('❌ Error during database reset:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAllTableIds(); 