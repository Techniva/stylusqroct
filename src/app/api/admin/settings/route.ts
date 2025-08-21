import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// GET - Get current admin profile
export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get full admin data from database
    const adminUser = await prisma.adminUser.findUnique({
      where: { id: admin.id }
    });

    if (!adminUser) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    // Format the response with all required fields
    const formattedAdmin = {
      id: adminUser.id,
      fullName: adminUser.fullName,
      email: adminUser.email,
      username: adminUser.username,
      role: adminUser.role,
      isActive: adminUser.isActive,
      createdAt: adminUser.createdAt.toISOString(),
      lastLogin: adminUser.lastLogin ? adminUser.lastLogin.toISOString() : null,
      updatedAt: adminUser.updatedAt ? adminUser.updatedAt.toISOString() : adminUser.createdAt.toISOString()
    };

    //console.log('Admin data being returned:', formattedAdmin);

    return NextResponse.json({ admin: formattedAdmin });
  } catch (error) {
    //console.error('Error getting admin profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Change admin password
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdminSession(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    // Validate current password
    const adminUser = await prisma.adminUser.findUnique({
      where: { id: admin.id }
    });

    if (!adminUser) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, adminUser.password);
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { password: hashedNewPassword }
    });

    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error) {
    //console.error('Error changing password:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 