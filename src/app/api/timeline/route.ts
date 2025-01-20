import { NextResponse } from 'next/server'
import { timelineData } from '@/data/timeline'
import { validateTimelineData } from '@/lib/timeline'

// Mock data for testing and Storybook
export const mockTimelineData = timelineData

export async function GET() {
  // Validate the timeline data
  const validation = validateTimelineData(timelineData)
  
  // Debug logging
  console.log('Timeline Data:', JSON.stringify(timelineData, null, 2))
  console.log('Validation Result:', validation)
  
  if (!validation.isValid) {
    return NextResponse.json(
      { error: validation.errors[0].message },
      { status: 400 }
    )
  }

  return NextResponse.json(timelineData)
} 