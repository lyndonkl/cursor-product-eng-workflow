'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { Scrollama, Step } from 'react-scrollama'
import { cn } from '@/lib/utils'
import { ProgressIndicator } from './progress-indicator'
import { TimelineNav } from '../navigation/timeline-nav'

interface ScrollContainerProps {
  children: React.ReactNode | ((props: { currentStep: number; progress: number }) => React.ReactNode)
  onStepEnter?: (step: number) => void
  onStepExit?: (step: number) => void
  onStepProgress?: (progress: number) => void
  className?: string
}

export function ScrollContainer({
  children,
  onStepEnter,
  onStepExit,
  onStepProgress,
  className
}: ScrollContainerProps) {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleStepEnter = useCallback(({ data }: { data: number }) => {
    setCurrentStep(data)
    if (onStepEnter) {
      onStepEnter(data)
    }
  }, [onStepEnter])

  const handleStepExit = useCallback(({ data }: { data: number }) => {
    onStepExit?.(data)
  }, [onStepExit])

  const handleStepProgress = useCallback(({ progress }: { progress: number }) => {
    setProgress(progress)
    onStepProgress?.(progress)
  }, [onStepProgress])

  const steps = Array.isArray(children) ? children : []

  const scrollToStep = useCallback((step: number) => {
    const element = document.querySelector(`[data-step="${step}"]`)
    element?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault()
        if (currentStep > 0) {
          scrollToStep(currentStep - 1)
        }
        break
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault()
        if (currentStep < steps.length - 1) {
          scrollToStep(currentStep + 1)
        }
        break
      case 'Home':
        e.preventDefault()
        scrollToStep(0)
        break
      case 'End':
        e.preventDefault()
        scrollToStep(steps.length - 1)
        break
    }
  }, [currentStep, steps.length, scrollToStep])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div 
      ref={containerRef}
      className={cn('relative min-h-screen', className)}
      tabIndex={0}
      role="region"
      aria-label="Scrollable timeline content"
    >
      <div className="sticky top-0 left-0 w-full h-[600px] bg-neutral-50 border-b border-neutral-200">
        <div className="w-full h-full">
          {typeof children === 'function' 
            ? children({ currentStep, progress }) 
            : children}
        </div>
      </div>
      <div className="relative z-10">
        <Scrollama
          onStepEnter={handleStepEnter}
          onStepExit={handleStepExit}
          onStepProgress={handleStepProgress}
          offset={0.5}
          debug={process.env.NODE_ENV === 'development'}
        >
          {Array.isArray(children) && children.map((child, index) => (
            <Step data={index} key={index}>
              <div 
                className="min-h-screen flex items-center justify-center px-4 py-16"
                data-step={index}
                tabIndex={0}
                role="region"
                aria-label={`Timeline section ${index + 1}`}
              >
                {child}
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
      {Array.isArray(children) && children.length > 0 && (
        <>
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={children.length}
            progress={progress}
            className="fixed bottom-4 right-4 z-50"
          />
          <TimelineNav
            currentStep={currentStep}
            totalSteps={children.length}
            onNavigate={handleStepEnter}
            className="fixed bottom-4 left-4 z-50"
          />
        </>
      )}
    </div>
  )
} 