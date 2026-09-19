import { useEffect, useRef, useState } from 'react'

const LINKS = [
  ['#home', 'Home'],
  ['#about', 'About'],
  ['#services', 'Services'],
  ['#projects', 'Projects'],
  ['#opportunities', 'Opportunities'],
  ['#contact', 'Contact'],
]

export default function ExperienceNav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      let current = '#home'
      for (const [id] of LINKS) {
        const el = document.querySelector(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      className={`wi-nav ${scrolled ? 'wi-scrolled' : ''} ${open ? 'wi-open' : ''}`}
      aria-label="Primary"
    >
      <a href="#home" className="wi-logo" onClick={(e) => go(e, '#home')} style={{ letterSpacing: '0.25em', fontSize: '0.85rem' }}>
        WAVE<b>INIT</b>
      </a>
      {LINKS.map(([href, label]) => (
        <a
          key={href}
          href={href}
          className={`${active === href ? 'wi-active' : ''} ${label === 'Contact' ? 'wi-nav-cta' : ''}`}
          onClick={(e) => go(e, href)}
        >
          {label}
        </a>
      ))}
      <button className="wi-burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
        {open ? '×' : '≡'}
      </button>
    </nav>
  )
}
