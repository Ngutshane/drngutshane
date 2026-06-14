"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A1628]/98 shadow-lg backdrop-blur-md"
          : "bg-[#0A1628]/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/logo-icon.png"
                alt="Dr B. Ngutshane Inc. logo"
                fill
                className="object-contain rounded-full"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-display text-base font-bold leading-tight group-hover:text-[#C9A84C] transition-colors">
                Dr B. Ngutshane
              </span>
              <span className="text-[#C9A84C] text-[10px] tracking-widest uppercase">
                Cardiothoracic Surgeon
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#C9A84C]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/appointments"
              className="ml-2 px-5 py-2 bg-[#C9A84C] text-[#0A1628] text-sm font-semibold rounded-sm hover:bg-[#E8C97A] transition-colors duration-200 tracking-wide"
            >
              Book Appointment
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#122040] border-t border-[#1e3060] px-4 pb-6 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm border-b border-[#1e3060] transition-colors ${
                pathname === link.href ? "text-[#C9A84C]" : "text-slate-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/appointments"
            onClick={() => setOpen(false)}
            className="block mt-4 text-center px-5 py-3 bg-[#C9A84C] text-[#0A1628] text-sm font-semibold rounded-sm"
          >
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  );
}
