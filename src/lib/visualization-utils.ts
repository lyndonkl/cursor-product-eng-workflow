import type { 
  D3Point, 
  D3Line, 
  D3Area,
  PeriodHighlight,
  TooltipData,
  AnimationState,
  TransitionConfig,
  VisualizationState,
  PerformanceMetrics
} from '../types/visualization'
import type { 
  TimelinePeriod, 
  TimelineEvent, 
  TimelineMilestone,
  UnifiedTimelineData,
  TimelineDataByPeriod
} from '../types/timeline'
import type { GDPDataPoint } from '../types/gdp'

export function createD3Points(data: TimelineDataByPeriod): D3Point[] {
  return Object.values(data).flatMap(periodData => 
    periodData.gdpData.map(point => ({
      x: point.year,
      y: point.value,
      data: {
        year: point.year,
        gdp: point.value,
        confidence: [point.value * 0.9, point.value * 1.1] // Example confidence interval
      }
    }))
  )
}

export function createD3Line(points: D3Point[], color: string): D3Line {
  return {
    points,
    color,
    opacity: 1,
    className: 'gdp-line'
  }
}

export function createD3Area(points: D3Point[], color: string): D3Area {
  return {
    points,
    color,
    opacity: 0.2,
    className: 'confidence-area'
  }
}

export function createPeriodHighlight(
  period: TimelinePeriod,
  scale: { x: number; y: number },
  events: TimelineEvent[],
  milestones: TimelineMilestone[]
): PeriodHighlight {
  return {
    period,
    startX: period.startYear * scale.x,
    endX: period.endYear * scale.x,
    color: period.color || '#4338ca',
    opacity: 0.1,
    events: events.map(event => ({
      event,
      x: event.year * scale.x,
      y: scale.y
    })),
    milestones: milestones.map(milestone => ({
      milestone,
      x: milestone.year * scale.x,
      y: scale.y
    }))
  }
}

export function createTooltip(
  title: string,
  content: string,
  position: { x: number; y: number },
  metadata?: TooltipData['metadata']
): TooltipData {
  return {
    title,
    content,
    position,
    metadata
  }
}

export function createAnimation(
  type: AnimationState['type'],
  duration: number,
  properties: AnimationState['properties']
): AnimationState {
  return {
    progress: 0,
    duration,
    ease: 'cubic',
    delay: 0,
    type,
    properties
  }
}

export function createTransition(
  duration: number,
  config?: Partial<TransitionConfig>
): TransitionConfig {
  return {
    duration,
    ease: 'cubic',
    ...config
  }
}

export function createInitialVisualizationState(
  width: number,
  height: number
): VisualizationState {
  return {
    width,
    height,
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    },
    scale: {
      x: 1,
      y: 1
    },
    viewport: {
      startYear: 1700,
      endYear: 2020,
      minGDP: 0,
      maxGDP: 100
    },
    highlight: null,
    tooltip: null,
    animation: null,
    transition: null
  }
}

export function updatePerformanceMetrics(
  previousMetrics: PerformanceMetrics,
  renderStartTime: number,
  dataPoints: number
): PerformanceMetrics {
  const renderTime = performance.now() - renderStartTime
  const timeSinceLastUpdate = performance.now() - previousMetrics.lastUpdate
  const fps = 1000 / timeSinceLastUpdate

  // Note: performance.memory is only available in Chrome
  const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0

  return {
    fps,
    renderTime,
    dataPoints,
    memoryUsage,
    lastUpdate: performance.now()
  }
}

// Helper function to interpolate values during animations
export function interpolate(
  from: number,
  to: number,
  progress: number,
  ease: TransitionConfig['ease'] = 'cubic'
): number {
  const t = progress / 100

  switch (ease) {
    case 'linear':
      return from + (to - from) * t
    case 'cubic':
      return from + (to - from) * (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    case 'elastic':
      const c4 = (2 * Math.PI) / 3
      return from + (to - from) * (
        t === 0 ? 0 
        : t === 1 ? 1
        : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
      )
    default:
      return from + (to - from) * t
  }
} 