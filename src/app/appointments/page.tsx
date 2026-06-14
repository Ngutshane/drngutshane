"use client";

import { useState } from "react";
import { Calendar, Clock, Shield, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import HeartDivider from "@/components/ui/HeartDivider";

type Step = "booking" | "intake" | "done";

export default function AppointmentsPage() {
  const [step, setStep] = useState<Step>("booking");
  const [appointmentId, setAppointmentId] = useState<string | null>(null);

  // Booking form state
  const [booking, setBooking] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    idNumber: "", preferredDate: "", preferredTime: "",
    location: "", referralSource: "", reason: "",
  });

  // Intake form state
  const [intake, setIntake] = useState({
    medicalAidName: "", medicalAidNumber: "", medicalAidPlan: "",
    mainMember: "", memberNumber: "",
    allergies: "", currentMedications: "", medicalHistory: "",
    smokingStatus: "never", consent: false,
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (data.id) setAppointmentId(data.id);
      toast.success("Appointment request received — our team will confirm your slot.");
      setStep("intake");
    } catch {
      toast.error("Failed to submit. Please call 083 261 7760 to book directly.");
    }
  };

  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intake.consent) {
      toast.error("Please confirm your consent to proceed.");
      return;
    }
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...intake, appointmentId }),
      });
      if (!res.ok) throw new Error();
      toast.success("Intake information saved securely.");
      setStep("done");
    } catch {
      toast.error("Failed to save intake. You can complete this at your appointment.");
      setStep("done");
    }
  };

  if (step === "done") {
    return (
      <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center px-4 pt-24">
        <div className="max-w-lg w-full bg-white border border-[#C9A84C] p-12 text-center">
          <CheckCircle2 size={48} className="text-[#C9A84C] mx-auto mb-4" />
          <h1 className="font-display text-3xl text-[#0A1628] font-bold mb-3">
            You&apos;re all set.
          </h1>
          <p className="text-[#6B7A99] mb-2">
            Your appointment request and intake information have been received.
          </p>
          <p className="text-[#6B7A99] text-sm">
            Our practice manager will contact you within one business day to confirm your slot.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#0A1628] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-3">Online Booking</p>
          <h1 className="font-display text-5xl text-white font-bold">Book an Appointment</h1>
          <p className="text-slate-300 mt-4">
            Complete the form below to request a consultation slot. All submissions are reviewed
            and confirmed manually by our practice administrator.
          </p>
          {/* Security note */}
          <div className="flex items-center gap-2 mt-5 text-xs text-slate-400">
            <Shield size={14} className="text-[#C9A84C]" />
            <span>Your data is encrypted and stored in compliance with POPIA on South African servers.</span>
          </div>
        </div>
      </div>

      <HeartDivider />

      {/* Steps indicator */}
      <div className="bg-white border-b border-[#DDE3EE] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex gap-6">
          {[
            { id: "booking", label: "1. Appointment Request", icon: Calendar },
            { id: "intake", label: "2. Patient Intake", icon: Clock },
          ].map((s) => (
            <div
              key={s.id}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                step === s.id ? "text-[#C9A84C]" : "text-[#6B7A99]"
              }`}
            >
              <s.icon size={15} />
              {s.label}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#F4F7FC] py-12 px-4 sm:px-6 lg:px-8" id="intake">
        <div className="max-w-3xl mx-auto">
          {step === "booking" && (
            <form onSubmit={handleBookingSubmit} className="bg-white border border-[#DDE3EE] p-8 space-y-6">
              <h2 className="font-display text-2xl text-[#0A1628] font-bold">Your Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="First Name *" required value={booking.firstName}
                  onChange={(v) => setBooking({ ...booking, firstName: v })} />
                <Field label="Last Name *" required value={booking.lastName}
                  onChange={(v) => setBooking({ ...booking, lastName: v })} />
                <Field label="Email Address *" type="email" required value={booking.email}
                  onChange={(v) => setBooking({ ...booking, email: v })} />
                <Field label="Phone Number *" type="tel" required value={booking.phone}
                  onChange={(v) => setBooking({ ...booking, phone: v })} />
                <Field label="ID / Passport Number *" required value={booking.idNumber}
                  onChange={(v) => setBooking({ ...booking, idNumber: v })} />
              </div>

              <h2 className="font-display text-2xl text-[#0A1628] font-bold pt-4">
                Appointment Preference
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Preferred Date" type="date" value={booking.preferredDate}
                  onChange={(v) => setBooking({ ...booking, preferredDate: v })} />
                <SelectField
                  label="Preferred Time"
                  value={booking.preferredTime}
                  onChange={(v) => setBooking({ ...booking, preferredTime: v })}
                  options={["Morning (08:00–12:00)", "Afternoon (12:00–16:00)"]}
                />
                <SelectField
                  label="Practice Location *"
                  required
                  value={booking.location}
                  onChange={(v) => setBooking({ ...booking, location: v })}
                  options={[
                    "Life Wilgeheuwel Hospital (Roodepoort)",
                    "Dr SK Matseke Memorial Hospital (Soweto)",
                    "Netcare Pinehaven Hospital (Krugersdorp)",
                  ]}
                />
                <SelectField
                  label="How were you referred?"
                  value={booking.referralSource}
                  onChange={(v) => setBooking({ ...booking, referralSource: v })}
                  options={["GP Referral", "Cardiologist", "Pulmonologist", "Self-referral", "Other"]}
                />
              </div>
              <TextareaField
                label="Reason for Consultation / Brief Clinical History"
                value={booking.reason}
                onChange={(v) => setBooking({ ...booking, reason: v })}
                rows={4}
              />
              <button
                type="submit"
                className="w-full py-4 bg-[#0A1628] text-white font-semibold rounded-sm hover:bg-[#122040] transition-colors text-sm tracking-wide"
              >
                Submit Appointment Request →
              </button>
            </form>
          )}

          {step === "intake" && (
            <form onSubmit={handleIntakeSubmit} className="bg-white border border-[#DDE3EE] p-8 space-y-6">
              <div>
                <h2 className="font-display text-2xl text-[#0A1628] font-bold">Patient Intake</h2>
                <p className="text-[#6B7A99] text-sm mt-1">
                  This information is stored encrypted and only accessed by the practice. You may
                  complete this now or bring a completed form to your appointment.
                </p>
              </div>

              <h3 className="font-semibold text-[#0A1628]">Medical Aid Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Medical Aid Name" value={intake.medicalAidName}
                  onChange={(v) => setIntake({ ...intake, medicalAidName: v })} />
                <Field label="Scheme / Plan" value={intake.medicalAidPlan}
                  onChange={(v) => setIntake({ ...intake, medicalAidPlan: v })} />
                <Field label="Medical Aid Number" value={intake.medicalAidNumber}
                  onChange={(v) => setIntake({ ...intake, medicalAidNumber: v })} />
                <Field label="Main Member Name" value={intake.mainMember}
                  onChange={(v) => setIntake({ ...intake, mainMember: v })} />
                <Field label="Member Number" value={intake.memberNumber}
                  onChange={(v) => setIntake({ ...intake, memberNumber: v })} />
              </div>

              <h3 className="font-semibold text-[#0A1628] pt-2">Medical History</h3>
              <TextareaField label="Known Allergies (medications, latex, etc.)" value={intake.allergies}
                onChange={(v) => setIntake({ ...intake, allergies: v })} rows={2} />
              <TextareaField label="Current Medications" value={intake.currentMedications}
                onChange={(v) => setIntake({ ...intake, currentMedications: v })} rows={3} />
              <TextareaField label="Significant Past Medical / Surgical History" value={intake.medicalHistory}
                onChange={(v) => setIntake({ ...intake, medicalHistory: v })} rows={4} />

              <SelectField label="Smoking Status" value={intake.smokingStatus}
                onChange={(v) => setIntake({ ...intake, smokingStatus: v })}
                options={["never", "ex-smoker", "current"]} />

              {/* POPIA Consent */}
              <div className="bg-[#F4F7FC] border border-[#DDE3EE] p-5 rounded-sm">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={intake.consent}
                    onChange={(e) => setIntake({ ...intake, consent: e.target.checked })}
                    className="mt-1 accent-[#C9A84C]"
                    required
                  />
                  <span className="text-xs text-[#6B7A99] leading-relaxed">
                    I consent to Dr B. Ngutshane Inc. collecting and processing my personal and
                    health information for the purpose of providing medical care, in accordance
                    with the Protection of Personal Information Act (POPIA). I understand I may
                    request access to, or deletion of, my information at any time.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#C9A84C] text-[#0A1628] font-semibold rounded-sm hover:bg-[#E8C97A] transition-colors text-sm tracking-wide"
              >
                Submit Intake Information
              </button>
              <button
                type="button"
                onClick={() => setStep("done")}
                className="w-full py-3 border border-[#DDE3EE] text-[#6B7A99] text-sm rounded-sm hover:border-[#0A1628] transition-colors"
              >
                Skip — I&apos;ll bring this to my appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

function Field({
  label, value, onChange, type = "text", required = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#0A1628] mb-1.5 tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border border-[#DDE3EE] rounded-sm px-3 py-2.5 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition-colors"
      />
    </div>
  );
}

function SelectField({
  label, value, onChange, options, required = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#0A1628] mb-1.5 tracking-wide">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border border-[#DDE3EE] rounded-sm px-3 py-2.5 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition-colors bg-white"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label, value, onChange, rows = 3,
}: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#0A1628] mb-1.5 tracking-wide">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full border border-[#DDE3EE] rounded-sm px-3 py-2.5 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
      />
    </div>
  );
}
