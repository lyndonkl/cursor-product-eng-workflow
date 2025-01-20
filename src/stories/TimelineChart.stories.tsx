import type { Meta, StoryObj } from '@storybook/react'
import { TimelineChart } from '../components/charts/TimelineChart'
import type { GDPDataSet } from '../types/gdp'
import type { TimelinePeriod } from '../types/timeline'

const meta = {
  title: 'Charts/TimelineChart',
  component: TimelineChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TimelineChart>

export default meta
type Story = StoryObj<typeof meta>

// Mock data
const mockGDPData: GDPDataSet = {
  historical: [
    { year: 1700, gdp: 1000, range: { min: 900, max: 1100 } },
    { year: 1800, gdp: 2000, range: { min: 1800, max: 2200 } },
    { year: 1900, gdp: 5000, range: { min: 4500, max: 5500 } }
  ],
  projections: [
    { year: 2000, gdp: 10000, range: { min: 9000, max: 11000 } },
    { year: 2050, gdp: 20000, range: { min: 18000, max: 22000 } }
  ],
  metadata: {
    startYear: 1700,
    endYear: 2050,
    dataSource: 'Historical GDP Records',
    lastUpdated: '2024-01-01',
    methodology: 'Historical data compilation and trend analysis'
  }
}

const mockPeriods: TimelinePeriod[] = [
  {
    id: 'early',
    name: 'Early Modern Period',
    startYear: 1700,
    endYear: 1800,
    color: 'hsl(var(--period-early))',
    description: 'The dawn of modern economic growth',
    economicIndicators: {
      mainIndustries: ['Agriculture', 'Textiles'],
      growthRate: 1.2,
      averageGDP: 1500
    },
    regionalImpact: {
      europe: 'high',
      americas: 'medium',
      asia: 'low'
    },
    events: [
      {
        id: 'steam-engine',
        year: 1769,
        title: 'Steam Engine',
        description: 'Invention of the steam engine',
        type: 'technological',
        impact: 'high'
      }
    ]
  },
  {
    id: 'first',
    name: 'First Industrial Revolution',
    startYear: 1800,
    endYear: 1900,
    color: 'hsl(var(--period-first))',
    description: 'The rise of mechanization',
    economicIndicators: {
      mainIndustries: ['Manufacturing', 'Mining'],
      growthRate: 1.5,
      averageGDP: 3500
    },
    regionalImpact: {
      europe: 'high',
      americas: 'high',
      asia: 'medium'
    },
    events: [
      {
        id: 'electricity',
        year: 1879,
        title: 'Electric Light',
        description: 'Invention of the electric light bulb',
        type: 'technological',
        impact: 'high'
      }
    ]
  }
]

export const Default: Story = {
  args: {
    data: mockGDPData,
    periods: mockPeriods,
    width: 800,
    height: 400
  }
}

export const WithActivePeriod: Story = {
  args: {
    ...Default.args,
    activePeriod: 'first'
  }
}

export const WithInteraction: Story = {
  args: {
    ...Default.args,
    onPeriodClick: (periodId: string) => {
      console.log('Period clicked:', periodId)
    }
  }
} 