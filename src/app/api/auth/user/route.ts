import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const COOKIE_NAME = 'stylusqr_session';

export async function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get(COOKIE_NAME)?.value;
    if (!cookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const decoded = jwt.verify(cookie, JWT_SECRET) as { id: number; email: string; fullName: string };
    return NextResponse.json({ user: decoded });
  } catch (error) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
} 