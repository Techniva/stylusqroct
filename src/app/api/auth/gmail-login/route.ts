import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider } = body;

    // For now, we'll simulate the OAuth flow
    // In a real implementation, you would:
    // 1. Redirect to Google OAuth
    // 2. Handle the callback with authorization code
    // 3. Exchange code for access token
    // 4. Get user info from Google API
    // 5. Create or update user in database

    console.log('Gmail login initiated:', provider);

    // Simulate successful login for demo purposes
    // In production, implement actual OAuth flow
    const mockUser = {
      id: 1,
      fullName: 'Demo Gmail User',
      email: 'demo@gmail.com',
      createdAt: new Date().toISOString(),
    };

    // Set session cookie (in production, use proper session management)
    const response = NextResponse.json({
      success: true,
      message: 'Successfully logged in with Gmail!',
      user: mockUser,
    });

    // Set HTTP-only cookie for session
    response.cookies.set('auth-token', 'mock-gmail-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;

  } catch (error) {
    console.error('Gmail login error:', error);
    return NextResponse.json(
      { error: 'Failed to login with Gmail' },
      { status: 500 }
    );
  }
} 