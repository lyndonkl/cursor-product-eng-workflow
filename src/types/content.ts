import type { TimelinePeriod } from './timeline'

export interface ContentBlock {
  id: string
  title: string
  content: string
  type: 'overview' | 'detail' | 'impact' | 'analysis'
  metadata?: {
    source?: string
    lastUpdated?: string
    author?: string
  }
}

export interface PeriodContent extends ContentBlock {
  periodId: string
  highlights: string[]
  economicAnalysis: string
  regionalImpacts: {
    region: string
    description: string
    significance: 'high' | 'medium' | 'low'
  }[]
}

export interface MilestoneContent extends ContentBlock {
  milestoneId: string
  shortDescription: string
  technicalDetails?: string
  economicImpact: string
  relatedPeriods: string[]
}

export interface EconomicImpactContent extends ContentBlock {
  metrics: {
    metric: string
    value: string | number
    description: string
  }[]
  trends: {
    trend: string
    description: string
    significance: 'positive' | 'negative' | 'neutral'
  }[]
  comparisons: {
    aspect: string
    before: string
    after: string
    analysis: string
  }[]
}

export interface RegionalImpactContent extends ContentBlock {
  region: string
  keyIndustries: string[]
  economicChanges: {
    aspect: string
    description: string
    impact: 'positive' | 'negative' | 'neutral'
  }[]
  societalChanges: {
    aspect: string
    description: string
    significance: 'high' | 'medium' | 'low'
  }[]
}

export interface ContentValidationError {
  code: string
  message: string
  field?: string
  details?: unknown
}

export interface ContentValidationResult {
  isValid: boolean
  errors: ContentValidationError[]
}

export type ContentType = 
  | PeriodContent 
  | MilestoneContent 
  | EconomicImpactContent 
  | RegionalImpactContent 