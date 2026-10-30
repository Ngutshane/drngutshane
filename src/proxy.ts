import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DASHBOARD_SESSION_COOKIE, isValidSessionToken } from "@/lib/dashboard-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === "/dashboard/login" || pathname === "/api/dashboard/login";
  if (isLoginRoute) return NextResponse.next();

  const token = request.cookies.get(DASHBOARD_SESSION_COOKIE)?.value;
  if (isValidSessionToken(token)) return NextResponse.next();

  if (pathname.startsWith("/api/dashboard")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/dashboard/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
