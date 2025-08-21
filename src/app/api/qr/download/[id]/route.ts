import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    // Fetch QR code data
    const qrCode = await prisma.qRCode.findUnique({
      where: { id },
      select: {
        id: true,
        qrCodeImagePath: true,
      },
    });
    if (!qrCode || !qrCode.qrCodeImagePath) {
      return NextResponse.json(
        { error: 'QR code image not found' },
        { status: 404 }
      );
    }
    // Increment download_count
    await prisma.qRCode.update({
      where: { id },
      data: { download_count: { increment: 1 } },
    });
    // Log download
    await prisma.downloadLog.create({
      data: { qr_code_id: id }
    });
    // Serve the image
    if (qrCode.qrCodeImagePath.startsWith('http')) {
      // Remote URL
      const imgRes = await fetch(qrCode.qrCodeImagePath);
      if (!imgRes.ok) {
        return NextResponse.json({ error: 'Failed to fetch QR image' }, { status: 500 });
      }
      const imgBuffer = Buffer.from(await imgRes.arrayBuffer());
      return new NextResponse(imgBuffer, {
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': `attachment; filename="qr-code-${qrCode.id}.png"`,
          'Cache-Control': 'no-cache',
        },
      });
    } else {
      // Local file (relative to public/)
      const filePath = path.join(process.cwd(), 'public', qrCode.qrCodeImagePath.replace(/^\/+/, ''));
      try {
        const imgBuffer = await fs.readFile(filePath);
        return new NextResponse(imgBuffer as any, {
          headers: {
            'Content-Type': 'image/png',
            'Content-Disposition': `attachment; filename="qr-code-${qrCode.id}.png"`,
            'Cache-Control': 'no-cache',
          },
        });
      } catch {
        return NextResponse.json({ error: 'QR image file not found' }, { status: 404 });
      }
    }
  } catch (error) {
    console.error('Error serving QR code image for download:', error);
    return NextResponse.json(
      { error: 'Failed to serve QR code image' },
      { status: 500 }
    );
  }
} 