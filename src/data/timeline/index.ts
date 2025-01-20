import { historicalGDPData } from '../gdp/historical-data'
import type { UnifiedTimelineData, TimelinePeriod, TimelineEvent, TimelineMilestone } from '../../types/timeline'

// Create periods based on GDP data points
const createPeriods = (): TimelinePeriod[] => {
  return [
    {
      id: 'pre-industrial',
      name: 'Pre-Industrial Era',
      startYear: 1700,
      endYear: 1759,
      description: 'The period before widespread industrialization, characterized by agricultural economies.',
      color: 'blue',
      economicIndicators: {
        averageGDP: 0.68,
        growthRate: 0.002,
        mainIndustries: ['Agriculture', 'Textiles', 'Mining']
      },
      regionalImpact: {
        europe: 'Limited industrial development',
        americas: 'Colonial trade networks',
        asia: 'Traditional economies'
      },
      events: []
    },
    {
      id: 'industrial-revolution',
      name: 'Industrial Revolution',
      startYear: 1760,
      endYear: 1839,
      description: 'Period of rapid industrialization and technological advancement.',
      color: 'green',
      economicIndicators: {
        averageGDP: 1.0,
        growthRate: 0.015,
        mainIndustries: ['Manufacturing', 'Steam Power', 'Iron Production']
      },
      regionalImpact: {
        europe: 'Center of industrial revolution',
        americas: 'Beginning of industrialization',
        asia: 'Limited industrial growth'
      },
      events: []
    },
    {
      id: 'modern-growth',
      name: 'Modern Growth Era',
      startYear: 1840,
      endYear: 1899,
      description: 'Period of accelerated economic growth and global trade.',
      color: 'purple',
      economicIndicators: {
        averageGDP: 2.0,
        growthRate: 0.025,
        mainIndustries: ['Heavy Industry', 'Railways', 'Steel Production']
      },
      regionalImpact: {
        europe: 'Industrial maturity',
        americas: 'Rapid industrialization',
        asia: 'Beginning of modernization'
      },
      events: []
    },
    {
      id: 'contemporary',
      name: 'Contemporary Era',
      startYear: 1900,
      endYear: 2020,
      description: 'Modern economic development and technological advancement.',
      color: 'orange',
      economicIndicators: {
        averageGDP: 30.0,
        growthRate: 0.035,
        mainIndustries: ['Technology', 'Services', 'Finance']
      },
      regionalImpact: {
        europe: 'Advanced economies',
        americas: 'Economic leadership',
        asia: 'Rapid growth'
      },
      events: []
    }
  ]
}

// Create events based on significant GDP changes
const createEvents = (): TimelineEvent[] => {
  return historicalGDPData.dataPoints.map((point) => ({
    id: `gdp-${point.year}`,
    year: point.year,
    title: `GDP Milestone: ${point.year}`,
    description: `Global GDP reached ${point.gdp.toLocaleString()} trillion (${historicalGDPData.metadata.unit})`,
    type: 'economic' as const,
    impact: point.year >= 1900 ? 'high' : point.year >= 1800 ? 'medium' : 'low'
  }))
}

// Create milestones for significant events
const createMilestones = (): TimelineMilestone[] => {
  return [
    {
      id: 'industrial-start',
      title: 'Start of Industrial Revolution',
      description: 'Beginning of mechanized production and steam power',
      year: 1760,
      period: 'industrial-revolution',
      category: 'technology',
      impact: 'high',
      relatedEvents: []
    },
    {
      id: 'modern-growth-start',
      title: 'Modern Economic Growth',
      description: 'Acceleration of global trade and economic expansion',
      year: 1840,
      period: 'modern-growth',
      category: 'economy',
      impact: 'high',
      relatedEvents: []
    },
    {
      id: 'contemporary-start',
      title: 'Contemporary Era Begins',
      description: 'Start of modern economic systems and rapid technological advancement',
      year: 1900,
      period: 'contemporary',
      category: 'economy',
      impact: 'high',
      relatedEvents: []
    }
  ]
}

export const timelineData: UnifiedTimelineData = {
  periods: createPeriods(),
  milestones: createMilestones(),
  metadata: {
    lastUpdated: historicalGDPData.metadata.lastUpdated,
    source: historicalGDPData.metadata.source,
    version: '1.0.0'
  }
}

// Add events to their respective periods
timelineData.periods.forEach(period => {
  period.events = createEvents().filter(
    event => event.year >= period.startYear && event.year <= period.endYear
  )
}) 