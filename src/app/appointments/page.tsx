"use client";

import { useState, useMemo } from "react";
import { Calendar, Clock, Shield, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import HeartDivider from "@/components/ui/HeartDivider";

type Step = "booking" | "intake" | "done";
type AppointmentType = "routine" | "urgent";

// Consultation schedule
const HOSPITAL_DAY: Record<string, { day: number; dayLabel: string }> = {
  "Life Wilgeheuwel Hospital (Roodepoort)":      { day: 5, dayLabel: "Fridays" },
  "Dr SK Matseke Memorial Hospital (Soweto)":    { day: 3, dayLabel: "Wednesdays" },
  "Netcare Pinehaven Hospital (Krugersdorp)":    { day: 2, dayLabel: "Tuesdays" },
};

function localDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getAvailableDates(location: string, type: AppointmentType): string[] {
  const today = new Date();
  const dates: string[] = [];
  const schedule = HOSPITAL_DAY[location];

  for (let i = 1; dates.length < 8 && i <= 90; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dow = d.getDay();
    if (type === "urgent") {
      if (dow >= 1 && dow <= 5) dates.push(localDateStr(d));
    } else if (schedule && dow === schedule.day) {
      dates.push(localDateStr(d));
    }
  }
  return dates;
}

function getTimeSlots(type: AppointmentType): string[] {
  return type === "urgent"
    ? ["14:00"]
    : ["08:00", "08:30", "09:00", "09:30"];
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-ZA", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export default function AppointmentsPage() {
  const [step, setStep] = useState<Step>("booking");
  const [appointmentId, setAppointmentId] = useState<string | null>(null);

  const [booking, setBooking] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    idNumber: "", location: "", appointmentType: "routine" as AppointmentType,
    preferredDate: "", preferredTime: "", referralSource: "", reason: "",
  });

  const [intake, setIntake] = useState({
    medicalAidName: "", medicalAidNumber: "", medicalAidPlan: "",
    mainMember: "", memberNumber: "",
    allergies: "", currentMedications: "", medicalHistory: "",
    smokingStatus: "never", consent: false,
  });

  const availableDates = useMemo(
    () => (booking.location ? getAvailableDates(booking.location, booking.appointmentType) : []),
    [booking.location, booking.appointmentType],
  );
  const timeSlots = useMemo(() => getTimeSlots(booking.appointmentType), [booking.appointmentType]);

  const schedule = HOSPITAL_DAY[booking.location];
  const scheduleHint = booking.appointmentType === "urgent"
    ? "Urgent slots are available on any weekday, 14:00–15:00."
    : schedule
      ? `Routine consultations at this hospital are on ${schedule.dayLabel}, 08:00–10:00.`
      : null;

  function setBookingField<K extends keyof typeof booking>(key: K, value: typeof booking[K]) {
    setBooking((prev) => ({
      ...prev,
      [key]: value,
      // Reset date/time when location or type changes
      ...(key === "location" || key === "appointmentType"
        ? { preferredDate: "", preferredTime: "" }
        : {}),
    }));
  }

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

      <div className="bg-[#F4F7FC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {step === "booking" && (
            <form onSubmit={handleBookingSubmit} className="bg-white border border-[#DDE3EE] p-8 space-y-6">
              <h2 className="font-display text-2xl text-[#0A1628] font-bold">Your Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="First Name *" required value={booking.firstName}
                  onChange={(v) => setBookingField("firstName", v)} />
                <Field label="Last Name *" required value={booking.lastName}
                  onChange={(v) => setBookingField("lastName", v)} />
                <Field label="Email Address *" type="email" required value={booking.email}
                  onChange={(v) => setBookingField("email", v)} />
                <Field label="Phone Number *" type="tel" required value={booking.phone}
                  onChange={(v) => setBookingField("phone", v)} />
                <Field label="ID / Passport Number *" required value={booking.idNumber}
                  onChange={(v) => setBookingField("idNumber", v)} />
              </div>

              <h2 className="font-display text-2xl text-[#0A1628] font-bold pt-4">
                Appointment Preference
              </h2>

              {/* Appointment type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["routine", "urgent"] as AppointmentType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setBookingField("appointmentType", t)}
                    className={`p-4 border text-left rounded-sm transition-colors ${
                      booking.appointmentType === t
                        ? "border-[#C9A84C] bg-[#C9A84C]/5"
                        : "border-[#DDE3EE] hover:border-[#0A1628]"
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#0A1628]">
                      {t === "routine" ? "Routine Consultation" : "Urgent / Emergency"}
                    </p>
                    <p className="text-xs text-[#6B7A99] mt-1">
                      {t === "routine"
                        ? "Tue / Wed / Fri · 08:00–10:00"
                        : "Any weekday · 14:00–15:00"}
                    </p>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Hospital */}
                <div className="sm:col-span-2">
                  <SelectField
                    label="Hospital *"
                    required
                    value={booking.location}
                    onChange={(v) => setBookingField("location", v)}
                    options={[
                      "Life Wilgeheuwel Hospital (Roodepoort)",
                      "Dr SK Matseke Memorial Hospital (Soweto)",
                      "Netcare Pinehaven Hospital (Krugersdorp)",
                    ]}
                  />
                  {scheduleHint && (
                    <p className="mt-1.5 text-xs text-[#C9A84C]">{scheduleHint}</p>
                  )}
                </div>

                {/* Available date */}
                <div>
                  <label className="block text-xs font-medium text-[#0A1628] mb-1.5 tracking-wide">
                    Preferred Date
                  </label>
                  <select
                    value={booking.preferredDate}
                    onChange={(e) => setBookingField("preferredDate", e.target.value)}
                    disabled={!booking.location}
                    className="w-full border border-[#DDE3EE] rounded-sm px-3 py-2.5 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {booking.location ? "Select a date…" : "Select a hospital first"}
                    </option>
                    {availableDates.map((iso) => (
                      <option key={iso} value={iso}>{formatDate(iso)}</option>
                    ))}
                  </select>
                </div>

                {/* Time slot */}
                <div>
                  <label className="block text-xs font-medium text-[#0A1628] mb-1.5 tracking-wide">
                    Preferred Time
                  </label>
                  <select
                    value={booking.preferredTime}
                    onChange={(e) => setBookingField("preferredTime", e.target.value)}
                    disabled={!booking.location}
                    className="w-full border border-[#DDE3EE] rounded-sm px-3 py-2.5 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a time…</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <SelectField
                  label="How were you referred?"
                  value={booking.referralSource}
                  onChange={(v) => setBookingField("referralSource", v)}
                  options={["GP Referral", "Cardiologist", "Pulmonologist", "Self-referral", "Other"]}
                />
              </div>

              <TextareaField
                label="Reason for Consultation / Brief Clinical History"
                value={booking.reason}
                onChange={(v) => setBookingField("reason", v)}
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
