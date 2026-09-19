import { useRef, useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollScene from '@components/three/ScrollScene';
import StoryProgress from '@components/three/StoryProgress';
import FallbackScene from '@components/three/FallbackScene';
import { detectWebGL } from '@components/three/PerformanceDetect';

const phases = [
  { num: '01', label: 'IDEA' },
  { num: '02', label: 'CONNECT' },
  { num: '03', label: 'BUILD' },
  { num: '04', label: 'SCALE' },
  { num: '05', label: 'TRANSFORM' },
];

const storyPhases = [
  {
    text: 'Technology starts with an idea.',
    subtext: 'Every great product begins as a spark — a vision for something better.',
  },
  {
    text: 'Connect ideas, people and technology.',
    subtext: 'We bridge the gap between innovation and real-world impact.',
  },
  {
    text: 'Build intelligent digital experiences.',
    subtext: 'Production-ready software powered by AI, designed for scale.',
  },
  {
    text: 'Scale innovation with intelligent technology.',
    subtext: 'From prototype to deployment — we grow with your ambition.',
  },
  {
    text: 'Build. Innovate. Transform.',
    subtext: 'This is what WAVE INIT is built for.',
  },
];

export default function Story3DSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const [webglReady] = useState(detectWebGL);
  const scrollRef = useRef({ progress: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return scrollYProgress.on('change', (p) => {
      scrollRef.current.progress = p;
      setScrollProgress(p);
      const idx = Math.min(Math.floor(p * storyPhases.length), storyPhases.length - 1);
      setActivePhase(idx);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const onMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  const currentPhase = storyPhases[activePhase];
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [1, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative"
      style={{ height: `${storyPhases.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        {/* Scoped progress indicator inside sticky container */}
        <StoryProgress scrollProgress={scrollProgress} />

        <div
          className="absolute inset-0 bg-gradient-to-b from-white via-[#f8fdf9] to-white pointer-events-none"
          style={{
            zIndex: 0,
            backgroundImage: 'radial-gradient(circle at 75% 50%, rgba(22, 163, 74, 0.07) 0%, transparent 60%)',
          }}
        />

        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <Suspense fallback={null}>
            <ScrollScene scrollRef={scrollRef} mouseRef={mouseRef} />
          </Suspense>
        </div>

        {!webglReady && (
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            <FallbackScene activePhase={activePhase} />
          </div>
        )}

        <motion.div
          className="relative z-10 h-full flex items-center justify-center pointer-events-none"
          style={{ opacity }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-slate-200/80 shadow-xl"
              >
                <div className="text-xs font-semibold tracking-[0.15em] uppercase text-accent-600 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                  {phases[activePhase]?.num} — {phases[activePhase]?.label}
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
                  {currentPhase.text}
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {currentPhase.subtext}
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 flex items-center gap-3"
                >
                  <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-semibold text-accent-600">
                    {Math.round(scrollProgress * 100)}%
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
