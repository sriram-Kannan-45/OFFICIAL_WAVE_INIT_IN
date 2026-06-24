import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft } from 'lucide-react'

const sections = [
  {
    title: '1. Introduction',
    content: 'WAVE INIT ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.',
  },
  {
    title: '2. Information We Collect',
    content: 'We collect information that you voluntarily provide to us when you fill out our contact form, request a demo, or communicate with us. This may include your name, email address, project details, and any other information you choose to share. We also collect non-personal data such as browser type, device information, and pages visited for analytics purposes.',
  },
  {
    title: '3. How We Use Your Information',
    content: 'We use your information to respond to your inquiries, provide services, improve our website, and communicate with you about updates or offerings. We do not sell, trade, or rent your personal information to third parties.',
  },
  {
    title: '4. Data Security',
    content: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All data is transmitted over HTTPS and stored securely.',
  },
  {
    title: '5. Third-Party Services',
    content: 'We may use third-party services (such as analytics and hosting providers) that collect, monitor, and analyze information to improve our services. These third parties have their own privacy policies governing how they use such information.',
  },
  {
    title: '6. Cookies',
    content: 'Our website may use cookies to enhance your browsing experience. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. If you disable or refuse cookies, some parts of our website may become inaccessible or not function properly.',
  },
  {
    title: '7. Your Rights',
    content: 'You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us at wave.init.45@gmail.com.',
  },
  {
    title: '8. Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.',
  },
  {
    title: '9. Contact Us',
    content: 'If you have any questions about this Privacy Policy, please contact us at wave.init.45@gmail.com or connect with us on LinkedIn.',
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — WAVE INIT</title>
        <meta name="description" content="WAVE INIT Privacy Policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <main>
        {/* Hero */}
        <section className="py-24 neural-bg-section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-accent-50 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-7 h-7 text-accent-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
                Privacy Policy
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-text-muted leading-relaxed">
                Your privacy matters to us. This policy explains how we handle your data.
              </p>
              <p className="text-text-subtle text-sm mt-4">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 neural-bg-section-solid">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-10">
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <h2 className="text-xl font-bold text-text-primary mb-3">{section.title}</h2>
                  <p className="text-text-muted leading-relaxed">{section.content}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-text-secondary bg-transparent border border-border-light rounded-lg hover:bg-bg-secondary transition-all duration-150 btn-hover"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
