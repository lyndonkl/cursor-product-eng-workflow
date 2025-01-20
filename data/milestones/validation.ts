import {
  TechnologicalMilestone,
  TechnologicalMilestonesData,
  ValidationError,
  ValidationResult,
  GeographicImpact,
  KeyFigure,
  EconomicImpact
} from '../types/milestones'

/**
 * Validates a geographic impact entry
 */
function validateGeographicImpact(impact: GeographicImpact): ValidationError[] {
  const errors: ValidationError[] = []

  if (!impact.country?.trim()) {
    errors.push({
      field: 'country',
      message: 'Country is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  if (!impact.description?.trim()) {
    errors.push({
      field: 'description',
      message: 'Description is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  if (impact.adoptionRate !== undefined && (impact.adoptionRate < 0 || impact.adoptionRate > 100)) {
    errors.push({
      field: 'adoptionRate',
      message: 'Adoption rate must be between 0 and 100',
      code: 'INVALID_RANGE',
      severity: 'error'
    })
  }

  return errors
}

/**
 * Validates a key figure entry
 */
function validateKeyFigure(figure: KeyFigure): ValidationError[] {
  const errors: ValidationError[] = []

  if (!figure.name?.trim()) {
    errors.push({
      field: 'name',
      message: 'Name is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  if (!figure.role?.trim()) {
    errors.push({
      field: 'role',
      message: 'Role is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  if (!figure.contribution?.trim()) {
    errors.push({
      field: 'contribution',
      message: 'Contribution is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  return errors
}

/**
 * Validates economic impact data
 */
function validateEconomicImpact(impact: EconomicImpact): ValidationError[] {
  const errors: ValidationError[] = []

  if (!impact.gdpEffect?.trim()) {
    errors.push({
      field: 'gdpEffect',
      message: 'GDP effect description is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  if (!impact.industryChanges?.length) {
    errors.push({
      field: 'industryChanges',
      message: 'At least one industry change must be specified',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  if (!impact.jobMarketImpact?.trim()) {
    errors.push({
      field: 'jobMarketImpact',
      message: 'Job market impact description is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  return errors
}

/**
 * Validates a single technological milestone
 */
export function validateMilestone(milestone: TechnologicalMilestone): ValidationError[] {
  const errors: ValidationError[] = []

  // Validate required fields
  if (!milestone.id?.trim()) {
    errors.push({
      field: 'id',
      message: 'ID is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  if (!milestone.name?.trim()) {
    errors.push({
      field: 'name',
      message: 'Name is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  if (!milestone.year || milestone.year < 1700 || milestone.year > 2050) {
    errors.push({
      field: 'year',
      message: 'Year must be between 1700 and 2050',
      code: 'INVALID_RANGE',
      severity: 'error'
    })
  }

  if (!milestone.category?.trim()) {
    errors.push({
      field: 'category',
      message: 'Category is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  if (!milestone.description?.trim()) {
    errors.push({
      field: 'description',
      message: 'Description is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  // Validate impact data
  if (milestone.impact) {
    errors.push(...validateEconomicImpact(milestone.impact.economic))
    milestone.impact.geographic.forEach((impact, index) => {
      const geographicErrors = validateGeographicImpact(impact)
      geographicErrors.forEach(error => {
        error.field = `geographic[${index}].${error.field}`
      })
      errors.push(...geographicErrors)
    })
  } else {
    errors.push({
      field: 'impact',
      message: 'Impact data is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  // Validate key figures
  if (!milestone.keyFigures?.length) {
    errors.push({
      field: 'keyFigures',
      message: 'At least one key figure is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  } else {
    milestone.keyFigures.forEach((figure, index) => {
      const figureErrors = validateKeyFigure(figure)
      figureErrors.forEach(error => {
        error.field = `keyFigures[${index}].${error.field}`
      })
      errors.push(...figureErrors)
    })
  }

  if (!milestone.historicalPeriodId?.trim()) {
    errors.push({
      field: 'historicalPeriodId',
      message: 'Historical period ID is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  return errors
}

/**
 * Validates the complete technological milestones dataset
 */
export function validateMilestonesData(data: TechnologicalMilestonesData): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Validate individual milestones
  Object.entries(data.milestones).forEach(([id, milestone]) => {
    const milestoneErrors = validateMilestone(milestone)
    milestoneErrors.forEach(error => {
      error.field = `milestones.${id}.${error.field}`
    })
    errors.push(...milestoneErrors)
  })

  // Validate categories
  if (!data.categories?.length) {
    errors.push({
      field: 'categories',
      message: 'At least one category is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  }

  // Validate timeline
  if (!data.timeline?.length) {
    errors.push({
      field: 'timeline',
      message: 'Timeline must contain at least one milestone',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  } else {
    // Check if timeline contains all milestone IDs
    const timelineSet = new Set(data.timeline)
    const milestoneIds = Object.keys(data.milestones)
    milestoneIds.forEach(id => {
      if (!timelineSet.has(id)) {
        warnings.push({
          field: 'timeline',
          message: `Milestone ${id} is not included in the timeline`,
          code: 'MISSING_TIMELINE_ENTRY',
          severity: 'warning'
        })
      }
    })
  }

  // Validate metadata
  if (!data.metadata) {
    errors.push({
      field: 'metadata',
      message: 'Metadata is required',
      code: 'REQUIRED_FIELD',
      severity: 'error'
    })
  } else {
    if (data.metadata.totalCount !== Object.keys(data.milestones).length) {
      errors.push({
        field: 'metadata.totalCount',
        message: 'Total count does not match number of milestones',
        code: 'INVALID_COUNT',
        severity: 'error'
      })
    }

    if (!data.metadata.timeRange?.start || !data.metadata.timeRange?.end) {
      errors.push({
        field: 'metadata.timeRange',
        message: 'Time range start and end are required',
        code: 'REQUIRED_FIELD',
        severity: 'error'
      })
    }

    if (!data.metadata.version?.trim()) {
      errors.push({
        field: 'metadata.version',
        message: 'Version is required',
        code: 'REQUIRED_FIELD',
        severity: 'error'
      })
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
} 