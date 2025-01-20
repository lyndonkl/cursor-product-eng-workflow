import { Suspense } from 'react'
import { TimelineOverview } from '@/components/timeline/timeline-overview'

interface TimelinePageProps {
  searchParams: {
    period?: string
    startYear?: string
    endYear?: string
  }
}

export const metadata = {
  title: 'GDP Timeline | Historical Economic Growth',
  description: 'An interactive visualization of GDP growth through major industrial periods',
}

export default function TimelinePage({
  searchParams
}: TimelinePageProps) {
  const startYear = searchParams.startYear ? parseInt(searchParams.startYear) : undefined
  const endYear = searchParams.endYear ? parseInt(searchParams.endYear) : undefined

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Landing Section */}
      <section className="h-screen flex flex-col items-center justify-center px-section text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          The Evolution of Economic Growth
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
          Explore how global GDP has transformed through major industrial revolutions
          and technological breakthroughs from 1700 to the present day.
        </p>
      </section>

      {/* Timeline Visualization */}
      <Suspense fallback={
        <div className="h-[50vh] bg-muted animate-pulse rounded-lg" />
      }>
        <TimelineOverview 
          periodId={searchParams.period}
          startYear={startYear}
          endYear={endYear}
        />
      </Suspense>
    </main>
  )
} 