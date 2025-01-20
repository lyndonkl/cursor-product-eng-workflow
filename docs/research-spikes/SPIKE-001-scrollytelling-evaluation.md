# SPIKE-001: Scrollytelling Library Evaluation

## Overview
This research spike evaluates scrollytelling implementation options for the GDP Timeline Visualization project, focusing on react-scrollama and Intersection Observer approaches.

## Libraries Evaluated

### 1. react-scrollama
**Description:**  
React implementation of the Scrollama library, providing a declarative API for scroll-driven interactions.

**Key Features:**
- Step-based scroll tracking
- Progress calculations
- Flexible trigger points
- Mobile support
- TypeScript support
- Active maintenance

**Pros:**
- React-specific implementation
- Simple, declarative API
- Built-in progress calculations
- Good mobile support
- TypeScript types included
- Minimal bundle size

**Cons:**
- Limited animation control
- Some performance overhead
- Less flexibility than raw Intersection Observer

### 2. Intersection Observer API
**Description:**  
Native browser API for observing element intersection with viewport or parent element.

**Key Features:**
- Native browser support
- High performance
- Flexible configuration
- Zero dependencies
- Fine-grained control

**Pros:**
- Maximum performance
- No external dependencies
- Complete control over behavior
- Native browser support
- Minimal memory usage

**Cons:**
- More complex implementation
- Manual progress calculations
- No built-in scroll utilities
- Requires more boilerplate

## Performance Comparison

### Memory Usage
- react-scrollama: ~50KB (gzipped)
- Intersection Observer: Native API (no additional size)

### CPU Usage
- react-scrollama: Moderate (due to React reconciliation)
- Intersection Observer: Low (native implementation)

### Animation Performance
- react-scrollama: Good with RAF optimization
- Intersection Observer: Excellent (native performance)

## Browser Compatibility

### react-scrollama
- Chrome: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- iOS Safari: ✅ Full support
- Chrome Android: ✅ Full support

### Intersection Observer
- Chrome: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- iOS Safari: ✅ Full support
- Chrome Android: ✅ Full support

## Proof of Concept Implementation

### react-scrollama Example
```typescript
import { Scrollama, Step } from 'react-scrollama';

interface ScrollSection {
  period: {
    name: string;
    startYear: number;
    endYear: number;
    description: string;
    economicContext: {
      majorEvents: string[];
      indicators: Record<string, number>;
      analysis: string;
    };
    technologicalMilestones: {
      name: string;
      date: string;
      impact: string;
    }[];
  };
  gdpData: {
    year: Date;
    gdp: number;
    confidenceInterval?: [number, number];
  }[];
}

const ScrollytellingComponent = () => {
  const onStepEnter = ({ data }: { data: ScrollSection }) => {
    // Update chart with period data
    updateChart({
      data: data.gdpData,
      period: data.period,
      showConfidenceIntervals: true
    });
    
    // Update context panel
    updateContext({
      economicContext: data.period.economicContext,
      milestones: data.period.technologicalMilestones
    });
  };

  const onStepProgress = ({ progress }: { progress: number }) => {
    // Animate chart elements based on progress
    animateChartElements(progress);
  };

  return (
    <Scrollama offset={0.5} onStepEnter={onStepEnter} onStepProgress={onStepProgress}>
      {periods.map((period, index) => (
        <Step key={index} data={period}>
          <div className="period-section">
            <h2>{period.name}</h2>
            <p>{period.description}</p>
            <div className="economic-context">
              {period.economicContext.majorEvents.map((event, i) => (
                <div key={i} className="event-card">{event}</div>
              ))}
            </div>
            <div className="milestones">
              {period.technologicalMilestones.map((milestone, i) => (
                <div key={i} className="milestone-card">
                  <h3>{milestone.name}</h3>
                  <p>{milestone.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </Step>
      ))}
    </Scrollama>
  );
};
```

### Intersection Observer Example
```typescript
import { useEffect, useRef } from 'react';

const ScrollytellingComponent = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const progress = entry.intersectionRatio;
          // Handle intersection
        });
      },
      {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100),
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return <div ref={elementRef}>Content</div>;
};
```

## Recommendations

### Primary Recommendation: react-scrollama
For this project, we recommend using react-scrollama for the following reasons:
1. Built specifically for React and scrollytelling
2. Simpler implementation and maintenance
3. Built-in progress tracking
4. Good mobile support
5. Active maintenance and community
6. TypeScript support out of the box

### Implementation Strategy
1. Use react-scrollama for core scrollytelling functionality
2. Implement RAF-based animations for smooth transitions
3. Use CSS transforms for performance
4. Implement lazy loading for content
5. Add error boundaries for resilience
6. Include fallbacks for edge cases

### Performance Optimization
1. Debounce scroll handlers
2. Use CSS transforms for animations
3. Implement virtual scrolling for large datasets
4. Lazy load images and content
5. Use will-change CSS property judiciously

## Next Steps
1. Implement base scroll container using react-scrollama
2. Create reusable scroll step components
3. Set up progress tracking system
4. Implement mobile touch handling
5. Add performance monitoring
6. Create error boundaries and fallbacks

## References
- [react-scrollama Documentation](https://github.com/jsonkao/react-scrollama)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [TICKET-304: Scroll Container Setup](../tickets/04_UI_Implementation_Tickets.md) 