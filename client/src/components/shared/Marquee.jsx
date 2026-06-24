import { cn } from '@lib/utils'

export default function Marquee({
  items,
  direction = 'left',
  speed = 30,
  className,
  pauseOnHover = true,
}) {
  const content = items.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-4 mx-8">
      <span className="font-mono text-sm tracking-wider whitespace-nowrap text-text-subtle">
        {item}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
    </span>
  ))

  return (
    <div
      className={cn(
        'relative overflow-hidden py-4 bg-bg-secondary border-y border-border-light',
        className
      )}
    >
      <div
        className={cn(
          'flex whitespace-nowrap',
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  )
}
