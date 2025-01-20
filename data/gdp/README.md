# GDP Data Normalization Process

## Overview
This document outlines the process of extracting, normalizing, and validating GDP data for the timeline visualization project.

## Data Structure

### GDP Data Point
```typescript
interface GDPDataPoint {
  year: number;      // Year of the data point
  value: number;     // GDP value
  isProjection: boolean; // Whether this is historical or projected data
  confidenceInterval?: { // Required for projections
    lower: number;
    upper: number;
  };
}
```

### Complete Dataset
```typescript
interface GDPDataSet {
  historical: GDPDataPoint[];  // Historical data (1700-2020)
  projections: GDPDataPoint[]; // Future projections (2020-2050)
  metadata: {
    startYear: number;
    endYear: number;
    dataSource: string;
    lastUpdated: string;
    methodology?: string;
  };
}
```

## Validation Rules

### Year Ranges
- Historical data: 1700-2020
- Projections: 2020-2050

### Value Constraints
- All GDP values must be positive
- Projections must include confidence intervals

## Normalization Process

1. **Data Extraction**
   - Extract historical GDP values (1700-2020)
   - Extract projection data (2020-2050)
   - Parse numerical values and dates

2. **Data Transformation**
   - Convert all GDP values to consistent units
   - Ensure consistent date formats
   - Add metadata and source information

3. **Validation**
   - Validate year ranges
   - Validate GDP values
   - Check for required confidence intervals
   - Verify data structure completeness

4. **Error Handling**
   - Invalid year ranges
   - Missing or invalid GDP values
   - Missing confidence intervals for projections
   - Structural validation errors

## Usage Example

```typescript
import { normalizeGDPData, validateGDPDataSet } from './normalize';

// Raw data example
const rawData = {
  historical: [
    { year: "1700", gdp: "123456789" },
    // ...more data
  ],
  projections: [
    { 
      year: "2025",
      gdp: "987654321",
      lower: "900000000",
      upper: "1000000000"
    },
    // ...more projections
  ],
  source: "Historical Economic Data Repository"
};

// Normalize the data
const dataset = normalizeGDPData(rawData);

// Validate the dataset
const errors = validateGDPDataSet(dataset);

if (errors.length > 0) {
  console.error('Validation errors:', errors);
} else {
  console.log('Dataset is valid');
}
```

## Display Formatting

GDP values are formatted for display using the following rules:
- Values ≥ $1T: Displayed in trillions (e.g., "$1.23T")
- Values < $1T: Displayed in billions (e.g., "$123.45B")

## Implementation Notes

1. **Performance Considerations**
   - Data is normalized once at load time
   - Validation results are cached
   - Formatted values are computed on demand

2. **Error Recovery**
   - Invalid data points are logged but not included
   - Missing values are interpolated where possible
   - Validation errors are reported for manual review

3. **Data Updates**
   - New data can be added through the normalization process
   - Validation ensures data consistency
   - Metadata is automatically updated 