import { GDPTimelineData } from '../types/gdp'
import { HistoricalPeriodsData } from '../types/historical'
import { TechnologicalMilestonesData } from '../types/milestones'

/**
 * Fetches GDP timeline data
 */
export async function fetchGDPData(): Promise<GDPTimelineData> {
  try {
    const response = await fetch('/api/gdp')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching GDP data:', error)
    throw error
  }
}

/**
 * Fetches historical periods data
 */
export async function fetchHistoricalPeriods(): Promise<HistoricalPeriodsData> {
  try {
    const response = await fetch('/api/historical-periods')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching historical periods:', error)
    throw error
  }
}

/**
 * Fetches technological milestones data
 */
export async function fetchMilestones(): Promise<TechnologicalMilestonesData> {
  try {
    const response = await fetch('/api/milestones')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching milestones:', error)
    throw error
  }
}

/**
 * Type for the complete timeline data
 */
export interface TimelineData {
  gdp: GDPTimelineData
  periods: HistoricalPeriodsData
  milestones: TechnologicalMilestonesData
}

/**
 * Fetches all timeline data in parallel
 */
export async function fetchTimelineData(): Promise<TimelineData> {
  try {
    const [gdp, periods, milestones] = await Promise.all([
      fetchGDPData(),
      fetchHistoricalPeriods(),
      fetchMilestones()
    ])

    return {
      gdp,
      periods,
      milestones
    }
  } catch (error) {
    console.error('Error fetching timeline data:', error)
    throw error
  }
} 