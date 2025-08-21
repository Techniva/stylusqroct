import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = parseInt(searchParams.get('userId') || '', 10);
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

  // Get all QR codes for the user
  const qrCodes = await prisma.qRCode.findMany({ where: { userId }, select: { id: true, uniqueCode: true, createdAt: true } });
  const qrIds = qrCodes.map(qr => qr.id);

  // Get recent downloads
  const downloads = await prisma.downloadLog.findMany({
    where: { qr_code_id: { in: qrIds } },
    orderBy: { downloaded_at: 'desc' },
    take: 10,
    select: { downloaded_at: true, qr_code_id: true }
  });

  // Get recent profile updates
  const profileUpdates = await prisma.profileUpdateLog.findMany({
    where: { user_id: userId },
    orderBy: { updated_at: 'desc' },
    take: 10,
    select: { updated_at: true }
  });

  // Get recent QR code creations
  const recentQRCodes = qrCodes
    .map(qr => ({ type: 'created', date: qr.createdAt, qrId: qr.id, uniqueCode: qr.uniqueCode }))
    .filter(Boolean);

  // Merge and sort all activities by date
  const activities = [
    ...downloads.map(dl => ({ type: 'downloaded', date: dl.downloaded_at, qrId: dl.qr_code_id })),
    ...profileUpdates.map(pu => ({ type: 'profile_updated', date: pu.updated_at })),
    ...recentQRCodes
  ].filter(Boolean).sort((a, b) => {
    if (!a?.date || !b?.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, 5);

  return NextResponse.json({ activities });
} 