import { ArrowUpRight, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react'

const PROJECTS = [
  {
    badge: 'Flagship Platform',
    name: 'AI Learning Management System (LMS)',
    category: 'EdTech · AI Product',
    desc: 'A complete AI-driven educational platform engineered from the ground up. Features personalized adaptive learning paths, automated smart assessments, real-time student analytics, and instructor dashboards.',
    highlights: [
      'Adaptive AI Learning Curriculums',
      'Automated Quiz & Assessment Grading',
      'Multi-Role Portals (Admin / Instructor / Student)',
      'Real-Time Student Analytics & Telemetry',
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
    link: '/lms',
    primary: true,
  },
  {
    badge: 'Enterprise AI',
    name: 'Context-Aware AI Assistants',
    category: 'GenAI · Agentic Systems',
    desc: 'Intelligent conversational agents engineered for real enterprise workflows. Integrated with internal knowledge bases, CRM systems, and automated task execution pipelines.',
    highlights: [
      'Retrieval-Augmented Generation (RAG)',
      'Multi-Turn Context Memory',
      'Action Triggering & API Calling',
    ],
    tags: ['OpenAI', 'FastAPI', 'Python', 'Vector DB'],
    link: '#contact',
    primary: false,
  },
  {
    badge: 'Operations Platform',
    name: 'Real-Time Operational Dashboards',
    category: 'Product Engineering',
    desc: 'High-throughput enterprise portals and metrics dashboards that transform live business streaming data into actionable operational decisions with sub-second latency.',
    highlights: [
      'Live WebSocket Data Streaming',
      'High-Concurrency Relational Queries',
      'Clean Modular UI Architecture',
    ],
    tags: ['TypeScript', 'PostgreSQL', 'Socket.IO', 'Tailwind'],
    link: '#contact',
    primary: false,
  },
]

export default function Projects() {
  const scrollTo = (href) => {
    if (href.startsWith('#')) {
      const target = document.querySelector(href)
      if (target) {
        const navOffset = 76
        const top = target.getBoundingClientRect().top + window.scrollY - navOffset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    } else {
      window.location.href = href
    }
  }

  return (
    <section
      id="projects"
      className="relative min-h-[120vh] flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Selected Projects"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 bg-white/75 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 border border-green-200/80 text-xs font-semibold text-[#16a34a] uppercase tracking-wider mb-3">
            Selected Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Featured Projects & <span className="text-[#16a34a]">Shipped Products</span>
          </h2>
        </div>
        <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed">
          Real products built from the ground up. Engineered for high performance, reliability, and real user adoption.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PROJECTS.map((proj) => (
          <div
            key={proj.name}
            className={`bg-white/85 backdrop-blur-md border rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group ${
              proj.primary
                ? 'border-green-300/80 hover:border-green-400 ring-1 ring-green-400/20 lg:col-span-3 lg:grid lg:grid-cols-12 lg:gap-10'
                : 'border-slate-200/80 hover:border-green-400/60'
            }`}
          >
            <div className={proj.primary ? 'lg:col-span-7 flex flex-col justify-between' : ''}>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-md bg-green-100/70 text-[11px] font-semibold text-[#15803d]">
                    {proj.badge}
                  </span>
                  <span className="text-xs text-slate-600 font-medium">
                    {proj.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#16a34a] transition-colors">
                  {proj.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {proj.desc}
                </p>

                <div className="space-y-2 mb-6">
                  {proj.highlights.map((hl) => (
                    <div key={hl} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
                      {hl}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-slate-100/90 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={`mt-6 lg:mt-0 flex flex-col justify-between ${proj.primary ? 'lg:col-span-5 lg:border-l lg:border-slate-100 lg:pl-8' : ''}`}>
              <div className="bg-slate-50/80 border border-slate-200/60 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                  <span className="font-semibold text-slate-700">Project Status</span>
                  <span className="inline-flex items-center gap-1.5 text-[#16a34a] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                    Live & Production-Ready
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineered with complete automated test coverage, strict typing, and cloud CI/CD pipelines.
                </p>
              </div>

              <a
                href={proj.link}
                onClick={(e) => {
                  if (proj.link.startsWith('#')) {
                    e.preventDefault()
                    scrollTo(proj.link)
                  }
                }}
                className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  proj.primary
                    ? 'text-white bg-[#16a34a] hover:bg-[#15803d] shadow-sm shadow-green-600/20'
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {proj.primary ? 'Explore LMS Platform' : 'Inquire About Solution'}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
