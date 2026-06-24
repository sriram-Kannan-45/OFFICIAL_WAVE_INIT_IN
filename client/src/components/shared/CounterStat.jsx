import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function CounterStat({ value, suffix = '', label, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    if (!inView) return

    const numericValue = parseFloat(value)
    const isFloat = value.includes('.')
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numericValue * eased

      countRef.current = isFloat ? Number(current.toFixed(1)) : Math.floor(current)
      setCount(countRef.current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, value, duration])

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-text-secondary text-sm md:text-base font-medium tracking-wide uppercase">
        {label}
      </div>
    </div>
  )
}
