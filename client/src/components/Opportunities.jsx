import { Award, BookOpen, TrendingUp, ArrowRight } from 'lucide-react'

const OPPORTUNITIES = [
  {
    badge: 'Internship Program',
    title: 'Live Product Experience',
    icon: Award,
    desc: 'Work on actual production codebases from week one — not isolated sandbox exercises. Contribute to live features used by real clients.',
  },
  {
    badge: 'Direct Mentorship',
    title: 'Engineering Best Practices',
    icon: BookOpen,
    desc: 'Collaborate with senior developers on modern software architectures: React, Node.js, Python, FastAPI, and applied GenAI workflows.',
  },
  {
    badge: 'Career Trajectory',
    title: 'Performance-Driven Growth',
    icon: TrendingUp,
    desc: 'High performers take on architecture ownership and join core client project teams. Your real output defines your growth pace.',
  },
]

export default function Opportunities() {
  const scrollTo = (href) => {
    const target = document.querySelector(href)
    if (target) {
      const navOffset = 76
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="opportunities"
      className="relative min-h-[85vh] flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Careers and Opportunities"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 bg-white/75 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 border border-green-200/80 text-xs font-semibold text-[#16a34a] uppercase tracking-wider mb-3">
            Join The Studio
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Build Your Engineering Career in the <span className="text-[#16a34a]">Wave</span>
          </h2>
        </div>
        <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed">
          We work with ambitious developers and interns eager to learn modern AI engineering and ship real production software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
        {OPPORTUNITIES.map((opp) => {
          const Icon = opp.icon
          return (
            <div
              key={opp.title}
              className="bg-white/80 backdrop-blur-md border border-slate-200/80 hover:border-green-400/60 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="px-2.5 py-0.5 rounded-md bg-green-100/70 text-[11px] font-semibold text-[#15803d]">
                    {opp.badge}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-200/60 flex items-center justify-center text-[#16a34a]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-[#16a34a] transition-colors">
                  {opp.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {opp.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => scrollTo('#contact')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16a34a] hover:text-[#15803d] transition-colors"
                >
                  Apply for Position <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
