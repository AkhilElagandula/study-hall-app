// File: src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/my-bookings', '/admin'];
const adminRoutes = ['/admin', '/admin/halls', '/admin/bookings'];

export async function middleware(req: NextRequest) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Redirect unauthenticated users trying to access protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // if (!token) {
    //   const loginUrl = new URL('/login', req.url);
    //   return NextResponse.redirect(loginUrl);
    // }
  }

  // Redirect non-admin users trying to access admin-only routes
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    // if (!token || token.role !== 'admin') {
    //   const homeUrl = new URL('/', req.url);
    //   return NextResponse.redirect(homeUrl);
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my-bookings', '/admin/:path*'],
};

import { verifyAccessToken } from "@/lib/jwt";

export async function authenticateToken(
  req: NextRequest
): Promise<NextResponse | null> {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "Token missing from headers" },
      { status: 401 }
    );
  }

  const user = verifyAccessToken(token);

  if (!user) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }

  const tokenValid = await checkToken(user.uId, user.email, token);
  if (!tokenValid) {
    return NextResponse.json({ message: "Token is invalid" }, { status: 403 });
  }

  //  Validated
  return null;
}
