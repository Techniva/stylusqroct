import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let userIdParam = searchParams.get('userId');
  let qrCodeIdParam = searchParams.get('qrCodeId');
  if (userIdParam) userIdParam = userIdParam.trim();
  if (qrCodeIdParam) qrCodeIdParam = qrCodeIdParam.trim();
  console.log('scan-counts API called:', { userIdParam, qrCodeIdParam });

  if (qrCodeIdParam && qrCodeIdParam !== '') {
    const qrCodeId = parseInt(qrCodeIdParam, 10);
    if (isNaN(qrCodeId)) {
      console.log('Invalid qrCodeId:', qrCodeIdParam);
      return NextResponse.json({ error: 'Invalid qrCodeId' }, { status: 400 });
    }
    const count = await prisma.scanLog.count({ where: { qr_code_id: qrCodeId } });
    return NextResponse.json({ [qrCodeId]: count });
  }

  if (userIdParam && userIdParam !== '') {
    const userId = parseInt(userIdParam, 10);
    if (isNaN(userId)) {
      console.log('Invalid userId:', userIdParam);
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }
    // Get all QR codes for the user
    const qrCodes = await prisma.qRCode.findMany({
      where: { userId },
      select: { id: true },
    });
    const qrIds = qrCodes.map(qr => qr.id);
    // If no QR codes, return empty object (not 400)
    if (qrIds.length === 0) {
      return NextResponse.json({});
    }
    // Count scans for each QR code
    const scanCountsRaw = await prisma.scanLog.groupBy({
      by: ['qr_code_id'],
      where: { qr_code_id: { in: qrIds } },
      _count: { qr_code_id: true },
    });
    const scanCounts: { [qrId: number]: number } = {};
    qrIds.forEach(id => {
      const found = scanCountsRaw.find(row => row.qr_code_id === id);
      scanCounts[id] = found ? found._count.qr_code_id : 0;
    });
    return NextResponse.json(scanCounts);
  }

  console.log('Missing userId or qrCodeId');
  return NextResponse.json({ error: 'Missing userId or qrCodeId' }, { status: 400 });
} 