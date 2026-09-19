import { Helmet } from 'react-helmet-async'
import Preloader from './Preloader'
import ImmersiveHero from './ImmersiveHero'
import About3D from './About3D'
import Services3D from './Services3D'
import WhyWaveInit from './WhyWaveInit'
import Process3D from './Process3D'
import TechEcosystem from './TechEcosystem'
import ProjectsShowcase from './ProjectsShowcase'
import AICore from './AICore'
import Opportunities from './Opportunities'
import Testimonials3D from './Testimonials3D'
import FinalCTAContact from './FinalCTAContact'
import ExperienceNav from './ExperienceNav'

export default function ImmersiveHome() {
  return (
    <div className="wi-experience">
      <Helmet>
        <title>WAVE INIT — AI Product Development Studio</title>
        <meta
          name="description"
          content="WAVE INIT is an AI-first product development studio. We design and build custom AI-powered software — LMS platforms, chatbots, dashboards and automation — from the ground up."
        />
        <meta property="og:title" content="WAVE INIT — AI Product Development Studio" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Preloader />
      <ExperienceNav />

      <main>
        <ImmersiveHero />
        <About3D />
        <Services3D />
        <WhyWaveInit />
        <Process3D />
        <TechEcosystem />
        <ProjectsShowcase />
        <AICore />
        <Opportunities />
        <Testimonials3D />
        <FinalCTAContact />
      </main>

      <footer className="wi-footer">
        <div>
          <div className="wi-logo">
            WAVE<b>INIT</b>
          </div>
          <p className="wi-brand-line" style={{ marginTop: '1rem' }}>
            An AI-first product development studio building custom software —
            intelligent, scalable, production-ready.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#process">Process</a></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="#ai">AI Solutions</a></li>
            <li><a href="#services">Full Stack Development</a></li>
            <li><a href="#services">AI Automation</a></li>
            <li><a href="#opportunities">Internships</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="mailto:wave.init.45@gmail.com">wave.init.45@gmail.com</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/wave-init-227377412/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/__wave__init__" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="wi-footer-bottom">
          <span>© {new Date().getFullYear()} WAVE INIT. All rights reserved.</span>
          <span>Built with intelligence.</span>
        </div>
      </footer>
    </div>
  )
}
