import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    icon: Search,
    description: 'We understand your business, users, and goals before writing a single line of code.',
  },
  {
    number: '02',
    title: 'Design',
    icon: PenTool,
    description: 'We design architecture, AI pipelines, and UI — you approve every detail before we build.',
  },
  {
    number: '03',
    title: 'Development',
    icon: Code2,
    description: 'Our team builds in agile sprints with regular demos and feedback loops.',
  },
  {
    number: '04',
    title: 'Launch',
    icon: Rocket,
    description: 'We deploy, monitor, and support — continuous improvement is part of our DNA.',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 neural-bg-section-alt overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="text-xs font-semibold tracking-[0.1em] uppercase text-accent-600 mb-4">
            OUR PROCESS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-tight mb-4">
            How We Bring Ideas to Life
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            A transparent, collaborative approach from concept to launch.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-stretch lg:items-start">
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessStep({ step, index, total }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative flex-1 lg:px-4"
    >
      <div className="text-center lg:text-left">
        {/* Background number */}
        <div className="text-6xl font-black text-accent-100 leading-none mb-2 select-none">
          {step.number}
        </div>

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-3 mx-auto lg:mx-0">
          <Icon className="w-6 h-6 text-accent-600" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold tracking-tight text-text-primary mb-2">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-muted max-w-[220px] mx-auto lg:mx-0">
          {step.description}
        </p>
      </div>

      {/* Connector */}
      {index < total - 1 && (
        <div className="hidden lg:flex absolute top-12 -right-4 items-center">
          <div className="w-8 h-0 border-t-2 border-dashed border-border-light" />
          <ArrowRight className="w-4 h-4 text-text-subtle -ml-2" />
        </div>
      )}
    </motion.div>
  )
}
