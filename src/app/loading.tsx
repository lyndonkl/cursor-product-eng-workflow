import React from 'react'

export default function Loading() {
  return (
    <div className="flex min-h-[calc(var(--vh,1vh)*100)] flex-col items-center justify-center p-4">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary opacity-75"></div>
        <div className="absolute inset-0 animate-pulse rounded-full border-2 border-primary"></div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
    </div>
  )
} 