/**
 * Types for historical periods and related data
 */

export interface CountryInsight {
  summary: string
  impact: 'high' | 'medium' | 'low'
  details?: string[]
}

export interface RegionalImpact {
  [country: string]: CountryInsight
}

export interface EconomicEvent {
  year: number
  event: string
  impact: string
}

export interface EconomicIndicators {
  averageGrowth: string
  keyFactors: string[]
  peakGDPYear: number
  additionalMetrics?: {
    [key: string]: string | number
  }
}

/**
 * Represents a major historical period in the GDP timeline
 */
export interface HistoricalPeriod {
  /** Unique identifier for the period */
  id: string
  
  /** Display name of the period */
  name: string
  
  /** Start year of the period */
  startYear: number
  
  /** End year of the period */
  endYear: number
  
  /** Brief description of the period */
  description: string
  
  /** Detailed description of the period's characteristics */
  characteristics: string[]
  
  /** Key events during this period */
  keyEvents: EconomicEvent[]
  
  /** Regional impact data */
  regionalImpact: RegionalImpact
  
  /** Economic indicators and statistics */
  economicIndicators: EconomicIndicators
  
  /** References to related technological milestones */
  relatedMilestones: string[] // IDs of related technological milestones
}

export interface TimeRange {
  start: number
  end: number
}

export interface HistoricalMetadata {
  totalPeriods: number
  timeRange: TimeRange
  lastUpdated: string
  version: string
}

/**
 * Type for the complete historical periods dataset
 */
export interface HistoricalPeriodsData {
  /** Map of period IDs to period data */
  periods: { [key: string]: HistoricalPeriod }
  
  /** Ordered list of period IDs representing the timeline sequence */
  timeline: string[]
  
  /** Metadata about the dataset */
  metadata: HistoricalMetadata
}

/**
 * Type for validation errors in historical period data
 */
export interface ValidationError {
  periodId?: string
  field: string
  message: string
  severity: 'error' | 'warning'
} 