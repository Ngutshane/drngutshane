"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import toast from "react-hot-toast";
import HeartDivider from "@/components/ui/HeartDivider";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success("Message sent. We will respond within one business day.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again or call 083 261 7760.");
    }
  };

  return (
    <>
      <div className="bg-[#0A1628] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-3">Get in Touch</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white font-bold">Contact Us</h1>
          <p className="text-slate-300 mt-4 text-lg">
            For appointment enquiries, referrals, or general questions about our services.
          </p>
        </div>
      </div>

      <HeartDivider />

      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl text-[#0A1628] font-bold mb-6">
                Practice Information
              </h2>
            </div>

            {[
              {
                icon: MapPin,
                title: "Life Wilgeheuwel Hospital",
                lines: [
                  "Sessional Rooms",
                  "Amplifier Road, Radiokop Ext 13",
                  "Roodepoort, 1724",
                  "Tel: 011 796 6686",
                ],
              },
              {
                icon: MapPin,
                title: "Dr SK Matseke Memorial Hospital",
                lines: [
                  "Suite 5",
                  "23967 Chris Hani Road, Diepkloof Zone 6",
                  "Soweto, 2136",
                  "Tel: 011 933 5000",
                ],
              },
              {
                icon: MapPin,
                title: "Netcare Pinehaven Hospital",
                lines: [
                  "Sessional Rooms",
                  "1 Gateway Road, Pinehaven Estates",
                  "Krugersdorp, 1739",
                  "Tel: 011 950 5400",
                ],
              },
              {
                icon: Phone,
                title: "Bookings & General Enquiries",
                lines: ["083 261 7760 (Secretary)"],
              },
              {
                icon: Mail,
                title: "Email",
                lines: ["admin@drngutshane.com"],
              },
              {
                icon: Clock,
                title: "Consulting Hours",
                lines: ["Mon–Fri: 08:00–16:00", "Sat: 08:00–12:00", "Sun & Public Holidays: Closed"],
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="p-2.5 bg-[#0A1628] rounded-sm shrink-0">
                  <item.icon size={16} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A1628] mb-1">{item.title}</p>
                  {item.lines.map((l) => (
                    <p key={l} className="text-sm text-[#6B7A99]">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-[#F4F7FC] border border-[#DDE3EE] p-8 space-y-5">
              <h2 className="font-display text-2xl text-[#0A1628] font-bold mb-2">Send a Message</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-[#0A1628] mb-1.5 tracking-wide">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-[#DDE3EE] bg-white rounded-sm px-3 py-2.5 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0A1628] mb-1.5 tracking-wide">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-[#DDE3EE] bg-white rounded-sm px-3 py-2.5 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0A1628] mb-1.5 tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-[#DDE3EE] bg-white rounded-sm px-3 py-2.5 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0A1628] mb-1.5 tracking-wide">
                  Subject *
                </label>
                <select
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-[#DDE3EE] bg-white rounded-sm px-3 py-2.5 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition-colors"
                >
                  <option value="">Select a subject…</option>
                  <option>Appointment Enquiry</option>
                  <option>GP / Specialist Referral</option>
                  <option>General Enquiry</option>
                  <option>Billing</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#0A1628] mb-1.5 tracking-wide">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-[#DDE3EE] bg-white rounded-sm px-3 py-2.5 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
                />
              </div>
              <p className="text-xs text-[#6B7A99]">
                Your information is handled in accordance with POPIA. We will not share your
                details with third parties.
              </p>
              <button
                type="submit"
                className="w-full py-4 bg-[#0A1628] text-white font-semibold rounded-sm hover:bg-[#122040] transition-colors text-sm tracking-wide"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
