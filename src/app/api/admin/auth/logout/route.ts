import { NextResponse } from 'next/server';

const ADMIN_COOKIE_NAME = 'stylusqr_admin_session';

export async function POST() {
  try {
    const response = NextResponse.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
    
    // Clear the admin session cookie
    response.cookies.set(ADMIN_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/' // Ensure cookie is cleared from all paths
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
} 