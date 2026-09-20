/**
 * Centralized Production Site Configuration for WAVE INIT SOLUTIONS
 * 
 * To override the production domain, set VITE_SITE_URL in your deployment environment:
 * e.g. VITE_SITE_URL=https://www.waveinitsolutions.online
 */

const rawSiteUrl = import.meta.env.VITE_SITE_URL || 'https://www.waveinitsolutions.online'

// Ensure URL does not contain a trailing slash
export const SITE_URL = rawSiteUrl.replace(/\/+$/, '')

export const SITE_CONFIG = {
  name: 'WAVE INIT SOLUTIONS',
  shortName: 'Wave Init',
  siteUrl: SITE_URL,
  defaultTitle: 'Wave Init Solutions | AI, Full Stack & GenAI Development',
  defaultDescription:
    'Wave Init Solutions builds modern full-stack applications, AI-powered products, GenAI solutions, web platforms and intelligent automation using advanced AI-assisted development workflows.',
  email: 'wave.init.45@gmail.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/wave-init-227377412/',
    instagram: 'https://www.instagram.com/__wave__init__',
  },
  logo: `${SITE_URL}/logo.png`,
  logoSvg: `${SITE_URL}/logo.svg`,
  ogImage: `${SITE_URL}/og-image.png`,
  themeColor: '#ffffff',
  accentColor: '#16a34a',
}
