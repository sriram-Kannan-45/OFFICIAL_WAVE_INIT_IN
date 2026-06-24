import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { askFaq } from '@lib/aiApi'

export default function SmartSearch() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (q) => {
    const query = q || question
    if (!query.trim()) return
    setIsLoading(true)
    setResult(null)
    try {
      const { data } = await askFaq(query)
      setResult(data)
    } catch {
      toast.error('Something went wrong, please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-600" />
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Ask anything about our services..."
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm text-sm outline-none focus:border-accent-600 focus:ring-2 focus:ring-accent-600/20 transition-all shadow-sm"
        />
      </div>

      {isLoading && (
        <div className="mt-4 p-5 rounded-xl border border-gray-100 bg-white/80 backdrop-blur-sm animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      )}

      <AnimatePresence>
        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-5 rounded-xl border border-gray-100 bg-white/80 backdrop-blur-sm"
          >
            <p className="text-gray-700 text-sm leading-relaxed">{result.answer}</p>
            {result.suggestions?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {result.suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuestion(s)
                      handleSubmit(s)
                    }}
                    className="px-3 py-1.5 text-xs rounded-full border border-accent-600/30 text-accent-600 hover:bg-accent-50 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
