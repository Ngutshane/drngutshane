import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All required fields must be provided." }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@drngutshane.com";

    await sendEmail({
      to: adminEmail,
      replyTo: email,
      subject: `[Contact] ${subject} — ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#0A1628;">New contact form submission</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 12px;font-weight:600;width:120px">Name</td><td style="padding:6px 12px">${name}</td></tr>
          <tr style="background:#f4f7fc"><td style="padding:6px 12px;font-weight:600">Email</td><td style="padding:6px 12px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:600">Phone</td><td style="padding:6px 12px">${phone || "—"}</td></tr>
          <tr style="background:#f4f7fc"><td style="padding:6px 12px;font-weight:600">Subject</td><td style="padding:6px 12px">${subject}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;vertical-align:top">Message</td><td style="padding:6px 12px;white-space:pre-wrap">${message}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:12px;color:#6b7a99;margin-top:24px">
          Sent from drngutshane.com contact form.
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
