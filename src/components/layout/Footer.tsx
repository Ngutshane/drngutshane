import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1628] text-slate-300">
      {/* Signature heart divider */}
      <div className="flex justify-center py-6 opacity-30">
        <svg width="280" height="24" viewBox="0 0 280 24" fill="none">
          <line x1="0" y1="12" x2="110" y2="12" stroke="#C9A84C" strokeWidth="1" />
          <path d="M120 12 L126 4 L132 18 L138 2 L144 22 L150 8 L156 12 L160 12"
            stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="170" y1="12" x2="280" y2="12" stroke="#C9A84C" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-white font-display text-xl font-bold mb-1">Dr B. Ngutshane</h3>
            <p className="text-[#C9A84C] text-xs tracking-widest uppercase mb-4">
              Cardiothoracic Surgeon
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              Specialist cardiac and thoracic surgical care across Gauteng, with practices
              in Southrand and Westrand.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/appointments", label: "Book Appointment" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy-policy", label: "Privacy Policy" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 hover:text-[#C9A84C] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
                <span>Southrand & Westrand, Gauteng, South Africa</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#C9A84C] shrink-0" />
                <a href="tel:+27110000000" className="hover:text-white transition-colors">
                  +27 11 000 0000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#C9A84C] shrink-0" />
                <a
                  href="mailto:info@drngutshane.co.za"
                  className="hover:text-white transition-colors"
                >
                  info@drngutshane.co.za
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
              Consulting Hours
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
                <div>
                  <p>Mon – Fri: 08:00 – 16:00</p>
                  <p>Sat: 08:00 – 12:00</p>
                  <p>Sun & Public Holidays: Closed</p>
                </div>
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              Emergency surgical enquiries are handled through affiliated hospitals.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#1e3060] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© {year} Dr B. Ngutshane Inc. All rights reserved.</p>
          <p>
            Registered with HPCSA · POPIA compliant · Hosted in South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
