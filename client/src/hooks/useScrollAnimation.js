import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      from = { opacity: 0, y: 60 },
      to = { opacity: 1, y: 0 },
      duration = 0.8,
      delay = 0,
      stagger = 0,
      start = 'top 85%',
      markers = false,
    } = options

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        markers,
      },
    })

    tl.from(el.children.length > 1 && stagger ? el.children : el, {
      ...from,
      duration,
      delay,
      stagger: stagger || 0,
      ease: 'power3.out',
      ...to,
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

export function useStaggerReveal(stagger = 0.1, start = 'top 85%') {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll('[data-reveal]')
    if (children.length === 0) return

    gsap.set(children, { opacity: 0, y: 40 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
      },
    })

    tl.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger,
      ease: 'power3.out',
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [stagger, start])

  return ref
}
