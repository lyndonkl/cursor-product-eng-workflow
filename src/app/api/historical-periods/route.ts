import { NextResponse } from 'next/server'
import { historicalPeriodsData } from '../../../data/historical/periods-data'
import type { HistoricalPeriodsData } from '../../../types/historical'

export async function GET() {
  try {
    return NextResponse.json(historicalPeriodsData)
  } catch (error) {
    console.error('Error in historical periods API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch historical periods data' },
      { status: 500 }
    )
  }
} 