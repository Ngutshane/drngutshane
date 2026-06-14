import type { Metadata } from "next";
import { CheckCircle2, GraduationCap, Award, MapPin } from "lucide-react";
import HeartDivider from "@/components/ui/HeartDivider";
import BookingCTA from "@/components/home/BookingCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Dr B. Ngutshane — specialist cardiothoracic surgeon with sessional rooms at Life Wilgeheuwel, Dr SK Matseke Memorial, and Netcare Pinehaven hospitals in Gauteng.",
};

const credentials = [
  { icon: GraduationCap, text: "MBChB – University of the Witwatersrand" },
  { icon: GraduationCap, text: "FCS(SA) – Cardiothoracic Surgery" },
  { icon: Award, text: "HPCSA Registered Specialist" },
  { icon: Award, text: "Member, South African Thoracic Society" },
  { icon: MapPin, text: "Life Wilgeheuwel Hospital, Roodepoort" },
  { icon: MapPin, text: "Dr SK Matseke Memorial Hospital, Soweto" },
  { icon: MapPin, text: "Netcare Pinehaven Hospital, Krugersdorp" },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#0A1628] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase mb-3">About</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white font-bold">
            Dr B. Ngutshane
          </h1>
          <p className="text-slate-300 mt-4 text-lg">
            Cardiothoracic Surgeon · Gauteng, South Africa
          </p>
        </div>
      </div>

      <HeartDivider />

      {/* Bio */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-5 text-[#6B7A99] leading-relaxed">
            <p>
              Dr B. Ngutshane is a specialist cardiothoracic surgeon with more than fifteen years
              of experience in the surgical management of diseases of the heart, lungs, oesophagus,
              and major blood vessels within the chest. He brings a patient-centred philosophy to
              every consultation and surgical intervention.
            </p>
            <p>
              Trained at some of South Africa&apos;s leading academic institutions, Dr Ngutshane
              underwent his cardiothoracic fellowship training and has operated across both
              public and private healthcare settings in Gauteng. His sessional rooms at Life
              Wilgeheuwel Hospital, Dr SK Matseke Memorial Hospital, and Netcare Pinehaven
              Hospital make specialist surgical care accessible to a wide population across
              the province.
            </p>
            <p>
              Dr Ngutshane is committed to continuing medical education, staying abreast of
              advances in minimally invasive cardiac and thoracic techniques. He works closely
              with referring GPs, cardiologists, pulmonologists, and oncologists to ensure a
              seamless, coordinated care experience for every patient.
            </p>
            <p>
              Beyond the operating room, he maintains a professional blog sharing insights on
              cardiac and thoracic health — and a personal blog reflecting on medicine, life,
              and leadership.
            </p>
          </div>

          {/* Credentials */}
          <div className="bg-[#F4F7FC] border border-[#DDE3EE] p-7 h-fit">
            <h3 className="font-display text-xl text-[#0A1628] font-semibold mb-5">
              Qualifications
            </h3>
            <ul className="space-y-4">
              {credentials.map((c) => (
                <li key={c.text} className="flex items-start gap-3">
                  <c.icon size={16} className="text-[#C9A84C] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#6B7A99]">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <HeartDivider />

      {/* Practice Info */}
      <section className="bg-[#F4F7FC] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-[#0A1628] font-bold mb-8">
            Practice Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Life Wilgeheuwel Hospital",
                area: "Roodepoort, 1724",
                address: "Sessional Rooms, Amplifier Road, Radiokop Ext 13",
                tel: "011 796 6686",
              },
              {
                name: "Dr SK Matseke Memorial Hospital",
                area: "Diepkloof Zone 6, Soweto, 2136",
                address: "Suite 5, 23967 Chris Hani Road",
                tel: "011 933 5000",
              },
              {
                name: "Netcare Pinehaven Hospital",
                area: "Pinehaven Estates, Krugersdorp, 1739",
                address: "Sessional Rooms, 1 Gateway Road",
                tel: "011 950 5400",
              },
            ].map((p) => (
              <div key={p.name} className="bg-white border border-[#DDE3EE] p-7">
                <h3 className="font-display text-xl text-[#0A1628] font-semibold mb-1">
                  {p.name}
                </h3>
                <p className="text-[#C9A84C] text-xs tracking-wider uppercase mb-3">{p.area}</p>
                <ul className="space-y-1 text-sm text-[#6B7A99]">
                  <li>{p.address}</li>
                  <li className="mt-1 font-medium">Tel: {p.tel}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
