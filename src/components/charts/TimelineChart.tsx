'use client'

import { useRef, useEffect, useMemo, useState, useCallback } from 'react'
import * as d3 from 'd3'
import type { GDPDataPoint, GDPDataSet } from '../../types/gdp'
import type { TimelinePeriod, TimelineMilestone } from '../../types/timeline'
import { cn } from '../../lib/utils'
import { Tooltip } from '../ui/tooltip'

interface TimelineChartProps {
  data: GDPDataSet
  periods: TimelinePeriod[]
  width?: number
  height?: number
  className?: string
  activePeriod?: string
  onPeriodClick?: (periodId: string) => void
}

interface ChartDimensions {
  width: number
  height: number
  margin: { top: number; right: number; bottom: number; left: number }
}

interface TooltipData {
  x: number
  y: number
  content: React.ReactNode
  visible: boolean
  isMobile?: boolean
}

export function TimelineChart({ 
  data,
  periods,
  width = 1200,
  height = 600,
  className,
  activePeriod,
  onPeriodClick
}: TimelineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<TooltipData>({
    x: 0,
    y: 0,
    content: null,
    visible: false,
    isMobile: false
  })
  
  // Calculate dimensions based on container
  const dimensions: ChartDimensions = useMemo(() => {
    const container = containerRef.current
    const w = container ? container.clientWidth : width
    const h = container ? container.clientHeight : height
    
    return {
      width: w,
      height: h,
      margin: { 
        top: 32,     // --chart-padding
        right: 32,   // --chart-padding
        bottom: 32,  // --chart-padding
        left: 48     // --chart-padding + extra for y-axis labels
      }
    }
  }, [width, height, containerRef.current?.clientWidth, containerRef.current?.clientHeight])

  // Add resize observer
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth
        const h = containerRef.current.clientHeight
        
        if (svgRef.current) {
          d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
        }
      }
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Create scales
  const scales = useMemo(() => {
    const xScale = d3.scaleTime()
      .domain([new Date(1700, 0), new Date(2050, 0)])
      .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

    const yScale = d3.scaleLog()
      .domain([
        d3.min(data.historical, d => d.gdp * 0.9) || 1,
        d3.max(data.historical, d => d.gdp * 1.1) || 100000
      ])
      .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

    return { xScale, yScale }
  }, [data, dimensions])

  // Create line generator
  const linePath = useMemo(() => {
    return d3.line<GDPDataPoint>()
      .x(d => scales.xScale(new Date(d.year, 0)))
      .y(d => scales.yScale(d.gdp))
      .curve(d3.curveMonotoneX)
  }, [scales])

  // Create confidence interval area
  const confidenceArea = useMemo(() => {
    return d3.area<GDPDataPoint>()
      .x(d => scales.xScale(new Date(d.year, 0)))
      .y0(d => scales.yScale(d.range?.min || d.gdp * 0.9))
      .y1(d => scales.yScale(d.range?.max || d.gdp * 1.1))
      .curve(d3.curveMonotoneX)
  }, [scales])

  // Add mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setTooltip(prev => ({
        ...prev,
        isMobile: window.innerWidth < 768
      }))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Add tooltip handlers
  const handleDataPointHover = useCallback((event: MouseEvent, d: GDPDataPoint) => {
    const target = event.target as SVGElement
    const rect = target.getBoundingClientRect()
    
    setTooltip({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      content: (
        <div className="space-y-2">
          <div className="font-medium">GDP in {d.year}</div>
          <div className="text-sm text-neutral-600">
            ${d.gdp.toLocaleString()} trillion
          </div>
          {d.range && (
            <div className="text-xs text-neutral-500">
              Range: ${d.range.min.toLocaleString()} - ${d.range.max.toLocaleString()} trillion
            </div>
          )}
        </div>
      ),
      visible: true,
      isMobile: window.innerWidth < 768
    })
  }, [])

  // Update period tooltip to match the correct type
  const handlePeriodHover = useCallback((event: MouseEvent, d: TimelinePeriod) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    
    setTooltip({
      x: event.clientX,
      y: event.clientY,
      content: (
        <div className="space-y-2 max-w-xs">
          <div className="font-medium">{d.name}</div>
          <div className="text-sm text-neutral-600">
            {d.startYear} - {d.endYear}
          </div>
          <div className="text-xs text-neutral-500">
            Growth Rate: {(d.economicIndicators.growthRate * 100).toFixed(1)}%
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-neutral-600">Main Industries</div>
            <div className="flex flex-wrap gap-1">
              {d.economicIndicators.mainIndustries.map(industry => (
                <span key={industry} className="text-xs bg-neutral-100 px-2 py-0.5 rounded">
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
      visible: true,
      isMobile: window.innerWidth < 768
    })
  }, [])

  // Add milestone tooltip handler
  const handleMilestoneHover = useCallback((event: MouseEvent, milestone: TimelineMilestone) => {
    const target = event.target as SVGElement
    const rect = target.getBoundingClientRect()
    
    setTooltip({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      content: (
        <div className="space-y-2">
          <div className="font-medium">{milestone.title}</div>
          <p className="text-sm text-neutral-600">
            {milestone.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-neutral-100 px-2 py-0.5 rounded">
              {milestone.category}
            </span>
            <span className="text-xs bg-neutral-100 px-2 py-0.5 rounded">
              Impact: {milestone.impact}
            </span>
          </div>
        </div>
      ),
      visible: true,
      isMobile: window.innerWidth < 768
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }))
  }, [])

  // Draw chart
  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
      .attr('class', cn(
        'timeline-chart',
        'bg-neutral-50',
        'rounded-lg',
        'border border-neutral-200',
        'font-sans', // Inter font
        className
      ))

    // Clear previous content
    svg.selectAll('*').remove()

    // Add period backgrounds with economic indicators
    const periodGroup = svg.append('g')
      .attr('class', 'period-backgrounds')
      .selectAll('g')
      .data(periods)
      .enter()
      .append('g')
      .attr('class', d => `period-group ${d.id}`)

    // Background rect
    periodGroup.append('rect')
      .attr('class', d => `period-background ${d.id} ${d.id === activePeriod ? 'active' : ''}`)
      .attr('x', d => scales.xScale(new Date(d.startYear, 0)))
      .attr('y', dimensions.margin.top)
      .attr('width', d => scales.xScale(new Date(d.endYear, 0)) - scales.xScale(new Date(d.startYear, 0)))
      .attr('height', dimensions.height - dimensions.margin.top - dimensions.margin.bottom)
      .attr('fill', d => {
        switch(d.id) {
          case 'pre-industrial': return '#8b5cf6'  // --period-early
          case 'industrial-revolution': return '#06b6d4'  // --period-first
          case 'modern-growth': return '#10b981'  // --period-second
          case 'contemporary': return '#f59e0b'  // --period-modern
          default: return '#e5e5e5'  // --neutral-200
        }
      })
      .attr('opacity', d => d.id === activePeriod ? 0.2 : 0.1)
      .style('cursor', 'pointer')
      .on('click', (event, d) => onPeriodClick?.(d.id))
      .on('mouseenter', function(event, d) {
        handlePeriodHover(event, d)
      })
      .on('mouseleave', handleMouseLeave)
      .on('focus', function(event, d) {
        handlePeriodHover(event, d)
      })

    // Economic indicators
    periodGroup.append('g')
      .attr('class', 'economic-indicators')
      .attr('transform', d => {
        const x = scales.xScale(new Date(d.startYear + (d.endYear - d.startYear) / 2, 0))
        const y = dimensions.height - dimensions.margin.bottom + 30
        return `translate(${x},${y})`
      })
      .each(function(d) {
        const group = d3.select(this)
        const industries = d.economicIndicators.mainIndustries

        // Industry icons/labels
        group.selectAll('.industry')
          .data(industries)
          .enter()
          .append('text')
          .attr('class', 'industry-label')
          .attr('x', (_, i) => i * 80 - (industries.length * 80) / 2)
          .attr('y', 0)
          .attr('text-anchor', 'middle')
          .attr('fill', 'currentColor')
          .attr('font-size', '10px')
          .text(industry => industry)

        // Growth rate indicator
        group.append('text')
          .attr('class', (d: { economicIndicators: { growthRate: number } }) => 
            `growth-rate ${d.economicIndicators.growthRate > 1 ? 'positive' : 'negative'}`
          )
          .attr('x', 0)
          .attr('y', -15)
          .attr('text-anchor', 'middle')
          .attr('fill', 'currentColor')
          .attr('font-size', '12px')
          .attr('font-weight', '500')
          .text((d: { economicIndicators: { growthRate: number } }) => 
            `${(d.economicIndicators.growthRate * 100).toFixed(1)}% growth`
          )
      })

    // Add period boundaries
    svg.append('g')
      .attr('class', 'period-boundaries')
      .selectAll('line')
      .data(periods)
      .enter()
      .append('line')
      .attr('class', 'period-boundary')
      .attr('x1', d => scales.xScale(new Date(d.startYear, 0)))
      .attr('x2', d => scales.xScale(new Date(d.startYear, 0)))
      .attr('y1', dimensions.margin.top)
      .attr('y2', dimensions.height - dimensions.margin.bottom)
      .attr('stroke', 'hsl(var(--border))')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4')

    // Period labels
    svg.append('g')
      .attr('class', 'period-labels')
      .selectAll('text')
      .data(periods)
      .enter()
      .append('text')
      .attr('class', 'period-label text-sm font-medium')
      .attr('x', d => scales.xScale(new Date(d.startYear + (d.endYear - d.startYear) / 2, 0)))
      .attr('y', dimensions.margin.top - 12)
      .attr('text-anchor', 'middle')
      .attr('fill', 'hsl(var(--neutral-700))')
      .attr('font-size', '14px')
      .text(d => d.name)

    // Add event markers
    const allEvents = periods.flatMap(period => 
      period.events.map(event => ({
        ...event,
        periodId: period.id,
        periodColor: period.color
      }))
    )

    const eventGroup = svg.append('g')
      .attr('class', 'event-markers')
      .attr('clip-path', 'url(#chart-area)')

    // Add event lines
    eventGroup.selectAll('.event-line')
      .data(allEvents)
      .enter()
      .append('line')
      .attr('class', 'event-line')
      .attr('x1', d => scales.xScale(new Date(d.year, 0)))
      .attr('x2', d => scales.xScale(new Date(d.year, 0)))
      .attr('y1', dimensions.margin.top)
      .attr('y2', dimensions.height - dimensions.margin.bottom)
      .attr('stroke', d => `hsl(var(--period-${d.periodId}))`)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2,2')
      .attr('opacity', 0.3)

    // Add event markers
    eventGroup.selectAll('.event-marker')
      .data(allEvents)
      .enter()
      .append('circle')
      .attr('class', d => `event-marker ${d.type}`)
      .attr('cx', d => scales.xScale(new Date(d.year, 0)))
      .attr('cy', dimensions.margin.top + 20)
      .attr('r', 6)
      .attr('fill', d => `hsl(var(--period-${d.periodId}))`)
      .attr('stroke', 'hsl(var(--background))')
      .attr('stroke-width', 2)

    // Add event labels
    eventGroup.selectAll('.event-label')
      .data(allEvents)
      .enter()
      .append('text')
      .attr('class', 'event-label')
      .attr('x', d => scales.xScale(new Date(d.year, 0)))
      .attr('y', dimensions.margin.top + 40)
      .attr('text-anchor', 'middle')
      .attr('fill', 'hsl(var(--muted-foreground))')
      .attr('font-size', '10px')
      .text(d => d.title)
      .attr('transform', function(d) {
        const bbox = this.getBBox()
        const angle = -45
        return `rotate(${angle} ${scales.xScale(new Date(d.year, 0))} ${dimensions.margin.top + 40})`
      })

    // Add grid lines
    const xGrid = d3.axisBottom(scales.xScale)
      .tickSize(-dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
      .tickFormat(() => '')
      .ticks(10)

    const yGrid = d3.axisLeft(scales.yScale)
      .tickSize(-dimensions.width + dimensions.margin.left + dimensions.margin.right)
      .tickFormat(() => '')
      .ticks(10)

    svg.append('g')
      .attr('class', 'grid x-grid')
      .attr('transform', `translate(0,${dimensions.height - dimensions.margin.bottom})`)
      .call(xGrid)

    svg.append('g')
      .attr('class', 'grid y-grid')
      .attr('transform', `translate(${dimensions.margin.left},0)`)
      .call(yGrid)

    // Add confidence interval areas
    svg.append('path')
      .datum(data.historical)
      .attr('class', 'confidence-area historical')
      .attr('d', confidenceArea)
      .attr('fill', 'hsl(var(--primary))')
      .attr('fill-opacity', 0.1)

    svg.append('path')
      .datum(data.projections)
      .attr('class', 'confidence-area projected')
      .attr('d', confidenceArea)
      .attr('fill', 'hsl(var(--warning))')
      .attr('fill-opacity', 0.1)

    // Add GDP line
    svg.append('path')
      .datum(data.historical)
      .attr('class', 'gdp-line historical')
      .attr('d', linePath)
      .attr('fill', 'none')
      .attr('stroke', '#0ea5e9')  // --gdp-line
      .attr('stroke-width', 2)

    svg.append('path')
      .datum(data.projections)
      .attr('class', 'gdp-line projected')
      .attr('d', linePath)
      .attr('fill', 'none')
      .attr('stroke', 'hsl(var(--warning))')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,4')

    // Add data points
    svg.selectAll('.historical-point')
      .data(data.historical)
      .enter()
      .append('circle')
      .attr('class', 'data-point historical')
      .attr('cx', d => scales.xScale(new Date(d.year, 0)))
      .attr('cy', d => scales.yScale(d.gdp))
      .attr('r', 4)
      .attr('fill', '#0ea5e9')  // --gdp-line
      .attr('stroke', '#fafafa')  // --neutral-50
      .attr('stroke-width', 2)

    svg.selectAll('.projected-point')
      .data(data.projections)
      .enter()
      .append('circle')
      .attr('class', 'data-point projected')
      .attr('cx', d => scales.xScale(new Date(d.year, 0)))
      .attr('cy', d => scales.yScale(d.gdp))
      .attr('r', 4)
      .attr('fill', 'hsl(var(--warning))')
      .attr('stroke', 'var(--background)')
      .attr('stroke-width', 2)

    // Add axes with styled text
    const xAxis = d3.axisBottom(scales.xScale)
      .ticks(10)
      .tickFormat(d => d instanceof Date ? d3.timeFormat('%Y')(d) : '')

    const yAxis = d3.axisLeft(scales.yScale)
      .ticks(10)
      .tickFormat(d => {
        const value = +d
        return value >= 1000 ? `${value/1000}k` : String(value)
      })

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${dimensions.height - dimensions.margin.bottom})`)
      .call(xAxis)
      .selectAll('text')
      .attr('class', 'text-xs')  // --label-sm
      .attr('fill', 'hsl(var(--neutral-600))')

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${dimensions.margin.left},0)`)
      .call(yAxis)
      .selectAll('text')
      .attr('class', 'text-xs')  // --label-sm
      .attr('fill', 'hsl(var(--neutral-600))')

    // Style grid lines
    svg.selectAll('.grid line')
      .attr('stroke', 'hsl(var(--neutral-200))')
      .attr('stroke-opacity', 0.5)

    // Update data points with tooltips
    svg.selectAll<SVGCircleElement, GDPDataPoint>('.data-point')
      .on('mouseenter', function(event, d) {
        handleDataPointHover(event, d)
      })
      .on('mouseleave', handleMouseLeave)
      .on('focus', function(event, d) {
        handleDataPointHover(event, d)
      })

    // Update period backgrounds with tooltips
    svg.selectAll<SVGRectElement, TimelinePeriod>('.period-background')
      .on('mouseenter', function(event, d) {
        handlePeriodHover(event, d)
      })
      .on('mouseleave', handleMouseLeave)
      .on('focus', function(event, d) {
        handlePeriodHover(event, d)
      })

    // Economic indicators
    periods.forEach(period => {
      svg.selectAll<SVGTextElement, TimelinePeriod>(`.growth-rate-${period.id}`)
        .text(`${(period.economicIndicators.growthRate * 100).toFixed(1)}%`)

      svg.selectAll<SVGTextElement, TimelinePeriod>(`.industries-${period.id}`)
        .text(period.economicIndicators.mainIndustries.join(', '))
    })

  }, [data, periods, dimensions, scales, linePath, confidenceArea, activePeriod, onPeriodClick, handleDataPointHover, handlePeriodHover, handleMouseLeave])

  return (
    <div 
      ref={containerRef} 
      className={cn(
        'relative w-full',
        'h-[600px]', // Fixed height
        className
      )}
      style={{
        height: '600px', // Ensure fixed height
        minHeight: '600px',
        maxHeight: '600px'
      }}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="timeline-chart"
        role="img"
        aria-label="GDP Timeline Chart"
        style={{ 
          width: '100%',
          height: '600px', // Fixed height
          maxWidth: '100%',
          display: 'block', // Prevent unwanted spacing
          overflow: 'visible' // Allow tooltips to overflow
        }}
      >
        <defs>
          <clipPath id="chart-area">
            <rect
              x={dimensions.margin.left}
              y={dimensions.margin.top}
              width={dimensions.width - dimensions.margin.left - dimensions.margin.right}
              height={dimensions.height - dimensions.margin.top - dimensions.margin.bottom}
            />
          </clipPath>
        </defs>
      </svg>
      {tooltip.visible && (
        <div
          className={cn(
            'fixed pointer-events-none z-50',
            'bg-white/95 backdrop-blur-sm',
            'rounded-lg border border-neutral-200',
            'shadow-lg p-3',
            tooltip.isMobile ? 'bottom-16 left-4 right-4 transform-none' : ''
          )}
          style={tooltip.isMobile ? undefined : {
            left: tooltip.x + 'px',
            top: tooltip.y + 'px',
            transform: 'translate(-50%, -100%)',
            maxWidth: '300px'
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  )
} 