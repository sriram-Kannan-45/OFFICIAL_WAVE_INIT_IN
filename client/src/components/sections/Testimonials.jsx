import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Clock, Sparkles, HeartHandshake } from 'lucide-react'

const valueProps = [
  {
    icon: Shield,
    title: 'Transparent Communication',
    description: 'Clear updates, honest timelines, and open access to project progress on every step.',
  },
  {
    icon: Sparkles,
    title: 'AI-First Approach',
    description: 'Every solution we build is designed with intelligence at its core, not as an afterthought.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We commit to realistic deadlines and deliver tested, production-ready products on schedule.',
  },
  {
    icon: HeartHandshake,
    title: 'Post-Delivery Support',
    description: 'Launch is just the beginning. We provide ongoing support and continuous improvements.',
  },
]

const techStack = [
  'React.js', 'Node.js', 'Python AI', 'MongoDB', 'FastAPI',
  'Tailwind CSS', 'TypeScript', 'TensorFlow', 'Socket.IO',
  'PostgreSQL', 'OpenAI', 'JWT Auth',
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="trust" className="py-24 md:py-32 neural-bg-section-solid overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="text-xs font-semibold tracking-[0.1em] uppercase text-accent-600 mb-4">
            WHY WAVE INIT
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-tight mb-4">
            Why Partner With WAVE INIT
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            We are an early-stage startup, and we know trust is earned. Here is what we promise.
          </p>
        </div>

        {/* Value props grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="bg-white border border-border-light rounded-2xl p-6 h-full transition-all duration-200 card-hover"
                style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.08)' }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-16"
        >
          <p className="text-center text-text-subtle text-xs font-semibold tracking-[0.1em] uppercase mb-6">
            Built With
          </p>
          <div className="ticker-wrapper">
            <div className="ticker-track">
              {[...techStack, ...techStack].map((name, i) => (
                <span key={`${name}-${i}`} className="ticker-item">
                  {name}
                  <span className="ticker-dot">●</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
