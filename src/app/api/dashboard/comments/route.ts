import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("blog_comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[dashboard/comments] GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
  return NextResponse.json({ comments: data });
}
