import { motion } from 'framer-motion'
import { cn } from '@lib/utils'

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}) {
  const alignClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  }

  return (
    <div className={cn('mb-12 md:mb-16', alignClasses[align], className)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn(
            'mb-4 text-xs font-semibold tracking-[0.1em] uppercase text-accent-600',
            align === 'center' ? 'flex justify-center' : ''
          )}
        >
          <span>{eyebrow}</span>
        </motion.div>
      )}
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={cn(
            'text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-tight',
          )}
        >
          {title}
        </motion.h2>
      )}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={cn(
            'mt-4 max-w-2xl mx-auto text-lg text-text-muted leading-relaxed',
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
