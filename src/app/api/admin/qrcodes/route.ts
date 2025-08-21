import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminAuth } from '@/lib/adminAuth';
import { formatQRDataToURL } from '../../../lib/qrDataUtils';

export async function GET(request: NextRequest) {
  try {
    const { admin } = await getAdminAuth();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const type = searchParams.get('type') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { user: { 
          OR: [
            { fullName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        }}
      ];
    }
    
    if (status) {
      where.qrStatus = status === 'active';
    }
    
    if (type) {
      // Note: qrType field doesn't exist in schema, we'll need to derive it from activeLink
      // For now, we'll skip type filtering
    }

    const [qrcodes, total] = await Promise.all([
      prisma.qRCode.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true
            }
          },
          scanLogs: {
            select: {
              scanqr_id: true,
              scanned_at: true
            },
            orderBy: { scanned_at: 'desc' },
            take: 1
          }
        }
      }),
      prisma.qRCode.count({ where })
    ]);

    // Transform data to include analytics
    const transformedQRCodes = qrcodes.map(qr => {
      const lastScan = qr.scanLogs[0];
      const qrData = qr.qrData as any;
      const qrType = qrData?.type || 'website';
      
      let qrUrl = '';
      try {
        if (qr.qrData) {
          qrUrl = formatQRDataToURL(qr.qrData as any);
        } else {
          qrUrl = 'No QR Data';
        }
      } catch (error) {
        console.error('Error formatting QR data:', error);
        qrUrl = 'Invalid QR Data';
      }
      
      return {
        id: qr.id,
        activeLink: qrUrl,
        originalLink: qrUrl,
        qrType: qrType, // Pass the type string directly
        isActive: qr.qrStatus,
        createdAt: qr.createdAt,
        updatedAt: qr.updatedAt,
        user: qr.user,
        scanCount: qr.scanLogs.length,
        downloadCount: qr.download_count || 0,
        lastScannedAt: lastScan?.scanned_at || null,
        logoPath: qr.logoPath,
        customSettings: {
          cornerShape: qr.cornerShape,
          eyeShape: qr.eyeShape,
          qrShape: qr.qrShape,
          foregroundColor: qr.foregroundColor,
          backgroundColor: qr.backgroundColor
        }
      };
    });

    return NextResponse.json({
      success: true,
      qrcodes: transformedQRCodes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch QR codes' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { admin } = await getAdminAuth();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { qrCodeId, action } = body;

    if (!qrCodeId || !action) {
      return NextResponse.json(
        { error: 'QR Code ID and action are required' },
        { status: 400 }
      );
    }

    // Get current QR code data
    const currentQRCode = await prisma.qRCode.findUnique({
      where: { id: qrCodeId },
      include: { user: true }
    });

    if (!currentQRCode) {
      return NextResponse.json(
        { error: 'QR Code not found' },
        { status: 404 }
      );
    }

    let result;
    let oldValue = JSON.stringify({
      qrStatus: currentQRCode.qrStatus,
      download_count: currentQRCode.download_count
    });

    switch (action) {
      case 'activate':
        result = await prisma.qRCode.update({
          where: { id: qrCodeId },
          data: { qrStatus: true }
        });
        break;

      case 'deactivate':
        result = await prisma.qRCode.update({
          where: { id: qrCodeId },
          data: { qrStatus: false }
        });
        break;

      case 'reset_scan_count':
        // Delete all scan logs for this QR code
        await prisma.scanLog.deleteMany({
          where: { qr_code_id: qrCodeId }
        });
        result = await prisma.qRCode.findUnique({
          where: { id: qrCodeId }
        });
        if (!result) {
          return NextResponse.json(
            { error: 'QR Code not found after reset' },
            { status: 404 }
          );
        }
        break;

      case 'reset_download_count':
        result = await prisma.qRCode.update({
          where: { id: qrCodeId },
          data: { download_count: 0 }
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    // Log admin action
    await prisma.adminAction.create({
      data: {
        adminId: admin.id,
        userId: currentQRCode.userId,
        actionType: action,
        description: `Admin ${admin.username} performed ${action} on QR code ${qrCodeId}`,
        oldValue: oldValue.substring(0, 1000),
        newValue: JSON.stringify({
          id: result.id,
          qrStatus: result.qrStatus,
          download_count: result.download_count
        }).substring(0, 1000)
      }
    });

    return NextResponse.json({
      success: true,
      message: 'QR Code updated successfully',
      qrCode: result
    });
  } catch (error) {
    console.error('Error updating QR code:', error);
    return NextResponse.json(
      { error: 'Failed to update QR code' },
      { status: 500 }
    );
  }
} 