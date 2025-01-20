import { useState, useEffect } from 'react'
import { historicalGDPData } from '../../../data/gdp/historical-data'
import type { HistoricalGDPData } from '../../../types/gdp'

interface UseGDPDataOptions {
  startYear?: number
  endYear?: number
}

interface UseGDPDataReturn {
  data: HistoricalGDPData | null
  isLoading: boolean
  error: Error | null
}

export function useGDPData({ 
  startYear, 
  endYear 
}: UseGDPDataOptions = {}): UseGDPDataReturn {
  const [data, setData] = useState<HistoricalGDPData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    try {
      // Filter data points based on year range if provided
      const filteredData = {
        ...historicalGDPData,
        dataPoints: historicalGDPData.dataPoints.filter(point => {
          if (startYear && point.year < startYear) return false
          if (endYear && point.year > endYear) return false
          return true
        })
      }

      setData(filteredData)
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load GDP data'))
      setIsLoading(false)
    }
  }, [startYear, endYear])

  return { data, isLoading, error }
} 