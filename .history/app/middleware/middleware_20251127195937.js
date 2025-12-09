import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = "floresjamaicamae30.com"; // <<< change this!

export async function middleware(req) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;

  // If no session and trying to access protected routes
  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // ADMIN ROUTES CHECK
  if (pathname.startsWith("/admin")) {
    if (token?.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }
  }

  // USER ROUTES CHECK (any logged-in Google user allowed)
  if (pathname.startsWith("/user")) {
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};

