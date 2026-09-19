import { lazy, Suspense } from 'react'
import { useInView } from 'react-intersection-observer'
import useReveal from './useReveal'

const AICore3DScene = lazy(() => import('./AICore3DScene'))

export default function AICore() {
  const revealRef = useReveal()
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: '120px',
  })

  // Merged ref callback for reveal and intersection observer
  const setRefs = (node) => {
    revealRef.current = node
    inViewRef(node)
  }

  return (
    <section id="ai" ref={setRefs} className="wi-section" aria-label="AI capabilities">
      <span className="wi-kicker wi-reveal">AI Capabilities</span>
      <h2 className="wi-title wi-reveal">
        Intelligence at the <em>Core</em>
      </h2>
      <p className="wi-lede wi-reveal">
        Every Wave Init product is built around applied intelligence — not bolted-on buzzwords.
      </p>

      <div className="wi-ai-wrap wi-reveal">
        {inView ? (
          <Suspense
            fallback={
              <div className="wi-ai-core-fallback" aria-hidden="true">
                <div className="wi-ai-core">AI CORE</div>
              </div>
            }
          >
            <AICore3DScene />
          </Suspense>
        ) : (
          <div className="wi-ai-core-fallback" aria-hidden="true">
            <div className="wi-ai-core">AI CORE</div>
          </div>
        )}
      </div>
    </section>
  )
}
