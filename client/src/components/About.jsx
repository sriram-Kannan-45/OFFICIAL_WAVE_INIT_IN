import { ShieldCheck, Cpu, Code2, Layers } from 'lucide-react'

const ABOUT_CARDS = [
  {
    num: '01',
    icon: Code2,
    title: 'Who We Are',
    body: 'Wave Init is an engineering-first product studio. We partner with founders, fast-moving teams, and forward-thinking businesses to design, engineer, and deploy high-performance software products.',
  },
  {
    num: '02',
    icon: Cpu,
    title: 'What We Build',
    body: 'Custom web platforms, intelligent LMS systems, generative AI assistants, internal operational dashboards, and real-time backend pipelines — engineered end-to-end to enterprise standards.',
  },
  {
    num: '03',
    icon: Layers,
    title: 'AI-First Mindset',
    body: 'Intelligence is woven directly into system architecture. From LLM reasoning pipelines to autonomous background tasks, we integrate applied AI where it drives genuine business leverage.',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-[100vh] flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="About Wave Init"
    >
      {/* Header */}
      <div className="max-w-3xl mb-14 bg-white/75 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 border border-green-200/80 text-xs font-semibold text-[#16a34a] uppercase tracking-wider mb-4">
          Who We Are
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          A Product Studio Built on{' '}
          <span className="text-[#16a34a]">Engineering Rigor</span> & Applied AI
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          We bridge the gap between high-level AI capabilities and battle-tested production software. Every solution is purpose-built, maintainable, and designed to scale seamlessly with your growth.
        </p>
      </div>

      {/* Grid of clean translucent cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {ABOUT_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.num}
              className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-green-400/60 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold font-mono tracking-widest text-slate-400 group-hover:text-[#16a34a] transition-colors">
                  {card.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200/60 flex items-center justify-center text-[#16a34a] group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-950 transition-colors">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {card.body}
              </p>
            </div>
          )
        })}
      </div>

      {/* Trust & Registration Badge */}
      <div className="mt-8 flex items-center justify-start">
        <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3.5 px-5 py-3.5 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200/70 flex items-center justify-center text-[#16a34a] flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-900 tracking-tight">
                Registered MSME Enterprise
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-[#15803d]">
                MSME Registered
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              Udyam Registration No.{' '}
              <span className="font-mono font-bold text-slate-800 tracking-wider">
                UDYAM-TN-20-0250320
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
