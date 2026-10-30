"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export type DashboardComment = {
  id: string;
  post_slug: string;
  author_name: string;
  author_email: string;
  body: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

const statusStyles: Record<DashboardComment["status"], string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const filters: { label: string; value: DashboardComment["status"] | "all" }[] = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "All", value: "all" },
];

export default function CommentsModeration({ comments }: { comments: DashboardComment[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<DashboardComment["status"] | "all">("pending");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const updateStatus = async (comment: DashboardComment, status: DashboardComment["status"]) => {
    setPendingId(comment.id);
    try {
      const res = await fetch(`/api/dashboard/comments/${comment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      toast.success(`Comment ${status}.`);
      router.refresh();
    } catch {
      toast.error("Failed to update comment.");
    } finally {
      setPendingId(null);
    }
  };

  const deleteComment = async (comment: DashboardComment) => {
    if (!confirm("Delete this comment permanently?")) return;
    setPendingId(comment.id);
    try {
      const res = await fetch(`/api/dashboard/comments/${comment.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Comment deleted.");
      router.refresh();
    } catch {
      toast.error("Failed to delete comment.");
    } finally {
      setPendingId(null);
    }
  };

  const visible = filter === "all" ? comments : comments.filter((c) => c.status === filter);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`text-xs px-3 py-1.5 rounded-sm border transition-colors ${
              filter === f.value
                ? "bg-[#0A1628] text-white border-[#0A1628]"
                : "bg-white text-[#6B7A99] border-[#DDE3EE] hover:border-[#C9A84C]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-[#6B7A99] bg-white border border-[#DDE3EE] p-8 text-center">
          No comments here.
        </p>
      ) : (
        <ul className="space-y-4">
          {visible.map((comment) => (
            <li key={comment.id} className="bg-white border border-[#DDE3EE] p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#0A1628]">{comment.author_name}</span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-sm uppercase tracking-wider ${statusStyles[comment.status]}`}
                    >
                      {comment.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7A99] mt-1">
                    {comment.author_email} · on{" "}
                    <a
                      href={`/blog/${comment.post_slug}`}
                      target="_blank"
                      className="underline hover:text-[#C9A84C]"
                    >
                      {comment.post_slug}
                    </a>{" "}
                    · {new Date(comment.created_at).toLocaleDateString("en-ZA")}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#0A1628] leading-relaxed whitespace-pre-wrap mb-4">
                {comment.body}
              </p>
              <div className="flex items-center gap-4">
                {comment.status !== "approved" && (
                  <button
                    onClick={() => updateStatus(comment, "approved")}
                    disabled={pendingId === comment.id}
                    className="text-xs text-green-700 hover:text-green-900 font-medium disabled:opacity-50"
                  >
                    Approve
                  </button>
                )}
                {comment.status !== "rejected" && (
                  <button
                    onClick={() => updateStatus(comment, "rejected")}
                    disabled={pendingId === comment.id}
                    className="text-xs text-amber-700 hover:text-amber-900 font-medium disabled:opacity-50"
                  >
                    Reject
                  </button>
                )}
                <button
                  onClick={() => deleteComment(comment)}
                  disabled={pendingId === comment.id}
                  className="text-xs text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
