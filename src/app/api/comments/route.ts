import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postSlug, name, email, body: commentBody } = body;

    if (!postSlug || !name || !email || !commentBody) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (String(commentBody).length > 3000) {
      return NextResponse.json({ error: "Comment is too long." }, { status: 400 });
    }

    const { data: post } = await supabaseAdmin
      .from("blog_posts")
      .select("slug")
      .eq("slug", postSlug)
      .eq("published", true)
      .maybeSingle();

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    const { error } = await supabaseAdmin.from("blog_comments").insert({
      post_slug: postSlug,
      author_name: name,
      author_email: email,
      body: commentBody,
      status: "pending",
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[comments] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
