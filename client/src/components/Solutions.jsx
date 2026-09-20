import { Layers, Database, ShieldCheck, Zap } from 'lucide-react'

const CAPABILITIES = [
  {
    icon: Zap,
    title: 'Sub-Second Latency Execution',
    desc: 'Optimized rendering cycles, lightweight bundles, and streaming server responses for immediate feedback.',
  },
  {
    icon: Database,
    title: 'High-Concurrency Data Pipelines',
    desc: 'Event-driven message queues, vector search indexes, and resilient storage built for heavy parallel loads.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-Grade Security',
    desc: 'Strict role-based access control (RBAC), end-to-end token encryption, and audited data isolation standards.',
  },
  {
    icon: Layers,
    title: 'Modular System Boundaries',
    desc: 'Clean microservice contracts and decoupled UI components that prevent tech debt and simplify future expansions.',
  },
]

export default function Solutions() {
  return (
    <section
      id="solutions"
      className="relative min-h-[90vh] flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Solutions & Capabilities"
    >
      <div className="max-w-3xl mb-14 bg-white/75 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 border border-green-200/80 text-xs font-semibold text-[#16a34a] uppercase tracking-wider mb-4">
          Core Capabilities
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Engineered for <span className="text-[#16a34a]">Extreme Scale</span> & Reliability
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          The software we ship is designed to handle demanding enterprise workloads without bottlenecks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CAPABILITIES.map((cap) => {
          const Icon = cap.icon
          return (
            <div
              key={cap.title}
              className="bg-white/80 backdrop-blur-md border border-slate-200/80 hover:border-green-400/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200/60 flex items-center justify-center text-[#16a34a] mb-5 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#16a34a] transition-colors">
                {cap.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {cap.desc}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
