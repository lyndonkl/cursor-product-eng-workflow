import React, { useRef, useEffect } from 'react'
import { select } from 'd3'
import { cn } from '../../lib/utils'

interface BaseChartProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number
  height?: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

export function BaseChart({
  width = 800,
  height = 400,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  className,
  ...props
}: BaseChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = select(svgRef.current)
    
    // Clear previous content
    svg.selectAll('*').remove()

    // Add chart container with margins
    const container = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Add clip path
    svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'chart-area')
      .append('rect')
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)

    // Add chart background
    container
      .append('rect')
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr('class', 'fill-neutral-50')
  }, [width, height, margin])

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-neutral-200',
        className
      )}
      {...props}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="overflow-visible"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
} 