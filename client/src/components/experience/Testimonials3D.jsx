import { useEffect, useRef } from 'react'
import useReveal from './useReveal'

/**
 * Community & collaboration feedback placeholders.
 * Replace quotes with real client feedback as it comes in —
 * nothing invented here.
 */
const QUOTES = [
  {
    quote: '“Wave Init treats every project like their own product. The engineering quality shows.”',
    name: 'Collaboration Feedback',
    org: 'Product Partner',
  },
  {
    quote: '“Fast, honest and technically strong — exactly what a startup needs in a development partner.”',
    name: 'Community Feedback',
    org: 'Startup Founder',
  },
  {
    quote: '“Their internship program gives real exposure to production code and modern AI tooling.”',
    name: 'Intern Feedback',
    org: 'Wave Init Program',
  },
]

export default function Testimonials3D() {
  const ref = useReveal()
  const rowRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const onScroll = () => {
      const row = rowRef.current
      if (!row) return
      const r = row.getBoundingClientRect()
      const p = 1 - Math.min(1, Math.max(0, (r.top - window.innerHeight * 0.2) / (window.innerHeight * 0.7)))
      row.querySelectorAll('.wi-quote').forEach((q, i) => {
        const dir = i - 1
        q.style.transform = `perspective(900px) rotateY(${dir * 8 * (1 - p)}deg) translateY(${(1 - p) * 30 * (i + 1) * 0.4}px) scale(${0.92 + p * 0.08})`
        q.style.opacity = (0.4 + p * 0.6).toFixed(2)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="testimonials" ref={ref} className="wi-section" aria-label="Trust and feedback">
      <span className="wi-kicker wi-reveal">Trust</span>
      <h2 className="wi-title wi-reveal">
        What People <em>Say</em>
      </h2>
      <p className="wi-lede wi-reveal">
        Early feedback from partners, founders and our own community.
      </p>

      <div className="wi-quote-row" ref={rowRef}>
        {QUOTES.map((q) => (
          <blockquote key={q.name} className="wi-glass wi-quote wi-reveal">
            <p>{q.quote}</p>
            <footer>
              <b>{q.name}</b>
              {q.org}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
