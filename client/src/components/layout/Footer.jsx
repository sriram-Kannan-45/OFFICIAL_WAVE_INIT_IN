import { Link } from 'react-router-dom'
import { Briefcase, Camera, Mail } from 'lucide-react'

const companyLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const workLinks = [
  { name: 'AI LMS Portal', href: '/lms' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
]

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
]

const socials = [
  { name: 'LinkedIn', icon: Briefcase, href: 'https://www.linkedin.com/in/wave-init-227377412/' },
  { name: 'Instagram', icon: Camera, href: 'https://www.instagram.com/__wave__init__' },
  { name: 'Email', icon: Mail, href: 'mailto:wave.init.45@gmail.com' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-3">
              <span className="text-xl font-extrabold tracking-tight text-white">
                WAVE{' '}
                <span className="text-accent-600 footer-logo-init">
                  INIT
                </span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Building AI products for businesses that move fast. Open for new projects.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="footer-link text-slate-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Work */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Our Work</h3>
            <ul className="space-y-2.5">
              {workLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="footer-link text-slate-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="footer-link text-slate-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} WAVE INIT. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs">
            Open for new projects — waveinit.com
          </p>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors duration-200"
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
