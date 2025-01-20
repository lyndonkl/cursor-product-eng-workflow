/**
 * Technological milestone data types.
 */

/**
 * Geographic impact of a technological milestone
 */
export interface GeographicImpact {
  country: string
  description: string
  adoptionRate?: number // percentage of adoption in the region
  economicEffect?: string // description of economic impact
}

/**
 * Key figure associated with a technological milestone
 */
export interface KeyFigure {
  name: string
  role: string
  contribution: string
  dates?: {
    birth?: string
    death?: string
  }
}

/**
 * Economic impact of a technological milestone
 */
export interface EconomicImpact {
  gdpEffect: string
  industryChanges: string[]
  jobMarketImpact: string
  productivityGains?: string
}

/**
 * A single technological milestone
 */
export interface TechnologicalMilestone {
  id: string
  name: string
  year: number
  category: string // e.g., "Manufacturing", "Energy", "Transportation", etc.
  description: string
  impact: {
    economic: EconomicImpact
    geographic: GeographicImpact[]
    social?: string
    environmental?: string
  }
  keyFigures: KeyFigure[]
  relatedMilestones: string[] // IDs of related milestones
  historicalPeriodId: string // ID of the associated historical period
  sources?: string[] // References and sources
}

/**
 * Complete technological milestones dataset
 */
export interface TechnologicalMilestonesData {
  milestones: Record<string, TechnologicalMilestone>
  categories: string[] // List of all milestone categories
  timeline: string[] // Ordered list of milestone IDs
  metadata: {
    totalCount: number
    timeRange: {
      start: number
      end: number
    }
    lastUpdated: string
    version: string
  }
}

/**
 * Validation error for milestone data
 */
export interface ValidationError {
  field: string
  message: string
  code: string
  severity: 'error' | 'warning'
}

/**
 * Validation result for milestone data
 */
export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
} 