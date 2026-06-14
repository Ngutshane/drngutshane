import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/appointments
 * Accepts appointment request, stores as "pending" for admin review.
 * In production: write to Supabase appointments table (encrypted).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = ["firstName", "lastName", "email", "phone", "idNumber", "location"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // TODO: Insert into Supabase with status = "pending"
    // const supabase = createClient(...)
    // await supabase.from("appointments").insert({ ...body, status: "pending" })

    // TODO: Send notification email to ADMIN_EMAIL
    // await sendEmail({ to: process.env.ADMIN_EMAIL, subject: "New Appointment Request", ... })

    return NextResponse.json({ success: true, message: "Appointment request received." });
  } catch (err) {
    console.error("[appointments] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
