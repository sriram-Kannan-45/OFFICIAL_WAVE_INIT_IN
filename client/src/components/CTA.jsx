import { useState } from 'react'
import { Mail, Send, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

const LinkedInIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
)

const InstagramIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

export default function CTA() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setErrorMessage('')
    const form = e.currentTarget
    try {
      const formData = new FormData(form)
      const payload = Object.fromEntries(formData.entries())

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send message. Please try again.')
      }

      setSent(true)
      toast.success(data.message || 'Message sent! We will reply within 24 hours.')
      form.reset()
      setTimeout(() => setSent(false), 5000)
    } catch (err) {
      console.error('Contact submission error:', err)
      setErrorMessage(err.message || 'Failed to send message. Please email us directly at wave.init.45@gmail.com.')
      toast.error(err.message || 'Failed to send message.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative min-h-[110vh] flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Contact and Call to Action"
    >
      {/* Top Banner Callout */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 border border-green-200/80 text-xs font-semibold text-[#16a34a] uppercase tracking-wider mb-4">
          Start What's Next
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
          Contact Us:{' '}
          <span className="text-[#16a34a]">Let’s Build Something Intelligent Together</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
          Have an AI product idea, a web platform requirement, or an automation goal? Tell us about your project — we reply within 24 hours.
        </p>
      </div>

      {/* Grid: Form + Direct Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 sm:p-10 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Tell us about your project
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Your Name *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 focus:border-[#16a34a] focus:ring-2 focus:ring-green-400/20 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 focus:border-[#16a34a] focus:ring-2 focus:ring-green-400/20 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Company / Project Name
                </label>
                <input
                  name="company"
                  type="text"
                  placeholder="Acme Labs"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 focus:border-[#16a34a] focus:ring-2 focus:ring-green-400/20 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Project Type
                </label>
                <select
                  name="projectType"
                  defaultValue="AI Software Development"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 focus:border-[#16a34a] focus:ring-2 focus:ring-green-400/20 text-sm text-slate-900 outline-none transition-all"
                >
                  <option>AI Software Development</option>
                  <option>Full-Stack Web Development</option>
                  <option>GenAI Solutions & Assistants</option>
                  <option>AI Product Prototyping & MVP</option>
                  <option>Intelligent Workflows & Automation</option>
                  <option>Internship / Career Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Project Details *
              </label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="What are you building? Please share timeline, key requirements, or existing tech stack..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 focus:border-[#16a34a] focus:ring-2 focus:ring-green-400/20 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-none"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] transition-all duration-200 shadow-md shadow-green-600/20 disabled:opacity-50"
            >
              {sending ? (
                'Sending Message...'
              ) : sent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Message Sent Successfully!
                </>
              ) : (
                <>
                  Send Message <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Direct Channels Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/85 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Direct Communication
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Prefer to connect directly? We welcome conversations with founders, engineering leads, and potential collaborators.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:wave.init.45@gmail.com"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50/90 hover:bg-green-50/80 border border-slate-200/70 hover:border-green-300 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-[#16a34a] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Email
                  </div>
                  <div className="text-sm font-semibold text-slate-900 group-hover:text-[#16a34a] transition-colors">
                    wave.init.45@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/wave-init-227377412/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50/90 hover:bg-green-50/80 border border-slate-200/70 hover:border-green-300 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-[#16a34a] group-hover:scale-105 transition-transform">
                  <LinkedInIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    LinkedIn
                  </div>
                  <div className="text-sm font-semibold text-slate-900 group-hover:text-[#16a34a] transition-colors">
                    linkedin.com/in/wave-init
                  </div>
                </div>
              </a>

              <a
                href="https://www.instagram.com/__wave__init__"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50/90 hover:bg-green-50/80 border border-slate-200/70 hover:border-green-300 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-[#16a34a] group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Instagram
                  </div>
                  <div className="text-sm font-semibold text-slate-900 group-hover:text-[#16a34a] transition-colors">
                    @__wave__init__
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-green-50/80 border border-green-200/80 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#16a34a] mt-1.5 flex-shrink-0 animate-pulse" />
            <div>
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                Open for New Engagements
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Currently booking sprint cycles for Q3/Q4 full-stack and GenAI product builds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
