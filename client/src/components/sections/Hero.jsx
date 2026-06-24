import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const headlineWords = ['Build', 'Smarter.', 'Ship', 'Fast']

const techTags = ['AI Integration', 'Full-Stack', 'Real-Time', 'LMS Portals']

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: 0.25 + i * 0.06, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center neural-bg-section overflow-hidden pt-[76px] hero-section">
      {/* Glow spotlight background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(22,163,74,0.05) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* Hero content container with compact padding & gaps to prevent vertical overflow */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 flex flex-col items-center justify-center text-center gap-5 sm:gap-6">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-500 bg-accent-50/80 text-xs font-semibold tracking-widest uppercase text-accent-600">
            <span className="badge-glow-dot" />
            Built & Ready — Seeking First Partner
          </span>
        </motion.div>

        {/* Headline — word by word stagger */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight w-full text-text-primary"
          style={{ fontSize: 'clamp(40px, 6.5vw, 84px)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
        >
          <span className="inline-flex flex-wrap justify-center gap-x-4 w-full">
            {headlineWords.map((word) => (
              <span
                key={word}
                className={`hero-word ${word === 'Smarter.' || word === 'Fast' ? 'text-accent-600' : ''}`}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed"
        >
          We're a full-stack AI studio that builds production-ready software.
          React, Node.js, OpenAI, real-time systems — from scratch, fast.
          No fluff. No fake metrics. Just real code and real results.
        </motion.p>

        {/* Tech tags row */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-2 w-full max-w-2xl mx-auto"
        >
          {techTags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 text-xs sm:text-sm font-medium border border-border-light rounded-full text-text-secondary hover:border-accent-500 hover:text-accent-600 transition-all duration-200 cursor-default bg-white/50 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-2"
        >
          <a
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-accent-600 hover:bg-green-700 text-white font-semibold rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(22,163,74,0.4)] active:translate-y-0 active:shadow-none inline-flex items-center justify-center gap-2"
          >
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/products"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-text-primary text-text-primary font-semibold rounded-xl text-base transition-all duration-200 hover:border-accent-500 hover:text-accent-600 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
          >
            See Our Work
          </a>
        </motion.div>
      </div>
    </section>
  )
}
