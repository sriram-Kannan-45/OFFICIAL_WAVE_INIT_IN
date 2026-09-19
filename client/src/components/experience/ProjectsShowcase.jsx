import { useEffect, useRef } from 'react'
import useReveal from './useReveal'
import TiltCard from './TiltCard'

/**
 * Real Wave Init work — from the existing Products/LMS pages.
 * No invented clients or metrics; structure ready for real case studies.
 */
const PROJECTS = [
  {
    name: 'AI Learning Management System',
    cat: 'AI Product · Education',
    body: 'A full AI-powered LMS platform — courses, progress tracking, intelligent assistance and real-time analytics, built end-to-end with React and Node.js.',
    tags: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
    href: '/lms',
  },
  {
    name: 'AI Chatbots & Assistants',
    cat: 'AI Solutions',
    body: 'Conversational AI products integrated into real business workflows — context-aware, reliable, and production-hardened.',
    tags: ['OpenAI', 'FastAPI', 'Python'],
    href: '/services',
  },
  {
    name: 'Custom Dashboards & Platforms',
    cat: 'Product Engineering',
    body: 'Data-rich dashboards and internal platforms that turn business data into decisions — real-time, scalable, clean.',
    tags: ['TypeScript', 'PostgreSQL', 'Socket.IO'],
    href: '/products',
  },
]

export default function ProjectsShowcase() {
  const ref = useReveal()
  const rowsRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const rows = rowsRef.current?.querySelectorAll('.wi-project-row') || []
    const onScroll = () => {
      rows.forEach((row) => {
        const r = row.getBoundingClientRect()
        const center = r.top + r.height / 2 - window.innerHeight / 2
        const focus = Math.max(0, 1 - Math.abs(center) / (window.innerHeight * 0.8))
        const shot = row.querySelector('.wi-project-shot')
        const info = row.querySelector('.wi-project-info')
        if (shot) {
          shot.style.transform = `perspective(1100px) rotateY(${(center / window.innerHeight) * -10}deg) translateZ(${focus * 50}px) scale(${0.94 + focus * 0.06})`
          shot.style.boxShadow = `0 40px 90px rgba(0,0,0,0.55), 0 0 ${focus * 70}px rgba(34,197,94,${(focus * 0.14).toFixed(2)})`
        }
        if (info) {
          info.style.opacity = (0.45 + focus * 0.55).toFixed(2)
          info.style.transform = `translateX(${center * -0.03}px)`
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="projects" ref={ref} className="wi-section" aria-label="Projects">
      <span className="wi-kicker wi-reveal">Selected Work</span>
      <h2 className="wi-title wi-reveal">
        Products We've <em>Shipped</em>
      </h2>
      <p className="wi-lede wi-reveal">
        Real products, built from the ground up for real use.
      </p>

      <div ref={rowsRef}>
        {PROJECTS.map((p, i) => (
          <div key={p.name} className={`wi-project-row ${i % 2 ? 'wi-row-flip' : ''}`}>
            <TiltCard
              as="div"
              className="wi-project-shot"
              role="img"
              aria-label={`Preview of ${p.name}`}
              style={i % 2 ? { order: 2 } : undefined}
              maxTilt={7}
              glare={true}
            >
              <div className="wi-shot-bar">
                <i /><i /><i />
              </div>
            </TiltCard>
            <div className="wi-project-info">
              <span className="wi-project-cat">{p.cat}</span>
              <h3>{p.name}</h3>
              <p>{p.body}</p>
              <div className="wi-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <a href={p.href} className="wi-cta wi-cta--ghost">
                View Project →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
