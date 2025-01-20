import type { UnifiedTimelineData, TimelinePeriod, TimelineMilestone } from '../types/timeline'
import type { GDPDataSet, GDPDataPoint } from '../types/gdp'

interface DataRange {
  startYear: number
  endYear: number
}

export function filterDataByRange(data: UnifiedTimelineData, range: DataRange): UnifiedTimelineData {
  const { startYear, endYear } = range

  return {
    ...data,
    periods: data.periods.filter(period => 
      period.startYear <= endYear && period.endYear >= startYear
    ),
    milestones: data.milestones.filter(milestone =>
      milestone.year >= startYear && milestone.year <= endYear
    )
  }
}

export function groupMilestonesByPeriod(
  milestones: TimelineMilestone[],
  periods: TimelinePeriod[]
): Map<string, TimelineMilestone[]> {
  const groupedMilestones = new Map<string, TimelineMilestone[]>()

  periods.forEach(period => {
    const periodMilestones = milestones.filter(milestone =>
      milestone.year >= period.startYear && milestone.year <= period.endYear
    )
    groupedMilestones.set(period.id, periodMilestones)
  })

  return groupedMilestones
}

export function calculateGDPGrowth(gdpData: GDPDataPoint[]): number[] {
  return gdpData.slice(1).map((point, index) => {
    const previousGDP = gdpData[index].gdp
    const currentGDP = point.gdp
    return ((currentGDP - previousGDP) / previousGDP) * 100
  })
}

export function aggregateGDPByPeriod(
  gdpData: GDPDataSet,
  periods: TimelinePeriod[]
): Map<string, { average: number; growth: number }> {
  const periodGDP = new Map<string, { average: number; growth: number }>()

  periods.forEach(period => {
    const periodData = gdpData.historical.filter(point =>
      point.year >= period.startYear && point.year <= period.endYear
    )

    if (periodData.length > 0) {
      const average = periodData.reduce((sum, point) => sum + point.gdp, 0) / periodData.length
      const growth = ((periodData[periodData.length - 1].gdp - periodData[0].gdp) / periodData[0].gdp) * 100

      periodGDP.set(period.id, { average, growth })
    }
  })

  return periodGDP
}

export function normalizeGDPValues(gdpData: GDPDataPoint[]): GDPDataPoint[] {
  const maxGDP = Math.max(...gdpData.map(point => point.gdp))
  
  return gdpData.map(point => ({
    ...point,
    gdp: point.gdp / maxGDP
  }))
} 