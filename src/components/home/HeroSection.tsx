"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Award, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0A1628] flex items-center overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gold vertical accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-[#C9A84C] to-transparent" />

      {/* Right side radial glow behind photo */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_center,#122040_0%,transparent_70%)] opacity-60 pointer-events-none" />

      {/* Anatomical heart + lungs watermark — full section background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.055] pointer-events-none select-none">
        <svg width="520" height="610" viewBox="0 0 220 258" fill="none" stroke="white" xmlns="http://www.w3.org/2000/svg">
          {/* Trachea */}
          <path d="M110,14 L110,50" strokeWidth="5.5" strokeLinecap="round"/>
          {/* Left bronchus */}
          <path d="M110,50 L106,63" strokeWidth="4" strokeLinecap="round"/>
          {/* Right bronchus */}
          <path d="M110,50 L114,63" strokeWidth="4" strokeLinecap="round"/>
          {/* Left lung */}
          <path d="M106,63 C96,58 74,54 54,70 C30,90 20,128 22,168 C24,208 48,238 78,246 C97,252 108,242 108,218 L108,63 Z" strokeWidth="2.5" fill="none"/>
          {/* Left lung secondary bronchi */}
          <path d="M96,88 C78,94 58,100 44,118" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M96,115 C82,120 66,124 54,140" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Right lung */}
          <path d="M114,63 C124,58 146,54 166,70 C190,90 200,128 198,168 C196,208 172,238 142,246 C123,252 112,242 112,218 L112,63 Z" strokeWidth="2.5" fill="none"/>
          {/* Right lung secondary bronchi */}
          <path d="M124,88 C142,94 162,100 176,118" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M124,115 C138,120 154,124 166,140" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M124,138 C140,143 158,146 170,160" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Heart */}
          <path d="M110,145 C98,128 75,130 75,152 C75,173 110,200 110,200 C110,200 145,173 145,152 C145,130 122,128 110,145 Z" strokeWidth="3.5" fill="none"/>
          {/* Surgical crosshair over heart */}
          <circle cx="110" cy="168" r="20" strokeWidth="1" strokeDasharray="3 3" opacity="0.7"/>
          <line x1="110" y1="155" x2="110" y2="150" strokeWidth="1" strokeLinecap="round"/>
          <line x1="110" y1="181" x2="110" y2="186" strokeWidth="1" strokeLinecap="round"/>
          <line x1="97" y1="168" x2="92" y2="168" strokeWidth="1" strokeLinecap="round"/>
          <line x1="123" y1="168" x2="128" y2="168" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left — Text content */}
          <div className="order-2 lg:order-1">
            <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-5 font-medium">
              Cardiothoracic Surgery · Gauteng, South Africa
            </p>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[64px] font-bold text-white leading-[1.06] mb-6">
              Cardiac Care <br />
              <span className="text-[#C9A84C]">with Precision</span>
              <br className="hidden sm:block" /> and Purpose.
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
              Dr B. Ngutshane is a specialist cardiothoracic surgeon delivering
              expert cardiac and thoracic surgical care across Southrand and
              Westrand, Gauteng.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Shield size={13} className="text-[#C9A84C]" />
                <span>HPCSA Registered</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <Award size={13} className="text-[#C9A84C]" />
                <span>FC Cardio (SA) Fellowship</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <MapPin size={13} className="text-[#C9A84C]" />
                <span>Southrand &amp; Westrand</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/appointments"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0A1628] font-semibold rounded-sm hover:bg-[#E8C97A] transition-colors duration-200 text-sm tracking-wide"
              >
                Book a Consultation
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white rounded-sm hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors duration-200 text-sm tracking-wide"
              >
                Our Services
              </Link>
            </div>

            {/* ECG line */}
            <div className="mt-14 opacity-25">
              <svg width="320" height="50" viewBox="0 0 320 50" fill="none">
                <polyline
                  points="0,25 30,25 42,8 54,42 66,4 78,46 90,25 130,25 142,18 154,32 166,25 320,25"
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Right — Photo */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute -inset-3 border border-[#C9A84C]/20 rounded-sm pointer-events-none" />
              {/* Gold corner accents */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C]" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#C9A84C]" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#C9A84C]" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C]" />

              {/* Photo */}
              <div className="relative w-75 sm:w-90 lg:w-100 h-95 sm:h-110 lg:h-125 overflow-hidden bg-[#122040]">
                <Image
                  src="/dr-ngutshane.jpg"
                  alt="Dr B. Ngutshane – Cardiothoracic Surgeon"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 400px"
                  priority
                  loading="eager"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-linear-to-t from-[#0A1628]/60 to-transparent" />
              </div>

              {/* Practice logo badge — overlapping bottom-right */}
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full p-1.5 shadow-2xl border-2 border-[#C9A84C]/40">
                <div className="relative w-full h-full">
                  <Image
                    src="/practice-logo.png"
                    alt="Dr B. Ngutshane Inc. practice seal"
                    fill
                    className="object-contain rounded-full"
                    sizes="112px"
                  />
                </div>
              </div>

              {/* Experience badge — overlapping top-left */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 bg-[#0A1628] border border-[#C9A84C]/40 px-4 py-3 shadow-xl">
                <p className="text-[#C9A84C] text-[9px] tracking-[0.2em] uppercase mb-0.5">
                  Practising Since
                </p>
                <p className="font-display text-2xl font-bold text-white leading-none">
                  2009
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
