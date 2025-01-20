'use client'

import { useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface TimelineNavProps {
  currentStep: number
  totalSteps: number
  onNavigate?: (step: number) => void
  className?: string
}

export function TimelineNav({
  currentStep,
  totalSteps,
  onNavigate,
  className
}: TimelineNavProps) {
  const handleNavigation = useCallback((step: number) => {
    onNavigate?.(step)
    const element = document.querySelector(`[data-step="${step}"]`)
    element?.scrollIntoView({ behavior: 'smooth' })
  }, [onNavigate])

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ctrl/Cmd + Arrow for quick navigation
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          handleNavigation(0) // First step
          break
        case 'ArrowRight':
          e.preventDefault()
          handleNavigation(totalSteps - 1) // Last step
          break
      }
    }
    // Ctrl/Cmd + Shift + Arrow for step-by-step
    if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          if (currentStep > 0) {
            handleNavigation(currentStep - 1)
          }
          break
        case 'ArrowRight':
          e.preventDefault()
          if (currentStep < totalSteps - 1) {
            handleNavigation(currentStep + 1)
          }
          break
      }
    }
  }, [currentStep, totalSteps, handleNavigation])

  // Add keyboard shortcut listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div 
      className={cn(
        'fixed bottom-4 left-1/2 -translate-x-1/2',
        'flex items-center gap-2 p-2 rounded-lg',
        'bg-white/80 backdrop-blur shadow-lg',
        'border border-neutral-200',
        'transition-all duration-300 ease-out',
        'hover:bg-white hover:shadow-xl',
        className
      )}
      role="navigation"
      aria-label="Timeline navigation"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleNavigation(0)}
        disabled={currentStep === 0}
        className="transition-transform hover:scale-110"
        aria-label="Go to first step"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleNavigation(currentStep - 1)}
        disabled={currentStep === 0}
        className="transition-transform hover:scale-110"
        aria-label="Go to previous step"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="px-2 min-w-[4rem] text-center text-sm">
        <span className="font-medium">{currentStep + 1}</span>
        <span className="text-neutral-500"> / </span>
        <span className="text-neutral-500">{totalSteps}</span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleNavigation(currentStep + 1)}
        disabled={currentStep === totalSteps - 1}
        className="transition-transform hover:scale-110"
        aria-label="Go to next step"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleNavigation(totalSteps - 1)}
        disabled={currentStep === totalSteps - 1}
        className="transition-transform hover:scale-110"
        aria-label="Go to last step"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  )
} 