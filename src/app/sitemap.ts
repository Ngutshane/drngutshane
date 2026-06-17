import { getPublishedPosts } from "@/lib/blog-data";
import type { MetadataRoute } from "next";

const BASE = "https://drngutshane.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE,                        priority: 1.0,  changeFrequency: "weekly"  as const },
    { url: `${BASE}/about`,             priority: 0.9,  changeFrequency: "monthly" as const },
    { url: `${BASE}/services`,          priority: 0.9,  changeFrequency: "monthly" as const },
    { url: `${BASE}/appointments`,      priority: 0.9,  changeFrequency: "monthly" as const },
    { url: `${BASE}/contact`,           priority: 0.8,  changeFrequency: "monthly" as const },
    { url: `${BASE}/blog`,              priority: 0.8,  changeFrequency: "weekly"  as const },
    { url: `${BASE}/privacy-policy`,    priority: 0.3,  changeFrequency: "yearly"  as const },
  ];

  const blogPages = getPublishedPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...blogPages];
}
