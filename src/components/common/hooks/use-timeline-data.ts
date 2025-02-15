'use client'

import { useState, useEffect, useMemo } from 'react'
import type { 
  UnifiedTimelineData,
  TimelineDataByYear,
  TimelineDataByPeriod,
  TimelinePeriod,
  TimelineEvent,
  TimelineMilestone
} from '../../../types/timeline'
import type { GDPDataSet } from '../../../types/gdp'
import { 
  createTimelineDataByYear,
  createTimelineDataByPeriod,
  validateTimelineData
} from '../../../lib/timeline'

interface UseTimelineDataOptions {
  startYear?: number
  endYear?: number
  periodId?: string
  mockData?: UnifiedTimelineData // Add mock data option for testing
}

interface UseTimelineDataReturn {
  data: UnifiedTimelineData | null
  byYear: TimelineDataByYear | null
  byPeriod: TimelineDataByPeriod | null
  currentPeriod: TimelinePeriod | null
  events: TimelineEvent[]
  milestones: TimelineMilestone[]
  gdpData: GDPDataSet | null
  isLoading: boolean
  error: Error | null
}

export function useTimelineData({
  startYear,
  endYear,
  periodId,
  mockData
}: UseTimelineDataOptions = {}): UseTimelineDataReturn {
  const [data, setData] = useState<UnifiedTimelineData | null>(null)
  const [gdpData, setGDPData] = useState<GDPDataSet | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (mockData) {
      setData(mockData)
      setIsLoading(false)
      return
    }

    async function fetchData() {
      try {
        const [timelineResponse, gdpResponse] = await Promise.all([
          fetch('/api/timeline'),
          fetch('/api/gdp')
        ])

        if (!timelineResponse.ok) {
          throw new Error(`HTTP error! status: ${timelineResponse.status}`)
        }
        if (!gdpResponse.ok) {
          throw new Error(`HTTP error! status: ${gdpResponse.status}`)
        }

        const [timelineData, gdpData] = await Promise.all([
          timelineResponse.json(),
          gdpResponse.json()
        ])

        setData(timelineData)
        setGDPData(gdpData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [mockData])

  // Create indexed lookups
  const byYear = useMemo(() => {
    if (!data) return null
    return createTimelineDataByYear(data)
  }, [data])

  const byPeriod = useMemo(() => {
    if (!data) return null
    return createTimelineDataByPeriod(data)
  }, [data])

  // Get current period
  const currentPeriod = useMemo(() => {
    if (!data || !periodId) return null
    return data.periods.find(p => p.id === periodId) ?? null
  }, [data, periodId])

  // Filter events and milestones
  const events = useMemo(() => {
    if (!data) return []
    let filteredEvents = data.periods.flatMap(p => p.events)
    
    if (startYear) {
      filteredEvents = filteredEvents.filter(e => e.year >= startYear)
    }
    if (endYear) {
      filteredEvents = filteredEvents.filter(e => e.year <= endYear)
    }
    if (periodId && currentPeriod) {
      filteredEvents = currentPeriod.events
    }

    return filteredEvents
  }, [data, startYear, endYear, periodId, currentPeriod])

  const milestones = useMemo(() => {
    if (!data) return []
    let filteredMilestones = data.milestones

    if (startYear) {
      filteredMilestones = filteredMilestones.filter(m => m.year >= startYear)
    }
    if (endYear) {
      filteredMilestones = filteredMilestones.filter(m => m.year <= endYear)
    }
    if (periodId) {
      filteredMilestones = filteredMilestones.filter(m => m.period === periodId)
    }

    return filteredMilestones
  }, [data, startYear, endYear, periodId])

  return {
    data,
    byYear,
    byPeriod,
    currentPeriod,
    events,
    milestones,
    gdpData,
    isLoading,
    error
  }
} 