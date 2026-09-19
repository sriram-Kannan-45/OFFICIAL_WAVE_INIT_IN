import { useEffect, useRef } from 'react'
import useReveal from './useReveal'

const CARDS = [
  {
    num: '01',
    title: 'Who We Are',
    body: 'WAVE INIT is a full-stack AI product studio. We design and engineer custom software — LMS portals, dashboards, chatbots, real-time systems — built for your business from the ground up.',
    depth: -18,
  },
  {
    num: '02',
    title: 'What We Build',
    body: 'Production-ready AI-powered products: web platforms, intelligent automation, data-driven interfaces and APIs — engineered end-to-end, from first commit to deployment.',
    depth: 10,
  },
  {
    num: '03',
    title: 'AI-First Mindset',
    body: 'Every product we ship treats intelligence as a feature, not an afterthought. OpenAI, ML pipelines and automation are woven into the architecture from day one.',
    depth: -6,
  },
]

export default function About3D() {
  const ref = useReveal()
  const gridRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const onScroll = () => {
      if (!gridRef.current) return
      const r = gridRef.current.getBoundingClientRect()
      const p = 1 - Math.min(1, Math.max(0, r.top / window.innerHeight))
      gridRef.current.style.setProperty('--depth-p', p.toFixed(3))
      gridRef.current.querySelectorAll('.wi-about-card').forEach((card, i) => {
        const d = parseFloat(card.dataset.depth || 0)
        card.style.transform = `translateY(${(1 - p) * (60 + i * 24) * Math.sign(d || 1)}px) translateZ(${d * p}px) scale(${0.94 + p * 0.06})`
        card.style.opacity = (0.3 + p * 0.7).toFixed(2)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="about" ref={ref} className="wi-section" aria-label="About Wave Init">
      <span className="wi-kicker wi-reveal">Who We Are</span>
      <h2 className="wi-title wi-reveal">
        A Studio Built on <em>Intelligence</em>
      </h2>
      <p className="wi-lede wi-reveal">
        WAVE INIT Solutions is an AI-first software studio. We combine product engineering,
        modern web technology and applied machine learning to turn ambitious ideas into
        reliable, scalable products.
      </p>

      <div className="wi-about-grid" ref={gridRef} style={{ perspective: '1000px' }}>
        {CARDS.map((c) => (
          <article key={c.num} className="wi-glass wi-about-card" data-depth={c.depth}>
            <span className="wi-num">{c.num}</span>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
