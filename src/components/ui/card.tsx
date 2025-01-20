import React from 'react'
import { cn } from '../../lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'interactive' | 'outline'
}

export function Card({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(
        'card',
        {
          'hover:bg-primary-50/10 active:bg-primary-50/20': variant === 'interactive',
          'border-2': variant === 'outline'
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
} 