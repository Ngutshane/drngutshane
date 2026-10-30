"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import type { BlogComment } from "@/lib/comments-data";

export default function CommentSection({
  postSlug,
  comments,
}: {
  postSlug: string;
  comments: BlogComment[];
}) {
  const [form, setForm] = useState({ name: "", email: "", body: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postSlug, ...form }),
      });
      if (!res.ok) throw new Error();
      toast.success("Comment submitted for review. Thank you!");
      setForm({ name: "", email: "", body: "" });
      setSubmitted(true);
    } catch {
      toast.error("Failed to submit comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-14 pt-10 border-t border-[#DDE3EE]">
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle size={18} className="text-[#C9A84C]" />
        <h2 className="font-display text-2xl text-[#0A1628] font-bold">
          Comments {comments.length > 0 && `(${comments.length})`}
        </h2>
      </div>

      {comments.length > 0 && (
        <ul className="space-y-6 mb-10">
          {comments.map((c) => (
            <li key={c.id} className="bg-[#F4F7FC] border border-[#DDE3EE] p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#0A1628]">{c.authorName}</span>
                <span className="text-xs text-[#6B7A99]">{c.date}</span>
              </div>
              <p className="text-sm text-[#6B7A99] leading-relaxed whitespace-pre-wrap">{c.body}</p>
            </li>
          ))}
        </ul>
      )}

      {submitted ? (
        <p className="text-sm text-[#6B7A99] bg-[#F4F7FC] border border-[#DDE3EE] p-5">
          Thank you — your comment has been submitted and will appear once reviewed.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-[#6B7A99]">
            Leave a comment. It will be reviewed before it appears publicly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-[#DDE3EE] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
            />
            <input
              type="email"
              required
              placeholder="Your email (not published)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border border-[#DDE3EE] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
            />
          </div>
          <textarea
            required
            rows={4}
            maxLength={3000}
            placeholder="Write your comment..."
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className="w-full border border-[#DDE3EE] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-[#0A1628] text-white text-sm rounded-sm hover:bg-[#122040] transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Comment"}
          </button>
        </form>
      )}
    </section>
  );
}
