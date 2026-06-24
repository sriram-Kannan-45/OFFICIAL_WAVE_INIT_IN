import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, ArrowRight, GraduationCap } from 'lucide-react'

const features = [
  'AI Quiz Generation',
  'Role-Based Access (Admin/Trainer/Participant)',
  'Real-Time Proctoring',
  'Lesson Completion Gating',
  'Live Sessions',
]

export default function FeaturedProject() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="our-work"
      className="py-24 md:py-32 neural-bg-section-solid overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left - Content (60%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3"
          >
            {/* Eyebrow pill */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-200 bg-accent-50 text-xs font-semibold tracking-widest uppercase text-accent-600 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
              PROJECT 01 &mdash; COMPLETED
            </span>

            <h2 className="text-4xl font-bold tracking-tight text-text-primary leading-tight mb-4">
              AI-Powered LMS Portal
            </h2>

            <p className="text-text-muted text-base leading-relaxed mb-6">
              A production-ready learning management system with AI quiz generation, role-based access, real-time proctoring, and complete admin/trainer/participant workflows.
            </p>

            {/* Feature list */}
            <div className="space-y-3 mb-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent-600 flex-shrink-0" />
                  <span className="text-text-secondary text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/lms"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent-600 rounded-lg hover:bg-green-700 transition-all duration-150 btn-hover"
              >
                View Full Details
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-accent-600 hover:text-green-700 bg-transparent transition-colors duration-150"
              >
                Request This for Your Business
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right - Visual (40%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white border border-border-light rounded-2xl shadow-2xl p-4">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-bg-secondary rounded-md px-3 py-1 text-[10px] text-text-muted font-mono text-center border border-border-light">
                    waveinit.com/lms/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content mockup */}
              <div className="bg-bg-secondary rounded-xl p-4 space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-accent-600" />
                    </div>
                    <span className="text-sm font-semibold text-text-primary">AI LMS Dashboard</span>
                  </div>
                </div>

                {/* Feature badges */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'AI Quiz', value: 'OpenAI' },
                    { label: 'Proctoring', value: 'Real-Time' },
                    { label: 'Access', value: 'Role-Based' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-lg p-2.5 border border-border-light">
                      <div className="text-xs font-bold text-accent-600">{stat.value}</div>
                      <div className="text-[10px] text-text-muted">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Course list */}
                <div className="space-y-2">
                  {['AI Fundamentals', 'Machine Learning 101', 'Deep Learning Advanced'].map(
                    (course, i) => (
                      <div key={course} className="flex items-center gap-2 bg-white rounded-lg p-2.5 border border-border-light">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold bg-accent-50 text-accent-600">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-text-primary font-medium">{course}</div>
                          <div className="w-full h-1 bg-bg-secondary rounded-full mt-1">
                            <div
                              className="h-full rounded-full bg-accent-500"
                              style={{ width: `${[78, 92, 65][i]}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-[10px] text-text-muted">{[78, 92, 65][i]}%</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
