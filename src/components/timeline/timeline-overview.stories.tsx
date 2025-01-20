import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TimelineOverview } from './timeline-overview'
import { mockTimelineData } from '../../app/api/timeline/route'

const meta = {
  title: 'Timeline/TimelineOverview',
  component: TimelineOverview,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    periodId: {
      control: 'select',
      options: ['early-modern', 'industrial'],
      description: 'The ID of the period to display'
    },
    startYear: {
      control: 'number',
      min: 1700,
      max: 1900,
      description: 'Start year for filtering'
    },
    endYear: {
      control: 'number',
      min: 1700,
      max: 1900,
      description: 'End year for filtering'
    }
  }
} satisfies Meta<typeof TimelineOverview>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mockData: mockTimelineData
  }
}

export const EarlyModernPeriod: Story = {
  args: {
    mockData: mockTimelineData,
    periodId: 'early-modern'
  }
}

export const IndustrialPeriod: Story = {
  args: {
    mockData: mockTimelineData,
    periodId: 'industrial'
  }
}

export const WithDateRange: Story = {
  args: {
    mockData: mockTimelineData,
    startYear: 1750,
    endYear: 1850
  }
}

export const WithPeriodAndDateRange: Story = {
  args: {
    mockData: mockTimelineData,
    periodId: 'early-modern',
    startYear: 1750,
    endYear: 1800
  }
}

// Loading state without mock data
export const Loading: Story = {
  args: {}
}

// Error state with invalid mock data
export const Error: Story = {
  args: {
    mockData: {
      periods: [],
      milestones: [],
      metadata: {
        lastUpdated: '',
        source: '',
        version: ''
      }
    }
  }
} 