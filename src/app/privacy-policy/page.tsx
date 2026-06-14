import type { Metadata } from "next";
import HeartDivider from "@/components/ui/HeartDivider";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Dr B. Ngutshane Inc. Privacy Policy — POPIA compliant data handling.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="bg-[#0A1628] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-3">Legal</p>
          <h1 className="font-display text-5xl text-white font-bold">Privacy Policy</h1>
          <p className="text-slate-400 mt-3 text-sm">Last updated: June 2025</p>
        </div>
      </div>
      <HeartDivider />
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-2xl text-[#0A1628] font-bold mb-3">{s.heading}</h2>
              <p className="text-[#6B7A99] text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const sections = [
  {
    heading: "1. Who We Are",
    body: "Dr B. Ngutshane Inc. (\"the Practice\") is the responsible party for all personal information collected through this website and our patient intake processes. Our Information Officer can be contacted at info@drngutshane.co.za.",
  },
  {
    heading: "2. Information We Collect",
    body: "We collect personal information you provide when booking appointments or completing intake forms, including your name, contact details, identity number, medical aid information, and clinical history. We also collect non-personal usage data through analytics tools to improve our website.",
  },
  {
    heading: "3. Legal Basis for Processing",
    body: "We process your personal information on the basis of your explicit consent (provided during intake), the performance of a healthcare contract, and our legitimate interest in providing safe, coordinated surgical care. We process special personal information (health data) solely for the provision of medical services.",
  },
  {
    heading: "4. How We Use Your Information",
    body: "Your information is used to schedule and manage appointments, provide surgical and clinical care, communicate with referring healthcare providers, issue accounts to medical aids or insurers, and comply with our legal and professional obligations as registered healthcare practitioners.",
  },
  {
    heading: "5. Data Security",
    body: "All personal and health information is encrypted at rest using AES-256 encryption and in transit using TLS 1.2 or higher. Our systems are hosted within South Africa (AWS Johannesburg region) to ensure data sovereignty. We maintain daily automated backups and deploy a Web Application Firewall (WAF) for additional protection.",
  },
  {
    heading: "6. Retention",
    body: "We retain patient records for a minimum of six years after the last consultation, or longer where required by the Health Professions Act or other applicable legislation. You may request early deletion of non-clinical data at any time.",
  },
  {
    heading: "7. Sharing of Information",
    body: "We do not sell or rent your personal information. We share information only with: affiliated hospitals for surgical planning, medical aids for authorisation and billing, other treating clinicians with your consent, and regulatory bodies as required by law.",
  },
  {
    heading: "8. Your Rights (POPIA)",
    body: "Under the Protection of Personal Information Act 4 of 2013 you have the right to access your personal information held by us, request correction of inaccurate information, object to processing, request deletion where legally permissible, and lodge a complaint with the Information Regulator of South Africa.",
  },
  {
    heading: "9. Cookies & Analytics",
    body: "Our website uses Google Analytics to understand aggregate usage patterns. No personal health information is shared with analytics services. You may opt out of analytics tracking via your browser settings.",
  },
  {
    heading: "10. Contact & Complaints",
    body: "For any privacy-related queries, contact our Information Officer at info@drngutshane.co.za. You may also contact the Information Regulator at www.inforegulator.org.za.",
  },
];
