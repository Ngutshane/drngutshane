import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";

type Props = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    if (status !== "approved" && status !== "rejected" && status !== "pending") {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("blog_comments")
      .update({ status })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    revalidatePath("/blog/[slug]", "page");
    return NextResponse.json({ comment: data });
  } catch (err) {
    console.error("[dashboard/comments/:id] PATCH error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  const { id } = await params;
  const { error } = await supabaseAdmin.from("blog_comments").delete().eq("id", id);

  if (error) {
    console.error("[dashboard/comments/:id] DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
  revalidatePath("/blog/[slug]", "page");
  return NextResponse.json({ success: true });
}
