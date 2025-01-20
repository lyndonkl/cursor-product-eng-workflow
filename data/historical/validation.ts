import { HistoricalPeriod, HistoricalPeriodsData, ValidationResult, ValidationError } from '../types/historical';

/**
 * Validates a single historical period
 */
export function validatePeriod(period: HistoricalPeriod): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required fields validation
  const requiredFields: Array<keyof HistoricalPeriod> = [
    'id', 'name', 'startYear', 'endYear', 'description'
  ];

  requiredFields.forEach(field => {
    if (!period[field]) {
      errors.push({
        periodId: period.id,
        field,
        message: `Missing required field: ${field}`,
        severity: 'error'
      });
    }
  });

  // Year range validation
  if (period.startYear && period.endYear) {
    if (period.startYear >= period.endYear) {
      errors.push({
        periodId: period.id,
        field: 'yearRange',
        message: 'Start year must be before end year',
        severity: 'error'
      });
    }

    // Reasonable year range check (warning)
    if (period.startYear < 1500 || period.endYear > 2100) {
      errors.push({
        periodId: period.id,
        field: 'yearRange',
        message: 'Year range outside expected bounds (1500-2100)',
        severity: 'warning'
      });
    }
  }

  // Key events validation
  period.keyEvents?.forEach((event, index) => {
    if (!event.year || !event.event || !event.impact) {
      errors.push({
        periodId: period.id,
        field: `keyEvents[${index}]`,
        message: 'Key event missing required fields',
        severity: 'error'
      });
    }

    if (event.year < period.startYear || event.year > period.endYear) {
      errors.push({
        periodId: period.id,
        field: `keyEvents[${index}]`,
        message: 'Event year outside period range',
        severity: 'warning'
      });
    }
  });

  // Regional impact validation
  if (period.regionalImpact) {
    Object.entries(period.regionalImpact).forEach(([region, impact]) => {
      if (!impact.description || !impact.significance || typeof impact.gdpImpact !== 'number') {
        errors.push({
          periodId: period.id,
          field: `regionalImpact.${region}`,
          message: 'Regional impact missing required fields',
          severity: 'error'
        });
      }
    });
  }

  return errors;
}

/**
 * Validates the complete historical periods dataset
 */
export function validateHistoricalData(data: HistoricalPeriodsData): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Validate individual periods
  Object.values(data.periods).forEach(period => {
    const periodErrors = validatePeriod(period);
    periodErrors.forEach(error => {
      if (error.severity === 'error') {
        errors.push(error);
      } else {
        warnings.push(error);
      }
    });
  });

  // Validate timeline consistency
  const timelineIds = new Set(data.timeline);
  const periodIds = new Set(Object.keys(data.periods));

  // Check for periods in timeline but not in periods
  data.timeline.forEach(id => {
    if (!periodIds.has(id)) {
      errors.push({
        field: 'timeline',
        message: `Timeline references non-existent period: ${id}`,
        severity: 'error'
      });
    }
  });

  // Check for periods not in timeline
  periodIds.forEach(id => {
    if (!timelineIds.has(id)) {
      warnings.push({
        field: 'timeline',
        message: `Period exists but not in timeline: ${id}`,
        severity: 'warning'
      });
    }
  });

  // Validate chronological order
  let lastEndYear = -Infinity;
  data.timeline.forEach(id => {
    const period = data.periods[id];
    if (period && period.startYear < lastEndYear) {
      errors.push({
        periodId: id,
        field: 'timeline',
        message: 'Periods not in chronological order',
        severity: 'error'
      });
    }
    if (period) {
      lastEndYear = period.endYear;
    }
  });

  // Validate metadata
  if (!data.metadata.timeRange || 
      !data.metadata.version || 
      !data.metadata.lastUpdated) {
    errors.push({
      field: 'metadata',
      message: 'Missing required metadata fields',
      severity: 'error'
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
} 