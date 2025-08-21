import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    const { admin } = await getAdminAuth();
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin: admin
    });
  } catch (error) {
    console.error('Error checking admin auth:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 