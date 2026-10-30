import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  DASHBOARD_SESSION_COOKIE,
  checkAdminPassword,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/dashboard-auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (typeof password !== "string" || !checkAdminPassword(password)) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(DASHBOARD_SESSION_COOKIE, createSessionToken(), sessionCookieOptions);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[dashboard/login] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
