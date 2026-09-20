import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'AI & Vibe Coding', href: '#ai-dev' },
  { name: 'Process', href: '#process' },
  { name: 'Work', href: '#projects' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Careers', href: '#opportunities' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()

  useEffect(() => {
    let ticking = false
    let lastScrolled = false
    let lastActive = 'home'

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 40
          if (isScrolled !== lastScrolled) {
            lastScrolled = isScrolled
            setScrolled(isScrolled)
          }

          const sections = ['home', 'about', 'services', 'ai-dev', 'process', 'projects', 'why-us', 'opportunities', 'contact']
          const scrollPos = window.scrollY + 140
          let currentSection = 'home'
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i])
            if (el && scrollPos >= el.offsetTop) {
              currentSection = sections[i]
              break
            }
          }
          if (currentSection !== lastActive) {
            lastActive = currentSection
            setActiveSection(currentSection)
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    if (location.pathname !== '/') {
      window.location.href = `/${href}`
      return
    }
    const target = document.querySelector(href)
    if (target) {
      const navOffset = 76
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-3.5'
          : 'bg-white/60 backdrop-blur-md border-b border-slate-100/60 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => scrollTo(e, '#home')}
            className="flex items-center gap-1.5 select-none group"
            aria-label="Wave Init Solutions Home"
          >
            <img
              src="/logo.svg"
              alt="Wave Init Solutions"
              width="160"
              height="35"
              className="h-8 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7" aria-label="Primary Navigation">
            {NAV_LINKS.map((link) => {
              const secId = link.href.replace('#', '')
              const isActive = activeSection === secId
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#16a34a] font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#16a34a] rounded-full" />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] transition-all duration-200 shadow-sm shadow-green-600/20 hover:shadow-green-600/30 active:scale-[0.98]"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-colors"
            aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-xl px-6 py-6 transition-all">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-base font-medium text-slate-700 hover:text-[#16a34a] transition-colors py-1.5"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100">
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] transition-colors"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
