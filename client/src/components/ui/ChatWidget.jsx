import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import toast from 'react-hot-toast'
import { sendChatMessage } from '@lib/aiApi'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! How can I help you today?', timestamp: new Date() },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const sessionId = useRef(crypto.randomUUID())
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    const userMsg = { role: 'user', content: text, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)
    try {
      const { data } = await sendChatMessage(
        [...messages.slice(1), userMsg].map(m => ({ role: m.role, content: m.content })),
        sessionId.current
      )
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply, timestamp: new Date() }])
    } catch {
      toast.error('Something went wrong, please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-accent-600 text-white">
              <div className="flex items-center gap-2.5">
                <Bot className="w-5 h-5" />
                <span className="font-semibold text-sm">WAVE INIT Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-75 transition-opacity">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[80%]">
                    <div
                      className={`px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm'
                          : 'bg-gray-100 text-gray-900 rounded-2xl rounded-bl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 px-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-100 p-3">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent-600 focus:ring-1 focus:ring-accent-600 transition-colors"
                  style={{ maxHeight: 100 }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-accent-600 text-white shadow-lg hover:bg-green-700 transition-all active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}
