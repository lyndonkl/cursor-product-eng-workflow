/**
 * GDP data types for the timeline visualization
 */

/**
 * Represents a single GDP data point
 */
export interface GDPRange {
  min: number;
  max: number;
}

export interface GDPDataPoint {
  year: number;
  gdp: number;
  range: GDPRange;
}

export interface GDPMetadata {
  source: string;
  unit: string;
  methodology: string;
  lastUpdated: string;
}

export interface HistoricalGDPData {
  dataPoints: GDPDataPoint[];
  metadata: GDPMetadata;
}

export interface ProjectedGDPData {
  dataPoints: GDPDataPoint[];
  metadata: GDPMetadata & {
    projectionModel: string;
    confidenceLevel: number;
  };
}

/**
 * Represents a collection of GDP data points with metadata
 */
export interface GDPDataSet {
  historical: GDPDataPoint[];
  projections: GDPDataPoint[];
  metadata: {
    startYear: number;
    endYear: number;
    dataSource: string;
    lastUpdated: string;
    methodology?: string;
  };
}

/**
 * Validation rules for GDP data
 */
export const GDP_VALIDATION_RULES = {
  yearRange: {
    historical: {
      min: 1700,
      max: 2020,
    },
    projections: {
      min: 2020,
      max: 2050,
    },
  },
  value: {
    min: 0,
    // No upper limit as GDP can grow significantly
  },
} as const;

/**
 * Error types for GDP data validation
 */
export type GDPValidationError = {
  type: 'INVALID_YEAR' | 'INVALID_VALUE' | 'MISSING_CONFIDENCE_INTERVAL' | 'INVALID_DATA_STRUCTURE';
  message: string;
  dataPoint?: GDPDataPoint;
}; 