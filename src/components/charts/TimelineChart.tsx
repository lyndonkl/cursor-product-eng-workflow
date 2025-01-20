import { useRef, useEffect, useMemo } from 'react'
import * as d3 from 'd3'
import type { GDPDataPoint, GDPDataSet } from '../../types/gdp'
import type { TimelinePeriod } from '../../types/timeline'
import { cn } from '../../lib/utils'

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
  
  // Calculate dimensions
  const dimensions: ChartDimensions = useMemo(() => ({
    width,
    height,
    margin: { top: 40, right: 50, bottom: 40, left: 60 }
  }), [width, height])

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

  // Draw chart
  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)

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
      .attr('fill', d => d.color || 'var(--muted)')
      .attr('opacity', d => d.id === activePeriod ? 0.1 : 0.05)
      .style('cursor', 'pointer')
      .on('click', (event, d) => onPeriodClick?.(d.id))

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
          .attr('fill', 'var(--muted-foreground)')
          .attr('font-size', '10px')
          .text(industry => industry)

        // Growth rate indicator
        group.append('text')
          .attr('class', 'growth-rate')
          .attr('x', 0)
          .attr('y', -15)
          .attr('text-anchor', 'middle')
          .attr('fill', d.economicIndicators.growthRate > 1 ? 'var(--success)' : 'var(--destructive)')
          .attr('font-size', '12px')
          .attr('font-weight', '500')
          .text(`${(d.economicIndicators.growthRate * 100).toFixed(1)}% growth`)
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
      .attr('stroke', 'var(--border)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4')

    // Add period labels
    svg.append('g')
      .attr('class', 'period-labels')
      .selectAll('text')
      .data(periods)
      .enter()
      .append('text')
      .attr('class', 'period-label')
      .attr('x', d => scales.xScale(new Date(d.startYear + (d.endYear - d.startYear) / 2, 0)))
      .attr('y', dimensions.margin.top - 10)
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--muted-foreground)')
      .attr('font-size', '12px')
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
      .attr('stroke', d => d.periodColor || 'var(--muted)')
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
      .attr('fill', d => d.periodColor || 'var(--muted)')
      .attr('stroke', 'var(--background)')
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
      .attr('fill', 'var(--muted-foreground)')
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
      .attr('fill', 'var(--primary)')
      .attr('fill-opacity', 0.1)

    svg.append('path')
      .datum(data.projections)
      .attr('class', 'confidence-area projected')
      .attr('d', confidenceArea)
      .attr('fill', 'var(--warning)')
      .attr('fill-opacity', 0.1)

    // Add line paths
    svg.append('path')
      .datum(data.historical)
      .attr('class', 'gdp-line historical')
      .attr('d', linePath)
      .attr('fill', 'none')
      .attr('stroke', 'var(--primary)')
      .attr('stroke-width', 2)

    svg.append('path')
      .datum(data.projections)
      .attr('class', 'gdp-line projected')
      .attr('d', linePath)
      .attr('fill', 'none')
      .attr('stroke', 'var(--warning)')
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
      .attr('fill', 'var(--primary)')
      .attr('stroke', 'var(--background)')
      .attr('stroke-width', 2)

    svg.selectAll('.projected-point')
      .data(data.projections)
      .enter()
      .append('circle')
      .attr('class', 'data-point projected')
      .attr('cx', d => scales.xScale(new Date(d.year, 0)))
      .attr('cy', d => scales.yScale(d.gdp))
      .attr('r', 4)
      .attr('fill', 'var(--warning)')
      .attr('stroke', 'var(--background)')
      .attr('stroke-width', 2)

    // Add axes
    const xAxis = d3.axisBottom(scales.xScale)
      .ticks(10)
      .tickFormat((domainValue: Date | d3.NumberValue, index: number) => {
        if (domainValue instanceof Date) {
          return d3.timeFormat('%Y')(domainValue)
        }
        return ''
      })

    const yAxis = d3.axisLeft(scales.yScale)
      .ticks(10)
      .tickFormat((domainValue: d3.NumberValue, index: number) => {
        const value = +domainValue
        return value >= 1000 ? `${value/1000}k` : String(value)
      })

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${dimensions.height - dimensions.margin.bottom})`)
      .call(xAxis as any, null)

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${dimensions.margin.left},0)`)
      .call(yAxis as any, null)

  }, [data, periods, dimensions, scales, linePath, confidenceArea, activePeriod, onPeriodClick])

  return (
    <div className={cn('relative', className)}>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="timeline-chart"
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
    </div>
  )
} 