import { useEffect, useRef } from 'react'
import WaveEngine from './WaveEngine'

const CHIPS = [
  { label: 'AI', top: '16%', left: '9%', delay: '0s' },
  { label: 'Web Development', top: '26%', right: '8%', delay: '0.8s' },
  { label: 'Product Engineering', top: '48%', left: '5%', delay: '1.6s' },
  { label: 'Automation', top: '62%', right: '6%', delay: '0.4s' },
  { label: 'UI/UX', top: '74%', left: '13%', delay: '1.1s' },
  { label: 'Cloud', top: '20%', left: '38%', delay: '1.9s' },
  { label: 'Data', top: '70%', right: '20%', delay: '0.6s' },
  { label: 'Innovation', top: '82%', left: '40%', delay: '1.4s' },
]

export default function ImmersiveHero() {
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)
  const engineRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 720px)').matches
    const engine = new WaveEngine(canvasRef.current, {
      density: isMobile ? 0.45 : 1,
      showNodes: !isMobile,
    })
    engineRef.current = engine

    const onScroll = () => {
      const r = sectionRef.current.getBoundingClientRect()
      const total = r.height + window.innerHeight
      const passed = Math.min(1, Math.max(0, -r.top / total + 0.5))
      engine.setScroll(passed)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    if (!reduce) engine.start()
    onScroll()
    return () => {
      engine.destroy()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section id="home" ref={sectionRef} className="wi-section wi-hero" aria-label="Wave Init hero">
      <canvas ref={canvasRef} className="wi-hero-canvas" aria-hidden="true" />

      {/* floating glass chips (desktop) */}
      <div className="wi-chip-field" aria-hidden="true">
        {CHIPS.map((c) => (
          <div key={c.label} className="wi-chip" style={{ ...c, animationDelay: c.delay }}>
            <b>◆</b>
            {c.label}
          </div>
        ))}
      </div>

      <div className="wi-hero-inner">
        <span className="wi-hero-badge wi-reveal">
          <i />
          AI Product Development Studio
        </span>

        <h1 className="wi-title" style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6rem)' }}>
          Build <em>Smarter.</em>
          <br />
          Ship <em>Faster.</em>
        </h1>

        <p className="wi-lede wi-reveal" style={{ marginInline: 'auto' }}>
          We're a full-stack AI studio that builds production-ready software.
          React, Node.js, OpenAI, real-time systems — from scratch, fast.
          No fluff. No fake metrics. Just real code and real results.
        </p>

        <div
          className="wi-reveal"
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.2rem' }}
        >
          <a href="#contact" className="wi-cta">
            Start a Project →
          </a>
          <a href="#services" className="wi-cta wi-cta--ghost">
            Explore Our Services
          </a>
        </div>
      </div>

      <div className="wi-scroll-hint" aria-hidden="true">
        Scroll
        <span />
      </div>
    </section>
  )
}
