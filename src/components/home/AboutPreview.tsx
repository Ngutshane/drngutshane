import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Fellowship-trained cardiothoracic surgeon",
  "Dual practices: Southrand & Westrand",
  "Collaborative care with referring GPs and cardiologists",
  "Patient-centred approach, clear communication",
];

export default function AboutPreview() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="relative h-110 sm:h-125 overflow-hidden bg-[#F4F7FC] rounded-sm">
              <Image
                src="/dr-ngutshane.jpg"
                alt="Dr B. Ngutshane – Cardiothoracic Surgeon"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-[#0A1628]/30 to-transparent pointer-events-none" />
            </div>

            {/* Practising Since badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#0A1628] text-white p-6 w-52 hidden sm:block shadow-xl">
              <p className="text-[#C9A84C] text-[9px] tracking-widest uppercase mb-1">
                Practising Since
              </p>
              <p className="font-display text-3xl font-bold">2009</p>
            </div>

            {/* Gold corner accent */}
            <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#C9A84C]" />
          </div>

          {/* Content */}
          <div>
            <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-3">
              Meet the Surgeon
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-[#0A1628] font-bold mb-6 leading-tight">
              Dr B. Ngutshane
            </h2>
            <p className="text-[#6B7A99] text-base leading-relaxed mb-6">
              Dr Ngutshane is a specialist cardiothoracic surgeon with extensive experience in
              the surgical management of cardiac and thoracic conditions. Committed to delivering
              world-class surgical outcomes within the South African context, Dr Ngutshane
              combines technical precision with genuine patient care.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-[#0A1628]">
                  <CheckCircle2 size={16} className="text-[#C9A84C] shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#0A1628] text-white text-sm font-medium rounded-sm hover:bg-[#122040] transition-colors"
            >
              Full Biography →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
