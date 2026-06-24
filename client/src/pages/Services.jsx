import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Network,
  GraduationCap,
  BarChart3,
  MessageSquare,
  LayoutDashboard,
  Lightbulb,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

const services = [
  {
    title: 'Custom AI Product Development',
    icon: Network,
    description: 'We build AI-first products tailored to your industry and business goals — from prototype to production-ready.',
    details: [
      'End-to-end product development from concept to deployment',
      'AI model selection, training, and fine-tuning',
      'REST API and WebSocket integration',
      'Scalable cloud architecture design',
      'Post-launch monitoring and optimization',
    ],
    tech: ['React', 'Node.js', 'Python', 'TensorFlow', 'FastAPI'],
  },
  {
    title: 'AI-Based LMS Portals',
    icon: GraduationCap,
    description: 'Intelligent learning management systems with adaptive content, AI grading, progress tracking, and smart recommendations.',
    details: [
      'Adaptive learning paths personalized by AI',
      'Automated assessment and smart grading',
      'Real-time student analytics dashboard',
      'Bulk enrollment and batch management',
      'Multi-role access (Admin / Teacher / Student)',
    ],
    tech: ['MERN Stack', 'Python NLP', 'MongoDB', 'AWS'],
  },
  {
    title: 'Machine Learning Models',
    icon: BarChart3,
    description: 'Custom ML models — classification, prediction, NLP, computer vision — integrated directly into your workflow.',
    details: [
      'Custom classification and regression models',
      'Natural Language Processing pipelines',
      'Computer vision and image analysis',
      'Time-series forecasting',
      'Model serving via REST API',
    ],
    tech: ['Python', 'scikit-learn', 'PyTorch', 'FastAPI'],
  },
  {
    title: 'AI Chatbot & Automation',
    icon: MessageSquare,
    description: 'Intelligent chatbots and workflow automation powered by LLMs, reducing manual effort and increasing response quality.',
    details: [
      'LLM-powered conversational agents',
      'Customer support automation',
      'Internal workflow optimization',
      'Multi-channel bot deployment',
      'Knowledge base integration',
    ],
    tech: ['OpenAI API', 'Node.js', 'LangChain', 'React'],
  },
  {
    title: 'AI Dashboard & Analytics',
    icon: LayoutDashboard,
    description: 'Real-time AI dashboards that give your team insights, predictions, and intelligent alerts.',
    details: [
      'Real-time data visualization',
      'Predictive analytics widgets',
      'Custom KPI tracking',
      'Automated reporting generation',
      'Role-based dashboard views',
    ],
    tech: ['React', 'D3.js', 'Python', 'MongoDB'],
  },
  {
    title: 'Consulting & Strategy',
    icon: Lightbulb,
    description: 'Not sure where to start with AI? We map your business processes and design the optimal AI strategy for you.',
    details: [
      'AI readiness assessment',
      'Business process analysis',
      'Technology stack recommendations',
      'ROI projection and planning',
      'Roadmap development',
    ],
    tech: ['Strategy', 'Architecture', 'Research'],
  },
]

const faqs = [
  {
    question: 'How long does it take to build an AI product?',
    answer: 'Timeline depends on complexity. A simple chatbot or dashboard can be ready in 2–4 weeks, while a full AI LMS portal typically takes 8–12 weeks. We provide detailed estimates after the discovery phase.',
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer: 'Absolutely! We are a startup ourselves. We offer flexible engagement models that work for businesses of all sizes, including MVPs and phased development approaches.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We have deep experience in education (LMS), e-commerce, healthcare, and SaaS. However, AI is industry-agnostic — we adapt to any domain.',
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer both fixed-price and time-and-materials models. After the discovery phase, we provide a transparent quote with no hidden costs.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes! We offer maintenance packages that include bug fixes, feature updates, model retraining, and 24/7 monitoring support.',
  },
]

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="service-card bg-white border border-border-light rounded-2xl p-8 h-full"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.08)' }}
      >
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0 service-icon-ring">
            <service.icon className="w-7 h-7 text-accent-600 service-icon" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold tracking-tight text-text-primary mb-2">
              {service.title}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              {service.description}
            </p>

            <ul className="space-y-1.5 mb-5">
              {service.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-600 flex-shrink-0 mt-0.5" />
                  {detail}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-5">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-bg-tertiary text-text-muted text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href="/contact"
              className="link-arrow text-sm font-semibold text-accent-600 hover:text-green-700 transition-colors duration-150"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div
        className={`bg-white rounded-xl border transition-all duration-200 ${open ? 'border-border-accent' : 'border-border-light'}`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-5 md:p-6 text-left"
        >
          <span className="text-base font-semibold text-text-primary pr-4">
            {faq.question}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className={`w-5 h-5 flex-shrink-0 ${open ? 'text-accent-600' : 'text-text-subtle'}`} />
          </motion.div>
        </button>
        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <p className="px-5 md:px-6 pb-5 md:pb-6 text-text-muted text-sm leading-relaxed">
            {faq.answer}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services — WAVE INIT | AI Product Development</title>
        <meta
          name="description"
          content="Full-service AI product development, LMS portals, ML models, chatbots, and consulting. Build intelligent software with WAVE INIT."
        />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="neural-bg-section-alt py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
                What We <span className="text-accent-600">Build</span> For You
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-text-muted leading-relaxed">
                From intelligent LMS portals to custom AI products — end-to-end solutions that transform your business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-20 neural-bg-section-solid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {services.map((service, i) => (
                <ServiceCard key={service.title} service={service} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 neural-bg-section-alt">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="text-xs font-semibold tracking-[0.1em] uppercase text-accent-600 mb-4">
                FAQ
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-text-primary leading-tight">
                Common Questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={faq.question} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-bg-dark neural-bg-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-slate-400 mb-8">
                Let&apos;s discuss your ideas and build something intelligent together.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-accent-600 rounded-lg hover:bg-green-700 transition-all duration-150 btn-hover"
              >
                Get a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
