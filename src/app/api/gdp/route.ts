import { NextResponse } from 'next/server'
import { historicalGDPData } from '../../../data/gdp/historical-data'
import { projectedGDPData } from '../../../data/gdp/projection-data'
import type { GDPDataSet } from '../../../types/gdp'

export async function GET() {
  try {
    const timelineData: GDPDataSet = {
      historical: historicalGDPData.dataPoints,
      projections: projectedGDPData.dataPoints,
      metadata: {
        startYear: historicalGDPData.dataPoints[0].year,
        endYear: projectedGDPData.dataPoints[projectedGDPData.dataPoints.length - 1].year,
        dataSource: historicalGDPData.metadata.source,
        lastUpdated: historicalGDPData.metadata.lastUpdated,
        methodology: historicalGDPData.metadata.methodology
      }
    }

    return NextResponse.json(timelineData)
  } catch (error) {
    console.error('Error in GDP API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GDP data' },
      { status: 500 }
    )
  }
} 