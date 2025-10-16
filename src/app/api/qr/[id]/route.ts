import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createQRData, QRType, formatQRDataToURL } from '../../../lib/qrDataUtils';

// ---------------- PATCH ----------------
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid or missing QR code id' }, { status: 400 });
    }

    const body = await request.json();
    const { qrType, qrData, metadata, qrStatus } = body;

    // Fetch current QR code
    const currentQRCode = await prisma.qRCode.findUnique({
      where: { id },
      select: { qrData: true, lastLink: true },
    });

    if (!currentQRCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }

    const updateData: any = {};

    // If qrData is being updated
    if (qrType && qrData) {
      const currentUrl = formatQRDataToURL(currentQRCode.qrData as any);
      updateData.lastLink = currentUrl;

      const newQRData = createQRData(qrType as QRType, qrData, metadata);
      updateData.qrData = newQRData as any;
      updateData.updateCount = { increment: 1 };
    }

    if (typeof qrStatus === 'boolean') {
      updateData.qrStatus = qrStatus;
    }

    const updatedQRCode = await prisma.qRCode.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        qrData: true,
        lastLink: true,
        uniqueCode: true,
        qrCodeImagePath: true,
        cornerShape: true,
        eyeShape: true,
        qrShape: true,
        foregroundColor: true,
        backgroundColor: true,
        dotColor: true,
        cornerColor: true,
        eyeColor: true,
        frameStyle: true,
        frameText: true,
        frameTextSize: true,
        frameColor: true,
        frameTextColor: true,
        updateCount: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        qrStatus: true,
        user: {
          select: { id: true, fullName: true, email: true },
        },
      },
    });

    if (!updatedQRCode.userId) {
      return NextResponse.json(
        { error: 'QR code does not have an associated user' },
        { status: 400 }
      );
    }

    const serverLink = `${request.nextUrl.origin}/api/qr/dynamic/${updatedQRCode.uniqueCode}`;

    return NextResponse.json({ ...updatedQRCode, serverLink });
  } catch (error) {
    console.error('Error updating QR code:', error);
    return NextResponse.json({ error: 'Failed to update QR code' }, { status: 500 });
  }
}

// ---------------- GET ----------------
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid or missing QR code id' }, { status: 400 });
    }

    const qrCode = await prisma.qRCode.findUnique({
      where: { id },
      select: {
        id: true,
        qrData: true,
        lastLink: true,
        uniqueCode: true,
        qrCodeImagePath: true,
        cornerShape: true,
        eyeShape: true,
        qrShape: true,
        foregroundColor: true,
        backgroundColor: true,
        dotColor: true,
        cornerColor: true,
        eyeColor: true,
        frameStyle: true,
        frameText: true,
        frameTextSize: true,
        frameColor: true,
        frameTextColor: true,
        updateCount: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: { id: true, fullName: true, email: true },
        },
      },
    });

    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }

    const serverLink = `${request.nextUrl.origin}/api/qr/dynamic/${qrCode.uniqueCode}`;
    return NextResponse.json({ ...qrCode, serverLink });
  } catch (error) {
    console.error('Error fetching QR code:', error);
    return NextResponse.json({ error: 'Failed to fetch QR code' }, { status: 500 });
  }
}

// ---------------- DELETE ----------------
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid or missing QR code id' }, { status: 400 });
    }

    const qrCode = await prisma.qRCode.findUnique({
      where: { id },
      select: { qrCodeImagePath: true },
    });

    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }

    await prisma.qRCode.delete({ where: { id } });

    if (qrCode.qrCodeImagePath) {
      const fs = require('fs');
      const path = require('path');
      const imagePath = path.join(process.cwd(), 'public', qrCode.qrCodeImagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return NextResponse.json({ message: 'QR code deleted successfully' });
  } catch (error) {
    console.error('Error deleting QR code:', error);
    return NextResponse.json({ error: 'Failed to delete QR code' }, { status: 500 });
  }
}
