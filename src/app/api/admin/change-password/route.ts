import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { verifyAdminSession } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    const adminUser = await verifyAdminSession(request);
    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    // Validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters long' }, { status: 400 });
    }

    // Get current admin user with password
    const currentAdmin = await prisma.adminUser.findUnique({
      where: { id: adminUser.id },
      select: { password: true }
    });

    if (!currentAdmin) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, currentAdmin.password);
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await prisma.adminUser.update({
      where: { id: adminUser.id },
      data: { password: hashedNewPassword }
    });

    return NextResponse.json({ 
      message: 'Password changed successfully' 
    });
  } catch (error) {
    console.error('Error changing admin password:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 