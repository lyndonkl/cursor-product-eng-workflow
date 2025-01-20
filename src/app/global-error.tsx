'use client'

import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground">
        <div className="flex min-h-[calc(var(--vh,1vh)*100)] flex-col items-center justify-center p-4 text-center">
          <h2 className="mb-4 text-2xl font-semibold">Something went wrong</h2>
          <p className="mb-8 text-muted-foreground">
            {error.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={reset}
            className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
} 