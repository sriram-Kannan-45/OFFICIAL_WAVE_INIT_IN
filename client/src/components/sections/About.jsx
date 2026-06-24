import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const stats = [
  { value: 2, suffix: '', label: 'Products Shipped', hasCountUp: true },
  { value: 2, suffix: '+', label: 'Years', hasCountUp: true },
  { value: 100, suffix: '%', label: 'AI-Focused', hasCountUp: true },
  { value: '0→1', suffix: '', label: 'Be Our First Client', hasCountUp: false },
]

function StatCard({ stat, index }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!stat.hasCountUp) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const target = stat.value
          const duration = 1200
          const start = performance.now()

          const update = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(update)
          }
          requestAnimationFrame(update)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [stat.value, stat.hasCountUp])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, transform: 'translateY(24px) scale(0.97)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0) scale(1)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="stat-card bg-bg-secondary border border-border-light rounded-2xl p-6"
    >
      <div className="text-4xl font-extrabold text-text-primary">
        {stat.hasCountUp ? count : stat.value}
        {stat.suffix && <span className="text-accent-600">{stat.suffix}</span>}
      </div>
      <div className="text-sm text-text-muted mt-1">{stat.label}</div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-16 md:py-20 neural-bg-section-solid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-xs font-semibold tracking-[0.1em] uppercase text-accent-600 mb-4">
              WHO WE ARE
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-text-primary leading-tight mb-6">
              A Small Team. Serious About AI.
            </h2>
            <p className="text-text-muted text-base leading-relaxed mb-8">
              WAVE INIT is a forward-thinking AI studio dedicated to building intelligent, scalable, and beautiful software products. We work directly with you to understand your vision and engineer AI-powered solutions that solve real problems. We've shipped 2 real products and are actively looking for our next client partner.
            </p>
            <a
              href="/about"
              className="link-arrow text-sm font-semibold text-accent-600 hover:text-green-700 transition-colors duration-150"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 inline" />
            </a>
          </motion.div>

          {/* Right - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
              {/* Inline CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="col-span-2 flex items-center justify-between bg-accent-600/10 border border-accent-600/20 rounded-2xl px-5 py-4"
              >
                <span className="text-sm text-text-primary font-medium">
                  👋 Currently open to new client projects.
                </span>
                <a
                  href="/contact"
                  className="link-arrow text-sm font-semibold text-accent-600 hover:text-green-700 transition-colors duration-150 shrink-0"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4 inline" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
