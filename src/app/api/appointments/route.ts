import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, email, phone, idNumber, location,
      appointmentType, preferredDate, preferredTime, referralSource, reason,
    } = body;

    const required = ["firstName", "lastName", "email", "phone", "idNumber", "location"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const { data, error } = await supabaseAdmin
      .from("appointments")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        id_number: idNumber,
        location,
        preferred_date: preferredDate || null,
        preferred_time: preferredTime || null,
        referral_source: referralSource || null,
        reason: [appointmentType === "urgent" ? "[URGENT]" : "", reason].filter(Boolean).join(" ") || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) throw error;

    // Email is fire-and-forget — SMTP may not be configured yet
    const typeLabel = appointmentType === "urgent" ? "URGENT Consultation" : "Routine Consultation";
    sendEmail({
      to: process.env.ADMIN_EMAIL ?? "admin@drngutshane.com",
      replyTo: email,
      subject: `[${appointmentType === "urgent" ? "URGENT" : "New Booking"}] ${firstName} ${lastName} — ${location}`,
      html: `
        <h2 style="font-family:sans-serif;color:#0A1628;">New appointment request</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 12px;font-weight:600;width:160px">Type</td><td style="padding:6px 12px">${typeLabel}</td></tr>
          <tr style="background:#f4f7fc"><td style="padding:6px 12px;font-weight:600">Patient</td><td style="padding:6px 12px">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600">Email</td><td style="padding:6px 12px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr style="background:#f4f7fc"><td style="padding:6px 12px;font-weight:600">Phone</td><td style="padding:6px 12px">${phone}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600">Hospital</td><td style="padding:6px 12px">${location}</td></tr>
          <tr style="background:#f4f7fc"><td style="padding:6px 12px;font-weight:600">Date</td><td style="padding:6px 12px">${preferredDate || "—"}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600">Time</td><td style="padding:6px 12px">${preferredTime || "—"}</td></tr>
          <tr style="background:#f4f7fc"><td style="padding:6px 12px;font-weight:600">Referred by</td><td style="padding:6px 12px">${referralSource || "—"}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;vertical-align:top">Reason</td><td style="padding:6px 12px;white-space:pre-wrap">${reason || "—"}</td></tr>
        </table>
      `,
    }).catch((err) => console.error("[appointments] Email failed (non-fatal):", err));

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error("[appointments] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
