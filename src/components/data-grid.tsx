import React from 'react'
import { historicalGDPData } from '../data/gdp/historical-data'
import { formatLargeNumber } from '../lib/utils'

export default function DataGrid() {
  return (
    <div className="grid-layout">
      {historicalGDPData.dataPoints.map((point) => (
        <div key={point.year} className="card">
          <h3 className="heading-3 mb-4">
            {point.year}
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Global GDP</p>
              <p className="text-2xl font-bold text-primary">
                {formatLargeNumber(point.gdp)} trillion
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estimated Range</p>
              <p className="text-sm">
                {formatLargeNumber(point.range.min)} - {formatLargeNumber(point.range.max)} trillion
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 