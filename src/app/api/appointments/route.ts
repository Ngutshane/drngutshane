import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, idNumber, location,
            preferredDate, preferredTime, referralSource, reason } = body;

    const required = ["firstName", "lastName", "email", "phone", "idNumber", "location"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const { error } = await supabaseAdmin.from("appointments").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      id_number: idNumber,
      location,
      preferred_date: preferredDate || null,
      preferred_time: preferredTime || null,
      referral_source: referralSource || null,
      reason: reason || null,
      status: "pending",
    });

    if (error) throw error;

    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@drngutshane.com";

    await sendEmail({
      to: adminEmail,
      replyTo: email,
      subject: `[New Booking] ${firstName} ${lastName} — ${location}`,
      html: `
        <h2 style="font-family:sans-serif;color:#0A1628;">New appointment request</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 12px;font-weight:600;width:160px">Patient</td><td style="padding:6px 12px">${firstName} ${lastName}</td></tr>
          <tr style="background:#f4f7fc"><td style="padding:6px 12px;font-weight:600">Email</td><td style="padding:6px 12px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:600">Phone</td><td style="padding:6px 12px">${phone}</td></tr>
          <tr style="background:#f4f7fc"><td style="padding:6px 12px;font-weight:600">Hospital</td><td style="padding:6px 12px">${location}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600">Preferred date</td><td style="padding:6px 12px">${preferredDate || "—"}</td></tr>
          <tr style="background:#f4f7fc"><td style="padding:6px 12px;font-weight:600">Preferred time</td><td style="padding:6px 12px">${preferredTime || "—"}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600">Referred by</td><td style="padding:6px 12px">${referralSource || "—"}</td></tr>
          <tr style="background:#f4f7fc"><td style="padding:6px 12px;font-weight:600;vertical-align:top">Reason</td><td style="padding:6px 12px;white-space:pre-wrap">${reason || "—"}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:12px;color:#6b7a99;margin-top:24px">
          Log in to the admin dashboard to confirm or cancel this slot.
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[appointments] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
