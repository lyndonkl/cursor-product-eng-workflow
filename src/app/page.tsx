import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import components
const Timeline = dynamic(() => import('../components/timeline/timeline'), {
  loading: () => <div className="animate-pulse h-64 bg-neutral-100 rounded-lg" />,
  ssr: true,
})

const DataGrid = dynamic(() => import('../components/data-grid'), {
  loading: () => <div className="animate-pulse grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />,
  ssr: true,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container">
        <div className="section-content">
          <h1 className="heading-1">
            GDP Timeline Visualization
          </h1>
          <p className="body-text">
            Explore the evolution of global GDP from 1700 to 2020, with detailed data points and ranges showing economic growth over time.
          </p>

          <Suspense fallback={<div className="animate-pulse h-64 bg-neutral-100 rounded-lg" />}>
            <Timeline />
          </Suspense>

          <h2 className="heading-2">
            Historical GDP Data
          </h2>
          
          <Suspense fallback={<div className="animate-pulse grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />}>
            <DataGrid />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
