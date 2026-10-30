import { supabaseAdmin } from "@/lib/supabase";
import CommentsModeration, { type DashboardComment } from "@/components/dashboard/CommentsModeration";

export default async function DashboardCommentsPage() {
  const { data, error } = await supabaseAdmin
    .from("blog_comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[dashboard/comments page] error:", error);
  }

  const comments = (data ?? []) as DashboardComment[];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-[#0A1628] font-bold">Comments</h1>
        <p className="text-sm text-[#6B7A99] mt-1">
          Approve comments to publish them on the article. Rejected comments stay hidden.
        </p>
      </div>
      <CommentsModeration comments={comments} />
    </div>
  );
}
