import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Sparkles,
} from 'lucide-react'

const completedProjects = [
  {
    title: 'AI LMS Portal',
    description: 'A full-featured learning management system with AI-assisted grading, role-based access (Admin / Trainer / Participant), course management, and real-time progress tracking.',
    icon: GraduationCap,
    features: [
      'AI Quiz Generation (OpenAI API)',
      'Real-Time Proctoring (Socket.IO)',
      'Role-Based Access Control (JWT)',
      'Live Session Support',
      'Instructor & Student Dashboards',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'OpenAI', 'Socket.IO', 'JWT'],
    href: '/lms',
  },
  {
    title: 'AI Analytics Dashboard',
    description: 'Real-time business intelligence dashboard with AI-powered insights, anomaly detection, and predictive analytics widgets built from scratch.',
    icon: Sparkles,
    features: [
      'Real-time data ingestion & processing',
      'AI-driven anomaly detection',
      'Custom KPI tracking widgets',
      'Automated report generation',
      'Role-based dashboard views',
    ],
    stack: ['React', 'Python', 'MongoDB', 'D3.js', 'FastAPI'],
    href: '/contact',
  },
]

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="project-card bg-white border border-border-light rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Content side */}
        <div className="lg:col-span-3 p-8 md:p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-200 bg-accent-50 text-xs font-semibold text-green-700 mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
            Completed
          </span>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-4">
            {project.title}
          </h3>
          <p className="text-text-muted text-base leading-relaxed mb-5">
            {project.description}
          </p>
          <ul className="space-y-2 mb-6">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-accent-600 flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((t) => (
              <span key={t} className="stack-pill px-3 py-1 rounded-full bg-bg-tertiary text-text-muted text-xs font-medium cursor-default">
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.href}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent-600 rounded-lg hover:bg-green-700 transition-all duration-150 w-fit btn-hover"
          >
            {index === 0 ? 'View Case Study' : 'Request This Project'}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Visual side */}
        <div className="lg:col-span-2 bg-bg-secondary p-8 flex items-center justify-center min-h-[280px] order-1 lg:order-2">
          <div className="bg-white rounded-xl border border-border-light p-6 shadow-lg w-full max-w-sm">
            <div className="flex gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
                <project.icon className="w-4 h-4 text-accent-600" />
              </div>
              <span className="text-sm font-semibold text-text-primary">{project.title}</span>
            </div>
            <div className="space-y-2">
              {project.features.slice(0, 3).map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-text-muted">
                  <CheckCircle2 className="w-3 h-3 text-accent-600 flex-shrink-0" />
                  <span className="truncate">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Our Work — WAVE INIT | AI Development Projects</title>
        <meta
          name="description"
          content="See what WAVE INIT has built. Two shipped products — real projects, real code, real AI. Let's build your next one together."
        />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="neural-bg-section-alt py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-xs font-semibold tracking-[0.1em] uppercase text-accent-600 mb-4">
                PORTFOLIO
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
                What <span className="text-accent-600">We've Built</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-text-muted leading-relaxed">
                Two products shipped. Built from scratch, production-ready.
                Looking for the next challenge.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Completed Projects */}
        <section className="py-16 md:py-20 neural-bg-section-solid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {completedProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}

            {/* Next Project Invitation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="border-2 border-dashed border-border-medium rounded-2xl p-12 md:p-16 text-center hover:border-accent-500 hover:bg-accent-50/30 transition-all duration-300">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold tracking-tight text-text-primary mb-3">
                  Your Project
                </h3>
                <p className="text-text-muted text-base max-w-lg mx-auto mb-6">
                  We're building our next case study. Want it to be yours?
                  Let's build the next great AI product — together.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent-600 rounded-lg hover:bg-green-700 transition-all duration-150 btn-hover"
                >
                  Start a Conversation
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-bg-dark neural-bg-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-slate-400 mb-8">
                We build custom AI products for businesses. Your idea, our AI, built to scale.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-accent-600 rounded-lg hover:bg-green-700 transition-all duration-150 btn-hover"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
