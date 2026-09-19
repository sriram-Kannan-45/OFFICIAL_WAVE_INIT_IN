import { useEffect, useRef, useState } from 'react'

/**
 * Cinematic preloader: particles drift as circuit streams, converge
 * into a glowing digital wave, then reveal the WAVE INIT logo.
 */
export default function Preloader({ onDone }) {
  const canvasRef = useRef(null)
  const [done, setDone] = useState(false)
  const [reveal, setReveal] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDone(true)
      onDone?.()
      return
    }
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w, h, raf, t = 0

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // converging particles
    const N = Math.min(140, Math.floor((w * h) / 9000))
    const ps = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      ox: Math.random() * w,
      oy: Math.random() * h,
      tw: Math.random() * Math.PI * 2,
      s: Math.random() * 1.4 + 0.5,
    }))

    const DURATION = 2600
    const start = performance.now()

    const frame = (now) => {
      t = Math.min(1, (now - start) / DURATION)
      const ease = 1 - Math.pow(1 - t, 3)
      ctx.clearRect(0, 0, w, h)

      // circuit lines (fade out as convergence completes)
      ctx.strokeStyle = `rgba(34,197,94,${0.05 * (1 - ease)})`
      ctx.lineWidth = 1
      for (let i = 0; i < 6; i++) {
        const y = (h / 7) * (i + 1)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // target wave curve
      const waveY = (x) => h / 2 + Math.sin(x * 0.012 + t * 6) * 60 * ease - (ease - 1) * 0

      for (const p of ps) {
        const tx = p.ox + (w * 0.5 - p.ox) * ease * 0.35 + Math.sin(p.tw + t * 4) * 10
        const targetY = waveY(tx)
        const ty = p.oy + (targetY - p.oy) * ease
        const alpha = 0.35 + 0.5 * ease
        ctx.fillStyle = `rgba(34,197,94,${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(tx, ty, p.s * (0.6 + ease), 0, Math.PI * 2)
        ctx.fill()
        // trailing stream
        ctx.strokeStyle = `rgba(34,197,94,${(0.12 * ease).toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(tx, ty)
        ctx.stroke()
        p.x += (tx - p.x) * 0.14
        p.y += (ty - p.y) * 0.14
      }

      // glowing wave stroke on top
      if (ease > 0.25) {
        const a = (ease - 0.25) / 0.75
        ctx.beginPath()
        for (let x = 0; x <= w; x += 4) {
          const y = waveY(x)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(34,197,94,${(0.75 * a).toFixed(3)})`
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.strokeStyle = `rgba(34,197,94,${(0.2 * a).toFixed(3)})`
        ctx.lineWidth = 9
        ctx.stroke()
      }

      if (t >= 1 && !reveal) {
        setReveal(true)
        setTimeout(() => {
          setDone(true)
          setTimeout(() => onDone?.(), 700)
        }, 1400)
        return
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className={`wi-preloader ${reveal ? 'wi-reveal' : ''} ${done ? 'wi-done' : ''}`} aria-hidden={done}>
      <canvas ref={canvasRef} />
      <div className="wi-preloader-logo">
        WAVE&nbsp;INIT<span className="wi-pl-bar">_</span>
      </div>
    </div>
  )
}
