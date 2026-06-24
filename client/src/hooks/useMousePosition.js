import { useState, useEffect } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}

export function useSmoothMouse(smoothing = 0.15) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [target, setTarget] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTarget({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    let raf
    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (target.x - prev.x) * smoothing,
        y: prev.y + (target.y - prev.y) * smoothing,
      }))
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [target, smoothing])

  return position
}
