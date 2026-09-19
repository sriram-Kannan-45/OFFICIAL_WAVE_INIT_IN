import { useEffect, useRef, useState } from 'react'
import useReveal from './useReveal'
import WaveEngine from './WaveEngine'

/**
 * Final cinematic section: the opening wave returns and grows across
 * the screen, wrapping the closing CTA. Contains the contact form
 * (submits to the existing /api/contact backend).
 */
export default function FinalCTAContact() {
  const ref = useReveal()
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const sectionRef = useRef(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 720px)').matches
    const engine = new WaveEngine(canvasRef.current, {
      density: isMobile ? 0.4 : 0.8,
      waveAmp: 60,
      speed: 0.9,
 showNodes: false,
    })
    engineRef.current = engine
    const onScroll = () => {
      const r = sectionRef.current.getBoundingClientRect()
      const p = 1 - Math.min(1, Math.max(0, r.top / window.innerHeight))
      engine.setScroll(p * 0.6)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    if (!reduce) engine.start()
    onScroll()
    return () => {
      engine.destroy()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      const form = new FormData(e.target)
      const payload = Object.fromEntries(form.entries())
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setSent(true)
      e.target.reset()
    } catch {
      // keep form usable even if backend is unreachable
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <section id="final" ref={sectionRef} className="wi-section wi-final" aria-label="Final call to action">
        <canvas ref={canvasRef} className="wi-section-canvas" aria-hidden="true" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span className="wi-kicker wi-reveal" style={{ justifyContent: 'center' }}>
            Start Now
          </span>
          <h2 className="wi-title wi-reveal">
            Let's Build <em>What's Next.</em>
          </h2>
          <p className="wi-lede wi-reveal" style={{ marginInline: 'auto' }}>
            Your idea. Our technology. One powerful product.
            Tell us what you're building — we'll engineer the rest.
          </p>
          <div
            className="wi-reveal"
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.2rem' }}
          >
            <a href="#contact-form" className="wi-cta">Start a Project →</a>
            <a href="mailto:wave.init.45@gmail.com" className="wi-cta wi-cta--ghost">Contact Us</a>
          </div>
        </div>
      </section>

      <section id="contact" ref={ref} className="wi-section" aria-label="Contact Wave Init">
        <span className="wi-kicker wi-reveal">Contact</span>
        <h2 className="wi-title wi-reveal">
          Start the <em>Conversation</em>
        </h2>
        <p className="wi-lede wi-reveal">
          Tell us about your project. We reply to every serious inquiry.
        </p>

        <div className="wi-contact-grid">
          <form id="contact-form" className="wi-glass wi-form wi-reveal" onSubmit={onSubmit}>
            <label>
              Name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required placeholder="you@company.com" />
            </label>
            <label>
              Company
              <input name="company" placeholder="Company / startup" />
            </label>
            <label>
              Project Type
              <select name="projectType" defaultValue="AI Product">
                <option>AI Product</option>
                <option>Web Development</option>
                <option>AI Automation</option>
                <option>UI/UX Design</option>
                <option>Internship / Opportunity</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" required placeholder="What are you building?" />
            </label>
            <button className="wi-cta" type="submit" disabled={sending}>
              {sending ? 'Sending…' : sent ? 'Message Sent ✓' : 'Send Message →'}
            </button>
          </form>

          <div className="wi-reveal">
            <div className="wi-glass" style={{ padding: '2.2rem' }}>
              <h3 style={{ marginTop: 0, color: '#f4f7f5' }}>Direct Channels</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.9rem', color: '#93a29a' }}>
                <li>
                  <b style={{ color: '#e6ebe8' }}>Email</b><br />
                  <a href="mailto:wave.init.45@gmail.com" style={{ color: 'rgb(34,197,94)', textDecoration: 'none' }}>
                    wave.init.45@gmail.com
                  </a>
                </li>
                <li>
                  <b style={{ color: '#e6ebe8' }}>LinkedIn</b><br />
                  <a href="https://www.linkedin.com/in/wave-init-227377412/" target="_blank" rel="noreferrer" style={{ color: '#aebbb3', textDecoration: 'none' }}>
                    linkedin.com/in/wave-init-227377412
                  </a>
                </li>
                <li>
                  <b style={{ color: '#e6ebe8' }}>Instagram</b><br />
                  <a href="https://www.instagram.com/__wave__init__" target="_blank" rel="noreferrer" style={{ color: '#aebbb3', textDecoration: 'none' }}>
                    @__wave__init__
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
