import Link from "next/link";
import { Heart, Wind, Activity, Stethoscope } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Cardiac Surgery",
    description:
      "Comprehensive open-heart procedures including coronary artery bypass grafting (CABG), valve repair and replacement, and heart failure surgery.",
  },
  {
    icon: Wind,
    title: "Thoracic Surgery",
    description:
      "Expert management of lung conditions including resections for cancer, mediastinal tumours, pleural disease, and chest wall disorders.",
  },
  {
    icon: Activity,
    title: "Minimally Invasive",
    description:
      "Where clinically appropriate, video-assisted thoracoscopic surgery (VATS) to reduce recovery time and post-operative discomfort.",
  },
  {
    icon: Stethoscope,
    title: "Surgical Consultations",
    description:
      "Thorough pre-operative assessment, risk stratification, and referral coordination with your GP, cardiologist, or pulmonologist.",
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative bg-[#F4F7FC] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Lung silhouette watermark */}
      <div className="absolute bottom-0 right-0 opacity-[0.045] pointer-events-none select-none translate-x-16 translate-y-8">
        <svg width="420" height="500" viewBox="0 0 220 258" fill="none" stroke="#0A1628" xmlns="http://www.w3.org/2000/svg">
          {/* Trachea */}
          <path d="M110,14 L110,50" strokeWidth="5.5" strokeLinecap="round"/>
          {/* Left bronchus */}
          <path d="M110,50 L106,63" strokeWidth="4" strokeLinecap="round"/>
          {/* Right bronchus */}
          <path d="M110,50 L114,63" strokeWidth="4" strokeLinecap="round"/>
          {/* Left lung */}
          <path d="M106,63 C96,58 74,54 54,70 C30,90 20,128 22,168 C24,208 48,238 78,246 C97,252 108,242 108,218 L108,63 Z" strokeWidth="2.5" fill="#0A1628" fillOpacity="0.35"/>
          <path d="M96,88 C78,94 58,100 44,118" strokeWidth="1.5" strokeLinecap="round" stroke="#F4F7FC" opacity="0.5"/>
          <path d="M96,115 C82,120 66,124 54,140" strokeWidth="1.5" strokeLinecap="round" stroke="#F4F7FC" opacity="0.5"/>
          {/* Right lung */}
          <path d="M114,63 C124,58 146,54 166,70 C190,90 200,128 198,168 C196,208 172,238 142,246 C123,252 112,242 112,218 L112,63 Z" strokeWidth="2.5" fill="#0A1628" fillOpacity="0.35"/>
          <path d="M124,88 C142,94 162,100 176,118" strokeWidth="1.5" strokeLinecap="round" stroke="#F4F7FC" opacity="0.5"/>
          <path d="M124,115 C138,120 154,124 166,140" strokeWidth="1.5" strokeLinecap="round" stroke="#F4F7FC" opacity="0.5"/>
          <path d="M124,138 C140,143 158,146 170,160" strokeWidth="1.5" strokeLinecap="round" stroke="#F4F7FC" opacity="0.5"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-3">
            What We Offer
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-[#0A1628] font-bold">
            Surgical Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white p-8 border border-[#DDE3EE] hover:border-[#C9A84C] hover:shadow-md transition-all duration-300 group"
            >
              <div className="mb-5">
                <div className="inline-flex p-3 bg-[#0A1628] group-hover:bg-[#C9A84C] transition-colors duration-300 rounded-sm">
                  <s.icon size={22} className="text-[#C9A84C] group-hover:text-[#0A1628] transition-colors duration-300" />
                </div>
              </div>
              <h3 className="font-display text-xl text-[#0A1628] font-semibold mb-3">
                {s.title}
              </h3>
              <p className="text-[#6B7A99] text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#0A1628] border-b border-[#C9A84C] pb-0.5 text-sm font-medium hover:text-[#C9A84C] transition-colors"
          >
            View all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
