import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/utils'

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
  offset?: number
  className?: string
}

export function Tooltip({
  content,
  children,
  position = 'top',
  offset = 8,
  className
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isVisible || !tooltipRef.current || !containerRef.current) return

    const tooltip = tooltipRef.current
    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    
    const positionMap = {
      top: {
        top: -tooltip.offsetHeight - offset,
        left: (container.offsetWidth - tooltip.offsetWidth) / 2
      },
      right: {
        top: (container.offsetHeight - tooltip.offsetHeight) / 2,
        left: container.offsetWidth + offset
      },
      bottom: {
        top: container.offsetHeight + offset,
        left: (container.offsetWidth - tooltip.offsetWidth) / 2
      },
      left: {
        top: (container.offsetHeight - tooltip.offsetHeight) / 2,
        left: -tooltip.offsetWidth - offset
      }
    }

    const pos = positionMap[position]
    tooltip.style.top = `${pos.top}px`
    tooltip.style.left = `${pos.left}px`
  }, [isVisible, position, offset])

  return (
    <div 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            'absolute z-50',
            'px-3 py-2 rounded-md',
            'bg-neutral-900 text-white',
            'text-sm shadow-lg',
            'max-w-xs',
            'pointer-events-none',
            'animate-in fade-in duration-200',
            className
          )}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  )
} 