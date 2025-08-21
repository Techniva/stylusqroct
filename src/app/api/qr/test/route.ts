import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('Test API called');
    
    // Database connection is handled by the singleton Prisma client
    
    // Test user table
    const userCount = await prisma.user.count();
    console.log('Total users in database:', userCount);
    
    // Test QR code table
    const qrCount = await prisma.qRCode.count();
    console.log('Total QR codes in database:', qrCount);
    
    // Get sample user
    const sampleUser = await prisma.user.findFirst({
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true
      }
    });
    
    // Get sample QR code
    const sampleQR = await prisma.qRCode.findFirst({
      select: {
        id: true,
        qrData: true,
        uniqueCode: true,
        userId: true,
        createdAt: true
      }
    });
    
    return NextResponse.json({
      status: 'success',
      database: 'connected',
      userCount,
      qrCount,
      sampleUser,
      sampleQR,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 