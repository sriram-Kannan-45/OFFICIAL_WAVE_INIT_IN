import { useEffect, useRef } from 'react'
import useReveal from './useReveal'

const REASONS = [
  { title: 'Innovation-Driven', body: 'AI-first thinking in every architecture decision.' },
  { title: 'Custom Solutions', body: 'No templates. Every product is engineered for your problem.' },
  { title: 'Scalable Architecture', body: 'Built to grow from first user to first million.' },
  { title: 'End-to-End Delivery', body: 'Strategy, design, code, deploy, support — one team.' },
  { title: 'User-Focused Design', body: 'Interfaces your users actually enjoy using.' },
  { title: 'Reliable Execution', body: 'Real code, real timelines, continuous support.' },
]

export default function WhyWaveInit() {
  const ref = useReveal()
  const orbitRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    let raf
    const tick = () => {
      const orbit = orbitRef.current
      if (orbit) {
        const cards = orbit.querySelectorAll('.wi-orbit-card')
        const t = performance.now() / 1000
        const R = Math.min(window.innerWidth * 0.36, 320)
        cards.forEach((c, i) => {
          const a = t * 0.12 + (i / cards.length) * Math.PI * 2
          const x = Math.cos(a) * R
          const y = Math.sin(a) * R * 0.42
          const z = (Math.sin(a) + 1) / 2
          c.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${0.8 + z * 0.3})`
          c.style.opacity = (0.45 + z * 0.55).toFixed(2)
          c.style.zIndex = Math.round(z * 10)
        })
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section id="why" ref={ref} className="wi-section" aria-label="Why Wave Init">
      <span className="wi-kicker wi-reveal">Why Wave Init</span>
      <h2 className="wi-title wi-reveal">
        Engineering You Can <em>Trust</em>
      </h2>
      <p className="wi-lede wi-reveal">
        A partner, not a vendor. We take ownership of your product from the first
        whiteboard sketch to production — and stay for the scale-up.
      </p>

      <div className="wi-orbit" ref={orbitRef}>
        <div className="wi-core" aria-hidden="true">
          <span>WAVE INIT CORE</span>
        </div>
        {REASONS.map((r) => (
          <div key={r.title} className="wi-glass wi-orbit-card">
            <b>{r.title}</b>
            {r.body}
          </div>
        ))}
      </div>
    </section>
  )
}
