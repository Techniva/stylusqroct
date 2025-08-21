import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function initializeAdmin() {
  try {
    console.log('Initializing admin user...');

    // Check if admin already exists
    const existingAdmin = await prisma.adminUser.findFirst({
      where: { username: 'admin' }
    });

    if (existingAdmin) {
      console.log('⏭️  Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = await prisma.adminUser.create({
      data: {
        username: 'admin',
        email: 'admin@stylusqr.com',
        password: hashedPassword,
        fullName: 'System Administrator',
        role: 'super_admin',
        isActive: true
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@stylusqr.com');
    console.log('\n⚠️  Please change the password after first login!');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializeAdmin(); 