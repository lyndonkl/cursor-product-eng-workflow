import React from 'react'
import { TimelineOverview } from '../../components/timeline/timeline-overview'

interface TimelinePageProps {
  searchParams: {
    period?: string
    startYear?: string
    endYear?: string
  }
}

export default function TimelinePage({
  searchParams
}: TimelinePageProps) {
  const startYear = searchParams.startYear ? parseInt(searchParams.startYear) : undefined
  const endYear = searchParams.endYear ? parseInt(searchParams.endYear) : undefined

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8 md:py-12 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Historical GDP Timeline
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore economic growth and technological milestones from 1700 to 2020
          </p>
        </div>

        <TimelineOverview 
          periodId={searchParams.period}
          startYear={startYear}
          endYear={endYear}
        />
      </div>
    </main>
  )
} 