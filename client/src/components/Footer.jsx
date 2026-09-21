import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollTo = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const navOffset = 76
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-white/95 backdrop-blur-xl border-t border-slate-200/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <a
              href="/"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  scrollTo(e, '#home')
                }
              }}
              className="inline-block mb-4 select-none"
            >
              <img
                src="/logo.svg"
                alt="Wave Init Solutions"
                width="160"
                height="35"
                className="h-8 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
              An AI-first product development studio engineering custom software — intelligent, scalable, and built for production.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
              Engineering from Bangalore & Distributed Worldwide
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="#about" onClick={(e) => scrollTo(e, '#about')} className="hover:text-[#16a34a] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, '#services')} className="hover:text-[#16a34a] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#ai-dev" onClick={(e) => scrollTo(e, '#ai-dev')} className="hover:text-[#16a34a] transition-colors">
                  AI & Vibe Coding
                </a>
              </li>
              <li>
                <a href="#process" onClick={(e) => scrollTo(e, '#process')} className="hover:text-[#16a34a] transition-colors">
                  Engineering Process
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => scrollTo(e, '#projects')} className="hover:text-[#16a34a] transition-colors">
                  Selected Work
                </a>
              </li>
            </ul>
          </div>

          {/* Services & Platforms */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, '#services')} className="hover:text-[#16a34a] transition-colors">
                  AI Software Development
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollTo(e, '#services')} className="hover:text-[#16a34a] transition-colors">
                  Full-Stack Applications
                </a>
              </li>
              <li>
                <a href="/lms" className="hover:text-[#16a34a] transition-colors">
                  AI LMS Platform
                </a>
              </li>
              <li>
                <a href="#opportunities" onClick={(e) => scrollTo(e, '#opportunities')} className="hover:text-[#16a34a] transition-colors">
                  Internship Program
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-[#16a34a] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="mailto:wave.init.45@gmail.com" className="hover:text-[#16a34a] transition-colors">
                  wave.init.45@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/wave-init/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#16a34a] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/__wave__init__"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#16a34a] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollTo(e, '#contact')} className="hover:text-[#16a34a] transition-colors">
                  Request a Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-center sm:text-left">
            <div>
              © {new Date().getFullYear()} WAVE INIT SOLUTIONS. All rights reserved.
            </div>
            <span className="hidden sm:inline text-slate-300">•</span>
            <div className="text-slate-500 font-medium">
              MSME Registered | <span className="font-mono text-slate-600">UDYAM-TN-20-0250320</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span>Built with modern AI engineering & full-stack rigor.</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-100 hover:bg-green-50 text-slate-600 hover:text-[#16a34a] transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
