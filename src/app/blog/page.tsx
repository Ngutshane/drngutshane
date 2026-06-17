import type { Metadata } from "next";
import Link from "next/link";
import HeartDivider from "@/components/ui/HeartDivider";
import { getPublishedPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on cardiac and thoracic surgery from Dr B. Ngutshane, plus personal reflections on medicine and life.",
};

const tagColors: Record<string, string> = {
  Cardiology: "bg-[#0A1628] text-[#C9A84C]",
  Thoracic: "bg-[#122040] text-[#C9A84C]",
  Reflections: "bg-[#F4F7FC] text-[#6B7A99] border border-[#DDE3EE]",
  Life: "bg-[#F4F7FC] text-[#6B7A99] border border-[#DDE3EE]",
};

export default function BlogPage() {
  const allPosts = getPublishedPosts();
  const professional = allPosts.filter((p) => p.category === "professional");
  const personal = allPosts.filter((p) => p.category === "personal");

  return (
    <>
      <div className="bg-[#0A1628] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-3">Articles</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white font-bold">Blog</h1>
          <p className="text-slate-300 mt-4 text-lg">
            Clinical insights and personal reflections from Dr B. Ngutshane.
          </p>
        </div>
      </div>

      <HeartDivider />

      {/* Professional posts */}
      <section className="bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-[#DDE3EE]" />
            <h2 className="font-display text-2xl text-[#0A1628] font-bold whitespace-nowrap">
              Medical & Surgical
            </h2>
            <div className="h-px flex-1 bg-[#DDE3EE]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {professional.map((p) => (
              <PostCard key={p.slug} post={p} tagColors={tagColors} />
            ))}
          </div>
        </div>
      </section>

      {/* Personal posts — hidden when none are published */}
      {personal.length > 0 && (
        <>
          <HeartDivider />
          <section className="bg-[#F4F7FC] py-14 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-[#DDE3EE]" />
                <h2 className="font-display text-2xl text-[#0A1628] font-bold whitespace-nowrap">
                  Personal
                </h2>
                <div className="h-px flex-1 bg-[#DDE3EE]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personal.map((p) => (
                  <PostCard key={p.slug} post={p} tagColors={tagColors} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

function PostCard({
  post,
  tagColors,
}: {
  post: (typeof allPosts)[0];
  tagColors: Record<string, string>;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="border border-[#DDE3EE] group-hover:border-[#C9A84C] transition-all duration-300 h-full flex flex-col bg-white">
        <div className={`h-1 ${post.category === "professional" ? "bg-[#C9A84C]" : "bg-[#A8B4CA]"}`} />
        <div className="p-7 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-medium px-2 py-1 rounded-sm tracking-wider uppercase ${tagColors[post.tag]}`}>
              {post.tag}
            </span>
            <span className="text-xs text-[#6B7A99]">{post.date}</span>
          </div>
          <h3 className="font-display text-xl text-[#0A1628] font-semibold mb-3 leading-snug group-hover:text-[#C9A84C] transition-colors">
            {post.title}
          </h3>
          <p className="text-[#6B7A99] text-sm leading-relaxed flex-1">{post.excerpt}</p>
          <p className="mt-5 text-xs text-[#C9A84C] font-medium">Read article →</p>
        </div>
      </article>
    </Link>
  );
}
