"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export type PostFormValues = {
  id?: string;
  slug?: string;
  title: string;
  category: "professional" | "personal";
  tag: string;
  excerpt: string;
  content: string;
  readTime: string;
  published: boolean;
};

const emptyValues: PostFormValues = {
  title: "",
  category: "professional",
  tag: "",
  excerpt: "",
  content: "",
  readTime: "5 min read",
  published: false,
};

export default function PostForm({ initial }: { initial?: PostFormValues }) {
  const router = useRouter();
  const isEditing = Boolean(initial?.id);
  const [values, setValues] = useState<PostFormValues>(initial ?? emptyValues);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const save = async (publish: boolean) => {
    if (!values.title || !values.excerpt || !values.content || !values.tag) {
      toast.error("Title, tag, excerpt, and content are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...values, published: publish };
      const res = await fetch(
        isEditing ? `/api/dashboard/posts/${initial!.id}` : "/api/dashboard/posts",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save post.");
      }
      toast.success(publish ? "Post published." : "Draft saved.");
      router.push("/dashboard/posts");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-[#DDE3EE] p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-[#6B7A99] uppercase tracking-wider mb-2">
            Title
          </label>
          <input
            type="text"
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Understanding Coronary Artery Disease"
            className="w-full border border-[#DDE3EE] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
          />
        </div>

        {isEditing && (
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-[#6B7A99] uppercase tracking-wider mb-2">
              Slug
            </label>
            <input
              type="text"
              disabled
              value={values.slug ?? ""}
              className="w-full border border-[#DDE3EE] bg-[#F4F7FC] text-[#6B7A99] px-4 py-2.5 text-sm cursor-not-allowed"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-[#6B7A99] uppercase tracking-wider mb-2">
            Category
          </label>
          <select
            value={values.category}
            onChange={(e) => set("category", e.target.value as "professional" | "personal")}
            className="w-full border border-[#DDE3EE] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] bg-white"
          >
            <option value="professional">Professional (Medical &amp; Surgical)</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6B7A99] uppercase tracking-wider mb-2">
            Tag
          </label>
          <input
            type="text"
            value={values.tag}
            onChange={(e) => set("tag", e.target.value)}
            placeholder="Cardiology, Thoracic, Life, Reflections..."
            className="w-full border border-[#DDE3EE] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-[#6B7A99] uppercase tracking-wider mb-2">
            Excerpt
          </label>
          <textarea
            rows={2}
            value={values.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
            placeholder="A short summary shown on the blog listing and social previews."
            className="w-full border border-[#DDE3EE] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6B7A99] uppercase tracking-wider mb-2">
            Read Time
          </label>
          <input
            type="text"
            value={values.readTime}
            onChange={(e) => set("readTime", e.target.value)}
            placeholder="5 min read"
            className="w-full border border-[#DDE3EE] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-[#6B7A99] uppercase tracking-wider mb-2">
            Content
          </label>
          <p className="text-xs text-[#6B7A99] mb-2">
            Supports simple formatting: <code>## Heading</code>, <code>**bold**</code>, and{" "}
            <code>- list items</code>. Separate paragraphs with a blank line.
          </p>
          <textarea
            rows={18}
            value={values.content}
            onChange={(e) => set("content", e.target.value)}
            placeholder={"Write the article here...\n\n## A Heading\n\nA paragraph with **bold** text.\n\n- A list item\n- Another item"}
            className="w-full border border-[#DDE3EE] px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#C9A84C]"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#DDE3EE]">
        {isEditing ? (
          <label className="flex items-center gap-2 text-sm text-[#0A1628]">
            <input
              type="checkbox"
              checked={values.published}
              onChange={(e) => set("published", e.target.checked)}
              className="accent-[#C9A84C]"
            />
            Published
          </label>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-3">
          {isEditing ? (
            <button
              onClick={() => save(values.published)}
              disabled={saving}
              className="px-5 py-2.5 bg-[#0A1628] text-white text-sm rounded-sm hover:bg-[#122040] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          ) : (
            <>
              <button
                onClick={() => save(false)}
                disabled={saving}
                className="px-5 py-2.5 border border-[#DDE3EE] text-[#0A1628] text-sm rounded-sm hover:border-[#C9A84C] transition-colors disabled:opacity-50"
              >
                Save Draft
              </button>
              <button
                onClick={() => save(true)}
                disabled={saving}
                className="px-5 py-2.5 bg-[#0A1628] text-white text-sm rounded-sm hover:bg-[#122040] transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Publish"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
