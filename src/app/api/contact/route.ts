import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 * General contact form — sends email to ADMIN_EMAIL.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All required fields must be provided." }, { status: 400 });
    }

    // TODO: Send email via Nodemailer / SendGrid / AWS SES
    // await sendEmail({
    //   to: process.env.ADMIN_EMAIL,
    //   subject: `[Contact] ${subject} — ${name}`,
    //   html: `<p><b>From:</b> ${name} &lt;${email}&gt;</p><p>${message}</p>`,
    // });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
