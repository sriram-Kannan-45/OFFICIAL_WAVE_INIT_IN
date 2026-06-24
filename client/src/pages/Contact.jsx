import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Mail, Briefcase, Camera, Send, CheckCircle2, Clock } from 'lucide-react'
import { toast } from 'react-hot-toast'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'wave.init.45@gmail.com',
    href: 'mailto:wave.init.45@gmail.com',
  },
  {
    icon: Briefcase,
    label: 'LinkedIn',
    value: 'linkedin.com/in/wave-init-227377412',
    href: 'https://www.linkedin.com/in/wave-init-227377412/',
  },
  {
    icon: Camera,
    label: 'Instagram',
    value: '@__wave__init__',
    href: 'https://www.instagram.com/__wave__init__',
  },
]

const fieldVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: 0.2 + i * 0.08, ease: 'easeOut' },
  }),
}

function FloatingInput({ label, name, type = 'text', value, onChange, placeholder, required, isSelect, options, rows }) {
  const [focused, setFocused] = useState(false)
  const hasValue = value && value.length > 0
  const isActive = isSelect ? true : (focused || hasValue)

  const Tag = isSelect ? 'select' : rows ? 'textarea' : 'input'

  return (
    <motion.div
      custom={name === 'name' ? 0 : name === 'email' ? 1 : name === 'projectType' ? 2 : 3}
      variants={fieldVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isActive
            ? '-top-2.5 text-xs font-medium text-accent-600 bg-white px-1'
            : 'top-3 text-sm text-text-subtle'
        }`}
        style={{
          transform: isActive ? 'translateY(0) scale(1)' : 'translateY(0) scale(1)',
          zIndex: 1,
        }}
      >
        {label}
      </label>
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pt-4"
          required={required}
        >
          <option value="">{placeholder}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <Tag
          type={!rows ? type : undefined}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={isActive ? placeholder : ''}
          className="w-full pt-4"
          required={required}
          rows={rows}
        />
      )}
    </motion.div>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', projectType: '', message: '' })
        toast.success(data.message)
        setTimeout(() => setSubmitted(false), 4000)
      } else {
        toast.error(data.message || 'Something went wrong')
      }
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <Helmet>
        <title>Contact — WAVE INIT | Get in Touch</title>
        <meta
          name="description"
          content="Contact WAVE INIT for AI product development, LMS portals, and custom AI solutions. We reply within 24 hours."
        />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="neural-bg-section-alt py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
                Let's <span className="text-accent-600">Build</span> Something.
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-text-muted leading-relaxed">
                Tell us what you need. We'll figure out how to make it happen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 md:py-32 neural-bg-section-solid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Left - Info (40%) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-2 space-y-4"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-3">
                    Get in Touch
                  </h2>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Whether you have a clear vision or just an idea, drop us a message. We will get back within 24 hours with a plan.
                  </p>
                </div>

                <div className="space-y-3">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl bg-bg-secondary border border-border-light hover:border-border-accent transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-accent-600" />
                      </div>
                      <div>
                        <div className="text-xs text-text-muted font-medium">{item.label}</div>
                        <div className="text-sm text-text-primary group-hover:text-accent-600 transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-accent-50 border border-border-accent">
                  <Clock className="w-5 h-5 text-accent-600" />
                  <span className="text-sm font-medium text-text-primary">
                    Typically within 24 hours
                  </span>
                </div>
              </motion.div>

              {/* Right - Form (60%) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="lg:col-span-3"
              >
                <div className="bg-white border border-border-light rounded-2xl p-8"
                  style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)' }}
                >
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FloatingInput
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                        <FloatingInput
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          required
                        />
                      </div>

                      <FloatingInput
                        label="Project Type"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        placeholder="Select project type"
                        required
                        isSelect
                        options={[
                          { value: 'lms', label: 'AI LMS Portal' },
                          { value: 'ai-product', label: 'Custom AI Product' },
                          { value: 'chatbot', label: 'AI Chatbot' },
                          { value: 'ml', label: 'ML Models' },
                          { value: 'dashboard', label: 'AI Dashboard' },
                          { value: 'consulting', label: 'Consulting & Strategy' },
                          { value: 'other', label: 'Other' },
                        ]}
                      />

                      <FloatingInput
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, goals, and timeline..."
                        required
                        rows={6}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      >
                        <button
                          type="submit"
                          disabled={submitted || loading}
                          className="w-full py-3.5 px-6 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-150 bg-accent-600 text-white hover:bg-green-700 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
                        >
                          {submitted ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Sent! We'll reply within 24 hours
                            </>
                          ) : loading ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Send Message
                            </>
                          )}
                        </button>
                      </motion.div>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Direct email CTA */}
        <section className="py-16 neural-bg-section-alt border-t border-border-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-4">
                Prefer to Email Directly?
              </h2>
              <p className="text-text-muted mb-4">
                No problem. Send us a note at:
              </p>
              <a
                href="mailto:wave.init.45@gmail.com"
                className="inline-flex items-center gap-2 text-accent-600 hover:text-green-700 transition-colors font-mono text-lg"
              >
                <Mail className="w-5 h-5" />
                wave.init.45@gmail.com
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
