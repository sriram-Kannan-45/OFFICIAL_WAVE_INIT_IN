import { useEffect, useRef } from 'react'

const TOTAL_FRAMES = 120

export default function ScrollVideoBackground() {
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const lastDrawnFrameRef = useRef(-1)
  const rafIdRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Resize handler keeping cover aspect ratio & DPR
    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      if (lastDrawnFrameRef.current >= 0) {
        drawFrame(lastDrawnFrameRef.current)
      }
    }

    // Draw a specific frame with object-fit: cover and nearest-frame fallback
    const drawFrame = (frameIndex) => {
      let img = imagesRef.current[frameIndex]

      // Fallback to nearest available frame if requested frame is still decoding
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const down = frameIndex - offset
          const up = frameIndex + offset
          if (down >= 0 && imagesRef.current[down]?.complete && imagesRef.current[down]?.naturalWidth > 0) {
            img = imagesRef.current[down]
            break
          }
          if (up < TOTAL_FRAMES && imagesRef.current[up]?.complete && imagesRef.current[up]?.naturalWidth > 0) {
            img = imagesRef.current[up]
            break
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return

      const cw = canvas.width
      const ch = canvas.height
      const iw = img.naturalWidth
      const ih = img.naturalHeight

      // Object-fit: cover calculation
      const ratio = Math.max(cw / iw, ch / ih)
      const nw = iw * ratio
      const nh = ih * ratio
      const ox = (cw - nw) / 2
      const oy = (ch - nh) / 2

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, cw, ch)
      ctx.drawImage(img, ox, oy, nw, nh)
      lastDrawnFrameRef.current = frameIndex
    }

    const getFrameUrl = (idx) => {
      const num = String(idx + 1).padStart(4, '0')
      return `/frames/frame_${num}.webp`
    }

    // Initialize frame array
    imagesRef.current = new Array(TOTAL_FRAMES)

    // Helper to create and decode an image
    const loadSingleFrame = (i) => {
      const img = new Image()
      img.src = getFrameUrl(i)
      imagesRef.current[i] = img
      if (img.decode) {
        img.decode().catch(() => {})
      }
      return img
    }

    // Immediately load the first frame for instantaneous Hero display
    const firstImg = loadSingleFrame(0)
    firstImg.onload = () => {
      updateCanvasSize()
      drawFrame(0)
    }

    // Concurrently preload all frames aggressively (total size is only ~3.5MB)
    // Batch 1: Immediate next 30 frames
    for (let i = 1; i < Math.min(30, TOTAL_FRAMES); i++) {
      loadSingleFrame(i)
    }

    // Batch 2: Remaining frames fetched without artificial delay
    setTimeout(() => {
      for (let i = 30; i < TOTAL_FRAMES; i++) {
        loadSingleFrame(i)
      }
    }, 50)

    // Direct, zero-delay scroll synchronization
    const syncFrameToScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll <= 0) return
      const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll))
      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1)))
      )

      if (targetFrame !== lastDrawnFrameRef.current) {
        drawFrame(targetFrame)
      }
    }

    // Direct event-level reaction: scrub instantly on mousewheel/trackpad tick
    const onScroll = () => {
      syncFrameToScroll()
    }

    // RAF loop ensures smooth catch-up during touch deceleration and momentum scrolling
    const loop = () => {
      syncFrameToScroll()
      rafIdRef.current = requestAnimationFrame(loop)
    }

    window.addEventListener('resize', updateCanvasSize, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    updateCanvasSize()
    syncFrameToScroll()

    if (!prefersReducedMotion) {
      rafIdRef.current = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      window.removeEventListener('scroll', onScroll)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 w-full h-screen pointer-events-none z-0 overflow-hidden bg-white"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover"
      />
      {/* Subtle contrast protection overlay */}
      <div className="absolute inset-0 bg-white/[0.22] pointer-events-none" />
    </div>
  )
}
