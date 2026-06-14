import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dr B. Ngutshane Inc. | Cardiothoracic Surgeon – Gauteng",
    template: "%s | Dr B. Ngutshane Inc.",
  },
  description:
    "Dr B. Ngutshane is a specialist cardiothoracic surgeon with sessional rooms at Life Wilgeheuwel Hospital (Roodepoort), Dr SK Matseke Memorial Hospital (Soweto), and Netcare Pinehaven Hospital (Krugersdorp). Book an appointment online.",
  keywords: [
    "cardiothoracic surgeon",
    "heart surgeon",
    "thoracic surgery",
    "Gauteng surgeon",
    "Life Wilgeheuwel Hospital",
    "Dr SK Matseke Memorial Hospital",
    "Netcare Pinehaven Hospital",
    "Roodepoort",
    "Soweto",
    "Krugersdorp",
    "cardiac surgery South Africa",
  ],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Dr B. Ngutshane Inc.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0A1628",
              color: "#fff",
              border: "1px solid #C9A84C",
            },
          }}
        />
      </body>
    </html>
  );
}
