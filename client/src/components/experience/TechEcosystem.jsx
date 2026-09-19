import { lazy, Suspense } from 'react'
import { useInView } from 'react-intersection-observer'
import useReveal from './useReveal'

const TechEcosystem3DScene = lazy(() => import('./TechEcosystem3DScene'))

const TECH = [
  { name: 'React', hot: true }, { name: 'Node.js', hot: true }, { name: 'Python', hot: true },
  { name: 'FastAPI', hot: true }, { name: 'MongoDB', hot: true }, { name: 'PostgreSQL' },
  { name: 'TypeScript' }, { name: 'Next.js' }, { name: 'OpenAI', hot: true },
  { name: 'TensorFlow' }, { name: 'Tailwind CSS' }, { name: 'Socket.IO' },
  { name: 'Docker' }, { name: 'Git' }, { name: 'Cloud' },
]

export default function TechEcosystem() {
  const revealRef = useReveal()
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: '120px',
  })

  const setRefs = (node) => {
    revealRef.current = node
    inViewRef(node)
  }

  return (
    <section id="tech" ref={setRefs} className="wi-section" aria-label="Technology stack">
      <span className="wi-kicker wi-reveal">Technology</span>
      <h2 className="wi-title wi-reveal">
        A Connected <em>Tech Ecosystem</em>
      </h2>
      <p className="wi-lede wi-reveal">
        The stack behind every Wave Init product — chosen for performance,
        reliability and speed of iteration.
      </p>

      <div className="wi-tech-field wi-reveal" style={{ minHeight: '32rem' }}>
        {inView ? (
          <Suspense
            fallback={
              <div className="wi-tech-fallback" aria-hidden="true">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', maxWidth: '36rem', margin: '4rem auto' }}>
                  {TECH.map((t) => (
                    <span key={t.name} className={`wi-tech-node ${t.hot ? 'wi-hot' : ''}`}>
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            }
          >
            <TechEcosystem3DScene />
          </Suspense>
        ) : (
          <div className="wi-tech-fallback" aria-hidden="true">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', maxWidth: '36rem', margin: '4rem auto' }}>
              {TECH.map((t) => (
                <span key={t.name} className={`wi-tech-node ${t.hot ? 'wi-hot' : ''}`}>
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
