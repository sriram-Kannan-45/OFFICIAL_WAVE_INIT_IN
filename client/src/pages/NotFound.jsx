import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Waves } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | WAVE INIT</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to WAVE INIT home." />
      </Helmet>

      <main className="pt-24 min-h-[calc(100dvh-80px)] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-2xl bg-accent-50 border border-border-accent flex items-center justify-center mx-auto mb-8"
            >
              <Waves className="w-10 h-10 text-accent-600" />
            </motion.div>

            {/* 404 Code */}
            <h1 className="text-7xl md:text-9xl font-extrabold text-text-primary mb-4 leading-none tracking-tight">
              4<span className="text-accent-600">0</span>4
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Page Lost at Sea
            </h2>

            <p className="text-text-muted text-base md:text-lg leading-relaxed max-w-md mx-auto mb-10">
              The page you&apos;re looking for has drifted away. Let&apos;s get you back to shore.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent-600 rounded-lg hover:bg-green-700 transition-all duration-150 btn-hover"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-text-secondary bg-transparent border border-border-light rounded-lg hover:bg-bg-secondary transition-all duration-150 btn-hover"
              >
                <ArrowLeft className="w-4 h-4" />
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
