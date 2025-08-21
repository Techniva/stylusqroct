import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    // Check if request has proper content type
    const contentType = request.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected multipart/form-data' },
        { status: 400 }
      );
    }

    let formData;
    try {
      formData = await request.formData();
      console.log('FormData parsed successfully');
    } catch (parseError) {
      console.error('FormData parsing error:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse form data. Please check the file format.' },
        { status: 400 }
      );
    }
    
    const file = formData.get('logo') as File;
    const userId = formData.get('userId') as string;
    
    console.log('File received:', file ? 'Yes' : 'No');
    console.log('UserId received:', userId);
    
    if (!file) {
      return NextResponse.json(
        { error: 'No logo file provided' },
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
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Create processed logos directory
    const userFolder = userId ? String(userId) : 'guest';
    const processedDir = join(process.cwd(), 'public', 'processed-logos', userFolder);
    if (!existsSync(processedDir)) {
      await mkdir(processedDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'png';
    const fileName = `logo_${timestamp}.${fileExtension}`;
    const filePath = join(processedDir, fileName);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(bytes));
    await writeFile(filePath, buffer);

    const publicUrl = `/processed-logos/${userFolder}/${fileName}`;
    
    return NextResponse.json({
      success: true,
      url: publicUrl,
      localPath: filePath,
      message: 'Logo uploaded successfully'
    });

  } catch (error) {
    console.error('Logo processing error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to upload logo';
    if (error instanceof Error) {
      if (error.message.includes('Failed to parse body as FormData')) {
        errorMessage = 'Invalid request format. Please try uploading the file again.';
      } else if (error.message.includes('FormData')) {
        errorMessage = 'File upload format error. Please check the file and try again.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 