import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment | Cardiothoracic Surgeon – Roodepoort, Soweto, Krugersdorp",
  description:
    "Book a consultation with Dr B. Ngutshane, specialist cardiac and thoracic surgeon in Gauteng. Available at Life Wilgeheuwel (Roodepoort), Dr SK Matseke Memorial (Soweto), and Netcare Pinehaven (Krugersdorp).",
  keywords: [
    "book cardiothoracic surgeon Gauteng",
    "heart surgeon appointment Johannesburg",
    "cardiac surgery consultation Roodepoort",
    "thoracic surgeon appointment Soweto",
    "heart surgeon appointment Krugersdorp",
    "online appointment cardiothoracic surgeon",
    "book specialist surgeon Gauteng",
  ],
  alternates: { canonical: "https://drngutshane.co.za/appointments" },
};

export default function AppointmentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
