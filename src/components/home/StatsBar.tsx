const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "2", label: "Practice Locations" },
  { value: "HPCSA", label: "Registered Specialist" },
  { value: "FC Cardio", label: "Fellowship Trained" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#122040] border-y border-[#1e3060]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center text-center px-4 ${
                i < stats.length - 1 ? "md:border-r md:border-[#1e3060]" : ""
              }`}
            >
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#C9A84C]">
                {s.value}
              </span>
              <span className="text-slate-400 text-xs tracking-wider uppercase mt-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
