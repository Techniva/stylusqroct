import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp'; // For image merging

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper: Merge QR with background image
async function mergeQRWithBackground(qrPath: string, backgroundPath: string, outputPath: string) {
  try {
    const qrImage = sharp(qrPath).resize(800, 800).png();
    const bgImage = sharp(backgroundPath).resize(800, 800).png();

    // Composite QR code on top of background
    const bgBuffer = await bgImage.toBuffer();
    const qrBuffer = await qrImage.toBuffer();

    await sharp(bgBuffer)
      .composite([{ input: qrBuffer, blend: 'over' }])
      .png()
      .toFile(outputPath);
  } catch (err) {
    console.error('Error merging background:', err);
    throw err;
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseInt(idParam);

  try {
    const formData = await request.formData();
    const file = formData.get('image');
    const processedLogoPath = formData.get('processedLogoPath') as string;
    const backgroundPath = formData.get('backgroundPath') as string; // NEW

    if (!file || typeof file !== 'object' || !('arrayBuffer' in file)) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }

    // Find the QR code
    const qrCode = await prisma.qRCode.findUnique({
      where: { id },
      select: { userId: true, uniqueCode: true },
    });
    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }

    // Save base QR image
    const userFolder = qrCode.userId ? String(qrCode.userId) : 'guest';
    const timestamp = Math.floor(Date.now() / 1000);
    const subfolderName = `qr-${id}-${timestamp}`;
    const imageDir = path.join(process.cwd(), 'public', 'qrcodes', userFolder, subfolderName);
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }

    const imageFileName = 'qr.png';
    const imagePath = `/qrcodes/${userFolder}/${subfolderName}/${imageFileName}`;
    const filePath = path.join(imageDir, imageFileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filePath, buffer);

    // Apply background if provided
    if (backgroundPath && backgroundPath.startsWith('/background-sample/')) {
      const bgFullPath = path.join(process.cwd(), 'public', backgroundPath.replace(/^\/+/, ''));
      if (fs.existsSync(bgFullPath)) {
        await mergeQRWithBackground(filePath, bgFullPath, filePath);
        console.log(`Background applied: ${backgroundPath}`);
      }
    }

    // Copy processed logo
    let logoPath = null;
    if (processedLogoPath && processedLogoPath !== 'undefined' && processedLogoPath !== 'null') {
      try {
        const logoFileName = 'logo.png';
        const logoFilePath = path.join(imageDir, logoFileName);
        if (processedLogoPath.startsWith('/processed-logos/')) {
          const sourceLogoPath = path.join(process.cwd(), 'public', processedLogoPath.replace(/^\/+/, ''));
          if (fs.existsSync(sourceLogoPath)) {
            fs.copyFileSync(sourceLogoPath, logoFilePath);
            logoPath = `/qrcodes/${userFolder}/${subfolderName}/${logoFileName}`;
            console.log('Logo copied to QR folder:', logoPath);
          }
        }
      } catch (logoError) {
        console.error('Error copying logo:', logoError);
      }
    }

    // Save metadata (background info stored here only)
    const metadata = {
      id,
      userId: qrCode.userId,
      uniqueCode: qrCode.uniqueCode,
      createdAt: new Date().toISOString(),
      imagePath,
      logoPath,
      processedLogoPath,
      backgroundUsed: backgroundPath || null,
      subfolderName,
    };
    const metadataPath = path.join(imageDir, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    // Update only image & logo in DB (no background saved)
    const updatedQR = await prisma.qRCode.update({
      where: { id },
      data: {
        qrCodeImagePath: imagePath,
        logoPath: logoPath,
      },
      select: {
        id: true,
        qrData: true,
        lastLink: true,
        uniqueCode: true,
        cornerShape: true,
        eyeShape: true,
        qrShape: true,
        foregroundColor: true,
        backgroundColor: true,
        dotColor: true,
        cornerColor: true,
        eyeColor: true,
        qrCodeImagePath: true,
        logoPath: true,
        createdAt: true,
        userId: true,
      },
    });

    const origin = request.headers.get('origin') || '';
    const serverLink = `${origin}/api/qr/dynamic/${updatedQR.uniqueCode}`;
    return NextResponse.json({ ...updatedQR, serverLink });
  } catch (error) {
    console.error('Error uploading QR code image:', error);
    return NextResponse.json({ error: 'Failed to upload QR code image' }, { status: 500 });
  }
}
