import { Helmet } from 'react-helmet-async'
import Hero from '@components/sections/Hero'
import About from '@components/sections/About'
import Services from '@components/sections/Services'
import FeaturedProject from '@components/sections/FeaturedProject'
import Process from '@components/sections/Process'
import Testimonials from '@components/sections/Testimonials'
import ContactCTA from '@components/sections/ContactCTA'

const tickerItems = [
  'React.js', 'Node.js', 'Python AI', 'MongoDB', 'FastAPI',
  'Tailwind CSS', 'TypeScript', 'TensorFlow', 'Socket.IO',
  'PostgreSQL', 'OpenAI', 'JWT Auth',
]

export default function Home() {
  return (
    <>
      <Helmet>
        <title>WAVE INIT — AI Product Development Studio</title>
        <meta
          name="description"
          content="We design and build custom AI-powered digital products. LMS portals, dashboards, chatbots, and more — built for your business from the ground up."
        />
        <meta property="og:title" content="WAVE INIT — AI Product Development Studio" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://waveinit.com" />
        <meta
          name="keywords"
          content="AI startup, AI products, LMS portal, machine learning, custom AI development, WAVE INIT"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'WAVE INIT',
            url: 'https://waveinit.com',
            email: 'wave.init.45@gmail.com',
            sameAs: [
              'https://www.linkedin.com/in/wave-init-227377412/',
              'https://www.instagram.com/__wave__init__',
            ],
            serviceType: 'AI Software Development',
          })}
        </script>
      </Helmet>

      <main>
        <Hero />
        {/* Tech Stack Ticker */}
        <div className="ticker-wrapper">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={`${item}-${i}`} className="ticker-item">
                {item}
                <span className="ticker-dot">●</span>
              </span>
            ))}
          </div>
        </div>

        <About />
        <Services />
        <FeaturedProject />
        <Process />
        <Testimonials />
        <ContactCTA />
      </main>
    </>
  )
}
