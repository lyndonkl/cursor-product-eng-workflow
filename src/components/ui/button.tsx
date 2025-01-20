import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  className?: string
}

export function Button({
  variant = 'default',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
        'disabled:pointer-events-none disabled:opacity-50',

        // Variants
        variant === 'default' && 'bg-neutral-900 text-white hover:bg-neutral-800',
        variant === 'ghost' && 'hover:bg-neutral-100 hover:text-neutral-900',
        variant === 'outline' && 'border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900',

        // Sizes
        size === 'sm' && 'h-8 px-3 text-sm',
        size === 'md' && 'h-10 px-4',
        size === 'lg' && 'h-12 px-6 text-lg',
        size === 'icon' && 'h-9 w-9',

        className
      )}
      {...props}
    />
  )
} 