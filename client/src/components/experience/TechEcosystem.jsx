import { useEffect, useRef } from 'react'
import useReveal from './useReveal'

/* Real stack from the Wave Init README / Home ticker */
const TECH = [
  { name: 'React', hot: true }, { name: 'Node.js', hot: true }, { name: 'Python', hot: true },
  { name: 'FastAPI', hot: true }, { name: 'MongoDB', hot: true }, { name: 'PostgreSQL' },
  { name: 'TypeScript' }, { name: 'Next.js' }, { name: 'OpenAI', hot: true },
  { name: 'TensorFlow' }, { name: 'Tailwind CSS' }, { name: 'Socket.IO' },
  { name: 'Docker' }, { name: 'Git' }, { name: 'Cloud' },
]

export default function TechEcosystem() {
  const ref = useReveal()
  const fieldRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    const field = fieldRef.current
    const svg = svgRef.current
    if (!field || !svg) return
    const nodes = Array.from(field.querySelectorAll('.wi-tech-node'))

    const position = () => {
      const w = field.clientWidth
      const h = field.clientHeight
      const cx = w / 2
      const cy = h / 2
      nodes.forEach((n, i) => {
        // ring layout with 3 rings + jitter
        const ring = i % 3
        const count = Math.ceil(nodes.length / 3)
        const idx = Math.floor(i / 3)
        const angle = (idx / count) * Math.PI * 2 + ring * 0.7
        const R = Math.min(w, h) * (0.22 + ring * 0.15)
        const x = cx + Math.cos(angle) * R
        const y = cy + Math.sin(angle) * R * 0.85
        n.style.left = `${x}px`
        n.style.top = `${y}px`
        return { x, y }
      })
      // draw links between neighbours
      const pts = nodes.map((n) => ({
        x: parseFloat(n.style.left),
        y: parseFloat(n.style.top),
      }))
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
      let lines = ''
      pts.forEach((p, i) => {
        pts.forEach((q, j) => {
          if (j > i && Math.hypot(p.x - q.x, p.y - q.y) < Math.min(w, h) * 0.24) {
            lines += `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" stroke="rgba(34,197,94,0.14)" stroke-width="1"/>`
          }
        })
      })
      svg.innerHTML = lines
    }
    position()
    window.addEventListener('resize', position)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    const onScroll = () => {
      if (reduce) return
      const r = field.getBoundingClientRect()
      const p = 1 - Math.min(1, Math.max(0, (r.top - window.innerHeight * 0.25) / (window.innerHeight * 0.6)))
      const drift = (1 - p) * 40
      nodes.forEach((n, i) => {
        const dir = i % 2 === 0 ? 1 : -1
        n.style.transform = `translate(-50%, -50%) translateY(${dir * drift}px) scale(${0.85 + p * 0.15})`
        n.style.opacity = (0.35 + p * 0.65).toFixed(2)
      })
 svg.querySelectorAll('line').forEach((l, i) => {
        l.style.opacity = (0.4 + p * 0.6).toFixed(2)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('resize', position)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="tech" ref={ref} className="wi-section" aria-label="Technology stack">
      <span className="wi-kicker wi-reveal">Technology</span>
      <h2 className="wi-title wi-reveal">
        A Connected <em>Tech Ecosystem</em>
      </h2>
      <p className="wi-lede wi-reveal">
        The stack behind every Wave Init product — chosen for performance,
        reliability and speed of iteration.
      </p>

      <div className="wi-tech-field" ref={fieldRef}>
        <svg ref={svgRef} className="wi-tech-links" width="100%" height="100%" aria-hidden="true" />
        {TECH.map((t) => (
          <span key={t.name} className={`wi-tech-node ${t.hot ? 'wi-hot' : ''}`}>
            {t.name}
          </span>
        ))}
      </div>
    </section>
  )
}
