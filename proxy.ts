import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const { pathname } = request.nextUrl;

  const isPublicAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const isProtectedRoute =
    pathname.startsWith("/projects") ||
    pathname.startsWith("/project") ||
    pathname.startsWith("/my-statistics");

  if (token && isPublicAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !refreshToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/projects/:path*",
    "/project/:path*",
    "/my-statistics",
    "/login",
    "/register",
  ],
};
