import { ArrowRight, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react'

export default function Hero() {
  const scrollTo = (href) => {
    const target = document.querySelector(href)
    if (target) {
      const navOffset = 76
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-[120vh] flex flex-col justify-between pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Wave Init Hero"
    >
      <div className="flex-1 flex flex-col justify-center max-w-4xl">
        {/* Studio Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-sm w-fit mb-6 text-xs font-semibold text-slate-700 tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
          AI Product Engineering Studio
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6">
          Build Smarter{' '}
          <span className="text-[#16a34a] inline-block">
            Digital Products
          </span>{' '}
          with AI
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mb-10">
          Wave Init Solutions builds production-ready full-stack software, AI-powered products, GenAI solutions, and web platforms. We combine modern engineering with efficient AI-assisted development to turn ideas into high-performing digital product solutions.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <button
            type="button"
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] transition-all duration-200 shadow-md shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/30 active:scale-[0.98]"
          >
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('#services')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white/80 hover:bg-white border border-slate-200/90 hover:border-slate-300 shadow-sm transition-all duration-200"
          >
            Explore Capabilities
          </button>
        </div>

        {/* Key Competency Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/60 max-w-2xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
            Full-Stack Engineering
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
            GenAI & Multi-Agent Logic
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
            Production Scalability
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pt-12 flex flex-col items-center justify-center gap-2 text-slate-400 select-none">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
          Scroll to explore the architecture
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-300/80 flex items-start justify-center p-1">
          <span className="w-1.5 h-2.5 bg-[#16a34a] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
