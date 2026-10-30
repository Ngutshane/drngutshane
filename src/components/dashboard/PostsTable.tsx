"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export type DashboardPost = {
  id: string;
  slug: string;
  category: "professional" | "personal";
  tag: string;
  title: string;
  published: boolean;
  created_at: string;
};

export default function PostsTable({ posts }: { posts: DashboardPost[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const togglePublished = async (post: DashboardPost) => {
    setPendingId(post.id);
    try {
      const res = await fetch(`/api/dashboard/posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });
      if (!res.ok) throw new Error();
      toast.success(post.published ? "Post unpublished." : "Post published.");
      router.refresh();
    } catch {
      toast.error("Failed to update post.");
    } finally {
      setPendingId(null);
    }
  };

  const deletePost = async (post: DashboardPost) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setPendingId(post.id);
    try {
      const res = await fetch(`/api/dashboard/posts/${post.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Post deleted.");
      router.refresh();
    } catch {
      toast.error("Failed to delete post.");
    } finally {
      setPendingId(null);
    }
  };

  if (posts.length === 0) {
    return (
      <p className="text-sm text-[#6B7A99] bg-white border border-[#DDE3EE] p-8 text-center">
        No posts yet. Click &ldquo;New Post&rdquo; to write your first article.
      </p>
    );
  }

  return (
    <div className="bg-white border border-[#DDE3EE] overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#DDE3EE] text-left text-xs text-[#6B7A99] uppercase tracking-wider">
            <th className="px-5 py-3 font-medium">Title</th>
            <th className="px-5 py-3 font-medium">Category</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-[#DDE3EE] last:border-0">
              <td className="px-5 py-4">
                <Link
                  href={`/dashboard/posts/${post.id}`}
                  className="font-medium text-[#0A1628] hover:text-[#C9A84C] transition-colors"
                >
                  {post.title}
                </Link>
              </td>
              <td className="px-5 py-4 text-[#6B7A99] capitalize">{post.category}</td>
              <td className="px-5 py-4">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-sm uppercase tracking-wider ${
                    post.published
                      ? "bg-green-100 text-green-800"
                      : "bg-[#F4F7FC] text-[#6B7A99] border border-[#DDE3EE]"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => togglePublished(post)}
                    disabled={pendingId === post.id}
                    className="text-xs text-[#0A1628] hover:text-[#C9A84C] transition-colors disabled:opacity-50"
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                  <Link
                    href={`/dashboard/posts/${post.id}`}
                    className="text-xs text-[#0A1628] hover:text-[#C9A84C] transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePost(post)}
                    disabled={pendingId === post.id}
                    className="text-xs text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
