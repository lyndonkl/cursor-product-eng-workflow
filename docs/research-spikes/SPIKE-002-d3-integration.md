# SPIKE-002: D3.js Integration with React and Next.js

## Overview
This research spike evaluates optimal patterns for integrating D3.js with React and Next.js for the GDP Timeline Visualization project, focusing on performance, maintainability, and responsive design.

## Integration Approaches

### 1. React with D3 Manipulation
**Description:**  
React manages the DOM structure while D3 handles data calculations and transformations.

**Implementation Pattern:**
```typescript
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TimelineProps {
  data: {
    year: Date;
    gdp: number;
    confidenceInterval?: [number, number];
    economicIndicators?: Record<string, number>;
  }[];
  periods: {
    id: string;
    name: string;
    startYear: number;
    endYear: number;
    description: string;
    regionalImpact: Record<string, {
      country: string;
      description: string;
      significance: 'high' | 'medium' | 'low';
      gdpImpact: number;
    }>;
  }[];
  milestones: {
    id: string;
    date: Date;
    name: string;
    impact: string;
  }[];
}

const TimelineChart: React.FC<TimelineProps> = ({ data, periods, milestones }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svg.node()?.getBoundingClientRect().width ?? 0;
    const height = 500;

    // D3 calculations
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.year) as [Date, Date])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.gdp) as number])
      .range([height, 0]);

    const line = d3.line<DataPoint>()
      .x(d => xScale(d.year))
      .y(d => yScale(d.gdp));

    // Confidence interval area
    const confidenceArea = d3.area<DataPoint>()
      .x(d => xScale(d.year))
      .y0(d => yScale(d.confidenceInterval?.[0] ?? d.gdp))
      .y1(d => yScale(d.confidenceInterval?.[1] ?? d.gdp));

    // D3 rendering
    svg.selectAll('*').remove();
    
    // Add confidence interval
    svg.append('path')
      .datum(data)
      .attr('d', confidenceArea)
      .attr('class', 'confidence-area');

    // Add main GDP line
    svg.append('path')
      .datum(data)
      .attr('d', line)
      .attr('class', 'gdp-line');

    // Add milestone markers
    svg.selectAll('.milestone')
      .data(milestones)
      .join('circle')
      .attr('class', 'milestone')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => {
        const gdpPoint = data.find(p => p.year.getTime() === d.date.getTime());
        return yScale(gdpPoint?.gdp ?? 0);
      })
      .attr('r', 6)
      .attr('fill', 'var(--color-accent-500)');
  }, [data, periods, milestones]);

  return (
    <svg 
      ref={svgRef}
      className="w-full h-[500px]"
      role="img"
      aria-label="GDP Timeline Chart"
    />
  );
};
```

**Pros:**
- Clear separation of concerns
- Efficient D3 calculations
- Good performance
- Maintainable code structure

**Cons:**
- Manual cleanup required
- More complex state management
- Potential React/D3 conflicts

### 2. React for Rendering, D3 for Calculations
**Description:**  
D3 handles calculations while React manages all DOM rendering.

**Implementation Pattern:**
```typescript
import { useMemo } from 'react';
import * as d3 from 'd3';

interface TimelineProps {
  data: {
    year: Date;
    gdp: number;
    confidenceInterval?: [number, number];
    economicIndicators?: Record<string, number>;
  }[];
  periods: {
    id: string;
    name: string;
    startYear: number;
    endYear: number;
    description: string;
    regionalImpact: Record<string, {
      country: string;
      description: string;
      significance: 'high' | 'medium' | 'low';
      gdpImpact: number;
    }>;
  }[];
  milestones: {
    id: string;
    date: Date;
    name: string;
    impact: string;
  }[];
}

const TimelineChart: React.FC<TimelineProps> = ({ data, periods, milestones, width, height }) => {
  const scales = useMemo(() => ({
    x: d3.scaleTime()
      .domain(d3.extent(data, d => d.year) as [Date, Date])
      .range([0, width]),
    y: d3.scaleLinear()
      .domain([0, d3.max(data, d => d.gdp) as number])
      .range([height, 0])
  }), [data, width, height]);

  const paths = useMemo(() => {
    const line = d3.line<DataPoint>()
      .x(d => scales.x(d.year))
      .y(d => scales.y(d.gdp));

    const confidenceArea = d3.area<DataPoint>()
      .x(d => scales.x(d.year))
      .y0(d => scales.y(d.confidenceInterval?.[0] ?? d.gdp))
      .y1(d => scales.y(d.confidenceInterval?.[1] ?? d.gdp));

    return {
      line: line(data),
      confidence: confidenceArea(data)
    };
  }, [data, scales]);

  return (
    <svg 
      className="w-full h-[500px]"
      role="img"
      aria-label="GDP Timeline Chart"
    >
      <path
        d={paths.confidence ?? ''}
        className="confidence-area"
        fill="var(--color-primary-100)"
        fillOpacity={0.3}
      />
      <path
        d={paths.line ?? ''}
        className="gdp-line"
        fill="none"
        stroke="currentColor"
      />
      {milestones.map((milestone, i) => (
        <circle
          key={i}
          cx={scales.x(milestone.date)}
          cy={scales.y(data.find(p => p.year.getTime() === milestone.date.getTime())?.gdp ?? 0)}
          r={6}
          className="milestone"
          fill="var(--color-accent-500)"
        />
      ))}
    </svg>
  );
};
```

**Pros:**
- Better React integration
- Simpler state management
- Automatic cleanup
- More predictable behavior

**Cons:**
- Potential performance overhead
- More complex animations
- Less direct D3 control

## Performance Analysis

### Memory Usage
- React with D3 Manipulation: Lower memory usage
- React for Rendering: Slightly higher due to React overhead

### CPU Performance
- React with D3 Manipulation: Better for complex visualizations
- React for Rendering: Better for simple visualizations

### Animation Performance
- React with D3 Manipulation: Smoother animations
- React for Rendering: More React reconciliation overhead

## SVG Responsiveness Patterns

### 1. Container-Based Scaling
```typescript
const ResponsiveChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const { width } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height: width * 0.5 });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <TimelineChart width={dimensions.width} height={dimensions.height} />
    </div>
  );
};
```

### 2. ViewBox Scaling
```typescript
const ResponsiveChart: React.FC = () => {
  return (
    <svg
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto"
    >
      {/* Chart content */}
    </svg>
  );
};
```

## Tooltip Implementation

### 1. HTML Tooltip
```typescript
const Tooltip: React.FC<TooltipProps> = ({ x, y, data }) => {
  return (
    <div
      className="absolute pointer-events-none bg-white p-2 rounded shadow-lg"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <p>Year: {data.year}</p>
      <p>GDP: {data.gdp}</p>
    </div>
  );
};
```

### 2. SVG Tooltip
```typescript
const Tooltip: React.FC<TooltipProps> = ({ x, y, data }) => {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={-50}
        y={-40}
        width={100}
        height={40}
        className="fill-white stroke-gray-200"
      />
      <text
        className="text-sm"
        textAnchor="middle"
      >
        <tspan x={0} y={-20}>Year: {data.year}</tspan>
        <tspan x={0} y={-5}>GDP: {data.gdp}</tspan>
      </text>
    </g>
  );
};
```

## Animation Performance

### 1. CSS Transitions
```typescript
const AnimatedPath: React.FC<PathProps> = ({ d }) => (
  <path
    d={d}
    className="gdp-line transition-all duration-300 ease-in-out"
  />
);
```

### 2. D3 Transitions
```typescript
useEffect(() => {
  const path = d3.select(pathRef.current);
  path.transition()
    .duration(300)
    .ease(d3.easeLinear)
    .attr('d', newPath);
}, [newPath]);
```

## Recommendations

### Primary Recommendation: Hybrid Approach
We recommend using a hybrid approach:
1. React for overall component structure and simple elements
2. D3 for complex calculations and transitions
3. CSS for basic animations and transitions
4. SVG with viewBox for responsiveness

### Implementation Strategy
1. Create base chart component with D3 for calculations
2. Use React for rendering static elements
3. Implement D3 transitions for smooth animations
4. Use CSS transforms for performance
5. Implement responsive design with viewBox
6. Add error boundaries for resilience

### Performance Optimization
1. Memoize D3 calculations
2. Use requestAnimationFrame for animations
3. Implement virtual rendering for large datasets
4. Use CSS transforms for animations
5. Optimize SVG structure
6. Implement proper cleanup

## Next Steps
1. Create base chart component
2. Implement data transformations
3. Add responsive container
4. Create tooltip system
5. Implement animations
6. Add interaction handlers

## References
- [React Integration Guide](https://2019.wattenberger.com/blog/react-and-d3)
- [D3.js Documentation](https://d3js.org/)
- [TICKET-301: Timeline Chart Base Implementation](../tickets/04_UI_Implementation_Tickets.md) 