import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';

export async function POST(request: NextRequest) {
  const { user } = await getAuth();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(user.email, 'StylusQR', secret);

    // Generate recovery codes
    const recoveryCodes = Array.from({ length: 10 }, () => Math.random().toString(36).substring(2, 10));

    await prisma.user.update({
      where: { id: user.id },
      data: {
        twoFactorSecret: secret,
        twoFactorRecoveryCodes: JSON.stringify(recoveryCodes),
      },
    });

    const qrCodeDataURL = await qrcode.toDataURL(otpauth);

    return NextResponse.json({
      secret,
      qrCodeDataURL,
      recoveryCodes,
    });
  } catch (error) {
    console.error('Error generating 2FA secret:', error);
    return NextResponse.json({ error: 'Failed to generate 2FA secret' }, { status: 500 });
  }
} 