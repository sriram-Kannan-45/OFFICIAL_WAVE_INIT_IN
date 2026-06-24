import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024
      )
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      const tag = e.target.tagName.toLowerCase()
      const isInteractive =
        tag === 'button' ||
        tag === 'a' ||
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        e.target.closest('button, a, [data-cursor-hover]')
      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', () => setIsVisible(false))
    document.addEventListener('mouseenter', () => setIsVisible(true))

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', () => setIsVisible(false))
      document.removeEventListener('mouseenter', () => setIsVisible(true))
    }
  }, [isMobile, cursorX, cursorY, isVisible])

  if (isMobile) return null

  return (
    <>
      {/* Main cursor orb */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 60 : 20,
            height: isHovering ? 60 : 20,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,200,255,0.4) 0%, rgba(0,200,255,0.1) 50%, transparent 70%)',
            boxShadow: isHovering
              ? '0 0 40px rgba(0,200,255,0.4), 0 0 80px rgba(0,200,255,0.2)'
              : '0 0 20px rgba(0,200,255,0.3), 0 0 40px rgba(0,200,255,0.1)',
          }}
        />
      </motion.div>

      {/* Trailing dots */}
      {[0.08, 0.16, 0.24, 0.32, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            animate={{
              width: 4 - i * 0.5,
              height: 4 - i * 0.5,
              opacity: isVisible ? (0.3 - i * 0.05) : 0,
            }}
            transition={{ delay, type: 'spring', damping: 30 - i * 2, stiffness: 200 }}
            className="rounded-full bg-accent-cyan"
          />
        </motion.div>
      ))}
    </>
  )
}
