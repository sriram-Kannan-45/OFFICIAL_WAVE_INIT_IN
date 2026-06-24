import { Helmet } from 'react-helmet-async'
import SummarizerUI from '@components/ui/Summarizer'

export default function SummarizerPage() {
  return (
    <>
      <Helmet>
        <title>AI Summarizer — WAVE INIT</title>
        <meta name="description" content="Summarize any text with AI. Choose TL;DR, bullet points, or paragraph style." />
      </Helmet>
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">AI Summarizer</h1>
        <p className="text-text-secondary mb-10 text-center max-w-md">
          Paste your content and let AI summarize it in your preferred style.
        </p>
        <SummarizerUI />
      </section>
    </>
  )
}
