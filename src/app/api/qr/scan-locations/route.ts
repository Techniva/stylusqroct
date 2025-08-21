import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const qrCodeId = searchParams.get('qrCodeId');
    const userId = searchParams.get('userId');

    if (!qrCodeId && !userId) {
      return NextResponse.json(
        { error: 'Missing qrCodeId or userId parameter' },
        { status: 400 }
      );
    }

    let whereClause: any = {};

    if (qrCodeId) {
      // Get scan locations for a specific QR code
      whereClause.qr_code_id = parseInt(qrCodeId, 10);
    } else if (userId) {
      // Get scan locations for all QR codes of a user
      const userQRCodes = await prisma.qRCode.findMany({
        where: { userId: parseInt(userId, 10) },
        select: { id: true }
      });
      
      if (userQRCodes.length === 0) {
        return NextResponse.json({ locations: [] });
      }
      
      whereClause.qr_code_id = {
        in: userQRCodes.map(qr => qr.id)
      };
    }

    // Get scan locations with city and country data
    const scanLocations = await prisma.scanLog.groupBy({
      by: ['city', 'country', 'region'],
      where: {
        ...whereClause,
        city: { not: null },
        country: { not: null }
      },
      _count: {
        scanqr_id: true
      },
      orderBy: {
        _count: {
          scanqr_id: 'desc'
        }
      }
    });

    // Transform the data to a more usable format
    const locations = scanLocations.map(location => ({
      city: location.city || 'Unknown',
      country: location.country || 'Unknown',
      region: location.region || '',
      scanCount: location._count.scanqr_id,
      displayName: `${location.city || 'Unknown'}, ${location.country || 'Unknown'}`
    }));

    // Get top and bottom performing locations
    const sortedLocations = [...locations].sort((a, b) => b.scanCount - a.scanCount);
    const topLocations = sortedLocations.slice(0, 3);
    const bottomLocations = sortedLocations.slice(-3).reverse();

    return NextResponse.json({
      locations,
      topLocations,
      bottomLocations,
      totalScans: locations.reduce((sum, loc) => sum + loc.scanCount, 0)
    });

  } catch (error) {
    console.error('Error fetching scan locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scan locations' },
      { status: 500 }
    );
  }
} 