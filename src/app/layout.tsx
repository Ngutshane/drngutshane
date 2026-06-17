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

const SITE_URL = "https://drngutshane.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dr B. Ngutshane | Cardiothoracic Surgeon – Gauteng",
    template: "%s | Dr B. Ngutshane – Cardiothoracic Surgeon",
  },
  description:
    "Dr B. Ngutshane is a specialist cardiothoracic surgeon in Gauteng, South Africa. Sessional rooms at Life Wilgeheuwel Hospital (Roodepoort), Dr SK Matseke Memorial Hospital (Soweto), and Netcare Pinehaven Hospital (Krugersdorp). Book an appointment online.",
  keywords: [
    "Dr Ngutshane",
    "Dr B Ngutshane",
    "cardiothoracic surgeon Gauteng",
    "cardiothoracic surgeon South Africa",
    "heart surgeon Gauteng",
    "cardiac surgery Soweto",
    "cardiac surgery Roodepoort",
    "cardiac surgery Krugersdorp",
    "thoracic surgery Gauteng",
    "Life Wilgeheuwel Hospital surgeon",
    "Dr SK Matseke Memorial Hospital surgeon",
    "Netcare Pinehaven Hospital surgeon",
    "CABG South Africa",
    "heart valve surgery Gauteng",
    "lung surgery Gauteng",
  ],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: "Dr B. Ngutshane – Cardiothoracic Surgeon",
    title: "Dr B. Ngutshane | Cardiothoracic Surgeon – Gauteng",
    description:
      "Specialist cardiac and thoracic surgical care across Gauteng. Sessional rooms at Life Wilgeheuwel, Dr SK Matseke Memorial, and Netcare Pinehaven hospitals.",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  verification: { google: "google1eeec268f533bdb0" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              name: "Dr B. Ngutshane",
              url: SITE_URL,
              telephone: "+27832617760",
              email: "admin@drngutshane.com",
              description:
                "Specialist cardiothoracic surgeon with sessional rooms across Gauteng, South Africa.",
              medicalSpecialty: [
                "Cardiovascular Surgery",
                "Thoracic Surgery",
              ],
              knowsAbout: [
                "Coronary Artery Bypass Grafting",
                "Heart Valve Surgery",
                "Lung Resection",
                "Video-Assisted Thoracoscopic Surgery",
                "Minimally Invasive Cardiac Surgery",
              ],
              hasCredential: [
                { "@type": "EducationalOccupationalCredential", credentialCategory: "MBChB – University of the Witwatersrand" },
                { "@type": "EducationalOccupationalCredential", credentialCategory: "FCS(SA) Cardiothoracic Surgery" },
                { "@type": "EducationalOccupationalCredential", credentialCategory: "HPCSA Registered Specialist" },
              ],
              workLocation: [
                {
                  "@type": "Hospital",
                  name: "Life Wilgeheuwel Hospital",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Amplifier Road, Radiokop Ext 13",
                    addressLocality: "Roodepoort",
                    postalCode: "1724",
                    addressCountry: "ZA",
                  },
                  telephone: "+27117966686",
                },
                {
                  "@type": "Hospital",
                  name: "Dr SK Matseke Memorial Hospital",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "23967 Chris Hani Road, Diepkloof Zone 6",
                    addressLocality: "Soweto",
                    postalCode: "2136",
                    addressCountry: "ZA",
                  },
                  telephone: "+27119335000",
                },
                {
                  "@type": "Hospital",
                  name: "Netcare Pinehaven Hospital",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "1 Gateway Road, Pinehaven Estates",
                    addressLocality: "Krugersdorp",
                    postalCode: "1739",
                    addressCountry: "ZA",
                  },
                  telephone: "+27119505400",
                },
              ],
              areaServed: {
                "@type": "State",
                name: "Gauteng",
                containedInPlace: { "@type": "Country", name: "South Africa" },
              },
              sameAs: [SITE_URL],
            }),
          }}
        />
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
