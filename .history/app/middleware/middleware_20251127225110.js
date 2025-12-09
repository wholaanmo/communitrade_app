import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = "floresjamaicamae30@gmail.com";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  console.log('Middleware checking:', { pathname, hasToken: !!token, email: token?.email });

  // If no session and trying to access protected routes
  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
    console.log('Redirecting to login - no token');
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ADMIN ROUTES CHECK - protect ALL admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      console.log('Redirecting to login - no token for admin route');
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (token?.email !== ADMIN_EMAIL) {
      console.log('Redirecting to not-authorized - not admin');
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }
  }

  // USER ROUTES CHECK - allow any logged-in user (including admin if they want user access)
  if (pathname.startsWith("/user")) {
    if (!token) {
      console.log('Redirecting to login - no token for user route');
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // REMOVED the admin redirect - let admin access user routes if they want
    // Users (including admin) can access user routes
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
  ],
};