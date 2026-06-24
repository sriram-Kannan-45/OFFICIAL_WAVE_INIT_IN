import { useEffect, useRef } from 'react'

export default function NeuralNetwork({ className = '' }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let nodes = []
    let signals = []
    let lastSignalTime = 0
    const MAX_DIST = 160
    const HUB_COUNT = 6

    const handleResize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = window.devicePixelRatio || 1
      const width = parent.offsetWidth
      const height = parent.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initNodes()
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }

    const initNodes = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      const isMobile = width < 768
      const count = isMobile ? 25 : 50

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.3 + 0.7,
        isHub: false,
        baseR: 0,
      }))

      nodes.forEach((n) => { n.baseR = n.r })

      const hubIndices = []
      for (let i = 0; i < HUB_COUNT; i++) {
        let idx
        do {
          idx = Math.floor(Math.random() * nodes.length)
        } while (hubIndices.includes(idx))
        hubIndices.push(idx)
        const node = nodes[idx]
        node.isHub = true
        node.r = 5 + Math.random() * 3
        node.baseR = node.r
        node.opacity = 1.0
      }
    }

    const drawNode = (node) => {
      node.phase += 0.02
      node.x += node.vx
      node.y += node.vy

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      if (node.x < 0 || node.x > w) node.vx *= -1
      if (node.y < 0 || node.y > h) node.vy *= -1
    }

    const drawConnections = () => {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const hasMouse = mx !== -9999 && my !== -9999
      const maxDistSq = MAX_DIST * MAX_DIST

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / MAX_DIST) * 0.4

            let mouseBoost = 1
            if (hasMouse) {
              const midX = (nodes[i].x + nodes[j].x) / 2
              const midY = (nodes[i].y + nodes[j].y) / 2
              const mouseDx = midX - mx
              const mouseDy = midY - my
              const mouseDistSq = mouseDx * mouseDx + mouseDy * mouseDy
              if (mouseDistSq < 14400) { // 120 * 120
                mouseBoost = 1.5
              }
            }

            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(22, 163, 74, ${alpha * mouseBoost})`
            ctx.globalAlpha = Math.min(alpha * mouseBoost, 0.6)
            ctx.lineWidth = (0.8 + (1 - dist / MAX_DIST) * 0.4) * mouseBoost
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }
    }

    const spawnSignal = () => {
      if (signals.length >= 5) return
      if (nodes.length < 2) return
      const i = Math.floor(Math.random() * nodes.length)
      let j = Math.floor(Math.random() * nodes.length)
      while (j === i) j = Math.floor(Math.random() * nodes.length)
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      if (Math.sqrt(dx * dx + dy * dy) < MAX_DIST) {
        signals.push({
          from: i, to: j,
          startTime: performance.now(),
          duration: 1500 + Math.random() * 1500,
        })
      }
    }

    const drawSignals = (now) => {
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

        const trailLen = 16
        for (let t = 0; t < 5; t++) {
          const tp = t / 5
          const tx = x - Math.cos(angle) * trailLen * tp
          const ty = y - Math.sin(angle) * trailLen * tp
          const tr = 2.5 * (1 - tp * 0.8)
          const ta = (0.6 - tp * 0.5) * (1 - progress * 0.4)
          if (ta <= 0) continue
          ctx.beginPath()
          ctx.arc(tx, ty, tr, 0, Math.PI * 2)
          ctx.fillStyle = '#4ade80'
          ctx.globalAlpha = ta
          ctx.fill()
          ctx.globalAlpha = 1
        }

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#bbf7d0'
        ctx.globalAlpha = 1 - progress * 0.3
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.globalAlpha = 0.8 * (1 - progress * 0.3)
        ctx.fill()
        ctx.globalAlpha = 1

        return true
      })
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      drawConnections()
      nodes.forEach(drawNode)
      drawSignals(now)

      if (now - lastSignalTime > 1500 + Math.random() * 1500) {
        spawnSignal()
        lastSignalTime = now
      }

      animationId = requestAnimationFrame(draw)
    }

    handleResize()
    animationId = requestAnimationFrame(draw)

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  )
}
