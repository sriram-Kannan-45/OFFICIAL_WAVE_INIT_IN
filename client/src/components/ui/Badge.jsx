import { cn } from '@lib/utils'

export default function Badge({ children, className, variant = 'default' }) {
  const variants = {
    default: 'bg-accent-50 text-accent-600 border-accent-600',
    green: 'bg-accent-50 text-accent-600 border-accent-600',
    slate: 'bg-slate-100 text-slate-600 border-slate-300',
    amber: 'bg-amber-50 text-amber-700 border-amber-300',
    gray: 'bg-gray-100 text-gray-500 border-gray-300',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border tracking-wide uppercase',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
