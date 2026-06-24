import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@lib/utils'

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Services', href: '/#services' },
  { name: 'Our Work', href: '/#our-work' },
  { name: 'About', href: '/about' },
  { name: 'LMS', href: '/lms' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [prevPathname, setPrevPathname] = useState(location.pathname)

  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname)
    setMobileOpen(false)
    setActiveSection('')
  }

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavLinkClick = (e, href) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault()
      const targetId = href.replace('/#', '')
      const element = document.getElementById(targetId)
      if (element) {
        const navbarHeight = 80
        const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight
        window.scrollTo({ top, behavior: 'smooth' })
        window.history.pushState(null, '', href)
      }
    }
  }

  useEffect(() => {
    if (location.pathname !== '/') return

    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollPos = window.scrollY + 120
      
      let activeSectionId = 'home'
      
      sections.forEach((section) => {
        const top = section.offsetTop
        const height = section.offsetHeight
        if (scrollPos >= top && scrollPos < top + height) {
          activeSectionId = section.id
        }
      })

      setActiveSection(activeSectionId)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    const timerId = setTimeout(handleScroll, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timerId)
    }
  }, [location.pathname])

  const getIsActive = (linkHref) => {
    if (linkHref.startsWith('/#')) {
      return location.pathname === '/' && activeSection === linkHref.replace('/#', '')
    }
    return location.pathname === linkHref
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-300 min-h-[72px] flex items-center overflow-visible',
          scrolled
            ? 'bg-white/88 backdrop-blur-xl border-b border-border-light/60 shadow-sm py-3'
            : 'bg-white/80 backdrop-blur-sm border-b border-transparent py-4'
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 group">
              <span className="text-xl font-extrabold tracking-tight text-text-primary transition-colors duration-300">
                WAVE{' '}
                <span className="text-accent-600 transition-colors duration-300">
                  INIT
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = getIsActive(link.href)
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={cn(
                      'nav-link relative text-sm font-medium transition-colors duration-200 pb-2 overflow-visible',
                      isActive ? 'active text-text-primary' : 'text-text-muted hover:text-text-primary'
                    )}
                    data-section={link.href.replace('/#', '')}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-accent-600 rounded-lg hover:bg-green-700 transition-all duration-200 btn-hover"
              >
                Get a Free Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 text-text-muted hover:text-text-primary transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = getIsActive(link.href)
                    return (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={(e) => {
                          handleNavLinkClick(e, link.href)
                          setMobileOpen(false)
                        }}
                        className={cn(
                          'nav-link-mobile py-3 text-base font-medium transition-colors duration-200',
                          isActive ? 'text-accent-600 font-semibold' : 'text-text-muted hover:text-text-primary'
                        )}
                        data-section={link.href.replace('/#', '')}
                      >
                        {link.name}
                      </Link>
                    )
                  })}
                </nav>
                <div className="mt-auto pt-6 border-t border-border-light">
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-white bg-accent-600 rounded-lg hover:bg-green-700 transition-all duration-150"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get a Free Demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
