import { useState, useEffect } from 'react'
import type { UnifiedTimelineData } from '../types/timeline'
import type { GDPDataSet } from '../types/gdp'
import { dataAccess } from '../lib/data-access'

interface UseTimelineDataOptions {
  startYear?: number
  endYear?: number
  lazy?: boolean
}

interface UseTimelineDataReturn {
  timelineData: UnifiedTimelineData | null
  gdpData: GDPDataSet | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useTimelineData(options: UseTimelineDataOptions = {}): UseTimelineDataReturn {
  const [timelineData, setTimelineData] = useState<UnifiedTimelineData | null>(null)
  const [gdpData, setGDPData] = useState<GDPDataSet | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      if (options.startYear !== undefined && options.endYear !== undefined) {
        const chunkData = await dataAccess.getDataChunk(options.startYear, options.endYear)
        setTimelineData(chunkData)
      } else {
        const [timeline, gdp] = await Promise.all([
          dataAccess.getTimelineData(),
          dataAccess.getGDPData()
        ])
        setTimelineData(timeline)
        setGDPData(gdp)
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!options.lazy) {
      fetchData()
    }
  }, [options.startYear, options.endYear, options.lazy])

  return {
    timelineData,
    gdpData,
    isLoading,
    error,
    refetch: fetchData
  }
} 