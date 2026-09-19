import { useEffect, useRef } from 'react'

/**
 * useReveal — adds `.wi-in` to `.wi-reveal` children when they enter the
 * viewport. Lightweight IntersectionObserver (no dependency).
 */
export default function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = root.querySelectorAll('.wi-reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('wi-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}
