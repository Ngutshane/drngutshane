import DashboardNav from "@/components/dashboard/DashboardNav";

export default function DashboardAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F7FC]">
      <DashboardNav />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">{children}</div>
    </div>
  );
}
