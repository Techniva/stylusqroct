import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = parseInt(searchParams.get('userId') || '', 10);
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

  // Get all QR codes for the user
  const qrCodes = await prisma.qRCode.findMany({ where: { userId }, select: { download_count: true } });
  const downloads = qrCodes.reduce((sum, qr) => sum + (qr.download_count || 0), 0);

  return NextResponse.json({ downloads });
} 