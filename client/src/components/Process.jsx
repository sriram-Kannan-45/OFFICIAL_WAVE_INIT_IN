import { Compass, GitBranch, Terminal, Cpu, CheckSquare, Cloud } from 'lucide-react'

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Understand',
    icon: Compass,
    desc: 'We analyze your business objectives, user workflows, and performance requirements to define clear technical scope.',
  },
  {
    step: '02',
    title: 'Architecture & Plan',
    icon: GitBranch,
    desc: 'System boundaries, data models, and API interfaces are designed for scalability and minimal complexity.',
  },
  {
    step: '03',
    title: 'Build & Iterate',
    icon: Terminal,
    desc: 'Production-ready code engineered in tight sprints. You test real, working software early and often.',
  },
  {
    step: '04',
    title: 'Integrate AI',
    icon: Cpu,
    desc: 'Seamless integration of LLMs, vector search, embeddings, or automation logic into the application layer.',
  },
  {
    step: '05',
    title: 'Test & Refine',
    icon: CheckSquare,
    desc: 'Rigorous end-to-end testing across devices, network conditions, and concurrent loads before launch.',
  },
  {
    step: '06',
    title: 'Deploy & Scale',
    icon: Cloud,
    desc: 'Cloud deployment with CI/CD automation, monitoring, observability, and smooth team documentation handover.',
  },
]

export default function Process() {
  return (
    <section
      id="process"
      className="relative min-h-[110vh] flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Development Process"
    >
      <div className="max-w-3xl mb-14 bg-white/75 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 border border-green-200/80 text-xs font-semibold text-[#16a34a] uppercase tracking-wider mb-4">
          How We Work
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Engineering Process:{' '}
          <span className="text-[#16a34a]">From Concept to Scaled Product</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Six focused phases designed to eliminate uncertainty and ship rock-solid software on schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {PROCESS_STEPS.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.step}
              className="bg-white/80 backdrop-blur-md border border-slate-200/80 hover:border-green-400/60 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200/60 flex items-center justify-center text-[#16a34a] group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black font-mono text-slate-200 group-hover:text-green-500/40 transition-colors">
                  {item.step}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
