import Link from "next/link";
import { connection } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import PostsTable, { type DashboardPost } from "@/components/dashboard/PostsTable";

export default async function DashboardPostsPage() {
  await connection();
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[dashboard/posts page] error:", error);
  }

  const posts = (data ?? []) as DashboardPost[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-[#0A1628] font-bold">Blog Posts</h1>
          <p className="text-sm text-[#6B7A99] mt-1">Compose, edit, and publish articles.</p>
        </div>
        <Link
          href="/dashboard/posts/new"
          className="px-5 py-2.5 bg-[#0A1628] text-white text-sm rounded-sm hover:bg-[#122040] transition-colors"
        >
          New Post
        </Link>
      </div>

      <PostsTable posts={posts} />
    </div>
  );
}
