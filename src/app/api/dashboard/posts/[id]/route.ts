import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

type Props = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Props) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin.from("blog_posts").select("*").eq("id", id).maybeSingle();

  if (error) {
    console.error("[dashboard/posts/:id] GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json({ post: data });
}

export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, category, tag, excerpt, content, readTime, published } = body;

    if (category && category !== "professional" && category !== "personal") {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("blog_posts")
      .select("published, published_at")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!existing) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (title !== undefined) update.title = title;
    if (category !== undefined) update.category = category;
    if (tag !== undefined) update.tag = tag;
    if (excerpt !== undefined) update.excerpt = excerpt;
    if (content !== undefined) update.content = content;
    if (readTime !== undefined) update.read_time = readTime;
    if (published !== undefined) {
      update.published = Boolean(published);
      if (published && !existing.published) {
        update.published_at = new Date().toISOString();
      }
    }

    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .update(update)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return NextResponse.json({ post: data });
  } catch (err) {
    console.error("[dashboard/posts/:id] PATCH error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const { id } = await params;
  const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);

  if (error) {
    console.error("[dashboard/posts/:id] DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
