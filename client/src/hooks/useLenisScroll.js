import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Global ref so R3F useFrame loops can read current scroll state without React re-renders
export const globalScrollState = {
  progress: 0,
  scrollY: 0,
  velocity: 0,
  heroProgress: 0,
}

const listeners = new Set()

export function subscribeScroll(cb) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function useLenisScroll({ enabled = true } = {}) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
    })

    lenisRef.current = lenis

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update()

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? e.scroll / maxScroll : 0

      globalScrollState.scrollY = e.scroll
      globalScrollState.velocity = e.velocity || 0
      globalScrollState.progress = Math.min(1, Math.max(0, progress))

      // Dedicated progress for hero section (first 100vh - 120vh)
      const heroThreshold = window.innerHeight * 1.2
      globalScrollState.heroProgress = Math.min(1, Math.max(0, e.scroll / heroThreshold))

      listeners.forEach((fn) => fn(globalScrollState))
    })

    // GSAP RAF ticker integration
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerUpdate)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerUpdate)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled])

  return lenisRef
}

export default useLenisScroll
