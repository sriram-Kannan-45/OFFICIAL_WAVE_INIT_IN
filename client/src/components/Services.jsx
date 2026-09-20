import { Brain, Globe, Bot, Rocket, Cpu, Server, ArrowUpRight } from 'lucide-react'

const SERVICES = [
  {
    icon: Brain,
    title: 'AI Software Development',
    desc: 'Custom AI-powered capabilities engineered into your core stack — neural embeddings, semantic search, predictive algorithms, and custom model orchestration.',
    tags: ['Applied ML', 'Vector Embeddings', 'Model Integration'],
  },
  {
    icon: Globe,
    title: 'Full-Stack Development',
    desc: 'End-to-end web applications built with modern frontend frameworks, structured API layers, and production-grade architectures that load fast and scale.',
    tags: ['React', 'Node.js', 'TypeScript', 'Clean Code'],
  },
  {
    icon: Bot,
    title: 'GenAI Solutions & Agents',
    desc: 'Context-aware conversational assistants, multi-agent reasoning workflows, and generative pipelines that handle real business queries reliably.',
    tags: ['LLM Pipelines', 'Agentic Systems', 'RAG Architecture'],
  },
  {
    icon: Rocket,
    title: 'AI Product Prototyping',
    desc: 'From initial concept to a clickable, testable production MVP in days. We turn product ideas into tangible, fundable, and validated software.',
    tags: ['Rapid MVP', 'Product Strategy', 'Interactive Demos'],
  },
  {
    icon: Cpu,
    title: 'Intelligent Workflows & Automation',
    desc: 'Automate repetitive operations with intelligent event triggers, automated processing pipelines, and autonomous exception handling.',
    tags: ['Workflow Engine', 'Background Workers', 'Zero Overhead'],
  },
  {
    icon: Server,
    title: 'Cloud Backends & APIs',
    desc: 'High-concurrency microservices, real-time WebSocket communication, and robust relational or document databases built for enterprise throughput.',
    tags: ['FastAPI', 'PostgreSQL', 'Socket.IO', 'Scalability'],
  },
]

export default function Services() {
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
      id="services"
      className="relative min-h-[110vh] flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Services"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 bg-white/75 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 border border-green-200/80 text-xs font-semibold text-[#16a34a] uppercase tracking-wider mb-3">
            Our Services
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Engineering Capabilities for{' '}
            <span className="text-[#16a34a]">High-Growth</span> Teams
          </h2>
        </div>
        <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed">
          From first prototype to enterprise production, we build software products that drive measurable business velocity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {SERVICES.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.title}
              className="bg-white/80 backdrop-blur-md border border-slate-200/80 hover:border-green-400/60 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200/60 flex items-center justify-center text-[#16a34a] mb-6 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#16a34a] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100/80 text-[11px] font-medium text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => scrollTo('#contact')}
                  className="p-1.5 rounded-lg text-slate-400 group-hover:text-[#16a34a] group-hover:bg-green-50 transition-colors"
                  aria-label={`Inquire about ${s.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
