import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Book a Cardiothoracic Consultation in Gauteng",
  description:
    "Contact Dr B. Ngutshane, specialist cardiothoracic surgeon in Gauteng. Consulting rooms in Roodepoort, Soweto, and Krugersdorp. Call 083 261 7760 or send a message online.",
  keywords: [
    "contact cardiothoracic surgeon Johannesburg",
    "book heart surgeon Gauteng",
    "cardiac surgeon consultation Roodepoort",
    "thoracic surgeon appointment Soweto",
    "heart surgeon contact Krugersdorp",
    "cardiothoracic surgeon phone number Gauteng",
  ],
  alternates: { canonical: "https://drngutshane.co.za/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
