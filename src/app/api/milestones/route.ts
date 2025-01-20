import { NextResponse } from 'next/server'
import { technologicalMilestonesData } from '../../../data/milestones/milestones-data'
import type { TechnologicalMilestonesData } from '../../../types/milestones'

export async function GET() {
  try {
    return NextResponse.json(technologicalMilestonesData)
  } catch (error) {
    console.error('Error in milestones API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch milestones data' },
      { status: 500 }
    )
  }
} 