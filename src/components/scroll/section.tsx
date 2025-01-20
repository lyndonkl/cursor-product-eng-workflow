'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Card } from '../ui/card'

interface SectionProps {
  title: string
  subtitle?: string
  content: React.ReactNode
  image?: string
  className?: string
  isLoading?: boolean
  error?: Error
}

export function Section({
  title,
  subtitle,
  content,
  image,
  className,
  isLoading,
  error
}: SectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  if (error) {
    return (
      <Card className={cn('w-full max-w-xl mx-auto p-6 bg-destructive/10 border-destructive/50', className)}>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-destructive">Error Loading Section</h2>
          <p className="text-sm text-destructive">{error.message}</p>
        </div>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className={cn('w-full max-w-xl mx-auto p-6 animate-pulse', className)}>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-8 w-2/3 bg-neutral-200 rounded" />
            <div className="h-4 w-1/2 bg-neutral-200 rounded" />
          </div>
          <div className="h-48 w-full bg-neutral-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-neutral-200 rounded" />
            <div className="h-4 w-5/6 bg-neutral-200 rounded" />
            <div className="h-4 w-4/6 bg-neutral-200 rounded" />
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div 
      ref={sectionRef}
      className={cn(
        'opacity-0 translate-y-4 duration-700 ease-out',
        isVisible && 'opacity-100 translate-y-0'
      )}
    >
      <Card 
        className={cn(
          'w-full max-w-3xl mx-auto',
          'p-8 md:p-10',
          'bg-white/95 backdrop-blur-sm',
          'shadow-lg border border-neutral-200',
          'relative z-10',
          className
        )}
      >
        <div className="space-y-8">
          {/* Title */}
          <div className="space-y-3">
            <h2 
              className="text-3xl md:text-4xl font-semibold tracking-tight"
              id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg md:text-xl text-neutral-600">{subtitle}</p>
            )}
          </div>

          {/* Image */}
          {image && (
            <div className="relative aspect-video rounded-lg overflow-hidden border border-neutral-200 shadow-sm">
              <img
                src={image}
                alt={`Illustration for ${title}`}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-neutral max-w-none prose-lg"
            aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {content}
          </div>
        </div>
      </Card>
    </div>
  )
} 