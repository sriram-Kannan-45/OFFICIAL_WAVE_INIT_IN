import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG, SITE_URL } from '../config/site'

export default function SEO({
  title = SITE_CONFIG.defaultTitle,
  description = SITE_CONFIG.defaultDescription,
  pathname = '/',
  image = SITE_CONFIG.ogImage,
  type = 'website',
  noindex = false,
  includeSchema = true,
}) {
  const canonicalUrl = `${SITE_URL}${pathname === '/' ? '/' : pathname}`

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: `${SITE_URL}/`,
    logo: SITE_CONFIG.logo,
    description:
      'Wave Init Solutions provides AI software development, full-stack development, web development, GenAI solutions, AI-assisted product development and intelligent digital automation solutions.',
    sameAs: [
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.instagram,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.email,
      contactType: 'customer support',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: `${SITE_URL}/`,
  }

  return (
    <Helmet>
      {/* Essential Page Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow'}
      />

      {/* Open Graph Tags */}
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Wave Init Solutions - AI & Full Stack Product Development"
      />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {includeSchema && !noindex && (
        <>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(websiteSchema)}
          </script>
        </>
      )}
    </Helmet>
  )
}
