import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import { authenticator } from 'otplib';

export async function POST(request: NextRequest) {
  const { user } = await getAuth();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { token } = await request.json();

    const userData = await prisma.user.findUnique({ where: { id: user.id } });
    if (!userData || !userData.twoFactorSecret) {
      return NextResponse.json({ error: '2FA not set up' }, { status: 400 });
    }

    const isValid = authenticator.verify({
      token,
      secret: userData.twoFactorSecret,
    });

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { twoFactorEnabled: true },
    });

    return NextResponse.json({ message: '2FA enabled successfully' });
  } catch (error) {
    console.error('Error verifying 2FA token:', error);
    return NextResponse.json({ error: 'Failed to verify 2FA token' }, { status: 500 });
  }
} 