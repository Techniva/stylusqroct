import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success for security (do not reveal if user exists)
    if (!user) {
      return NextResponse.json({ message: 'If an account with that email exists, a reset link has been sent.' });
    }

    // Generate a reset token and expiry (1 hour)
    const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store token in user record (add fields if needed)
    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: expires,
      },
    });

    // Send email with nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || request.headers.get('origin')}/reset-password?token=${token}`;
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@stylusqr.com',
      to: email,
      subject: 'Reset your StylusQR password',
      html: `<p>Hello,</p><p>Click the link below to reset your password. This link will expire in 1 hour.</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you did not request this, you can ignore this email.</p>`,
    });

    return NextResponse.json({ message: 'If an account with that email exists, a reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Failed to send reset email.' }, { status: 500 });
  }
} 