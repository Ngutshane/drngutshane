import { revalidatePath } from "next/cache";

/** Refreshes every statically rendered page that shows blog content. */
export function revalidateBlog() {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/sitemap.xml");
}
