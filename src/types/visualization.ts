import type { TimelinePeriod, TimelineEvent, TimelineMilestone } from './timeline'

export interface D3Point {
  x: number
  y: number
  data: {
    year: number
    gdp: number
    confidence?: [number, number]
  }
}

export interface D3Line {
  points: D3Point[]
  color: string
  opacity: number
  className: string
}

export interface D3Area {
  points: D3Point[]
  color: string
  opacity: number
  className: string
}

export interface PeriodHighlight {
  period: TimelinePeriod
  startX: number
  endX: number
  color: string
  opacity: number
  events: Array<{
    event: TimelineEvent
    x: number
    y: number
  }>
  milestones: Array<{
    milestone: TimelineMilestone
    x: number
    y: number
  }>
}

export interface TooltipData {
  title: string
  content: string
  position: {
    x: number
    y: number
  }
  metadata?: {
    year?: number
    gdp?: number
    confidence?: [number, number]
    event?: TimelineEvent
    milestone?: TimelineMilestone
    period?: TimelinePeriod
  }
}

export interface AnimationState {
  progress: number
  duration: number
  ease: 'linear' | 'cubic' | 'elastic'
  delay: number
  type: 'fade' | 'slide' | 'scale'
  properties: {
    [key: string]: {
      from: number
      to: number
      current: number
    }
  }
}

export interface TransitionConfig {
  duration: number
  ease: 'linear' | 'cubic' | 'elastic'
  delay?: number
  onStart?: () => void
  onEnd?: () => void
  onUpdate?: (progress: number) => void
}

export interface VisualizationState {
  width: number
  height: number
  margin: {
    top: number
    right: number
    bottom: number
    left: number
  }
  scale: {
    x: number
    y: number
  }
  viewport: {
    startYear: number
    endYear: number
    minGDP: number
    maxGDP: number
  }
  highlight: PeriodHighlight | null
  tooltip: TooltipData | null
  animation: AnimationState | null
  transition: TransitionConfig | null
}

export interface PerformanceMetrics {
  fps: number
  renderTime: number
  dataPoints: number
  memoryUsage: number
  lastUpdate: number
} 