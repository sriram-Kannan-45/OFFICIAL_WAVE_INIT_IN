const DEFAULT_PHASES = [
  { num: '01', label: 'IDEA' },
  { num: '02', label: 'CONNECT' },
  { num: '03', label: 'BUILD' },
  { num: '04', label: 'SCALE' },
  { num: '05', label: 'TRANSFORM' },
];

export default function StoryProgress({ scrollProgress, phases = DEFAULT_PHASES }) {
  const activePhase = Math.min(Math.floor(scrollProgress * phases.length), phases.length - 1);

  return (
    <div
      className="hidden lg:flex flex-col items-center gap-3 absolute right-8 top-1/2 -translate-y-1/2 z-[30]"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {phases.map((phase, i) => (
        <div key={phase.num} className="flex items-center gap-3">
          <span
            className={`text-[10px] font-mono font-semibold transition-all duration-300 ${
              i <= activePhase
                ? 'text-emerald-700 opacity-100 font-bold'
                : 'text-slate-400 opacity-40'
            }`}
          >
            {phase.num}
          </span>
          <span
            className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
              i <= activePhase
                ? 'text-emerald-700 opacity-100 font-bold'
                : 'text-slate-400 opacity-40'
            }`}
          >
            {phase.label}
          </span>
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activePhase
                ? 'bg-emerald-600 ring-4 ring-emerald-100 scale-125'
                : i < activePhase
                ? 'bg-emerald-500'
                : 'bg-slate-200'
            }`}
          />
        </div>
      ))}

      <div className="mt-4 w-0.5 h-12 bg-gradient-to-b from-emerald-500/60 to-transparent rounded-full" />
    </div>
  );
}
