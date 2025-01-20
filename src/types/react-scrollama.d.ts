declare module 'react-scrollama' {
  import { ReactNode } from 'react'

  interface ScrollamaProps {
    children: ReactNode
    offset?: number
    debug?: boolean
    onStepEnter?: (response: { data: number; direction: string; entry: IntersectionObserverEntry }) => void
    onStepExit?: (response: { data: number; direction: string; entry: IntersectionObserverEntry }) => void
    onStepProgress?: (response: { progress: number; entry: IntersectionObserverEntry }) => void
    threshold?: number | number[]
    root?: Element | null
    rootMargin?: string
  }

  interface StepProps {
    data?: any
    children: ReactNode
    style?: React.CSSProperties
    className?: string
  }

  export const Scrollama: React.FC<ScrollamaProps>
  export const Step: React.FC<StepProps>
} 