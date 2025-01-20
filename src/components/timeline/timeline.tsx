import React from 'react'
import { cn } from '../../lib/utils'
import { formatLargeNumber } from '../../lib/utils'
import { historicalGDPData } from '../../data/gdp/historical-data'

interface TimelineProps {
  className?: string
}

export default function Timeline({ className }: TimelineProps) {
  const data = historicalGDPData

  return (
    <section 
      className={cn(
        'w-full mx-auto',
        'space-y-8',
        className
      )}
    >
      <h2 className="heading-2">GDP Timeline</h2>
      <div className="grid-layout">
        {data.dataPoints.map((point) => (
          <div
            key={point.year}
            className="card"
          >
            <div className="space-y-2">
              <h3 className="heading-3">{point.year}</h3>
              <p className="body-text">
                GDP: {formatLargeNumber(point.gdp)} trillion
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Range: {formatLargeNumber(point.range.min)} - {formatLargeNumber(point.range.max)} trillion
            </p>
          </div>
        ))}
      </div>
      <footer className="space-y-2 text-sm text-muted-foreground">
        <p>Source: {data.metadata.source}</p>
        <p>Last Updated: {data.metadata.lastUpdated}</p>
      </footer>
    </section>
  )
} 