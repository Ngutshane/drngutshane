import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[dashboard/posts] GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
  return NextResponse.json({ posts: data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, tag, excerpt, content, readTime, published, slug } = body;

    if (!title || !category || !tag || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (category !== "professional" && category !== "personal") {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    const finalSlug = slug ? slugify(slug) : slugify(title);
    if (!finalSlug) {
      return NextResponse.json({ error: "Could not derive a slug from the title." }, { status: 400 });
    }

    const isPublished = Boolean(published);

    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .insert({
        slug: finalSlug,
        category,
        tag,
        title,
        excerpt,
        content,
        read_time: readTime || "5 min read",
        published: isPublished,
        published_at: isPublished ? new Date().toISOString() : null,
      })
      .select("*")
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ post: data });
  } catch (err) {
    console.error("[dashboard/posts] POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
