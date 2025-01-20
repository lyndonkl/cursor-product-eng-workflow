import { GDPDataPoint, GDPDataSet, GDP_VALIDATION_RULES, GDPValidationError } from '../types/gdp';

/**
 * Validates a single GDP data point
 */
export function validateGDPDataPoint(dataPoint: GDPDataPoint): GDPValidationError[] {
  const errors: GDPValidationError[] = [];
  const { year, value, isProjection, confidenceInterval } = dataPoint;
  const yearRules = isProjection ? GDP_VALIDATION_RULES.yearRange.projections : GDP_VALIDATION_RULES.yearRange.historical;

  // Validate year
  if (year < yearRules.min || year > yearRules.max) {
    errors.push({
      type: 'INVALID_YEAR',
      message: `Year ${year} is outside valid range ${yearRules.min}-${yearRules.max}`,
      dataPoint,
    });
  }

  // Validate value
  if (value < GDP_VALIDATION_RULES.value.min) {
    errors.push({
      type: 'INVALID_VALUE',
      message: `GDP value ${value} is below minimum ${GDP_VALIDATION_RULES.value.min}`,
      dataPoint,
    });
  }

  // Validate confidence intervals for projections
  if (isProjection && !confidenceInterval) {
    errors.push({
      type: 'MISSING_CONFIDENCE_INTERVAL',
      message: 'Projection data point missing confidence interval',
      dataPoint,
    });
  }

  return errors;
}

/**
 * Validates a complete GDP dataset
 */
export function validateGDPDataSet(dataset: GDPDataSet): GDPValidationError[] {
  const errors: GDPValidationError[] = [];

  // Validate historical data
  dataset.historical.forEach(dataPoint => {
    errors.push(...validateGDPDataPoint(dataPoint));
  });

  // Validate projections
  dataset.projections.forEach(dataPoint => {
    errors.push(...validateGDPDataPoint(dataPoint));
  });

  // Validate dataset structure
  if (!dataset.metadata) {
    errors.push({
      type: 'INVALID_DATA_STRUCTURE',
      message: 'Dataset missing metadata',
    });
  }

  return errors;
}

/**
 * Normalizes raw GDP data into a structured format
 */
export function normalizeGDPData(rawData: any): GDPDataSet {
  const dataset: GDPDataSet = {
    historical: [],
    projections: [],
    metadata: {
      startYear: Number.MAX_SAFE_INTEGER,
      endYear: Number.MIN_SAFE_INTEGER,
      dataSource: rawData.source || 'Unknown',
      lastUpdated: new Date().toISOString(),
    },
  };

  // Process historical data
  if (Array.isArray(rawData.historical)) {
    dataset.historical = rawData.historical.map((item: any) => ({
      year: parseInt(item.year),
      value: parseFloat(item.gdp),
      isProjection: false,
    }));
  }

  // Process projection data
  if (Array.isArray(rawData.projections)) {
    dataset.projections = rawData.projections.map((item: any) => ({
      year: parseInt(item.year),
      value: parseFloat(item.gdp),
      isProjection: true,
      confidenceInterval: {
        lower: parseFloat(item.lower),
        upper: parseFloat(item.upper),
      },
    }));
  }

  // Update metadata
  const allYears = [...dataset.historical, ...dataset.projections].map(d => d.year);
  dataset.metadata.startYear = Math.min(...allYears);
  dataset.metadata.endYear = Math.max(...allYears);

  return dataset;
}

/**
 * Formats GDP values for display
 */
export function formatGDPValue(value: number): string {
  const trillion = 1_000_000_000_000;
  if (value >= trillion) {
    return `$${(value / trillion).toFixed(2)}T`;
  }
  const billion = 1_000_000_000;
  return `$${(value / billion).toFixed(2)}B`;
} 