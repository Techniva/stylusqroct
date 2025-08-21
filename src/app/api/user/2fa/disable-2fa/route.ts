import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const { user } = await getAuth();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { password } = await request.json();

    const userData = await prisma.user.findUnique({ where: { id: user.id } });
    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorRecoveryCodes: null,
      },
    });

    return NextResponse.json({ message: '2FA disabled successfully' });
  } catch (error) {
    console.error('Error disabling 2FA:', error);
    return NextResponse.json({ error: 'Failed to disable 2FA' }, { status: 500 });
  }
} 