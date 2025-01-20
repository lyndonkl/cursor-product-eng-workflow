import type { HistoricalGDPData } from './gdp'

export interface TimelinePeriod {
  id: string
  name: string
  startYear: number
  endYear: number
  description: string
  color: string
  economicIndicators: {
    averageGDP: number
    growthRate: number
    mainIndustries: string[]
  }
  regionalImpact: {
    europe: string
    americas: string
    asia: string
  }
  events: TimelineEvent[]
}

export interface TimelineEvent {
  id: string
  year: number
  title: string
  description: string
  type: 'technological' | 'economic' | 'social' | 'political'
  impact: 'low' | 'medium' | 'high'
  location?: string
}

export interface TimelineMilestone {
  id: string
  year: number
  title: string
  description: string
  category: 'technology' | 'economy' | 'society' | 'politics'
  impact: 'low' | 'medium' | 'high'
  period: string
  relatedEvents: string[]
}

export interface UnifiedTimelineData {
  periods: TimelinePeriod[]
  milestones: TimelineMilestone[]
  metadata: {
    lastUpdated: string
    source: string
    version: string
  }
}

export interface TimelineDataByYear {
  [year: number]: {
    gdp: number
    period: TimelinePeriod
    events: TimelineEvent[]
    milestones: TimelineMilestone[]
  }
}

export interface TimelineDataByPeriod {
  [periodId: string]: {
    period: TimelinePeriod
    gdpData: { year: number; value: number }[]
    events: TimelineEvent[]
    milestones: TimelineMilestone[]
  }
}

export interface TimelineValidationError {
  code: string
  message: string
  field?: string
  details?: unknown
}

export interface TimelineValidationResult {
  isValid: boolean
  errors: TimelineValidationError[]
} 