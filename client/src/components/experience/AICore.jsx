import { useEffect, useRef } from 'react'
import useReveal from './useReveal'

const CAPS = [
  'AI Automation', 'Intelligent Assistants', 'Data Processing',
  'Recommendation Systems', 'Generative AI', 'Smart Workflows',
  'Analytics', 'Machine Learning', 'AI Integrations',
]

export default function AICore() {
  const ref = useReveal()
  const wrapRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const caps = Array.from(wrap.querySelectorAll('.wi-ai-cap'))
    const rings = Array.from(wrap.querySelectorAll('.wi-ai-ring'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf

    const layout = () => {
      const w = wrap.clientWidth
      const h = wrap.clientHeight
      const R = Math.min(w, h) * 0.36
      rings.forEach((r, i) => {
        const size = R * 2 * (0.55 + i * 0.3)
        r.style.width = `${size}px`
        r.style.height = `${size}px`
      })
      caps.forEach((c, i) => {
        const a = (i / caps.length) * Math.PI * 2
        c.style.left = `${w / 2 + Math.cos(a) * R}px`
        c.style.top = `${h / 2 + Math.sin(a) * R * 0.9}px`
      })
    }
    layout()
    window.addEventListener('resize', layout)

    const tick = () => {
      const t = performance.now() / 1000
      if (!reduce) {
        caps.forEach((c, i) => {
          const a = t * 0.08 + (i / caps.length) * Math.PI * 2
          const x = Math.cos(a) * 14
          const y = Math.sin(a) * 10
          c.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`
        })
        const core = wrap.querySelector('.wi-ai-core')
        if (core) core.style.transform = `scale(${1 + Math.sin(t * 1.4) * 0.02})`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', layout)
    }
  }, [])

  return (
    <section id="ai" ref={ref} className="wi-section" aria-label="AI capabilities">
      <span className="wi-kicker wi-reveal">AI Capabilities</span>
      <h2 className="wi-title wi-reveal">
        Intelligence at the <em>Core</em>
      </h2>
      <p className="wi-lede wi-reveal">
        Every Wave Init product is built around applied intelligence — not bolted-on buzzwords.
      </p>

      <div className="wi-ai-wrap" ref={wrapRef}>
        <div className="wi-ai-ring" aria-hidden="true" />
        <div className="wi-ai-ring" aria-hidden="true" />
        <div className="wi-ai-core">AI CORE</div>
        {CAPS.map((c) => (
          <span key={c} className="wi-ai-cap">{c}</span>
        ))}
      </div>
    </section>
  )
}
