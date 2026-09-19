import useReveal from './useReveal'

const OPPS = [
  {
    badge: 'Internship',
    title: 'Practical Project Experience',
    body: 'Work on real, shipped products — not toy tasks. Interns at Wave Init contribute to live codebases from week one.',
  },
  {
    badge: 'Mentorship',
    title: 'Learn From Engineers',
    body: 'Direct mentorship on modern stacks: React, Node.js, Python, AI integration — with honest code review.',
  },
  {
    badge: 'Growth',
    title: 'Performance-Based Growth',
    body: 'Strong contributors grow into bigger responsibilities. Your output defines your trajectory.',
  },
]

export default function Opportunities() {
  const ref = useReveal()
  return (
    <section id="opportunities" ref={ref} className="wi-section" aria-label="Opportunities at Wave Init">
      <span className="wi-kicker wi-reveal">Opportunities</span>
      <h2 className="wi-title wi-reveal">
        Build Your Career in the <em>Wave</em>
      </h2>
      <p className="wi-lede wi-reveal">
        We work with motivated interns and developers who want real engineering
        experience on real products.
      </p>

      <div className="wi-opp-grid">
        {OPPS.map((o) => (
          <article key={o.title} className="wi-glass wi-opp-card wi-reveal">
            <span className="wi-badge">{o.badge}</span>
            <h3>{o.title}</h3>
            <p>{o.body}</p>
            <a href="#contact" className="wi-cta wi-cta--ghost">
              Apply Now →
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
