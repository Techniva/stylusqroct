import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { subDays, startOfDay, format } from 'date-fns';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userIdParam = searchParams.get('userId');
  if (!userIdParam) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }
  const userId = parseInt(userIdParam, 10);
  if (isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
  }

  // Get all QR codes for the user
  const qrCodes = await prisma.qRCode.findMany({
    where: { userId },
    select: { id: true, qrCodeImagePath: true, qrData: true, createdAt: true, updatedAt: true, uniqueCode: true },
  });
  const qrIds = qrCodes.map(qr => qr.id);
  if (qrIds.length === 0) {
    return NextResponse.json({ last7Days: {}, topQrCode: null });
  }

  // Last 7 days scan trends
  const today = startOfDay(new Date());
  const sevenDaysAgo = subDays(today, 6);
  
  console.log(`Fetching scan data from ${sevenDaysAgo.toISOString()} to ${today.toISOString()}`);
  
  const scanLogs = await prisma.scanLog.findMany({
    where: {
      qr_code_id: { in: qrIds },
      scanned_at: { gte: sevenDaysAgo, lte: today },
    },
    select: { scanned_at: true, qr_code_id: true, os_name: true, country: true, city: true },
  });
  
  console.log(`Found ${scanLogs.length} scan logs for user ${userId}`);
  
  // Group by day
  const last7Days: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const day = format(subDays(today, 6 - i), 'yyyy-MM-dd');
    last7Days[day] = 0;
  }
  
  scanLogs.forEach(log => {
    const day = format(log.scanned_at, 'yyyy-MM-dd');
    if (last7Days[day] !== undefined) {
      last7Days[day]++;
      console.log(`Incrementing scan count for ${day}`);
    }
  });
  
  console.log('Last 7 days data:', last7Days);

  // Find top QR code in last 7 days
  const scanCounts: Record<number, number> = {};
  scanLogs.forEach(log => {
    scanCounts[log.qr_code_id] = (scanCounts[log.qr_code_id] || 0) + 1;
  });
  let topQrId: number | null = null;
  let topScanCount = 0;
  Object.entries(scanCounts).forEach(([qrId, count]) => {
    if (count > topScanCount) {
      topQrId = parseInt(qrId, 10);
      topScanCount = count;
    }
  });
  let topQrCode = null;
  if (topQrId) {
    // Find top location and device for this QR code
    const topLogs = scanLogs.filter(log => log.qr_code_id === topQrId);
    // Top location (city or country)
    const locationCounts: Record<string, number> = {};
    topLogs.forEach(log => {
      const loc = log.city || log.country || 'Unknown';
      locationCounts[loc] = (locationCounts[loc] || 0) + 1;
    });
    let topLocation = 'Unknown';
    let maxLoc = 0;
    Object.entries(locationCounts).forEach(([loc, count]) => {
      if (count > maxLoc) {
        topLocation = loc;
        maxLoc = count;
      }
    });
    // Top device
    const deviceCounts: Record<string, number> = {};
    topLogs.forEach(log => {
      const os = log.os_name || 'Unknown';
      deviceCounts[os] = (deviceCounts[os] || 0) + 1;
    });
    let topDevice = 'Unknown';
    let maxDev = 0;
    Object.entries(deviceCounts).forEach(([os, count]) => {
      if (count > maxDev) {
        topDevice = os;
        maxDev = count;
      }
    });
    // Find QR code details
    const qr = qrCodes.find(q => q.id === topQrId);
    topQrCode = {
      id: topQrId,
      scanCount: topScanCount,
      topLocation,
      topDevice,
      qrCodeImagePath: qr?.qrCodeImagePath || null,
      uniqueCode: qr?.uniqueCode || null,
      qrData: qr?.qrData || null,
      createdAt: qr?.createdAt || null,
      updatedAt: qr?.updatedAt || null,
    };
  }

  return NextResponse.json({ last7Days, topQrCode });
} 