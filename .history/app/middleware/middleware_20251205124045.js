
export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (token?.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }
  }

  // USER ROUTES - redirect admin to admin dashboard
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