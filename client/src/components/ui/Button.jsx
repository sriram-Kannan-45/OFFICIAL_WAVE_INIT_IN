import { Link } from 'react-router-dom'
import { cn } from '@lib/utils'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  type = 'button',
  href,
  icon: Icon,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 btn-hover'

  const variants = {
    primary:
      'bg-accent-600 text-white hover:bg-green-700 border border-accent-600',
    secondary:
      'bg-transparent text-text-secondary hover:bg-bg-secondary border border-border-light hover:border-border-medium',
    ghost:
      'bg-transparent text-accent-600 hover:text-green-700 hover:bg-accent-50 border-none',
    'green-outline':
      'border border-accent-600 text-accent-600 hover:bg-accent-50',
    white:
      'bg-white text-accent-600 hover:bg-accent-50 border border-white',
    'white-outline':
      'bg-transparent text-white border border-white hover:bg-white/10',
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseClasses, variants[variant], sizes[size], className)}
          {...props}
        >
          {children}
          {Icon && <Icon className="w-4 h-4" />}
        </a>
      )
    }
    return (
      <Link
        to={href}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
        {Icon && <Icon className="w-4 h-4" />}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  )
}
