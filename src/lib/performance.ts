import type { UnifiedTimelineData, TimelinePeriod, TimelineMilestone } from '../types/timeline'
import type { GDPDataSet, GDPDataPoint } from '../types/gdp'

const CHUNK_SIZE = 50 // Number of data points per chunk
const CACHE_SIZE = 100 // Maximum number of cached results

// LRU Cache for memoization
class LRUCache<K, V> {
  private cache: Map<K, V>
  private readonly maxSize: number

  constructor(maxSize: number) {
    this.cache = new Map()
    this.maxSize = maxSize
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key)
    if (value) {
      // Refresh item position
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    return value
  }

  set(key: K, value: V): void {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    this.cache.set(key, value)
  }

  clear(): void {
    this.cache.clear()
  }
}

// Data chunking
export function chunkTimelineData(data: UnifiedTimelineData): UnifiedTimelineData[] {
  const chunks: UnifiedTimelineData[] = []
  const totalYears = data.periods.reduce((max, period) => 
    Math.max(max, period.endYear), 0) - 
    data.periods.reduce((min, period) => 
    Math.min(min, period.startYear), Infinity)
  
  const yearsPerChunk = Math.ceil(totalYears / Math.ceil(totalYears / CHUNK_SIZE))
  
  for (let startYear = data.periods[0].startYear; startYear < data.periods[data.periods.length - 1].endYear; startYear += yearsPerChunk) {
    const endYear = startYear + yearsPerChunk
    chunks.push({
      periods: data.periods.filter(p => p.startYear <= endYear && p.endYear >= startYear),
      milestones: data.milestones.filter(m => m.year >= startYear && m.year <= endYear),
      metadata: data.metadata
    })
  }
  
  return chunks
}

// Efficient indexes
export interface TimelineIndexes {
  periodsByYear: Map<number, TimelinePeriod[]>
  milestonesByYear: Map<number, TimelineMilestone[]>
  periodById: Map<string, TimelinePeriod>
  milestoneById: Map<string, TimelineMilestone>
}

export function createTimelineIndexes(data: UnifiedTimelineData): TimelineIndexes {
  const indexes: TimelineIndexes = {
    periodsByYear: new Map(),
    milestonesByYear: new Map(),
    periodById: new Map(),
    milestoneById: new Map()
  }

  // Index periods
  data.periods.forEach(period => {
    indexes.periodById.set(period.id, period)
    for (let year = period.startYear; year <= period.endYear; year++) {
      const periods = indexes.periodsByYear.get(year) || []
      periods.push(period)
      indexes.periodsByYear.set(year, periods)
    }
  })

  // Index milestones
  data.milestones.forEach(milestone => {
    indexes.milestoneById.set(milestone.id, milestone)
    const milestones = indexes.milestonesByYear.get(milestone.year) || []
    milestones.push(milestone)
    indexes.milestonesByYear.set(milestone.year, milestones)
  })

  return indexes
}

// Memoized data access
const memoizedResults = new LRUCache<string, any>(CACHE_SIZE)

export function memoize<T>(key: string, computation: () => T): T {
  const cached = memoizedResults.get(key)
  if (cached !== undefined) {
    return cached as T
  }
  
  const result = computation()
  memoizedResults.set(key, result)
  return result
}

// Performance benchmarking
export interface PerformanceMetrics {
  dataLoadTime: number
  renderTime: number
  memoryUsage: number
  dataPoints: number
}

export function measurePerformance(operation: () => void): PerformanceMetrics {
  const start = performance.now()
  operation()
  const end = performance.now()

  return {
    dataLoadTime: end - start,
    renderTime: end - start,
    memoryUsage: typeof window !== 'undefined' ? window.performance?.memory?.usedJSHeapSize || 0 : 0,
    dataPoints: 0
  }
}

// Optimized lookup patterns
export function findItemsInRange(
  indexes: TimelineIndexes,
  startYear: number,
  endYear: number
): { periods: TimelinePeriod[]; milestones: TimelineMilestone[] } {
  const key = `range-${startYear}-${endYear}`
  
  return memoize(key, () => {
    const periods = new Set<TimelinePeriod>()
    const milestones = new Set<TimelineMilestone>()

    for (let year = startYear; year <= endYear; year++) {
      indexes.periodsByYear.get(year)?.forEach(period => periods.add(period))
      indexes.milestonesByYear.get(year)?.forEach(milestone => milestones.add(milestone))
    }

    return {
      periods: Array.from(periods),
      milestones: Array.from(milestones)
    }
  })
} 