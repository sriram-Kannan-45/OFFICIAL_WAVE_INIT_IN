import { cn } from '@lib/utils'

export default function WaveDivider({ className, flip = false, variant = 'default', color }) {
  const gradients = {
    default: {
      top: '#050A14',
      bottom: '#0B1120',
      stroke: 'url(#waveGrad1)',
    },
    light: {
      top: '#0B1120',
      bottom: '#050A14',
      stroke: 'url(#waveGrad2)',
    },
  }

  const colors = color
    ? { top: color, bottom: color, stroke: 'url(#waveGrad1)' }
    : gradients[variant]

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('w-full h-auto', flip && 'rotate-180')}
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C240 10 480 70 720 40C960 10 1200 70 1440 40V80H0V40Z"
          fill={colors.top}
        />
        <path
          d="M0 40C240 10 480 70 720 40C960 10 1200 70 1440 40V80H0V40Z"
          fill={colors.bottom}
          style={{ opacity: 0.5 }}
        />
        <path
          d="M0 40C240 10 480 70 720 40C960 10 1200 70 1440 40"
          stroke={colors.stroke}
          strokeWidth="1.5"
          fill="none"
        />
        <defs>
          <linearGradient id="waveGrad1" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#7B61FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00C8FF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#00C8FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7B61FF" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
