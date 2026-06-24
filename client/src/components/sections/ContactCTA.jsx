import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ContactCTA() {
  return (
    <section id="contact" className="py-12 md:py-16 bg-bg-dark overflow-hidden neural-bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            Ready to Build Something?
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
            Tell us your idea. We&apos;ll tell you how to build it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-accent-600 rounded-lg hover:bg-green-700 transition-all duration-150 btn-hover"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-transparent border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-150 btn-hover"
            >
              Explore Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
