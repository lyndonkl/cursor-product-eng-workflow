import React, { useCallback } from 'react'
import { Scrollama, Step } from 'react-scrollama'
import { cn } from '@/lib/utils'

export interface ScrollStep {
  id: string
  content: React.ReactNode
  data?: any
}

export interface ScrollContainerProps {
  steps: ScrollStep[]
  onStepEnter?: (step: { data: any; entry: IntersectionObserverEntry }) => void
  onStepExit?: (step: { data: any; entry: IntersectionObserverEntry }) => void
  onStepProgress?: (step: { progress: number; entry: IntersectionObserverEntry }) => void
  offset?: number
  threshold?: number
  debug?: boolean
  className?: string
}

export function ScrollContainer({
  steps,
  onStepEnter,
  onStepExit,
  onStepProgress,
  offset = 0.5,
  threshold = 1,
  debug = false,
  className
}: ScrollContainerProps) {
  const handleStepEnter = useCallback(
    (step: { data: any; entry: IntersectionObserverEntry }) => {
      if (debug) {
        console.log('Step Enter:', step)
      }
      onStepEnter?.(step)
    },
    [debug, onStepEnter]
  )

  const handleStepExit = useCallback(
    (step: { data: any; entry: IntersectionObserverEntry }) => {
      if (debug) {
        console.log('Step Exit:', step)
      }
      onStepExit?.(step)
    },
    [debug, onStepExit]
  )

  const handleStepProgress = useCallback(
    (step: { progress: number; entry: IntersectionObserverEntry }) => {
      if (debug) {
        console.log('Step Progress:', step)
      }
      onStepProgress?.(step)
    },
    [debug, onStepProgress]
  )

  return (
    <div className={cn('scroll-container relative', className)}>
      <Scrollama
        offset={offset}
        threshold={threshold}
        onStepEnter={handleStepEnter}
        onStepExit={handleStepExit}
        onStepProgress={handleStepProgress}
        debug={debug}
      >
        {steps.map((step) => (
          <Step data={step.data} key={step.id}>
            <div className="scroll-step min-h-screen flex items-center justify-center">
              {step.content}
            </div>
          </Step>
        ))}
      </Scrollama>
    </div>
  )
} 