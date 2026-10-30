import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import PostForm from "@/components/dashboard/PostForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const { data: post } = await supabaseAdmin.from("blog_posts").select("*").eq("id", id).maybeSingle();

  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl text-[#0A1628] font-bold mb-8">Edit Post</h1>
      <PostForm
        initial={{
          id: post.id,
          slug: post.slug,
          title: post.title,
          category: post.category,
          tag: post.tag,
          excerpt: post.excerpt,
          content: post.content,
          readTime: post.read_time,
          published: post.published,
        }}
      />
    </div>
  );
}
