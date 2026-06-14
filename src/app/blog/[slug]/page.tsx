import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { getPostBySlug, getAllSlugs } from "@/lib/blog-data";
import HeartDivider from "@/components/ui/HeartDivider";
import BookingCTA from "@/components/home/BookingCTA";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

const tagColors: Record<string, string> = {
  Cardiology: "bg-[#0A1628] text-[#C9A84C]",
  Thoracic: "bg-[#122040] text-[#C9A84C]",
  Reflections: "bg-[#F4F7FC] text-[#6B7A99] border border-[#DDE3EE]",
  Life: "bg-[#F4F7FC] text-[#6B7A99] border border-[#DDE3EE]",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Parse markdown-ish content into sections
  const sections = post.content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="font-display text-2xl text-[#0A1628] font-bold mt-10 mb-4">
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("**") || block.includes("**")) {
      // Inline bold
      const parts = block.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="text-[#6B7A99] text-base leading-relaxed mb-4">
          {parts.map((p, j) =>
            p.startsWith("**") && p.endsWith("**") ? (
              <strong key={j} className="text-[#0A1628] font-semibold">
                {p.slice(2, -2)}
              </strong>
            ) : (
              p
            )
          )}
        </p>
      );
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="space-y-2 my-4 ml-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-[#6B7A99] text-sm">
              <span className="text-[#C9A84C] mt-1 shrink-0">›</span>
              {item.replace("- ", "")}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="text-[#6B7A99] text-base leading-relaxed mb-4">
        {block}
      </p>
    );
  });

  return (
    <>
      {/* Hero */}
      <div className="bg-[#0A1628] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#C9A84C] transition-colors text-sm mb-6"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-sm tracking-wider uppercase ${tagColors[post.tag]}`}>
              <Tag size={11} />
              {post.tag}
            </span>
            <span className={`text-xs px-2 py-1 rounded-sm ${post.category === "professional" ? "bg-[#C9A84C]/20 text-[#C9A84C]" : "bg-slate-700 text-slate-300"}`}>
              {post.category === "professional" ? "Medical" : "Personal"}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-white font-bold leading-tight mb-5">
            {post.title}
          </h1>
          <div className="flex items-center gap-5 text-slate-400 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {post.readTime}
            </span>
            <span>Dr B. Ngutshane</span>
          </div>
        </div>
      </div>

      <HeartDivider />

      {/* Article */}
      <article className="bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-[#0A1628] font-medium leading-relaxed mb-8 border-l-4 border-[#C9A84C] pl-5 italic">
            {post.excerpt}
          </p>
          <div>{sections}</div>

          {/* Disclaimer for medical posts */}
          {post.category === "professional" && (
            <div className="mt-12 p-5 bg-[#F4F7FC] border border-[#DDE3EE] text-xs text-[#6B7A99] leading-relaxed">
              <strong className="text-[#0A1628]">Medical Disclaimer:</strong> This article is
              intended for general information purposes only and does not constitute medical
              advice. Always consult a qualified healthcare professional regarding your specific
              health circumstances.
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-[#DDE3EE] flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#6B7A99] hover:text-[#0A1628] transition-colors"
            >
              <ArrowLeft size={14} /> All articles
            </Link>
            <Link
              href="/appointments"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A1628] text-white text-sm rounded-sm hover:bg-[#122040] transition-colors"
            >
              Book a Consultation →
            </Link>
          </div>
        </div>
      </article>

      <BookingCTA />
    </>
  );
}
