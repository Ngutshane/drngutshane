import type { Metadata } from "next";
import { Heart, Wind, Activity, Stethoscope, ShieldCheck, Users } from "lucide-react";
import HeartDivider from "@/components/ui/HeartDivider";
import BookingCTA from "@/components/home/BookingCTA";

export const metadata: Metadata = {
  title: "Cardiac & Thoracic Surgery Services – Roodepoort, Soweto, Krugersdorp",
  description:
    "Heart surgery, lung surgery, and cardiothoracic surgical services by Dr B. Ngutshane — specialist cardiac surgeon and thoracic surgeon serving Johannesburg, Roodepoort, Randburg, Soweto, and Krugersdorp, Gauteng.",
  keywords: [
    "cardiac surgery Johannesburg",
    "heart surgery Gauteng",
    "thoracic surgery Johannesburg",
    "lung surgery Gauteng",
    "CABG Johannesburg",
    "heart valve surgery Gauteng",
    "cardiothoracic surgery Roodepoort",
    "cardiothoracic surgery Soweto",
    "cardiothoracic surgery Krugersdorp",
    "minimally invasive heart surgery Gauteng",
    "VATS lung surgery Johannesburg",
  ],
  alternates: { canonical: "https://drngutshane.co.za/services" },
};

const services = [
  {
    icon: Heart,
    title: "Cardiac Surgery",
    details: [
      "Coronary artery bypass grafting (CABG)",
      "Valve repair and replacement (aortic, mitral, tricuspid)",
      "Surgical correction of congenital heart defects",
      "Pericardial procedures",
      "Cardiac tumour resection",
    ],
    summary:
      "Open-heart surgery for the full spectrum of cardiac conditions, performed at affiliated private hospitals equipped with state-of-the-art perfusion and monitoring.",
  },
  {
    icon: Wind,
    title: "Thoracic Surgery",
    details: [
      "Lobectomy and pneumonectomy for lung cancer",
      "Mediastinal tumour resection",
      "Pleural decortication and effusion management",
      "Oesophageal surgery",
      "Chest wall reconstruction",
    ],
    summary:
      "Comprehensive thoracic oncological and non-oncological surgery, with a multi-disciplinary approach to complex lung and mediastinal pathology.",
  },
  {
    icon: Activity,
    title: "Minimally Invasive (VATS)",
    details: [
      "Video-assisted thoracoscopic surgery (VATS) lobectomy",
      "VATS decortication",
      "Thoracoscopic biopsy (lung, pleura, mediastinum)",
      "Sympathectomy",
    ],
    summary:
      "Where technically feasible, keyhole thoracic surgery reduces hospital stay, post-operative pain, and recovery time.",
  },
  {
    icon: Stethoscope,
    title: "Surgical Consultations",
    details: [
      "Pre-operative assessment and risk stratification",
      "Second surgical opinions",
      "Referral coordination with cardiologists and pulmonologists",
      "Post-operative follow-up care",
    ],
    summary:
      "A thorough surgical evaluation before any intervention — explaining options clearly so patients and families can make informed decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Emergency Surgical Referrals",
    details: [
      "Acute aortic syndromes",
      "Post-traumatic thoracic injuries",
      "Empyema and haemothorax",
    ],
    summary:
      "Emergency and urgent cases are managed through affiliated hospital emergency pathways. Contact the practice for direct referral.",
  },
  {
    icon: Users,
    title: "GP & Specialist Liaison",
    details: [
      "Direct referral letters accepted",
      "Feedback reports to referring doctors",
      "Joint case management",
    ],
    summary:
      "Dr Ngutshane works closely with referring practitioners to ensure seamless communication throughout the patient's surgical journey.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <div className="bg-[#0A1628] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-3">What We Offer</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white font-bold">
            Surgical Services
          </h1>
          <p className="text-slate-300 mt-4 text-lg max-w-2xl">
            Specialist cardiothoracic surgical care across Gauteng, delivered with precision
            and genuine commitment to each patient&apos;s outcome.
          </p>
        </div>
      </div>

      <HeartDivider />

      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {services.map((s, idx) => (
            <div
              key={s.title}
              className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-[#DDE3EE] overflow-hidden"
            >
              {/* Left number + icon */}
              <div className="bg-[#0A1628] p-8 flex flex-col justify-between">
                <div className="inline-flex p-3 bg-[#C9A84C]/10 rounded-sm mb-4 w-fit">
                  <s.icon size={24} className="text-[#C9A84C]" />
                </div>
                <span className="font-display text-5xl font-bold text-white/10 select-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              {/* Content */}
              <div className="lg:col-span-3 p-8">
                <h2 className="font-display text-2xl text-[#0A1628] font-bold mb-3">{s.title}</h2>
                <p className="text-[#6B7A99] text-sm leading-relaxed mb-5">{s.summary}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-[#0A1628]">
                      <span className="text-[#C9A84C] mt-1">›</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
