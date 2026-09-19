import { useEffect, useRef } from 'react'
import useReveal from './useReveal'

const SERVICES = [
  { icon: '◈', name: 'AI Solutions', body: 'Custom AI features — chatbots, assistants, generative tools — integrated into real products.' },
  { icon: '⬡', name: 'Full Stack Development', body: 'End-to-end web platforms with React, Node.js and modern tooling, built to production standards.' },
  { icon: '✦', name: 'AI Automation', body: 'Intelligent workflows that remove manual work and keep your operations moving 24/7.' },
  { icon: '◧', name: 'Product Development', body: 'From MVP to scalable product: architecture, iteration, and shipping that lasts.' },
  { icon: '❖', name: 'UI/UX Design', body: 'Interfaces that feel effortless — designed for clarity, conversion and your brand.' },
  { icon: '◉', name: 'Backend & APIs', body: 'Robust services, real-time systems and clean APIs that power everything reliably.' },
  { icon: '⌁', name: 'Digital Transformation', body: 'Modernize legacy workflows with cloud-ready, AI-enabled software systems.' },
  { icon: '⬢', name: 'Startup Product Engineering', body: 'Fast, pragmatic engineering for founders who need to launch and iterate quickly.' },
]

export default function Services3D() {
  const ref = useReveal()
  const stageRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const onScroll = () => {
      const stage = stageRef.current
      if (!stage) return
      const r = stage.getBoundingClientRect()
      const p = 1 - Math.min(1, Math.max(0, (r.top - window.innerHeight * 0.2) / (window.innerHeight * 0.7)))
      stage.style.setProperty('--p', p.toFixed(3))
      stage.querySelectorAll('.wi-service-card').forEach((card, i) => {
        const spread = (1 - p) * 120
        const dir = i % 2 === 0 ? -1 : 1
        card.style.transform = `translate3d(${dir * spread}px, ${(1 - p) * 40}px, ${-spread}px) rotateY(${dir * 8 * (1 - p)}deg) scale(${0.9 + p * 0.1})`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="services" ref={ref} className="wi-section" aria-label="Services">
      <span className="wi-kicker wi-reveal">Services</span>
      <h2 className="wi-title wi-reveal">
        What We <em>Engineer</em>
      </h2>
      <p className="wi-lede wi-reveal">
        Full-spectrum product development — from AI features and automation to complete
        web platforms. Everything is custom-built, production-ready, and yours.
      </p>

      <div className="wi-services-stage" ref={stageRef}>
        {SERVICES.map((s) => (
          <article key={s.name} className="wi-glass wi-service-card wi-reveal">
            <div className="wi-ic">{s.icon}</div>
            <h3>{s.name}</h3>
            <p>{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
