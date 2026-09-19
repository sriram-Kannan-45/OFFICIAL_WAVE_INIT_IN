import { useEffect, useRef } from 'react'
import useReveal from './useReveal'

const STEPS = [
  { name: 'Discover', body: 'We dig into your business, users and goals. Requirements become a concrete technical direction.' },
  { name: 'Plan', body: 'Architecture, milestones and a realistic roadmap. No guesswork — a plan engineered for delivery.' },
  { name: 'Design', body: 'Interface and experience design that balances brand, usability and engineering feasibility.' },
  { name: 'Develop', body: 'Production-grade code in tight iterations. You see real progress every week.' },
  { name: 'Test', body: 'Automated and manual testing across flows, devices and edge cases before anything ships.' },
  { name: 'Launch', body: 'Deployment, monitoring and a clean handover. Your product goes live, stable.' },
  { name: 'Scale', body: 'Performance, features and AI capabilities grow with your product and your users.' },
]

export default function Process3D() {
  const ref = useReveal()
  const stepsRef = useRef(null)

  useEffect(() => {
    const stepsEl = stepsRef.current
    if (!stepsEl) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const line = document.createElement('style')
    // progress line height + active dot via CSS var
    const onScroll = () => {
      if (reduce) return
      const r = stepsEl.getBoundingClientRect()
      const total = r.height
      const passed = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / total))
      stepsEl.style.setProperty('--progress', passed.toFixed(3))
      stepsEl.querySelectorAll('.wi-step').forEach((s, i) => {
        s.classList.toggle('wi-active', (i + 1) / STEPS.length <= passed + 0.001)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="process" ref={ref} className="wi-section wi-process" aria-label="Development process">
      <span className="wi-kicker wi-reveal">How We Work</span>
      <h2 className="wi-title wi-reveal">
        The <em>Wave Init</em> Process
      </h2>
      <p className="wi-lede wi-reveal">
        Seven stages. One continuous pipeline from idea to a product that scales.
      </p>

      <style>{`
        .wi-steps::after { height: calc(var(--progress, 0) * 100%) !important; }
      `}</style>

      <div className="wi-steps" ref={stepsRef}>
        {STEPS.map((s, i) => (
          <div key={s.name} className="wi-step wi-reveal">
            <span className="wi-step-dot" />
            <h3>
              <small>{String(i + 1).padStart(2, '0')}</small>
              {s.name}
            </h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
