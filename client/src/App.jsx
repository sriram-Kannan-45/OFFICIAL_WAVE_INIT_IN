import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

import NeuralBackground from '@components/animations/NeuralBackground'
import Navbar from '@components/layout/Navbar'
import ScrollToHash from '@components/layout/ScrollToHash'
import Footer from '@components/layout/Footer'
import ScrollProgress from '@components/layout/ScrollProgress'
import Home from '@pages/Home'

const ServicesPage = lazy(() => import('@pages/Services'))
const ProductsPage = lazy(() => import('@pages/Products'))
const LMSPortal = lazy(() => import('@pages/LMSPortal'))
const AboutPage = lazy(() => import('@pages/About'))
const ContactPage = lazy(() => import('@pages/Contact'))
const PrivacyPolicy = lazy(() => import('@pages/PrivacyPolicy'))
const NotFound = lazy(() => import('@pages/NotFound'))

const PageLoading = () => (
  <div className="flex-grow flex items-center justify-center min-h-[60dvh]">
    <div className="w-8 h-8 border-2 border-accent-600 border-t-transparent rounded-full animate-spin" />
  </div>
)

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.15 } },
}

function AnimatedPage({ children }) {
  const location = useLocation()
  return (
    <motion.div
      key={location.pathname}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  )
}

let isInitialLoad = true

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isInitialLoad) {
      isInitialLoad = false
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <div className="relative min-h-[100dvh] text-text-secondary flex flex-col">
      <NeuralBackground />
      <div className="relative z-10 flex flex-col flex-grow min-h-[100dvh]">
      <ScrollProgress />
      <Navbar />
      <ScrollToHash />

      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoading />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/services" element={<AnimatedPage><ServicesPage /></AnimatedPage>} />
            <Route path="/products" element={<AnimatedPage><ProductsPage /></AnimatedPage>} />
            <Route path="/lms" element={<AnimatedPage><LMSPortal /></AnimatedPage>} />
            <Route path="/about" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
            <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
            <Route path="/privacy" element={<AnimatedPage><PrivacyPolicy /></AnimatedPage>} />
            <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
          </Routes>
        </Suspense>
      </AnimatePresence>

      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
          },
        }}
      />
      </div>
    </div>
  )
}

export default App
