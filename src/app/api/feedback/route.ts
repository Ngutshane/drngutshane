import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sentiment, message, patientRef } = body;

    if (!sentiment) {
      return NextResponse.json({ error: "Sentiment is required." }, { status: 400 });
    }

    if (sentiment === "negative") {
      const { error } = await supabaseAdmin.from("feedback").insert({
        sentiment,
        message: message || null,
        patient_ref: patientRef || null,
      });

      if (error) throw error;

      await sendEmail({
        to: process.env.ADMIN_EMAIL ?? "admin@drngutshane.com",
        subject: "[Private Feedback] A patient left private feedback",
        html: `
          <h2 style="font-family:sans-serif;color:#0A1628;">Private patient feedback received</h2>
          <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
            <tr><td style="padding:6px 12px;font-weight:600;width:140px">Reference</td><td style="padding:6px 12px">${patientRef || "—"}</td></tr>
            <tr style="background:#f4f7fc"><td style="padding:6px 12px;font-weight:600;vertical-align:top">Feedback</td><td style="padding:6px 12px;white-space:pre-wrap">${message || "—"}</td></tr>
          </table>
          <p style="font-family:sans-serif;font-size:12px;color:#6b7a99;margin-top:24px">
            This feedback is stored privately and has not been published anywhere. Please follow up with the patient directly.
          </p>
        `,
      });

      return NextResponse.json({ success: true, action: "stored_privately" });
    }

    // Positive — return the Google review URL for the client to redirect to
    const reviewUrl = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_REVIEW_URL ?? null;
    return NextResponse.json({ success: true, action: "redirect_to_google", reviewUrl });
  } catch (err) {
    console.error("[feedback] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
