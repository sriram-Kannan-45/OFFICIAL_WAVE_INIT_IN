import { useEffect, useRef } from 'react'

export default function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let nodes = []
    let signals = []
    let lastSignalTime = 0
    let resizeTimer
    let reducedMotion = false
    let frameCount = 0
    let lastFpsCheck = 0
    let skipLines = false

    const mmq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion = mmq.matches
    const handleMotionChange = (e) => { reducedMotion = e.matches }
    mmq.addEventListener('change', handleMotionChange)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      if (w === 0 || h === 0) return
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initNodes()
    }

    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 250)
    }

    const initNodes = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const isMobile = w < 768
      const count = isMobile ? 20 : 40

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.3 + 0.35,
        isActive: Math.random() < 0.1,
        baseR: 0,
      }))

      nodes.forEach((n) => { n.baseR = n.r })
    }

    const drawNode = (node) => {
      if (!reducedMotion) {
        node.phase += 0.018
        node.x += node.vx
        node.y += node.vy
      }

      const w = window.innerWidth
      const h = window.innerHeight
      if (node.x < 0 || node.x > w) node.vx *= -1
      if (node.y < 0 || node.y > h) node.vy *= -1
    }

    const drawConnections = () => {
      if (skipLines) return
      const maxDistSq = 19600 // 140 * 140
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / 140) * 0.18

            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(22, 163, 74, ${alpha})`
            ctx.lineWidth = 0.5 + (1 - dist / 140) * 0.4
            ctx.stroke()
          }
        }
      }
    }

    const spawnSignal = () => {
      if (signals.length >= 4) return
      if (nodes.length < 2) return
      const i = Math.floor(Math.random() * nodes.length)
      let j = Math.floor(Math.random() * nodes.length)
      while (j === i) j = Math.floor(Math.random() * nodes.length)
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      if (Math.sqrt(dx * dx + dy * dy) < 140) {
        signals.push({
          from: i, to: j,
          startTime: performance.now(),
          duration: 1500 + Math.random() * 1500,
        })
      }
    }

    const drawSignals = (now) => {
      if (skipLines) {
        signals = []
        return
      }
      signals = signals.filter((sig) => {
        const elapsed = now - sig.startTime
        const progress = Math.min(elapsed / sig.duration, 1)
        if (progress >= 1) return false

        const fromNode = nodes[sig.from]
        const toNode = nodes[sig.to]
        if (!fromNode || !toNode) return false

        const x = fromNode.x + (toNode.x - fromNode.x) * progress
        const y = fromNode.y + (toNode.y - fromNode.y) * progress
        const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x)

        for (let t = 0; t < 4; t++) {
          const tp = t / 4
          const tx = x - Math.cos(angle) * 14 * tp
          const ty = y - Math.sin(angle) * 14 * tp
          const tr = 2 * (1 - tp * 0.8)
          const ta = (0.5 - tp * 0.4) * (1 - progress * 0.4)
          if (ta <= 0) continue
          ctx.beginPath()
          ctx.arc(tx, ty, tr, 0, Math.PI * 2)
          ctx.fillStyle = '#4ade80'
          ctx.globalAlpha = ta
          ctx.fill()
          ctx.globalAlpha = 1
        }

        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = '#bbf7d0'
        ctx.globalAlpha = 1 - progress * 0.3
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 1, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.globalAlpha = 0.7 * (1 - progress * 0.3)
        ctx.fill()
        ctx.globalAlpha = 1

        return true
      })
    }

    const draw = (now) => {
      frameCount++
      if (now - lastFpsCheck > 1000) {
        if (window.innerWidth < 768 && frameCount < 30) {
          skipLines = true
        } else {
          skipLines = false
        }
        frameCount = 0
        lastFpsCheck = now
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      drawConnections()
      nodes.forEach(drawNode)
      drawSignals(now)

      if (!reducedMotion && now - lastSignalTime > 2000 + Math.random() * 1500) {
        spawnSignal()
        lastSignalTime = now
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    animationId = requestAnimationFrame(draw)

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId)
      } else {
        animationId = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    window.addEventListener('resize', debouncedResize)

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(resizeTimer)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('resize', debouncedResize)
      mmq.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
