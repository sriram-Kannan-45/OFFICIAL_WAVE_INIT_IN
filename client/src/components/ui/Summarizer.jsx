import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { summarizeText } from '@lib/aiApi'

const styles = [
  { key: 'tldr', label: 'TL;DR' },
  { key: 'bullets', label: 'Bullets' },
  { key: 'paragraph', label: 'Paragraph' },
]

export default function Summarizer() {
  const [text, setText] = useState('')
  const [style, setStyle] = useState('paragraph')
  const [summary, setSummary] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSummarize = async () => {
    if (text.length < 50 || text.length > 5000) {
      toast.error('Text must be between 50 and 5000 characters.')
      return
    }
    setIsLoading(true)
    try {
      const { data } = await summarizeText(text, style)
      setSummary(data.summary)
    } catch {
      toast.error('Something went wrong, please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      toast.success('Copied!')
    } catch {
      toast.error('Failed to copy.')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      <div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste or type the content you want to summarize (50–5000 characters)..."
          rows={6}
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-accent-600 focus:ring-1 focus:ring-accent-600 transition-colors"
        />
        <div className="flex justify-between items-center mt-1.5">
          <span className={`text-xs ${text.length > 5000 ? 'text-red-500' : 'text-gray-400'}`}>
            {text.length}/5000
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        {styles.map(s => (
          <button
            key={s.key}
            onClick={() => setStyle(s.key)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
              style === s.key
                ? 'bg-accent-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleSummarize}
        disabled={isLoading || text.length < 50 || text.length > 5000}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <Sparkles className="w-4 h-4" />
        {isLoading ? 'Summarizing...' : 'Summarize'}
      </button>

      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative p-5 rounded-xl border border-gray-100 bg-white/80 backdrop-blur-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{summary}</p>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
