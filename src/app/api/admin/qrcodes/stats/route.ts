import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const { admin } = await getAdminAuth();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get comprehensive QR code statistics
    const [
      totalQRCodes,
      activeQRCodes,
      inactiveQRCodes,
      totalScans,
      totalDownloads,
      dynamicQRCodes,
      staticQRCodes
    ] = await Promise.all([
      // Total QR codes
      prisma.qRCode.count(),
      
      // Active QR codes
      prisma.qRCode.count({ where: { qrStatus: true } }),
      
      // Inactive QR codes
      prisma.qRCode.count({ where: { qrStatus: false } }),
      
      // Total scans (count from scan logs)
      prisma.scanLog.count(),
      
      // Total downloads (sum of all download counts)
      prisma.qRCode.aggregate({
        _sum: { download_count: true }
      }),
      
      // Dynamic QR codes (trackable) - for now, count all as static since no qrType field
      prisma.qRCode.count({ where: { qrStatus: true } }),
      
      // Static QR codes (non-trackable)
      prisma.qRCode.count({ 
        where: { 
          qrStatus: true 
        } 
      })
    ]);

    const stats = {
      totalQRCodes,
      activeQRCodes,
      inactiveQRCodes,
      totalScans,
      totalDownloads: totalDownloads._sum.download_count || 0,
      dynamicQRCodes,
      staticQRCodes,
      qrTypes: {} // Empty for now since qrType field doesn't exist in schema
    };

    return NextResponse.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching QR code stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch QR code statistics' },
      { status: 500 }
    );
  }
} 