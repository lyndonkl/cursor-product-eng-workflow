import { GDPDataSet } from '../types/gdp';
import { historicalGDPData } from './historical-data';
import { projectionGDPData } from './projection-data';

/**
 * Technological milestones mapped to years
 */
export interface TechMilestone {
  year: number;
  name: string;
  description: string;
}

export const techMilestones: TechMilestone[] = [
  {
    year: 1700,
    name: "Pre-Industrial Era",
    description: "Pre-Industrial (coal use, primitive steam engines)"
  },
  {
    year: 1820,
    name: "First Industrial Revolution",
    description: "Steam engine improvements, mechanized textile production"
  },
  {
    year: 1870,
    name: "Second Industrial Revolution",
    description: "Steel production, electricity, internal combustion engine"
  },
  {
    year: 1950,
    name: "Computing Revolution",
    description: "Post-WWII rebuilding, early computing (transistors)"
  },
  {
    year: 1990,
    name: "Information Age",
    description: "Personal computing era, end of Cold War"
  },
  {
    year: 2000,
    name: "Internet Revolution",
    description: "Rise of the Internet, dot-com bubble/bust"
  },
  {
    year: 2010,
    name: "Mobile & Cloud Era",
    description: "Smartphones, big data, social media"
  },
  {
    year: 2020,
    name: "AI Revolution",
    description: "AI & cloud adoption accelerate"
  },
  {
    year: 2050,
    name: "Future Tech",
    description: "Future AI breakthroughs, robotics, quantum computing"
  }
];

/**
 * Complete GDP dataset with historical data and projections
 */
export const gdpDataset: GDPDataSet = {
  historical: historicalGDPData,
  projections: projectionGDPData,
  metadata: {
    startYear: 1700,
    endYear: 2050,
    dataSource: "Maddison Project, World Bank, IMF, PwC",
    lastUpdated: "2024-02-14",
    methodology: "Values normalized to 1990 International Geary-Khamis dollars. Historical data from multiple sources including Maddison Project Database. Projections based on PwC 'The World in 2050' report and IMF forecasts."
  }
}; 