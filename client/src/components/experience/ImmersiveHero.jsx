import { useRef } from 'react'
import HeroScrollVideo from './HeroScrollVideo'

export default function ImmersiveHero() {
  const containerRef = useRef(null)

  return (
    <section
      id="home"
      ref={containerRef}
      className="wi-hero-scroll-container"
      aria-label="Wave Init 3D Cinematic Hero"
    >
      <HeroScrollVideo containerRef={containerRef} />
    </section>
  )
}
