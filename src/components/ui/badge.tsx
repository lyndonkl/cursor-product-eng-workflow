import React from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'early' | 'first' | 'second' | 'modern' | 'future'
  size?: 'sm' | 'md' | 'lg'
}

export function Badge({
  children,
  variant = 'modern',
  size = 'md',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium',
        // Size variants
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-0.5 text-sm': size === 'md',
          'px-3 py-1 text-base': size === 'lg',
        },
        // Period color variants
        {
          'bg-period-early/10 text-period-early': variant === 'early',
          'bg-period-first/10 text-period-first': variant === 'first',
          'bg-period-second/10 text-period-second': variant === 'second',
          'bg-period-modern/10 text-period-modern': variant === 'modern',
          'bg-period-future/10 text-period-future': variant === 'future',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
} 