import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'stylusqr_session';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 0,
};

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set(COOKIE_NAME, '', COOKIE_OPTIONS);
  return response;
} 