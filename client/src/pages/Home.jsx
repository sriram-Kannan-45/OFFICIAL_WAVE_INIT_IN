import SEO from '@components/SEO'
import ScrollVideoBackground from '@components/ScrollVideoBackground'
import Hero from '@components/Hero'
import About from '@components/About'
import Services from '@components/Services'
import AIDevelopment from '@components/AIDevelopment'
import Process from '@components/Process'
import Solutions from '@components/Solutions'
import Projects from '@components/Projects'
import WhyUs from '@components/WhyUs'
import Opportunities from '@components/Opportunities'
import CTA from '@components/CTA'

export default function Home() {
  return (
    <div className="relative min-h-screen text-slate-800 selection:bg-green-100 selection:text-slate-900">
      <SEO
        title="Wave Init Solutions | AI, Full Stack & GenAI Development"
        description="Wave Init Solutions builds modern full-stack applications, AI-powered products, GenAI solutions, web platforms and intelligent automation using advanced AI-assisted development workflows."
        pathname="/"
      />

      {/* Primary Scroll-Driven 3D Video Background */}
      <ScrollVideoBackground />

      {/* Main Content Sections Layered Over Video */}
      <div className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Services />
        <AIDevelopment />
        <Process />
        <Solutions />
        <Projects />
        <WhyUs />
        <Opportunities />
        <CTA />
      </div>
    </div>
  )
}
