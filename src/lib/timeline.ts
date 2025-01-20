import type {
  UnifiedTimelineData,
  TimelineDataByYear,
  TimelineDataByPeriod,
  TimelineValidationResult,
  TimelineValidationError,
  TimelinePeriod,
  TimelineEvent,
  TimelineMilestone
} from '../types/timeline'

/**
 * Creates an indexed lookup structure for timeline data by year
 */
export function createTimelineDataByYear(data: UnifiedTimelineData): TimelineDataByYear {
  const byYear: TimelineDataByYear = {}

  // Process each period
  data.periods.forEach(period => {
    // Create entries for each year in the period
    for (let year = period.startYear; year <= period.endYear; year++) {
      if (!byYear[year]) {
        byYear[year] = {
          gdp: 0, // Will be populated with actual data
          period,
          events: [],
          milestones: []
        }
      }
    }

    // Add events
    period.events.forEach(event => {
      if (byYear[event.year]) {
        byYear[event.year].events.push(event)
      }
    })
  })

  // Add milestones
  data.milestones.forEach(milestone => {
    if (byYear[milestone.year]) {
      byYear[milestone.year].milestones.push(milestone)
    }
  })

  return byYear
}

/**
 * Creates an indexed lookup structure for timeline data by period
 */
export function createTimelineDataByPeriod(data: UnifiedTimelineData): TimelineDataByPeriod {
  const byPeriod: TimelineDataByPeriod = {}

  // Process each period
  data.periods.forEach(period => {
    byPeriod[period.id] = {
      period,
      gdpData: [], // Will be populated with actual GDP data points
      events: period.events,
      milestones: data.milestones.filter(m => m.period === period.id)
    }

    // Create GDP data points for each year
    for (let year = period.startYear; year <= period.endYear; year++) {
      byPeriod[period.id].gdpData.push({
        year,
        value: 0 // Will be populated with actual data
      })
    }
  })

  return byPeriod
}

/**
 * Validates timeline data structure and relationships
 */
export function validateTimelineData(data: UnifiedTimelineData): TimelineValidationResult {
  const errors: TimelineValidationError[] = []

  // Check if periods exist
  if (!data.periods || data.periods.length === 0) {
    errors.push({
      code: 'NO_PERIODS',
      message: 'Timeline must contain at least one period'
    })
  }

  // Check period continuity
  if (data.periods && data.periods.length > 0) {
    const sortedPeriods = [...data.periods].sort((a, b) => a.startYear - b.startYear)
    
    for (let i = 1; i < sortedPeriods.length; i++) {
      const prevPeriod = sortedPeriods[i - 1]
      const currentPeriod = sortedPeriods[i]
      
      if (prevPeriod.endYear >= currentPeriod.startYear) {
        errors.push({
          code: 'PERIOD_OVERLAP',
          message: `Periods "${prevPeriod.name}" and "${currentPeriod.name}" overlap`,
          details: {
            period1: prevPeriod.id,
            period2: currentPeriod.id
          }
        })
      }
    }
  }

  // Validate milestone references
  data.milestones.forEach(milestone => {
    const period = data.periods.find(p => p.id === milestone.period)
    if (!period) {
      errors.push({
        code: 'INVALID_MILESTONE_PERIOD',
        message: `Milestone "${milestone.title}" references non-existent period "${milestone.period}"`,
        field: 'period'
      })
    }

    milestone.relatedEvents.forEach(eventId => {
      const eventExists = data.periods.some(p => 
        p.events.some(e => e.id === eventId)
      )
      if (!eventExists) {
        errors.push({
          code: 'INVALID_EVENT_REFERENCE',
          message: `Milestone "${milestone.title}" references non-existent event "${eventId}"`,
          field: 'relatedEvents'
        })
      }
    })
  })

  return {
    isValid: errors.length === 0,
    errors
  }
} 