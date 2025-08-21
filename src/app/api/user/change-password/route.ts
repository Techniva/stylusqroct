import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { user } = await getAuth();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword, confirmPassword } = await request.json();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'New passwords do not match' }, { status: 400 });
    }

    const userData = await prisma.user.findUnique({ where: { id: user.id } });
    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, userData.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid current password' }, { status: 401 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    // Send password change notification email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@stylusqr.com',
      to: userData.email,
      subject: 'Your StylusQR password has been changed',
      html: `<p>Hello ${userData.fullName},</p><p>This is a confirmation that the password for your account has just been changed.</p><p>If you did not make this change, please contact our support team immediately.</p>`,
    });

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
} 