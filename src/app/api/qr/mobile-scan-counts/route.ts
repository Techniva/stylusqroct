import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = parseInt(searchParams.get('userId') || '', 10);
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

  // Get all QR codes for the user
  const qrCodes = await prisma.qRCode.findMany({ where: { userId }, select: { id: true } });
  const qrIds = qrCodes.map(qr => qr.id);

  // Count mobile scans
  const mobileCount = await prisma.scanLog.count({
    where: {
      qr_code_id: { in: qrIds },
      os_name: { in: ['Android', 'iPhone'] }
    }
  });

  return NextResponse.json({ mobileScans: mobileCount });
} 