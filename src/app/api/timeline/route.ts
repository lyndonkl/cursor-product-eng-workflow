import { NextResponse } from 'next/server'
import type { UnifiedTimelineData } from '../../../types/timeline'
import { validateTimelineData } from '../../../lib/timeline'

// Mock data for testing and Storybook
export const mockTimelineData: UnifiedTimelineData = {
  periods: [
    {
      id: 'early-modern',
      name: 'Early Modern Period',
      startYear: 1700,
      endYear: 1760,
      description: 'The early modern period marked the beginning of significant economic changes, characterized by agricultural dominance and early manufacturing.',
      color: '#4CAF50',
      economicIndicators: {
        averageGDP: 695000000,
        growthRate: 0.015,
        mainIndustries: ['Agriculture', 'Textiles', 'Mining']
      },
      regionalImpact: {
        europe: 'High',
        americas: 'Medium',
        asia: 'Low'
      },
      events: [
        {
          id: 'em-1',
          year: 1712,
          title: 'Newcomen Steam Engine',
          description: 'First practical steam engine developed',
          type: 'technological',
          impact: 'high'
        }
      ]
    },
    {
      id: 'industrial',
      name: 'Industrial Revolution',
      startYear: 1760,
      endYear: 1840,
      description: 'A period of major industrialization and innovation that transformed economies from agricultural to manufacturing-based.',
      color: '#2196F3',
      economicIndicators: {
        averageGDP: 1245000000,
        growthRate: 0.025,
        mainIndustries: ['Manufacturing', 'Steel', 'Coal']
      },
      regionalImpact: {
        europe: 'Very High',
        americas: 'High',
        asia: 'Medium'
      },
      events: [
        {
          id: 'ir-1',
          year: 1769,
          title: 'Watt Steam Engine',
          description: 'Improved steam engine patented by James Watt',
          type: 'technological',
          impact: 'high'
        }
      ]
    }
  ],
  milestones: [
    {
      id: 'ms-1',
      year: 1712,
      title: 'Steam Power',
      description: 'Introduction of the first practical steam engine',
      category: 'technology',
      impact: 'high',
      period: 'early-modern',
      relatedEvents: ['em-1']
    },
    {
      id: 'ms-2',
      year: 1769,
      title: 'Industrial Steam Power',
      description: 'Watt steam engine revolutionizes industrial production',
      category: 'technology',
      impact: 'high',
      period: 'industrial',
      relatedEvents: ['ir-1']
    }
  ],
  metadata: {
    lastUpdated: '2024-02-14',
    source: 'Historical Economic Records',
    version: '1.0.0'
  }
}

export async function GET() {
  // Validate the mock data
  const validation = validateTimelineData(mockTimelineData)
  if (!validation.isValid) {
    return NextResponse.json(
      { error: validation.errors[0].message },
      { status: 400 }
    )
  }

  return NextResponse.json(mockTimelineData)
} 