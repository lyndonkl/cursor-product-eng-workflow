import type { UnifiedTimelineData } from '../types/timeline'
import type { GDPDataSet } from '../types/gdp'
import { chunkTimelineData, createTimelineIndexes, findItemsInRange, type TimelineIndexes } from './performance'

interface DataCache {
  timeline?: UnifiedTimelineData
  gdp?: GDPDataSet
  timelineChunks?: UnifiedTimelineData[]
  timelineIndexes?: TimelineIndexes
  lastUpdated: Record<string, number>
}

class DataAccessService {
  private static instance: DataAccessService
  private cache: DataCache = { lastUpdated: {} }
  private CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  private constructor() {}

  static getInstance(): DataAccessService {
    if (!DataAccessService.instance) {
      DataAccessService.instance = new DataAccessService()
    }
    return DataAccessService.instance
  }

  private isCacheValid(key: keyof DataCache): boolean {
    const lastUpdated = this.cache.lastUpdated[key]
    return lastUpdated !== undefined && Date.now() - lastUpdated < this.CACHE_DURATION
  }

  async getTimelineData(): Promise<UnifiedTimelineData> {
    if (this.cache.timeline && this.isCacheValid('timeline')) {
      return this.cache.timeline
    }

    try {
      const response = await fetch('/api/timeline')
      if (!response.ok) throw new Error('Failed to fetch timeline data')
      
      const data = await response.json()
      this.cache.timeline = data
      this.cache.lastUpdated['timeline'] = Date.now()
      
      // Create and cache chunks and indexes
      this.cache.timelineChunks = chunkTimelineData(data)
      this.cache.timelineIndexes = createTimelineIndexes(data)
      this.cache.lastUpdated['timelineChunks'] = Date.now()
      this.cache.lastUpdated['timelineIndexes'] = Date.now()
      
      return data
    } catch (error) {
      console.error('Error fetching timeline data:', error)
      throw error
    }
  }

  async getGDPData(): Promise<GDPDataSet> {
    if (this.cache.gdp && this.isCacheValid('gdp')) {
      return this.cache.gdp
    }

    try {
      const response = await fetch('/api/gdp')
      if (!response.ok) throw new Error('Failed to fetch GDP data')
      
      const data = await response.json()
      this.cache.gdp = data
      this.cache.lastUpdated['gdp'] = Date.now()
      
      return data
    } catch (error) {
      console.error('Error fetching GDP data:', error)
      throw error
    }
  }

  async getDataChunk(startYear: number, endYear: number): Promise<UnifiedTimelineData> {
    // Ensure we have the timeline data and indexes
    if (!this.cache.timelineIndexes || !this.isCacheValid('timelineIndexes')) {
      await this.getTimelineData()
    }

    try {
      const { periods, milestones } = findItemsInRange(
        this.cache.timelineIndexes!,
        startYear,
        endYear
      )

      return {
        periods,
        milestones,
        metadata: this.cache.timeline!.metadata
      }
    } catch (error) {
      console.error('Error fetching data chunk:', error)
      throw error
    }
  }

  clearCache(): void {
    this.cache = { lastUpdated: {} }
  }
}

export const dataAccess = DataAccessService.getInstance() 