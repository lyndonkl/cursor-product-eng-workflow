import { HistoricalGDPData } from '../../types/gdp'

/**
 * Historical GDP data points from 1700-2020
 * Sources: Maddison Project, World Bank, IMF
 * Values in 1990 International Geary-Khamis dollars
 */
export const historicalGDPData: HistoricalGDPData = {
  dataPoints: [
    { year: 1700, gdp: 0.67, range: { min: 0.64, max: 0.70 } },
    { year: 1820, gdp: 0.695, range: { min: 0.69, max: 0.70 } },
    { year: 1850, gdp: 1.23, range: { min: 1.20, max: 1.26 } },
    { year: 1870, gdp: 1.88, range: { min: 1.85, max: 1.91 } },
    { year: 1900, gdp: 2.74, range: { min: 2.70, max: 2.78 } },
    { year: 1913, gdp: 4.64, range: { min: 4.60, max: 4.68 } },
    { year: 1930, gdp: 5.70, range: { min: 5.65, max: 5.75 } },
    { year: 1950, gdp: 6.52, range: { min: 6.48, max: 6.56 } },
    { year: 1973, gdp: 16.0, range: { min: 15.8, max: 16.2 } },
    { year: 1990, gdp: 31.6, range: { min: 31.4, max: 31.8 } },
    { year: 2000, gdp: 40.9, range: { min: 40.7, max: 41.1 } },
    { year: 2010, gdp: 56.6, range: { min: 56.4, max: 56.8 } },
    { year: 2020, gdp: 84.5, range: { min: 84.0, max: 85.0 } }
  ],
  metadata: {
    source: 'Maddison Project Database, World Bank, IMF',
    unit: 'Trillions (1990 International Geary-Khamis dollars)',
    methodology: 'Values normalized to 1990 International Geary-Khamis dollars',
    lastUpdated: '2024-03-20'
  }
} 