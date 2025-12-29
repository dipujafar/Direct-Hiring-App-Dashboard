import { NextResponse } from "next/server";
import { authRoutes } from "./lib/authRoutes";

export default function middleware(req: any) {
  const { nextUrl } = req;
  const isLoggedIn = req.cookies.get("access-token")?.value;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/earnings/:path*",
    "/employer/:path*",
    "/helper/:path*",
    "/admin-messaging-panel/:path*",
    "/post/:path*",
    "/settings/:path*",
    "/profile/:path*",
  ],
};
