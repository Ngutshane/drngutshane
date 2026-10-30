import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DASHBOARD_SESSION_COOKIE } from "@/lib/dashboard-auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(DASHBOARD_SESSION_COOKIE);
  return NextResponse.json({ success: true });
}
