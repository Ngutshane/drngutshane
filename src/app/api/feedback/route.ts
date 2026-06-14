import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/feedback
 * Review pre-screening logic:
 *   - Positive  → client redirects to Google Business Profile
 *   - Negative  → stored internally, email sent to admin for resolution
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sentiment, message, patientRef } = body;

    if (!sentiment) {
      return NextResponse.json({ error: "Sentiment is required." }, { status: 400 });
    }

    if (sentiment === "negative") {
      // TODO: Store complaint in Supabase and notify admin
      // await supabase.from("feedback").insert({ sentiment, message, patientRef, createdAt: new Date() })
      // await sendEmail({
      //   to: process.env.ADMIN_EMAIL,
      //   subject: "Private Patient Feedback Received",
      //   html: `<p><b>Ref:</b> ${patientRef}</p><p>${message}</p>`,
      // });
      return NextResponse.json({ success: true, action: "stored_privately" });
    }

    // Positive — client handles redirect to Google
    return NextResponse.json({ success: true, action: "redirect_to_google" });
  } catch (err) {
    console.error("[feedback] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
