import type {
  ContentBlock,
  PeriodContent,
  MilestoneContent,
  EconomicImpactContent,
  RegionalImpactContent,
  ContentValidationError,
  ContentValidationResult,
  ContentType
} from '../types/content'

function validateContentBlock(content: ContentBlock): ContentValidationError[] {
  const errors: ContentValidationError[] = []

  if (!content.id) {
    errors.push({
      code: 'MISSING_ID',
      message: 'Content block must have an ID',
      field: 'id'
    })
  }

  if (!content.title) {
    errors.push({
      code: 'MISSING_TITLE',
      message: 'Content block must have a title',
      field: 'title'
    })
  }

  if (!content.content || content.content.length < 10) {
    errors.push({
      code: 'INVALID_CONTENT',
      message: 'Content must be at least 10 characters long',
      field: 'content'
    })
  }

  if (!['overview', 'detail', 'impact', 'analysis'].includes(content.type)) {
    errors.push({
      code: 'INVALID_TYPE',
      message: 'Invalid content type',
      field: 'type'
    })
  }

  return errors
}

function validatePeriodContent(content: PeriodContent): ContentValidationError[] {
  const errors = validateContentBlock(content)

  if (!content.periodId) {
    errors.push({
      code: 'MISSING_PERIOD_ID',
      message: 'Period content must have a period ID',
      field: 'periodId'
    })
  }

  if (!content.highlights || content.highlights.length === 0) {
    errors.push({
      code: 'MISSING_HIGHLIGHTS',
      message: 'Period content must have at least one highlight',
      field: 'highlights'
    })
  }

  if (!content.economicAnalysis) {
    errors.push({
      code: 'MISSING_ECONOMIC_ANALYSIS',
      message: 'Period content must have economic analysis',
      field: 'economicAnalysis'
    })
  }

  if (!content.regionalImpacts || content.regionalImpacts.length === 0) {
    errors.push({
      code: 'MISSING_REGIONAL_IMPACTS',
      message: 'Period content must have at least one regional impact',
      field: 'regionalImpacts'
    })
  }

  return errors
}

function validateMilestoneContent(content: MilestoneContent): ContentValidationError[] {
  const errors = validateContentBlock(content)

  if (!content.milestoneId) {
    errors.push({
      code: 'MISSING_MILESTONE_ID',
      message: 'Milestone content must have a milestone ID',
      field: 'milestoneId'
    })
  }

  if (!content.shortDescription) {
    errors.push({
      code: 'MISSING_SHORT_DESCRIPTION',
      message: 'Milestone content must have a short description',
      field: 'shortDescription'
    })
  }

  if (!content.economicImpact) {
    errors.push({
      code: 'MISSING_ECONOMIC_IMPACT',
      message: 'Milestone content must have economic impact description',
      field: 'economicImpact'
    })
  }

  if (!content.relatedPeriods || content.relatedPeriods.length === 0) {
    errors.push({
      code: 'MISSING_RELATED_PERIODS',
      message: 'Milestone content must have at least one related period',
      field: 'relatedPeriods'
    })
  }

  return errors
}

function validateEconomicImpactContent(content: EconomicImpactContent): ContentValidationError[] {
  const errors = validateContentBlock(content)

  if (!content.metrics || content.metrics.length === 0) {
    errors.push({
      code: 'MISSING_METRICS',
      message: 'Economic impact content must have at least one metric',
      field: 'metrics'
    })
  }

  if (!content.trends || content.trends.length === 0) {
    errors.push({
      code: 'MISSING_TRENDS',
      message: 'Economic impact content must have at least one trend',
      field: 'trends'
    })
  }

  if (!content.comparisons || content.comparisons.length === 0) {
    errors.push({
      code: 'MISSING_COMPARISONS',
      message: 'Economic impact content must have at least one comparison',
      field: 'comparisons'
    })
  }

  return errors
}

function validateRegionalImpactContent(content: RegionalImpactContent): ContentValidationError[] {
  const errors = validateContentBlock(content)

  if (!content.region) {
    errors.push({
      code: 'MISSING_REGION',
      message: 'Regional impact content must have a region',
      field: 'region'
    })
  }

  if (!content.keyIndustries || content.keyIndustries.length === 0) {
    errors.push({
      code: 'MISSING_KEY_INDUSTRIES',
      message: 'Regional impact content must have at least one key industry',
      field: 'keyIndustries'
    })
  }

  if (!content.economicChanges || content.economicChanges.length === 0) {
    errors.push({
      code: 'MISSING_ECONOMIC_CHANGES',
      message: 'Regional impact content must have at least one economic change',
      field: 'economicChanges'
    })
  }

  if (!content.societalChanges || content.societalChanges.length === 0) {
    errors.push({
      code: 'MISSING_SOCIETAL_CHANGES',
      message: 'Regional impact content must have at least one societal change',
      field: 'societalChanges'
    })
  }

  return errors
}

export function validateContent(content: ContentType): ContentValidationResult {
  let errors: ContentValidationError[] = []

  if ('periodId' in content) {
    errors = validatePeriodContent(content)
  } else if ('milestoneId' in content) {
    errors = validateMilestoneContent(content)
  } else if ('metrics' in content) {
    errors = validateEconomicImpactContent(content)
  } else if ('region' in content) {
    errors = validateRegionalImpactContent(content)
  } else {
    errors.push({
      code: 'INVALID_CONTENT_TYPE',
      message: 'Unknown content type',
    })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
} 