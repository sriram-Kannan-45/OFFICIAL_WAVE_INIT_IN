import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function seoSyncPlugin() {
  return {
    name: 'vite-plugin-seo-sync',
    configResolved(config) {
      const siteUrl = (process.env.VITE_SITE_URL || 'https://www.waveinitsolutions.online').replace(/\/+$/, '')
      const publicDir = config.publicDir || resolve(__dirname, 'public')

      try {
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true })
        }

        // Generate robots.txt
        const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
        fs.writeFileSync(resolve(publicDir, 'robots.txt'), robotsContent, 'utf-8')

        // Generate sitemap.xml
        const routes = [
          { path: '', changefreq: 'weekly', priority: '1.0' },
          { path: '/services', changefreq: 'monthly', priority: '0.8' },
          { path: '/products', changefreq: 'monthly', priority: '0.8' },
          { path: '/lms', changefreq: 'monthly', priority: '0.8' },
          { path: '/about', changefreq: 'monthly', priority: '0.7' },
          { path: '/contact', changefreq: 'monthly', priority: '0.7' },
          { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
        ]

        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
          .map(
            (r) => `  <url>\n    <loc>${siteUrl}${r.path ? r.path : '/'}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
          )
          .join('\n')}\n</urlset>\n`
        fs.writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemapContent, 'utf-8')
      } catch (err) {
        console.warn('SEO sync warning:', err)
      }
    },
    transformIndexHtml(html) {
      const siteUrl = (process.env.VITE_SITE_URL || 'https://www.waveinitsolutions.online').replace(/\/+$/, '')
      return html
        .replace(/https:\/\/www\.waveinitsolutions\.online/g, siteUrl)
        .replace(/https:\/\/waveinitsolutions\.com/g, siteUrl)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoSyncPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@lib': resolve(__dirname, './src/lib'),
      '@styles': resolve(__dirname, './src/styles'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:6000',
        changeOrigin: true,
      },
    },
  },
})
