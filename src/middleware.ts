import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "stylusqr_session";
const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET not set");

export function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    // ✅ Assert JWT_SECRET is string
    jwt.verify(token, JWT_SECRET as string);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/digital-business-cards/:path*",
  ],
};
