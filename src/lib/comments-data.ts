import { supabaseAdmin } from "@/lib/supabase";

export type BlogComment = {
  id: string;
  authorName: string;
  body: string;
  date: string;
};

export async function getApprovedComments(postSlug: string): Promise<BlogComment[]> {
  const { data, error } = await supabaseAdmin
    .from("blog_comments")
    .select("id, author_name, body, created_at")
    .eq("post_slug", postSlug)
    .eq("status", "approved")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[comments-data] getApprovedComments error:", error);
    return [];
  }

  return data.map((c) => ({
    id: c.id,
    authorName: c.author_name,
    body: c.body,
    date: new Date(c.created_at).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  }));
}
