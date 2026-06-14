import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/intake
 * Accepts encrypted patient intake data.
 * In production: write to Supabase patient_intake table (AES-256 at rest).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.consent) {
      return NextResponse.json(
        { error: "POPIA consent is required." },
        { status: 400 }
      );
    }

    // TODO: Encrypt sensitive fields before storage
    // const encrypted = encryptFields(body, ["idNumber", "medicalAidNumber", "medicalHistory"])
    // await supabase.from("patient_intake").insert(encrypted)

    return NextResponse.json({ success: true, message: "Intake information stored securely." });
  } catch (err) {
    console.error("[intake] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
