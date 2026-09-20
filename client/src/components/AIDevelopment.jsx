import { FileText, Cpu, Code, ShieldAlert, Sparkles, Send, Check } from 'lucide-react'

const VIBE_WORKFLOW = [
  {
    step: '01',
    name: 'Requirement',
    icon: FileText,
    desc: 'We define strict system contracts, architectural boundaries, and business logic before any generation occurs.',
  },
  {
    step: '02',
    name: 'AI Planning',
    icon: Cpu,
    desc: 'AI systems assist with schema modeling, API contract drafting, and workflow dependency planning.',
  },
  {
    step: '03',
    name: 'Build',
    icon: Code,
    desc: 'Senior developers steer modern AI-assisted tooling to synthesize features at 5x speed without technical debt.',
  },
  {
    step: '04',
    name: 'Validate',
    icon: ShieldAlert,
    desc: 'Every single line of code is verified with strict type-checking, automated unit tests, and security audits.',
  },
  {
    step: '05',
    name: 'Refine',
    icon: Sparkles,
    desc: 'Human engineers debug subtle edge cases, optimize render cycles, and ensure rock-solid reliability.',
  },
  {
    step: '06',
    name: 'Deliver',
    icon: Send,
    desc: 'Zero-downtime CI/CD deployment, cloud telemetry setup, and documentation for smooth handover.',
  },
]

export default function AIDevelopment() {
  return (
    <section
      id="ai-dev"
      className="relative min-h-[110vh] flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="AI and Vibe Coding Development"
    >
      {/* Section Header */}
      <div className="max-w-3xl mb-14 bg-white/75 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 border border-green-200/80 text-xs font-semibold text-[#16a34a] uppercase tracking-wider mb-4">
          Modern Engineering Workflows
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          AI-Assisted Development &{' '}
          <span className="text-[#16a34a]">Vibe Coding</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          AI doesn’t write software blindly — experienced engineers steer the process. We use modern AI-assisted development and vibe coding workflows to dramatically compress development cycles while maintaining uncompromising software quality.
        </p>
      </div>

      {/* Horizontal / Grid Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-12">
        {VIBE_WORKFLOW.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={item.name}
              className="relative bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-green-400/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#16a34a] transition-colors">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-200/60 flex items-center justify-center text-[#16a34a]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Progress Connector Indicator */}
              {idx < VIBE_WORKFLOW.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-300 font-mono text-xs">
                  →
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Trust Callout Panel */}
      <div className="bg-gradient-to-r from-white/90 via-green-50/50 to-white/90 backdrop-blur-md border border-green-200/60 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="max-w-2xl">
          <h4 className="text-lg font-bold text-slate-900 mb-1">
            Speed Without Fragility
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            By combining AI velocity with human architectural validation, Wave Init eliminates the traditional tradeoff between fast shipping and reliable production code.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#16a34a] bg-white px-4 py-2 rounded-xl border border-green-200 shadow-xs flex-shrink-0">
          <Check className="w-4 h-4 text-[#16a34a]" />
          100% Code Validation & Review
        </div>
      </div>
    </section>
  )
}
