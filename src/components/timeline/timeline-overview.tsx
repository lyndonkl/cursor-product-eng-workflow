'use client'

import React, { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTimelineData } from '../common/hooks/use-timeline-data'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import { Progress } from '../ui/progress'
import { TimelineChart } from '../charts/TimelineChart'
import type { UnifiedTimelineData } from '../../types/timeline'
import type { GDPDataSet } from '../../types/gdp'

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
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPeriodId = searchParams.get('period')

  const {
    data,
    currentPeriod,
    events,
    milestones,
    gdpData,
    isLoading,
    error
  } = useTimelineData({ startYear, endYear, periodId, mockData })

  const handlePeriodClick = useCallback((periodId: string) => {
    router.push(`/?period=${periodId}`)
  }, [router])

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
    <div className="space-y-8 w-full max-w-content mx-auto px-4 md:px-8">
      {/* Timeline Chart */}
      {gdpData && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-neutral-900">GDP Growth Timeline</h2>
          <Card className="p-6 md:p-10 bg-neutral-50 border-neutral-200">
            <div className="w-full aspect-[2/1] min-h-[400px] max-h-[768px]">
              <TimelineChart
                data={gdpData}
                periods={filteredPeriods}
                width={800}
                height={400}
                activePeriod={currentPeriodId || undefined}
                onPeriodClick={handlePeriodClick}
                className="w-full h-full"
              />
            </div>
          </Card>
        </section>
      )}

      {/* Period Overview */}
      {currentPeriod && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-neutral-900">Period Details</h2>
          <Card className="p-6 md:p-10 bg-neutral-50 border-neutral-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-neutral-900">
                  {currentPeriod.name}
                </h3>
                <Badge variant="first" className="text-sm font-medium text-neutral-600">
                  {currentPeriod.startYear} - {currentPeriod.endYear}
                </Badge>
              </div>
              <p className="text-base text-neutral-600">
                {currentPeriod.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-neutral-700">Average GDP</p>
                  <p className="text-2xl font-bold text-primary">
                    ${currentPeriod.economicIndicators.averageGDP.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700">Growth Rate</p>
                  <p className="text-2xl font-bold text-primary">
                    {(currentPeriod.economicIndicators.growthRate * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700">Main Industries</p>
                  <div className="flex flex-wrap gap-2">
                    {currentPeriod.economicIndicators.mainIndustries.map(industry => (
                      <Badge key={industry} variant="second" className="text-xs font-medium text-neutral-600">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Events Timeline */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Key Events</h4>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-8">
            {events.map((event) => (
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