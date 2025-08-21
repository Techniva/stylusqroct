import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const COOKIE_NAME = 'stylusqr_session';

interface AuthUser {
  id: number;
  email: string;
  fullName: string;
}

export async function getAuth(request?: NextRequest): Promise<{ user: AuthUser | null }> {
  try {
    let cookie: string | undefined;
    
    if (request) {
      // For API routes
      cookie = request.cookies.get(COOKIE_NAME)?.value;
    } else {
      // For server components
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      cookie = cookieStore.get(COOKIE_NAME)?.value;
    }
    
    if (!cookie) {
      return { user: null };
    }
    const decoded = jwt.verify(cookie, JWT_SECRET) as AuthUser;
    return { user: decoded };
  } catch (error) {
    return { user: null };
  }
} 