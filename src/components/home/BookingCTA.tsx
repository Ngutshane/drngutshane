import Link from "next/link";
import { Calendar, FileText } from "lucide-react";

export default function BookingCTA() {
  return (
    <section className="relative bg-[#0A1628] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Full-width ECG strip at top */}
      <div className="absolute top-0 left-0 right-0 opacity-20 pointer-events-none">
        <svg width="100%" height="56" viewBox="0 0 1400 56" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline
            points="0,28 60,28 75,18 90,38 105,8 120,48 135,28 200,28 215,20 230,36 245,28 310,28 325,18 340,38 355,8 370,48 385,28 450,28 465,20 480,36 495,28 560,28 575,18 590,38 605,8 620,48 635,28 700,28 715,20 730,36 745,28 810,28 825,18 840,38 855,8 870,48 885,28 950,28 965,20 980,36 995,28 1060,28 1075,18 1090,38 1105,8 1120,48 1135,28 1200,28 1215,20 1230,36 1245,28 1310,28 1325,18 1340,38 1355,8 1370,48 1385,28 1400,28"
            stroke="#C9A84C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Faint heart+lungs anatomy in background */}
      <div className="absolute inset-0 flex items-center justify-end pr-8 lg:pr-24 opacity-[0.04] pointer-events-none select-none">
        <svg width="360" height="424" viewBox="0 0 220 258" fill="none" stroke="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M110,14 L110,50" strokeWidth="5.5" strokeLinecap="round"/>
          <path d="M110,50 L106,63" strokeWidth="4" strokeLinecap="round"/>
          <path d="M110,50 L114,63" strokeWidth="4" strokeLinecap="round"/>
          <path d="M106,63 C96,58 74,54 54,70 C30,90 20,128 22,168 C24,208 48,238 78,246 C97,252 108,242 108,218 L108,63 Z" strokeWidth="2.5"/>
          <path d="M96,88 C78,94 58,100 44,118" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M96,115 C82,120 66,124 54,140" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M114,63 C124,58 146,54 166,70 C190,90 200,128 198,168 C196,208 172,238 142,246 C123,252 112,242 112,218 L112,63 Z" strokeWidth="2.5"/>
          <path d="M124,88 C142,94 162,100 176,118" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M124,115 C138,120 154,124 166,140" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M124,138 C140,143 158,146 170,160" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M110,145 C98,128 75,130 75,152 C75,173 110,200 110,200 C110,200 145,173 145,152 C145,130 122,128 110,145 Z" strokeWidth="3.5"/>
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-4">
          Take the Next Step
        </p>
        <h2 className="font-display text-4xl sm:text-5xl text-white font-bold mb-6">
          Ready to Book a Consultation?
        </h2>
        <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
          Request an appointment online, complete your intake forms digitally,
          and let us take care of the rest.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/appointments"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0A1628] font-semibold rounded-sm hover:bg-[#E8C97A] transition-colors text-sm tracking-wide"
          >
            <Calendar size={16} />
            Book Appointment
          </Link>
          <Link
            href="/appointments#intake"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white rounded-sm hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors text-sm tracking-wide"
          >
            <FileText size={16} />
            Patient Intake Form
          </Link>
        </div>
        <p className="mt-8 text-xs text-slate-500">
          Referrals accepted from GPs, cardiologists, and specialist physicians. · POPIA compliant
        </p>
      </div>

      {/* Full-width ECG strip at bottom */}
      <div className="absolute bottom-0 left-0 right-0 opacity-15 pointer-events-none">
        <svg width="100%" height="40" viewBox="0 0 1400 40" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline
            points="0,20 80,20 92,12 104,28 116,4 128,36 140,20 220,20 232,14 244,26 256,20 340,20 352,12 364,28 376,4 388,36 400,20 480,20 492,14 504,26 516,20 600,20 612,12 624,28 636,4 648,36 660,20 740,20 752,14 764,26 776,20 860,20 872,12 884,28 896,4 908,36 920,20 1000,20 1012,14 1024,26 1036,20 1120,20 1132,12 1144,28 1156,4 1168,36 1180,20 1260,20 1272,14 1284,26 1296,20 1400,20"
            stroke="#C9A84C"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
