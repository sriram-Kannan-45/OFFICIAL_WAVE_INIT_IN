import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Network,
  GraduationCap,
  BarChart3,
  MessageSquare,
  LayoutDashboard,
  Lightbulb,
  ArrowRight,
} from 'lucide-react'

const services = [
  {
    title: 'Custom AI Product Development',
    icon: Network,
    description: 'We build AI-powered tools tailored to your workflow — from concept to production-ready product.',
  },
  {
    title: 'AI-Based LMS Portals',
    icon: GraduationCap,
    description: 'Full-stack learning platforms like our own LMS — built for your brand, your learners, and your goals.',
  },
  {
    title: 'Machine Learning Models',
    icon: BarChart3,
    description: 'Custom models trained on your data — classification, NLP, computer vision, and more.',
  },
  {
    title: 'AI Chatbot & Automation',
    icon: MessageSquare,
    description: 'AI assistants integrated into your product or website — reducing manual effort and increasing response quality.',
  },
  {
    title: 'AI Dashboard & Analytics',
    icon: LayoutDashboard,
    description: 'Real-time analytics dashboards powered by your data — insights, predictions, and intelligent alerts.',
  },
  {
    title: 'Consulting & Strategy',
    icon: Lightbulb,
    description: 'Strategic AI roadmapping for businesses — we map your processes and design the optimal path forward.',
  },
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
    >
      <div className="bg-white border border-border-light rounded-2xl p-6 h-full transition-all duration-200 card-hover"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.08)' }}
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-4">
          <service.icon className="w-6 h-6 text-accent-600" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold tracking-tight text-text-primary mb-2">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-text-muted text-base leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Learn more */}
        <div className="flex items-center gap-1 text-sm text-accent-600 hover:text-green-700 transition-colors duration-150">
          <span>Learn more</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 neural-bg-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="text-xs font-semibold tracking-[0.1em] uppercase text-accent-600 mb-4">
            WHAT WE BUILD
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-tight mb-4">
            Services Built Around Your Goals
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            End-to-end AI solutions designed to transform your business processes.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
