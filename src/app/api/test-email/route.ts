import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

// GET /api/test-email — send a test email to ADMIN_EMAIL and report result
// Remove this route once email is confirmed working
export async function GET() {
  const to = process.env.ADMIN_EMAIL ?? "admin@drngutshane.com";
  const config = {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    user: process.env.EMAIL_SERVER_USER,
    from: process.env.EMAIL_FROM,
    to,
  };

  // Fail fast if credentials are missing
  if (!config.host || !config.user || !process.env.EMAIL_SERVER_PASSWORD) {
    return NextResponse.json({
      ok: false,
      error: "SMTP credentials not configured",
      config: { ...config, password: process.env.EMAIL_SERVER_PASSWORD ? "set" : "MISSING" },
    }, { status: 500 });
  }

  try {
    await sendEmail({
      to,
      subject: "Test email — Dr B. Ngutshane website",
      html: `<p style="font-family:sans-serif">This is a test email confirming that email delivery is working correctly on the Dr B. Ngutshane website.</p>`,
    });
    return NextResponse.json({ ok: true, sentTo: to, using: config.user });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      config,
    }, { status: 500 });
  }
}
