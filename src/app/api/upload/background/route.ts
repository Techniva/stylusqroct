// app/api/upload-background/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import sharp from 'sharp'; // npm install sharp

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('background') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No background file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and SVG files are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crop/resize image to square (500x500) using sharp
    const squareBuffer = await sharp(buffer)
      .resize({ width: 500, height: 500, fit: 'cover' }) // crops to center square
      .toBuffer();

    // Create uploads/backgrounds folder if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'backgrounds');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop() || 'png';
    const fileName = `background_${timestamp}.${fileExtension}`;
    const filePath = join(uploadsDir, fileName);

    // Save the cropped square image
    await writeFile(filePath, squareBuffer);

    // Return the public URL
    const publicUrl = `/uploads/backgrounds/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: 'Background uploaded and cropped to square successfully'
    });

  } catch (error) {
    console.error('Background upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload background' },
      { status: 500 }
    );
  }
}
