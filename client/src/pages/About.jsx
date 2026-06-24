import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Rocket,
  Zap,
  Users,
  Lightbulb,
  Globe,
  TrendingUp,
} from 'lucide-react'

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We push boundaries in AI research and application to deliver cutting-edge solutions.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work as partners, not vendors. Your success is our success.',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Every line of code, every model, every pixel is crafted with purpose.',
  },
  {
    icon: Zap,
    title: 'Velocity',
    description: 'Speed matters in startups. We ship fast without compromising quality.',
  },
]

const timeline = [
  {
    year: '2024',
    title: 'WAVE INIT Founded',
    description: 'Started with a vision to make AI accessible to businesses of all sizes.',
    icon: Globe,
  },
  {
    year: '2024',
    title: 'Shipped AI LMS Portal',
    description: 'Launched our first product — a production-ready AI learning management system, live and available.',
    icon: Rocket,
  },
  {
    year: '2025',
    title: 'Expanded Services',
    description: 'Added ML models, chatbots, and analytics dashboards to our offerings.',
    icon: TrendingUp,
  },
  {
    year: '2025',
    title: 'Growing Team',
    description: 'Building a world-class team of AI engineers, designers, and product thinkers.',
    icon: Users,
  },
]

const stats = [
  { value: '2', suffix: '', label: 'Products Shipped' },
  { value: '2', suffix: '+', label: 'Years' },
  { value: '100', suffix: '%', label: 'AI-Focused' },
  { value: '0→1', suffix: '', label: 'Be Our First Client' },
]

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — WAVE INIT | AI Product Development Studio</title>
        <meta
          name="description"
          content="We're an AI product development studio. Two shipped projects so far — actively seeking our next client partner. Learn our story, mission, and how we work."
        />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="py-16 md:py-20 neural-bg-section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-tight mb-6">
                  We're WAVE INIT.
                  <br />
                  We <span className="text-accent-600">Build</span> AI-Powered <span className="text-accent-600">Digital</span> Products.
                </h1>
                <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
                  WAVE INIT is a forward-thinking AI startup dedicated to building intelligent, scalable, and beautiful software products. We are not just developers — we are product thinkers, AI architects, and growth partners.
                </p>
              </motion.div>
            </div>

            {/* Stats below hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
            >
              {stats.map((s) => (
                <div key={s.label} className="bg-white border border-border-light rounded-2xl p-6 text-center">
                  <div className="text-3xl font-extrabold text-text-primary">
                    {s.value}{s.suffix && <span className="text-accent-600">{s.suffix}</span>}
                  </div>
                  <div className="text-sm text-text-muted mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission + Vision */}
        <section className="py-16 md:py-20 neural-bg-section-solid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Eye,
                  title: 'Our Vision',
                  text: 'To become a leading AI product studio delivering intelligent, scalable, and client-focused software solutions that transform industries and empower businesses worldwide.',
                },
                {
                  icon: Target,
                  title: 'Our Mission',
                  text: 'To democratize AI by building custom, accessible, and beautiful software products that solve real problems. We partner with our clients to turn ideas into intelligent reality.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="bg-white border border-border-light rounded-2xl p-8 h-full transition-all duration-200 card-hover"
                    style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.08)' }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-accent-600" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-text-primary mb-3">{item.title}</h3>
                    <p className="text-text-muted leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 neural-bg-section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-xs font-semibold tracking-[0.1em] uppercase text-accent-600 mb-4">
                CULTURE
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-text-primary leading-tight">
                Our Values
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="bg-white border border-border-light rounded-2xl p-6 h-full text-center transition-all duration-200 card-hover"
                    style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.08)' }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-accent-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{value.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-20 neural-bg-section-solid">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-xs font-semibold tracking-[0.1em] uppercase text-accent-600 mb-4">
                JOURNEY
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-text-primary leading-tight">
                How WAVE INIT Started
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-border-light" />
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year + item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="flex items-start gap-5"
                  >
                    <div className="relative z-10 w-[46px] flex-shrink-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-accent-600 border-2 border-accent-600" />
                    </div>
                    <div className="bg-white border border-border-light rounded-xl p-5 flex-1">
                      <div className="text-xs font-mono text-accent-600 mb-1">{item.year}</div>
                      <h3 className="text-base font-semibold text-text-primary mb-1">{item.title}</h3>
                      <p className="text-text-muted text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Honest Statement */}
        <section className="py-12 md:py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-accent-50 border border-border-accent rounded-2xl p-10 md:p-12 text-center"
            >
              <Heart className="w-8 h-8 text-accent-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold tracking-tight text-text-primary mb-4">
                We&apos;re Early. But We Ship.
              </h2>
              <p className="text-text-muted leading-relaxed mb-3">
                WAVE INIT is young, hungry, and committed. We have one product live right now — the AI LMS Portal. We&apos;re actively building more. If you&apos;re looking for a finished product catalog, we&apos;re not there yet.
              </p>
              <p className="text-text-muted leading-relaxed mb-6">
                If you&apos;re looking for a team that can build YOUR product from scratch with AI at the core — you&apos;re in the right place. We treat your project like our own because it is.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent-600 rounded-lg hover:bg-green-700 transition-all duration-150 btn-hover"
              >
                Let&apos;s Build Together
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
