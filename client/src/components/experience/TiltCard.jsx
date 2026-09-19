import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

export default function TiltCard({
  children,
  className = '',
  style = {},
  maxTilt = 8,
  glare = true,
  as: Component = 'article',
  ...rest
}) {
  const cardRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(() => {
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReducedMotion(e.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const isHovered = useMotionValue(0)

  // Spring physics for authentic physical weight and response
  const springConfig = { damping: 20, stiffness: 280, mass: 0.6 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]), springConfig)

  // Specular glare calculations
  const glareX = useTransform(mouseX, [0, 1], [0, 100])
  const glareY = useTransform(mouseY, [0, 1], [0, 100])
  const glareOpacity = useSpring(isHovered, { damping: 24, stiffness: 260 })

  const glareBackground = useMotionTemplate`radial-gradient(circle 320px at ${glareX}% ${glareY}%, rgba(74, 222, 128, 0.22), transparent 70%)`

  const handlePointerMove = (e) => {
    if (reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(Math.min(1, Math.max(0, x)))
    mouseY.set(Math.min(1, Math.max(0, y)))
  }

  const handlePointerEnter = () => {
    if (!reducedMotion) isHovered.set(1)
  }

  const handlePointerLeave = () => {
    isHovered.set(0)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  if (reducedMotion) {
    return (
      <Component ref={cardRef} className={className} style={style} {...rest}>
        {children}
      </Component>
    )
  }

  return (
    <Component
      ref={cardRef}
      className={`wi-tilt-card-root ${className}`}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
      }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...rest}
    >
      <motion.div
        className="wi-tilt-card-inner"
        style={{
          width: '100%',
          height: '100%',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}

        {/* Specular glare overlay that follows cursor */}
        {glare && (
          <motion.div
            className="wi-glare-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              borderRadius: 'inherit',
              background: glareBackground,
              opacity: glareOpacity,
              zIndex: 10,
              mixBlendMode: 'screen',
            }}
            aria-hidden="true"
          />
        )}
      </motion.div>
    </Component>
  )
}
