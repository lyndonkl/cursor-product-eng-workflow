'use client'

import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  progress: number
  className?: string
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  progress,
  className
}: ProgressIndicatorProps) {
  return (
    <div className={cn('fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2', className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'w-2 h-2 rounded-full transition-all duration-300',
            'bg-neutral-200 hover:bg-neutral-300',
            currentStep === index && 'bg-neutral-900 hover:bg-neutral-800',
            currentStep === index && progress > 0 && 'scale-125'
          )}
          role="button"
          tabIndex={0}
          aria-label={`Go to section ${index + 1}`}
          onClick={() => {
            const element = document.querySelector(`[data-step="${index}"]`)
            element?.scrollIntoView({ behavior: 'smooth' })
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              const element = document.querySelector(`[data-step="${index}"]`)
              element?.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        />
      ))}
    </div>
  )
} 