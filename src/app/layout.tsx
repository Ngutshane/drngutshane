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
    "cardiothoracic surgeon Johannesburg",
    "cardiothoracic surgeon Roodepoort",
    "cardiothoracic surgeon Randburg",
    "cardiothoracic surgeon Soweto",
    "cardiothoracic surgeon Krugersdorp",
    "cardiothoracic surgeon South Africa",
    "cardiac surgeon Johannesburg",
    "cardiac surgeon Gauteng",
    "cardiac surgeon Roodepoort",
    "cardiac surgeon Randburg",
    "cardiac surgeon Soweto",
    "cardiac surgeon Krugersdorp",
    "heart surgeon Johannesburg",
    "heart surgeon Gauteng",
    "heart surgeon Roodepoort",
    "heart surgeon Randburg",
    "thoracic surgeon Johannesburg",
    "thoracic surgeon Gauteng",
    "lung surgeon Johannesburg",
    "lung surgeon Gauteng",
    "cardiac surgery Johannesburg",
    "cardiac surgery Soweto",
    "cardiac surgery Roodepoort",
    "cardiac surgery Krugersdorp",
    "thoracic surgery Gauteng",
    "thoracic surgery Johannesburg",
    "Life Wilgeheuwel Hospital surgeon",
    "Dr SK Matseke Memorial Hospital surgeon",
    "Netcare Pinehaven Hospital surgeon",
    "CABG South Africa",
    "heart valve surgery Gauteng",
    "lung surgery Gauteng",
    "private cardiothoracic surgeon Gauteng",
    "specialist heart surgeon Johannesburg",
    "cardiothoracic surgeon near me",
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
              "@graph": [
                {
                  "@type": "Physician",
                  "@id": `${SITE_URL}/#physician`,
                  name: "Dr B. Ngutshane",
                  url: SITE_URL,
                  telephone: "+27832617760",
                  email: "admin@drngutshane.com",
                  image: `${SITE_URL}/dr-ngutshane.jpg`,
                  description:
                    "Dr B. Ngutshane is a specialist cardiothoracic (cardiac and thoracic) surgeon with sessional rooms at Life Wilgeheuwel Hospital in Roodepoort, Dr SK Matseke Memorial Hospital in Soweto, and Netcare Pinehaven Hospital in Krugersdorp, serving patients across Johannesburg, Randburg, Westrand, and Gauteng.",
                  medicalSpecialty: ["Cardiovascular Surgery", "Thoracic Surgery"],
                  knowsAbout: [
                    "Coronary Artery Bypass Grafting (CABG)",
                    "Heart Valve Repair and Replacement",
                    "Lung Resection and Lobectomy",
                    "Video-Assisted Thoracoscopic Surgery (VATS)",
                    "Minimally Invasive Cardiac Surgery",
                    "Pericardial Procedures",
                    "Mediastinal Tumour Resection",
                    "Pleural Effusion Management",
                  ],
                  hasCredential: [
                    { "@type": "EducationalOccupationalCredential", credentialCategory: "MBChB – University of the Witwatersrand" },
                    { "@type": "EducationalOccupationalCredential", credentialCategory: "FCS(SA) Cardiothoracic Surgery" },
                    { "@type": "EducationalOccupationalCredential", credentialCategory: "HPCSA Registered Specialist" },
                  ],
                  areaServed: [
                    { "@type": "City", name: "Johannesburg", containedInPlace: { "@type": "State", name: "Gauteng" } },
                    { "@type": "City", name: "Roodepoort", containedInPlace: { "@type": "State", name: "Gauteng" } },
                    { "@type": "City", name: "Randburg", containedInPlace: { "@type": "State", name: "Gauteng" } },
                    { "@type": "City", name: "Soweto", containedInPlace: { "@type": "State", name: "Gauteng" } },
                    { "@type": "City", name: "Krugersdorp", containedInPlace: { "@type": "State", name: "Gauteng" } },
                    { "@type": "City", name: "Pinehaven", containedInPlace: { "@type": "State", name: "Gauteng" } },
                    { "@type": "State", name: "Gauteng", containedInPlace: { "@type": "Country", name: "South Africa" } },
                  ],
                  workLocation: [
                    { "@id": `${SITE_URL}/#location-roodepoort` },
                    { "@id": `${SITE_URL}/#location-soweto` },
                    { "@id": `${SITE_URL}/#location-krugersdorp` },
                  ],
                },
                {
                  "@type": "MedicalBusiness",
                  "@id": `${SITE_URL}/#location-roodepoort`,
                  name: "Dr B. Ngutshane – Life Wilgeheuwel Hospital (Roodepoort)",
                  url: SITE_URL,
                  telephone: "+27117966686",
                  medicalSpecialty: "Cardiovascular Surgery",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Amplifier Road, Radiokop Ext 13",
                    addressLocality: "Roodepoort",
                    addressRegion: "Gauteng",
                    postalCode: "1724",
                    addressCountry: "ZA",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: -26.0764,
                    longitude: 27.8725,
                  },
                  openingHours: ["Mo-Fr 08:00-16:00", "Sa 08:00-12:00"],
                  openingHoursSpecification: [
                    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday"], opens: "08:00", closes: "16:00" },
                  ],
                  physician: { "@id": `${SITE_URL}/#physician` },
                },
                {
                  "@type": "MedicalBusiness",
                  "@id": `${SITE_URL}/#location-soweto`,
                  name: "Dr B. Ngutshane – Dr SK Matseke Memorial Hospital (Soweto)",
                  url: SITE_URL,
                  telephone: "+27119335000",
                  medicalSpecialty: "Cardiovascular Surgery",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "23967 Chris Hani Road, Diepkloof Zone 6",
                    addressLocality: "Soweto",
                    addressRegion: "Gauteng",
                    postalCode: "2136",
                    addressCountry: "ZA",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: -26.2463,
                    longitude: 27.8934,
                  },
                  openingHours: ["Mo-Fr 08:00-16:00", "Sa 08:00-12:00"],
                  openingHoursSpecification: [
                    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Wednesday"], opens: "08:00", closes: "16:00" },
                  ],
                  physician: { "@id": `${SITE_URL}/#physician` },
                },
                {
                  "@type": "MedicalBusiness",
                  "@id": `${SITE_URL}/#location-krugersdorp`,
                  name: "Dr B. Ngutshane – Netcare Pinehaven Hospital (Krugersdorp)",
                  url: SITE_URL,
                  telephone: "+27119505400",
                  medicalSpecialty: "Cardiovascular Surgery",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "1 Gateway Road, Pinehaven Estates",
                    addressLocality: "Krugersdorp",
                    addressRegion: "Gauteng",
                    postalCode: "1739",
                    addressCountry: "ZA",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: -26.0825,
                    longitude: 27.7829,
                  },
                  openingHours: ["Mo-Fr 08:00-16:00", "Sa 08:00-12:00"],
                  openingHoursSpecification: [
                    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday"], opens: "08:00", closes: "16:00" },
                  ],
                  physician: { "@id": `${SITE_URL}/#physician` },
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What is a cardiothoracic surgeon?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "A cardiothoracic surgeon is a specialist surgeon who performs operations on the heart, lungs, and chest (thorax). This includes procedures such as coronary artery bypass grafting (CABG), heart valve repair or replacement, lung resection for cancer, and other cardiac and thoracic surgeries.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Where does Dr Ngutshane see patients in Gauteng?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Dr B. Ngutshane has sessional consulting rooms at three hospitals in Gauteng: Life Wilgeheuwel Hospital in Roodepoort (Fridays), Dr SK Matseke Memorial Hospital in Soweto (Wednesdays), and Netcare Pinehaven Hospital in Krugersdorp (Tuesdays). He serves patients from Johannesburg, Randburg, Roodepoort, Soweto, Krugersdorp, Pinehaven, and the broader West Rand.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How do I book an appointment with a cardiothoracic surgeon in Johannesburg?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "You can book an appointment with Dr B. Ngutshane online through this website, or call the practice secretary on 083 261 7760. A referral letter from your GP or specialist is recommended for your first visit.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Does Dr Ngutshane accept medical aid?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, Dr Ngutshane accepts most major South African medical aids. Please contact the practice on 083 261 7760 or admin@drngutshane.com to confirm your specific medical aid scheme before your appointment.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What heart and lung conditions does Dr Ngutshane treat?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Dr Ngutshane treats a wide range of cardiac and thoracic conditions including coronary artery disease (requiring bypass surgery), heart valve disease, lung cancer, pleural effusions, mediastinal tumours, and chest wall conditions. He performs both open-heart surgery and minimally invasive procedures including VATS (Video-Assisted Thoracoscopic Surgery).",
                      },
                    },
                  ],
                },
              ],
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
