import Link from "next/link";

const posts = [
  {
    category: "professional",
    tag: "Cardiology",
    slug: "understanding-coronary-artery-disease",
    title: "Understanding Coronary Artery Disease: When Surgery Is the Answer",
    excerpt:
      "A plain-language guide to how CAD develops, how it is managed medically, and the surgical options when medications and stenting are insufficient.",
    date: "15 June 2025",
  },
  {
    category: "professional",
    tag: "Thoracic",
    slug: "lung-nodule-what-now",
    title: "Your CT Showed a Lung Nodule — What Happens Next?",
    excerpt:
      "Incidental lung nodules are increasingly detected. Here is how we risk-stratify them and when a surgical approach is indicated.",
    date: "2 May 2025",
  },
  {
    category: "personal",
    tag: "Life",
    slug: "lessons-from-the-operating-theatre",
    title: "Lessons the Operating Theatre Taught Me About Leadership",
    excerpt:
      "Reflections on how the culture of a surgical team — communication, hierarchy, and trust under pressure — shapes outcomes far beyond the OR.",
    date: "18 April 2025",
  },
];

const tagColors: Record<string, string> = {
  Cardiology: "bg-[#0A1628] text-[#C9A84C]",
  Thoracic: "bg-[#122040] text-[#C9A84C]",
  Life: "bg-[#F4F7FC] text-[#6B7A99] border border-[#DDE3EE]",
};

export default function BlogPreview() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-3">From the Blog</p>
            <h2 className="font-display text-4xl sm:text-5xl text-[#0A1628] font-bold">
              Latest Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm text-[#0A1628] border-b border-[#C9A84C] pb-0.5 hover:text-[#C9A84C] transition-colors whitespace-nowrap"
          >
            All articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
              <article className="border border-[#DDE3EE] group-hover:border-[#C9A84C] transition-all duration-300 h-full flex flex-col">
                {/* Top stripe colour-coded by category */}
                <div
                  className={`h-1 ${p.category === "professional" ? "bg-[#C9A84C]" : "bg-[#A8B4CA]"}`}
                />
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-sm tracking-wider uppercase ${tagColors[p.tag]}`}
                    >
                      {p.tag}
                    </span>
                    <span className="text-xs text-[#6B7A99]">{p.date}</span>
                  </div>
                  <h3 className="font-display text-xl text-[#0A1628] font-semibold mb-3 leading-snug group-hover:text-[#C9A84C] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[#6B7A99] text-sm leading-relaxed flex-1">{p.excerpt}</p>
                  <p className="mt-5 text-xs text-[#C9A84C] font-medium">Read article →</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
