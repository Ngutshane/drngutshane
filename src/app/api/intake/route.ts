import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      appointmentId,
      medicalAidName, medicalAidNumber, medicalAidPlan,
      mainMember, memberNumber,
      allergies, currentMedications, medicalHistory,
      smokingStatus, consent,
    } = body;

    if (!consent) {
      return NextResponse.json({ error: "POPIA consent is required." }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("patient_intake").insert({
      appointment_id: appointmentId || null,
      medical_aid_name: medicalAidName || null,
      medical_aid_plan: medicalAidPlan || null,
      medical_aid_number: medicalAidNumber || null,
      main_member: mainMember || null,
      member_number: memberNumber || null,
      allergies: allergies || null,
      current_medications: currentMedications || null,
      medical_history: medicalHistory || null,
      smoking_status: smokingStatus || "never",
      popia_consent: true,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[intake] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
