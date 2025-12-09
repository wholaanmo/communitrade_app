import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = "floresjamaicamae30@gmail.com";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // If no session and trying to access protected routes
  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ADMIN ROUTES CHECK
  if (pathname.startsWith("/admin")) {
    if (token?.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }
  }

  // USER ROUTES CHECK (any logged-in user except admin)
  if (pathname.startsWith("/user")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // If admin tries to access user routes, redirect to admin
    if (token?.email === ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/admin/acc", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};