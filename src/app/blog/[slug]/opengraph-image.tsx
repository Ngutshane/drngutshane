import { ImageResponse } from "next/og";
import { getPostBySlug, isThoracicGuy } from "@/lib/blog-data";

export const alt = "Article by Dr B. Ngutshane, Cardiothoracic Surgeon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

// Link preview card shown on WhatsApp, LinkedIn, and other social platforms.
export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const series = post && isThoracicGuy(post) ? "THORACIC GUY" : "DR B. NGUTSHANE";
  // Drops the "Thoracic Guy #1:" prefix since the series label already shows it.
  const title = post?.title.replace(/^Thoracic Guy\s*/, "").replace(/^(#\d+):\s*/, "$1  ") ?? "Articles";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0A1628",
          borderTop: "12px solid #C9A84C",
        }}
      >
        <div style={{ display: "flex", color: "#C9A84C", fontSize: 34, letterSpacing: 8 }}>{series}</div>
        <div style={{ display: "flex", color: "#FFFFFF", fontSize: 68, fontWeight: 700, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ display: "flex", color: "#A8B4CA", fontSize: 30 }}>
          Dr B. Ngutshane · Cardiothoracic Surgeon · drngutshane.co.za
        </div>
      </div>
    ),
    size
  );
}
