import { supabaseAdmin } from "@/lib/supabase";

export type BlogPost = {
  id: string;
  slug: string;
  category: "professional" | "personal";
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
  published: boolean;
};

type BlogPostRow = {
  id: string;
  slug: string;
  category: "professional" | "personal";
  tag: string;
  title: string;
  excerpt: string;
  content: string;
  read_time: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function mapRow(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    tag: row.tag,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    readTime: row.read_time,
    published: row.published,
    date: formatDate(row.published_at ?? row.created_at),
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[blog-data] getPublishedPosts error:", error);
    return [];
  }
  return (data as BlogPostRow[]).map(mapRow);
}

export async function getLatestPublishedPosts(limit: number): Promise<BlogPost[]> {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[blog-data] getLatestPublishedPosts error:", error);
    return [];
  }
  return (data as BlogPostRow[]).map(mapRow);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("[blog-data] getPostBySlug error:", error);
    return undefined;
  }
  return data ? mapRow(data as BlogPostRow) : undefined;
}

export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("slug")
    .eq("published", true);

  if (error) {
    console.error("[blog-data] getAllSlugs error:", error);
    return [];
  }
  return (data as { slug: string }[]).map((r) => r.slug);
}
