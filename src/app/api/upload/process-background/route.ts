import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import sharp from 'sharp'; // make sure sharp is installed

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected multipart/form-data' },
        { status: 400 }
      );
    }

    let formData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse form data. Please check the file format.' },
        { status: 400 }
      );
    }

    const file = formData.get('background') as File;
    const userId = formData.get('userId') as string;

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

    // Validate file size
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crop/resize to square
    const squareBuffer = await sharp(buffer)
      .resize({ width: 500, height: 500, fit: 'cover' }) // crops center
      .toBuffer();

    const userFolder = userId ? String(userId) : 'guest';
    const processedDir = join(process.cwd(), 'public', 'processed-backgrounds', userFolder);
    if (!existsSync(processedDir)) {
      await mkdir(processedDir, { recursive: true });
    }

    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'png';
    const fileName = `background_${timestamp}.${fileExtension}`;
    const filePath = join(processedDir, fileName);

    await writeFile(filePath, squareBuffer);

    const publicUrl = `/processed-backgrounds/${userFolder}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      localPath: filePath,
      message: 'Background uploaded and cropped to square successfully'
    });

  } catch (error) {
    console.error('Background processing error:', error);
    return NextResponse.json(
      { error: 'Failed to upload background' },
      { status: 500 }
    );
  }
}
