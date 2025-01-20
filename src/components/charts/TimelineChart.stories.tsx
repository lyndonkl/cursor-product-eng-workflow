import type { Meta, StoryObj } from '@storybook/react'
import { TimelineChart } from './TimelineChart'
import type { TimelinePeriod, TimelineEvent } from '../../types/timeline'

const mockPeriods: TimelinePeriod[] = [
  {
    id: 'early-modern',
    name: 'Early Modern Period',
    startYear: 1700,
    endYear: 1760,
    color: 'var(--period-early)',
    description: 'Pre-industrial agricultural economy',
    economicIndicators: {
      averageGDP: 1200,
      growthRate: 0.5,
      mainIndustries: ['Agriculture', 'Textiles', 'Mining']
    },
    regionalImpact: {
      europe: 'high',
      americas: 'medium',
      asia: 'low'
    },
    events: [
      {
        id: 'early-1',
        year: 1712,
        title: 'Newcomen Steam Engine',
        description: 'First practical steam engine',
        type: 'technological',
        impact: 'high'
      }
    ]
  },
  {
    id: 'industrial-revolution',
    name: 'Industrial Revolution',
    startYear: 1760,
    endYear: 1840,
    color: 'var(--period-first)',
    description: 'First Industrial Revolution',
    economicIndicators: {
      averageGDP: 2500,
      growthRate: 1.2,
      mainIndustries: ['Steam Power', 'Iron Production', 'Textiles']
    },
    regionalImpact: {
      europe: 'high',
      americas: 'high',
      asia: 'medium'
    },
    events: [
      {
        id: 'ind-1',
        year: 1769,
        title: 'Watt Steam Engine',
        description: 'Improved steam engine design',
        type: 'technological',
        impact: 'high'
      }
    ]
  },
  {
    id: 'second-industrial',
    name: 'Second Industrial Revolution',
    startYear: 1840,
    endYear: 1914,
    color: 'var(--period-second)',
    description: 'Age of Synergy and Mass Production',
    economicIndicators: {
      averageGDP: 5000,
      growthRate: 2.0,
      mainIndustries: ['Steel', 'Oil', 'Electricity']
    },
    regionalImpact: {
      europe: 'high',
      americas: 'high',
      asia: 'high'
    },
    events: [
      {
        id: 'second-1',
        year: 1879,
        title: 'Electric Light Bulb',
        description: 'Edison invents practical light bulb',
        type: 'technological',
        impact: 'high'
      }
    ]
  }
]

const mockGDPData = {
  historical: Array.from({ length: 321 }, (_, i) => ({
    year: 1700 + i,
    gdp: Math.exp(0.02 * i) * 1000,
    range: {
      min: Math.exp(0.02 * i) * 900,
      max: Math.exp(0.02 * i) * 1100
    }
  })),
  projections: Array.from({ length: 30 }, (_, i) => ({
    year: 2021 + i,
    gdp: Math.exp(0.02 * (321 + i)) * 1000,
    range: {
      min: Math.exp(0.02 * (321 + i)) * 800,
      max: Math.exp(0.02 * (321 + i)) * 1200
    }
  })),
  metadata: {
    startYear: 1700,
    endYear: 2050,
    dataSource: 'Mock Data',
    lastUpdated: new Date().toISOString(),
    methodology: 'Exponential Growth Model'
  }
}

const meta = {
  title: 'Charts/TimelineChart',
  component: TimelineChart,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    data: mockGDPData,
    periods: mockPeriods,
    width: 1200,
    height: 600
  }
} satisfies Meta<typeof TimelineChart>

export default meta
type Story = StoryObj<typeof TimelineChart>

export const Default: Story = {}

export const Narrow: Story = {
  args: {
    width: 800,
    height: 400
  }
}

export const Wide: Story = {
  args: {
    width: 1600,
    height: 800
  }
}

export const WithActivePeriod: Story = {
  args: {
    activePeriod: 'industrial-revolution'
  }
}

export const WithInteraction: Story = {
  args: {
    onPeriodClick: (periodId: string) => {
      console.log('Period clicked:', periodId)
    }
  }
} 