import React from 'react'
import { useTimelineData } from '../common/hooks/use-timeline-data'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import { Progress } from '../ui/progress'
import type { UnifiedTimelineData } from '../../types/timeline'

export interface TimelineOverviewProps {
  startYear?: number
  endYear?: number
  periodId?: string
  mockData?: UnifiedTimelineData
}

export function TimelineOverview({
  startYear,
  endYear,
  periodId,
  mockData
}: TimelineOverviewProps) {
  const {
    data,
    currentPeriod,
    events,
    milestones,
    isLoading,
    error
  } = useTimelineData({ startYear, endYear, periodId, mockData })

  // Debug logs
  React.useEffect(() => {
    if (error) {
      console.error('TimelineOverview error:', error)
    }
    if (data) {
      console.log('TimelineOverview data:', data)
    }
  }, [error, data])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 border border-destructive/50 bg-destructive/10 rounded-lg">
        <p className="text-sm text-destructive font-medium">Error loading timeline data</p>
        <p className="text-sm text-destructive mt-1">
          {error.message}
        </p>
      </div>
    )
  }

  if (!data || !data.periods || data.periods.length === 0) {
    return (
      <div className="p-4 border border-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          No timeline data available
        </p>
      </div>
    )
  }

  // Filter periods based on periodId
  const periods = periodId
    ? data.periods.filter(p => p.id === periodId)
    : data.periods

  // Filter by date range if provided
  const filteredPeriods = periods.filter(period => {
    if (startYear && period.endYear < startYear) return false
    if (endYear && period.startYear > endYear) return false
    return true
  })

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-primary">
        Historical GDP Data
      </h2>
      
      {filteredPeriods.map(period => (
        <div
          key={period.id}
          className="card bg-card text-card-foreground p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-medium mb-4">{period.name}</h3>
          <p className="text-muted-foreground mb-2">
            {period.startYear} - {period.endYear}
          </p>
          <p className="text-sm">{period.description}</p>
        </div>
      ))}

      {/* Period Overview */}
      {currentPeriod && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {currentPeriod.name}
              </h3>
              <Badge variant="first">
                {currentPeriod.startYear} - {currentPeriod.endYear}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {currentPeriod.description}
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium">Average GDP</p>
                <p className="text-2xl font-bold text-primary">
                  ${currentPeriod.economicIndicators.averageGDP.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Growth Rate</p>
                <p className="text-2xl font-bold text-primary">
                  {(currentPeriod.economicIndicators.growthRate * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Main Industries</p>
                <div className="flex flex-wrap gap-2">
                  {currentPeriod.economicIndicators.mainIndustries.map(industry => (
                    <Badge key={industry} variant="second" size="sm">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Events Timeline */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Key Events</h4>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={event.id} className="relative pl-10">
                <div className="absolute left-3 top-2 w-3 h-3 rounded-full bg-primary" />
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium">{event.title}</h5>
                      <Badge variant="first">{event.year}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="second" size="sm">
                        {event.type}
                      </Badge>
                      <Badge variant="second" size="sm">
                        Impact: {event.impact}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Milestones</h4>
        <div className="grid gap-4 md:grid-cols-2">
          {milestones.map(milestone => (
            <Card key={milestone.id} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">{milestone.title}</h5>
                  <Badge variant="first">{milestone.year}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {milestone.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="second" size="sm">
                    {milestone.category}
                  </Badge>
                  <Badge variant="second" size="sm">
                    Impact: {milestone.impact}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Progress */}
      {currentPeriod && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{currentPeriod.startYear}</span>
            <span>{currentPeriod.endYear}</span>
          </div>
          <Progress 
            value={((new Date().getFullYear() - currentPeriod.startYear) / 
              (currentPeriod.endYear - currentPeriod.startYear)) * 100} 
          />
        </div>
      )}
    </div>
  )
} 