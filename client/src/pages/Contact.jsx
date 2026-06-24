import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Mail, Briefcase, Camera, Send, CheckCircle2, Clock, ChevronDown } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { cn } from '@lib/utils'

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
        className={cn(
          "absolute left-4 transition-all duration-200 pointer-events-none px-1 rounded z-10",
          isActive
            ? "-top-2 text-xs font-semibold text-accent-600 bg-white"
            : rows
              ? "top-4 text-sm text-text-subtle"
              : "top-3.5 text-sm text-text-subtle"
        )}
      >
        {label}
      </label>
      {isSelect ? (
        <div className="relative w-full flex items-center">
          <select
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full px-4 pt-5 pb-2 text-sm text-text-primary bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-600/10 focus:border-accent-600 transition-all duration-150 appearance-none cursor-pointer"
            required={required}
          >
            <option value="" disabled>{placeholder}</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white text-text-primary">{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 w-4 h-4 text-text-subtle pointer-events-none transition-transform duration-200" />
        </div>
      ) : (
        <Tag
          type={!rows ? type : undefined}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={isActive ? placeholder : ''}
          className={cn(
            "w-full px-4 pt-5 pb-2 text-sm text-text-primary bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-600/10 focus:border-accent-600 transition-all duration-150",
            rows ? "resize-none" : ""
          )}
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
        <section className="relative py-20 md:py-24 overflow-hidden gradient-mesh border-b border-border-light/40">
          <div className="absolute inset-0 dot-grid pointer-events-none" />
          <div className="neural-bg-spotlight" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60 pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50/80 border border-accent-100 text-accent-600 text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 badge-glow-dot" />
                Collaborate with us
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6 leading-tight">
                Let's <span className="text-accent-600 bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent">Build</span> Something.
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-text-muted leading-relaxed">
                Tell us what you need. We'll figure out how to make it happen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-20 neural-bg-section-solid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Left - Info (40%) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 space-y-6"
              >
                <div className="mb-2">
                  <h2 className="text-2xl font-extrabold tracking-tight text-text-primary mb-3">
                    Get in Touch
                  </h2>
                  <p className="text-text-muted text-sm leading-relaxed max-w-sm">
                    Whether you have a clear vision or just a rough idea, drop us a message. We will get back to you within 24 hours with an actionable plan.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-slate-100 hover:border-accent-200/50 hover:bg-white/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-50 to-accent-100/50 border border-accent-200/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <item.icon className="w-5 h-5 text-accent-600" />
                      </div>
                      <div>
                        <div className="text-[11px] text-text-subtle font-semibold uppercase tracking-wider">{item.label}</div>
                        <div className="text-sm font-medium text-text-primary group-hover:text-accent-600 transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-accent-50/50 to-accent-100/20 border border-accent-200/20">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-500"></span>
                  </div>
                  <span className="text-xs font-medium text-text-secondary">
                    Active &mdash; Response time: <strong className="text-accent-700 font-bold">Under 24 hours</strong>
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
                <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10">
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
                          className={cn(
                            "w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:pointer-events-none",
                            submitted 
                              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                              : "gradient-btn btn-hover shadow-lg shadow-accent-600/10"
                          )}
                        >
                          {submitted ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 animate-bounce" />
                              Message Sent Successfully!
                            </>
                          ) : loading ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending Message...
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
        <section className="py-12 bg-white/20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 sm:p-8 max-w-xl mx-auto border border-accent-100/30"
            >
              <h2 className="text-xl font-bold tracking-tight text-text-primary mb-2">
                Prefer to Email Directly?
              </h2>
              <p className="text-text-muted text-sm mb-4">
                Skip the form and drop us a direct message anytime.
              </p>
              <a
                href="mailto:wave.init.45@gmail.com"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white border border-slate-150 text-accent-600 hover:text-accent-700 hover:border-accent-200 hover:shadow-sm transition-all duration-300 font-mono text-sm sm:text-base group font-semibold"
              >
                <Mail className="w-4 h-4 text-accent-600 group-hover:scale-110 transition-transform duration-200" />
                wave.init.45@gmail.com
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
