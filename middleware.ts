import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const { pathname } = request.nextUrl;

  const isPublicAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  const isResetPage =
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  const isProtectedRoute =
    pathname.startsWith("/projects") || pathname.startsWith("/project");

  if (token && isPublicAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !refreshToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}