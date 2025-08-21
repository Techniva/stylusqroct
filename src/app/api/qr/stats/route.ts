import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { subDays, startOfDay, subMonths, startOfMonth, format } from 'date-fns';

export async function GET(request: NextRequest) {
  // Parse qr_code_id and user_id from query params
  const { searchParams } = new URL(request.url);
  const qrCodeIdParam = searchParams.get('qr_code_id');
  const qrCodeId = qrCodeIdParam ? parseInt(qrCodeIdParam, 10) : undefined;
  const userIdParam = searchParams.get('user_id');
  const userId = userIdParam ? parseInt(userIdParam, 10) : undefined;

  // Build where clause for user filtering
  let userFilter = {};
  if (userId) {
    userFilter = {
      qrCode: {
        user_id: userId
      }
    };
  }

  // Last 7 days (daily)
  const today = startOfDay(new Date());
  const sevenDaysAgo = subDays(today, 6);
  const dailyRaw = await prisma.scanLog.findMany({
    where: {
      scanned_at: {
        gte: sevenDaysAgo,
        lte: today,
      },
      ...(qrCodeId ? { qr_code_id: qrCodeId } : {}),
      ...userFilter,
    },
    select: {
      scanned_at: true,
    },
  });
  // Group by day
  const dailyCounts: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const day = format(subDays(today, 6 - i), 'yyyy-MM-dd');
    dailyCounts[day] = 0;
  }
  dailyRaw.forEach(log => {
    const day = format(log.scanned_at, 'yyyy-MM-dd');
    if (dailyCounts[day] !== undefined) dailyCounts[day]++;
  });

  // Last 6 months (monthly)
  const thisMonth = startOfMonth(new Date());
  const sixMonthsAgo = subMonths(thisMonth, 5);
  const monthlyRaw = await prisma.scanLog.findMany({
    where: {
      scanned_at: {
        gte: sixMonthsAgo,
        lte: thisMonth,
      },
      ...(qrCodeId ? { qr_code_id: qrCodeId } : {}),
      ...userFilter,
    },
    select: {
      scanned_at: true,
    },
  });
  // Group by month
  const monthlyCounts: Record<string, number> = {};
  for (let i = 0; i < 6; i++) {
    const month = format(subMonths(thisMonth, 5 - i), 'yyyy-MM');
    monthlyCounts[month] = 0;
  }
  monthlyRaw.forEach(log => {
    const month = format(log.scanned_at, 'yyyy-MM');
    if (monthlyCounts[month] !== undefined) monthlyCounts[month]++;
  });

  // Device breakdown (os_name)
  const deviceRaw = await prisma.scanLog.findMany({
    where: {
      ...(qrCodeId ? { qr_code_id: qrCodeId } : {}),
    },
    select: {
      os_name: true,
    },
  });
  const deviceCounts: Record<string, number> = {};
  deviceRaw.forEach(log => {
    const os = log.os_name || 'Unknown';
    deviceCounts[os] = (deviceCounts[os] || 0) + 1;
  });

  return NextResponse.json({
    last7Days: dailyCounts,
    last6Months: monthlyCounts,
    devices: deviceCounts,
  });
} 