import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const { pathname } = request.nextUrl;

  const isPublicAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  const isResetPage =
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  const isProtectedRoute =
    pathname.startsWith("/dashboard");

  // ❌ لو عامل login ومداخل auth pages
  if (token && isPublicAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ❌ لو مش عامل login وداخل protected routes
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}