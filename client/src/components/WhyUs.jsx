import { Sparkles, CheckCircle, Clock, Shield, TrendingUp, Users } from 'lucide-react'

const WHY_POINTS = [
  {
    icon: Sparkles,
    title: 'AI-First Engineering Approach',
    desc: 'We treat applied intelligence as a foundational architecture layer, not a superficial marketing buzzword.',
  },
  {
    icon: Users,
    title: 'End-to-End Product Ownership',
    desc: 'From initial requirements to design, full-stack code, cloud infrastructure, and deployment — one dedicated engineering partner.',
  },
  {
    icon: Clock,
    title: 'Rapid Prototyping to Production',
    desc: 'Validate hypotheses with functional production MVPs in weeks, cutting time-to-market dramatically.',
  },
  {
    icon: Shield,
    title: 'Modern Workflows with Human Rigor',
    desc: 'We leverage modern AI-assisted development tools while upholding strict code reviews, security audits, and type safety.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale Seamlessly',
    desc: 'Architected for sub-second latency, high concurrency, and clean data contracts that grow with your company.',
  },
  {
    icon: CheckCircle,
    title: 'Pragmatic Product Mindset',
    desc: 'We focus relentlessly on features that deliver real user adoption and commercial impact, avoiding pointless complexity.',
  },
]

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative min-h-[90vh] flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Why Wave Init"
    >
      <div className="max-w-3xl mb-14 bg-white/75 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 border border-green-200/80 text-xs font-semibold text-[#16a34a] uppercase tracking-wider mb-4">
          Why Wave Init
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Why Wave Init Solutions:{' '}
          <span className="text-[#16a34a]">Engineering You Can Rely On</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          We combine the agility of modern AI tooling with the technical discipline of senior full-stack engineers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY_POINTS.map((pt) => {
          const Icon = pt.icon
          return (
            <div
              key={pt.title}
              className="bg-white/80 backdrop-blur-md border border-slate-200/80 hover:border-green-400/60 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200/60 flex items-center justify-center text-[#16a34a] mb-5 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#16a34a] transition-colors">
                {pt.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {pt.desc}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
