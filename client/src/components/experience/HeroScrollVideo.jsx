import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 8 Discrete Logical Timeline States across the 0% - 100% Hero Journey
const TIMELINE_STATES = [
  {
    id: 's01-intro',
    range: [0.0, 0.12],
    kicker: 'AI Product Development Studio',
    title: 'Build Smarter.\nShip Faster.',
    desc: "We're a full-stack AI studio that builds production-ready software. React, Node.js, OpenAI, real-time systems — from scratch, fast.",
    ctas: true,
    stats: true,
  },
  {
    id: 's02-architecture',
    range: [0.12, 0.24],
    kicker: '01 / ARCHITECTURE',
    title: 'Modular\nEngineering',
    desc: 'Architected with strict system boundary contracts, distributed event streams, and sub-second execution.',
    tags: ['Modular Core', 'Microservices', 'Zero Technical Debt'],
  },
  {
    id: 's03-approach',
    range: [0.24, 0.36],
    kicker: '02 / APPROACH',
    title: 'Architected for\nNext-Gen AI',
    desc: 'We combine neural intelligence with resilient, high-throughput cloud infrastructure built to scale from day one.',
    tags: ['High Concurrency', 'Sub-Second Latency', 'Cloud-Native'],
  },
  {
    id: 's04-pipelines',
    range: [0.36, 0.48],
    kicker: '03 / PIPELINES',
    title: 'Autonomous Data\nOrchestration',
    desc: 'Streaming data processing with WebSockets, vector embeddings, and autonomous background execution.',
    tags: ['Vector DBs', 'Streaming SSE', 'Multi-Agent Workflows'],
  },
  {
    id: 's05-core',
    range: [0.48, 0.62],
    kicker: '04 / THE CORE',
    title: 'AI-First\nEngineering',
    desc: 'Build intelligent software products that combine modern engineering, automation and AI.',
    tags: ['Autonomous Systems', 'Production-Ready Core'],
    safeZone: true, // Camera zooms deep into central reactor; text is kept narrow and in the far left margin
  },
  {
    id: 's06-integration',
    range: [0.62, 0.74],
    kicker: '05 / INTEGRATION',
    title: 'Intelligent Systems\nIntegration',
    desc: 'Harmonizing machine learning models with enterprise web applications, proprietary LMS tools, and custom APIs.',
    tags: ['High-Concurrency APIs', 'Autonomous Agents', 'Enterprise Security'],
  },
  {
    id: 's07-motion',
    range: [0.74, 0.86],
    kicker: '06 / EXECUTION',
    title: 'Engineering. AI.\nAutomation. Software.',
    desc: 'Full-cycle digital execution from initial prototype to battle-tested enterprise production.',
    tags: ['Full-Cycle Studio', 'CI/CD Pipelines', 'Tailored UX'],
  },
  {
    id: 's08-reveal',
    range: [0.86, 1.0],
    kicker: '07 / READY TO SHIP',
    title: 'Transforming Vision\ninto Software',
    desc: 'Explore how our studio builds production software for ambitious teams.',
    actionCta: true,
  },
]

export default function HeroScrollVideo({ containerRef }) {
  const videoRef = useRef(null)
  const progressTextRef = useRef(null)

  // React state is ONLY used for discrete content switches (8 times across 480vh)
  // NEVER for per-frame scroll progress or currentTime updates!
  const [activeStateIndex, setActiveStateIndex] = useState(0)

  // Motion & Environment Preferences
  const [reducedMotion, setReducedMotion] = useState(() => {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  // Performance Refs
  const isIntersectingRef = useRef(true)
  const isSeekingRef = useRef(false)
  const isLoopRunningRef = useRef(false)
  const videoDurationRef = useRef(10.0)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const currentStateIdxRef = useRef(0)
  const rafIdRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Video metadata & priming
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration || 10.0
      videoDurationRef.current = dur
      // Prime video at opening frame
      try {
        videoRef.current.currentTime = 0.001
      } catch {
        // Ignored if browser requires user gesture
      }
    }
  }

  // Throttled video seeking (Req 4: threshold check & seeking lock)
  const applyVideoTime = useCallback((targetTime) => {
    const video = videoRef.current
    if (!video || video.readyState < 2) return

    // Threshold check: only seek if delta is > 0.025s (prevents excessive seeking storms)
    if (Math.abs(video.currentTime - targetTime) <= 0.025) return

    if (!isSeekingRef.current) {
      isSeekingRef.current = true
      try {
        if ('fastSeek' in video) {
          video.fastSeek(targetTime)
        } else {
          video.currentTime = targetTime
        }
      } catch {
        video.currentTime = targetTime
      }
    }
  }, [])

  // Seek completion callback
  const handleSeeked = () => {
    isSeekingRef.current = false
    // If the scroll target moved while seeking, resume loop to reach latest position
    if (!isLoopRunningRef.current && isIntersectingRef.current && !reducedMotion) {
      const dur = videoDurationRef.current
      const targetTime = Math.max(0.001, Math.min(dur - 0.03, currentProgressRef.current * dur))
      const video = videoRef.current
      if (video && Math.abs(video.currentTime - targetTime) > 0.025) {
        startRaf()
      }
    }
  }

  // RAF Interpolation Loop
  const startRaf = useCallback(() => {
    if (isLoopRunningRef.current || reducedMotion || !isIntersectingRef.current) return
    isLoopRunningRef.current = true

    const update = () => {
      const target = targetProgressRef.current
      const current = currentProgressRef.current
      const diff = target - current

      // Smooth exponential follow
      if (Math.abs(diff) > 0.0003) {
        currentProgressRef.current += diff * 0.12
      } else {
        currentProgressRef.current = target
      }

      const p = currentProgressRef.current
      const dur = videoDurationRef.current

      // Seek video if within bounds
      if (dur > 0) {
        const targetTime = Math.max(0.001, Math.min(dur - 0.03, p * dur))
        applyVideoTime(targetTime)
      }

      // Check logical timeline state: React updates ONLY when crossing state boundaries
      let nextStateIdx = 0
      for (let i = 0; i < TIMELINE_STATES.length; i++) {
        const [start, end] = TIMELINE_STATES[i].range
        if (p >= start && (p < end || i === TIMELINE_STATES.length - 1)) {
          nextStateIdx = i
          break
        }
      }

      if (nextStateIdx !== currentStateIdxRef.current) {
        currentStateIdxRef.current = nextStateIdx
        setActiveStateIndex(nextStateIdx)
      }

      // Direct DOM update for progress readout — ZERO React re-render overhead!
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.round(p * 100)}%`
      }

      // Check if motion has settled so the loop can enter an idle state (saves CPU/GPU)
      const isSettled = Math.abs(diff) <= 0.0003
      if (isSettled && !isSeekingRef.current) {
        isLoopRunningRef.current = false
        rafIdRef.current = null
        return // Sleep until next scroll event!
      }

      rafIdRef.current = requestAnimationFrame(update)
    }

    rafIdRef.current = requestAnimationFrame(update)
  }, [applyVideoTime, reducedMotion])

  const stopRaf = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    isLoopRunningRef.current = false
  }, [])

  // Passive scroll listener (Req 3: single listener, passive, sets target progress ref)
  useEffect(() => {
    if (reducedMotion) return

    const handleScroll = () => {
      if (!isIntersectingRef.current) return
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const totalScrollable = container.offsetHeight - window.innerHeight
      if (totalScrollable <= 0) return

      const scrolled = -rect.top
      const raw = scrolled / totalScrollable
      targetProgressRef.current = Math.max(0, Math.min(1, raw))

      // Wake RAF loop if idle
      if (!isLoopRunningRef.current) {
        startRaf()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [containerRef, reducedMotion, startRaf])

  // IntersectionObserver (Req 5 & 6: Preload & Hero Visibility)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVis = entry.isIntersecting
        isIntersectingRef.current = isVis

        if (isVis) {
          // Switch to preload auto once visible
          if (videoRef.current && videoRef.current.preload !== 'auto') {
            videoRef.current.preload = 'auto'
          }
          startRaf()
        } else {
          // Completely halt RAF and seeking when hero leaves viewport
          stopRaf()
        }
      },
      { threshold: 0 }
    )

    observer.observe(container)
    return () => {
      observer.disconnect()
      stopRaf()
    }
  }, [containerRef, startRaf, stopRaf])

  const activeState = TIMELINE_STATES[activeStateIndex]

  return (
    <div className="wi-hero-sticky-viewport">
      {/* 3D Video Stage — Pristine native white studio background, zero overlays */}
      <div className="wi-hero-video-stage">
        <video
          ref={videoRef}
          preload="metadata"
          playsInline
          muted
          poster="/videos/hero-poster.png"
          onLoadedMetadata={handleLoadedMetadata}
          onSeeked={handleSeeked}
          className="wi-hero-video"
          style={{
            objectPosition: isMobile ? '65% center' : 'center center',
          }}
        >
          {/* WebM with VP9 real-time fast seeking for modern browsers */}
          <source
            src={isMobile ? '/videos/hero_optimized_720p.webm' : '/videos/hero_optimized_1080p.webm'}
            type="video/webm"
          />
          {/* Optimized MP4 (H.264 faststart + keyframes every 4-6 frames) as reliable fallback */}
          <source
            src={isMobile ? '/videos/hero_optimized_720p.mp4' : '/videos/hero_optimized_1080p.mp4'}
            type="video/mp4"
          />
        </video>
      </div>

      {/* Frame-Synchronized Adaptive Content Layer */}
      <div className="wi-hero-content-layer">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeState.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`wi-hero-safe-text-area bg-white/75 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-5 sm:p-0 rounded-2xl sm:rounded-none border border-slate-200/60 sm:border-none shadow-lg sm:shadow-none ${
                activeState.safeZone
                  ? 'max-w-xs sm:max-w-sm'
                  : 'max-w-xl lg:max-w-2xl'
              }`}
            >
              {/* Kicker badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-600/30 bg-white/90 backdrop-blur-md shadow-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-700">
                  {activeState.kicker}
                </span>
              </div>

              {/* Dynamic Title */}
              <h1
                className={`font-extrabold tracking-tight text-slate-900 leading-[1.08] whitespace-pre-line mb-4 ${
                  activeState.safeZone
                    ? 'text-3xl sm:text-4xl'
                    : 'text-4xl sm:text-5xl lg:text-6xl'
                }`}
              >
                {activeState.id === 's01-intro' ? (
                  <>
                    Build <span className="text-emerald-600">Smarter.</span>
                    <br />
                    Ship <span className="text-emerald-600">Faster.</span>
                  </>
                ) : (
                  activeState.title
                )}
              </h1>

              {/* Lede Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg mb-6">
                {activeState.desc}
              </p>

              {/* State Tags */}
              {activeState.tags && (
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {activeState.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 border border-slate-200/90 text-slate-800 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Opening CTAs */}
              {activeState.ctas && (
                <div className="flex flex-wrap items-center gap-3.5 wi-hero-interactive">
                  <a href="#contact" className="wi-cta">
                    Start a Project →
                  </a>
                  <a href="#services" className="wi-cta wi-cta--ghost">
                    Explore Our Services
                  </a>
                </div>
              )}

              {/* Opening Trust Metrics */}
              {activeState.stats && (
                <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-md text-left">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">35+</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Shipped Products</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">99.8%</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Client Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">2-4 Wks</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">MVP Turnaround</div>
                  </div>
                </div>
              )}

              {/* Exit CTA */}
              {activeState.actionCta && (
                <div className="mt-4 wi-hero-interactive">
                  <a href="#services" className="wi-cta">
                    Explore Our Capabilities ↓
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lightweight Timeline Nav — Discrete indicators only */}
      <div className="wi-hero-timeline-nav">
        {/* State Indicators on Bottom Left */}
        <div className="flex items-center gap-2.5 bg-white/85 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/80 shadow-sm">
          {TIMELINE_STATES.map((s, idx) => {
            const isCurrent = idx === activeStateIndex
            const isPassed = idx < activeStateIndex
            return (
              <div key={s.id} className="flex items-center gap-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'w-5 bg-emerald-600'
                      : isPassed
                      ? 'w-2 bg-emerald-400'
                      : 'w-2 bg-slate-200'
                  }`}
                />
              </div>
            )
          })}
          <span className="hidden sm:inline-block ml-1 text-[11px] font-mono font-bold text-emerald-700 tracking-wider uppercase">
            {activeState.label}
          </span>
        </div>

        {/* DOM-Updated Progress readout (Zero React re-render overhead!) */}
        <div className="hidden sm:flex items-center gap-2.5 bg-white/85 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/80 shadow-sm text-xs font-mono text-slate-600">
          <span className="text-slate-400">3D HERO</span>
          <span ref={progressTextRef} className="font-bold text-emerald-600">
            0%
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>
    </div>
  )
}
