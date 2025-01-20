import React from 'react'
import { cn } from '../../lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: 'line' | 'circle'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function Progress({
  value,
  max = 100,
  variant = 'line',
  size = 'md',
  showLabel = false,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.round((value / max) * 100)

  if (variant === 'circle') {
    const radius = size === 'sm' ? 12 : size === 'md' ? 16 : 20
    const strokeWidth = size === 'sm' ? 2 : size === 'md' ? 3 : 4
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference

    return (
      <div
        className={cn(
          'relative inline-flex items-center justify-center',
          className
        )}
        {...props}
      >
        <svg
          className="transform -rotate-90"
          width={(radius + strokeWidth) * 2}
          height={(radius + strokeWidth) * 2}
        >
          <circle
            className="text-neutral-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="none"
            r={radius}
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
          />
          <circle
            className="text-primary-500 transition-all duration-300 ease-in-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            stroke="currentColor"
            fill="none"
            r={radius}
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
          />
        </svg>
        {showLabel && (
          <span className="absolute text-xs font-medium">
            {percentage}%
          </span>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-full bg-neutral-200',
        {
          'h-1': size === 'sm',
          'h-2': size === 'md',
          'h-3': size === 'lg',
        },
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-primary-500 transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
      {showLabel && (
        <span className="sr-only">{percentage}% complete</span>
      )}
    </div>
  )
} 