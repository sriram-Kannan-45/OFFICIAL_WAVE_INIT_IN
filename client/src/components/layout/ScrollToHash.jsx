import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) {
      // On page switch without a hash, scroll back to top instantly
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    const id = hash.replace('#', '')
    
    // A small timeout ensures the targeted section elements are fully rendered in DOM
    const timeoutId = setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        const navbarHeight = 80
        const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [hash, pathname])

  return null
}
