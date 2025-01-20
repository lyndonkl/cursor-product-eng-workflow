import React from 'react'
import { cn } from '../../lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  variant?: 'default' | 'text' | 'visualization'
  fullHeight?: boolean
}

export function Section({
  children,
  className,
  variant = 'default',
  fullHeight = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'w-full mx-auto',
        {
          'min-h-screen': fullHeight,
          'py-16 space-y-8': variant === 'text',
          'py-20 space-y-10': variant === 'visualization',
          'py-8 space-y-6': variant === 'default'
        },
        className
      )}
      {...props}
    >
      <div className="section-content">
        {children}
      </div>
    </section>
  )
} 