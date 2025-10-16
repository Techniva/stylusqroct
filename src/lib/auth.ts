import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const COOKIE_NAME = 'stylusqr_session';

export interface AuthUser {
  id: number;
  email: string;
  fullName: string;
}

export async function getAuth(request?: NextRequest): Promise<{ user: AuthUser | null }> {
  try {
    let token: string | undefined;

    if (request) {
      // API route: NextRequest is available
      token = request.cookies.get(COOKIE_NAME)?.value;
    } else {
      // Server Component: cookies() must be awaited
      const cookieStore = cookies();
      token = (await cookieStore).get(COOKIE_NAME)?.value;
    }

    if (!token) return { user: null };

    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
      return { user: decoded as AuthUser };
    }

    return { user: null };
  } catch (err) {
    return { user: null };
  }
};
