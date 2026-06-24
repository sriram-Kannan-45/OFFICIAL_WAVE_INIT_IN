import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Star,
  Cpu,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
} from 'lucide-react'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { cn } from '@lib/utils'

const features = [
  { text: 'Adaptive Learning Paths (AI-personalized)', delay: 0 },
  { text: 'Auto-Grading & Smart Assessments', delay: 0.1 },
  { text: 'AI Content Recommendations', delay: 0.2 },
  { text: 'Real-Time Analytics Dashboard', delay: 0.3 },
  { text: 'Multi-Role Support (Admin / Teacher / Student)', delay: 0.4 },

  { text: 'Bulk Enrollment & Batch Management', delay: 0.6 },
]

const floatingStats = [
  { label: '96% Satisfaction', icon: Star, color: 'border-accent-mint/40 text-accent-mint' },
  { label: 'AI-Graded', icon: Cpu, color: 'border-accent-cyan/40 text-accent-cyan' },
  { label: 'Production Ready', icon: CheckCircle2, color: 'border-accent-violet/40 text-accent-violet' },
]

export default function LMSShowcase() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="lms"
      className="relative py-32 bg-secondary-bg overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Badge variant="green" className="mb-4">
              Currently Available
            </Badge>

            <h2 className="font-display text-5xl font-bold text-text-primary leading-tight mb-5">
              AI-Powered{' '}
              <span className="text-gradient">Learning Management</span>{' '}
              System
            </h2>

            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Our flagship product is an AI-driven LMS portal that adapts to each learner. Built with intelligent progress tracking, automated assessments, AI-generated content suggestions, and real-time analytics — it redefines online education.
            </p>

            {/* Feature list */}
            <div className="space-y-3 mb-8">
              {features.map((feature) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + feature.delay }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-5 h-5 rounded-full bg-accent-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-cyan/20 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan" />
                  </div>
                  <span className="text-text-secondary text-base group-hover:text-text-primary transition-colors">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-row gap-4">
              <Button href="/contact" variant="primary" size="md">
                Request a Demo <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/lms" variant="secondary" size="md">
                View Full Details
              </Button>
            </div>
          </motion.div>

          {/* Right - Laptop Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Laptop frame */}
            <div className="relative">
              {/* Screen */}
              <div className="relative bg-card-bg rounded-t-xl border border-border-subtle p-3 shadow-2xl">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="bg-primary-bg rounded-md px-3 py-1 text-[10px] text-text-secondary/50 font-mono text-center">
                      waveinit.com/lms/dashboard
                    </div>
                  </div>
                </div>

                {/* LMS content mockup */}
                <div className="bg-primary-bg rounded-lg p-4 space-y-3 min-h-[260px]">
                  {/* Header mockup */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-accent-cyan" />
                      </div>
                      <span className="text-text-primary text-sm font-semibold">AI LMS Dashboard</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-accent-violet/10" />
                      <div className="w-6 h-6 rounded-full bg-accent-mint/10" />
                    </div>
                  </div>

                  {/* Stats row mockup */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Students', value: '1,247', color: 'text-accent-cyan' },
                      { label: 'Courses', value: '86', color: 'text-accent-violet' },
                      { label: 'Completion', value: '94%', color: 'text-accent-mint' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-card-bg rounded-lg p-2.5">
                        <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-[10px] text-text-secondary/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Course list mockup */}
                  <div className="space-y-2">
                    {['AI Fundamentals', 'Machine Learning 101', 'Deep Learning Advanced'].map(
                      (course, i) => (
                        <div
                          key={course}
                          className="flex items-center gap-2 bg-card-bg rounded-lg p-2.5"
                        >
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                            style={{
                              background: ['rgba(0,200,255,0.1)', 'rgba(123,97,255,0.1)', 'rgba(0,255,179,0.1)'][i],
                              color: ['#00C8FF', '#7B61FF', '#00FFB3'][i],
                            }}
                          >
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="text-[11px] text-text-primary font-medium">{course}</div>
                            <div className="w-full h-1 bg-primary-bg rounded-full mt-1">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${[78, 92, 65][i]}%`,
                                  background: ['#00C8FF', '#7B61FF', '#00FFB3'][i],
                                }}
                              />
                            </div>
                          </div>
                          <span className="text-[10px] text-text-secondary">{[78, 92, 65][i]}%</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Laptop base */}
              <div className="h-3 bg-gradient-to-b from-border-subtle to-card-bg rounded-b-xl mx-4 border-b border-border-subtle/50" />
              <div className="h-4 bg-gradient-to-b from-card-bg to-card-bg/50 rounded-b-2xl mx-8" />
            </div>

            {/* Floating stat badges */}
            {floatingStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                className={cn(
                  'absolute glass rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-medium border',
                  stat.color
                )}
                style={{
                  ...(i === 0 && { top: -12, right: -8 }),
                  ...(i === 1 && { bottom: 60, right: -20 }),
                  ...(i === 2 && { bottom: -8, left: 20 }),
                }}
              >
                <stat.icon className="w-3.5 h-3.5" />
                {stat.label}
              </motion.div>
            ))}

            {/* Glowing ring */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-accent-cyan/5 animate-glow-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
