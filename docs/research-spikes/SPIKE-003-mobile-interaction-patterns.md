# SPIKE-003: Mobile Interaction Patterns

## Overview
This research spike evaluates mobile-first interaction patterns for the GDP Timeline Visualization project, focusing on touch interactions, responsive design, and performance optimization.

## Touch Interaction Patterns

### 1. Scroll Handling
**Description:**  
Optimized scroll handling for touch devices with momentum scrolling and smooth animations.

**Implementation Pattern:**
```typescript
import { useEffect, useRef } from 'react';

const TouchScrollContainer: React.FC = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let startY = 0;
    let currentY = 0;
    let animationFrame: number;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      cancelAnimationFrame(animationFrame);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      currentY = e.touches[0].clientY - startY;
      
      animationFrame = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        containerRef.current.style.transform = `translateY(${currentY}px)`;
      });
    };

    const handleTouchEnd = () => {
      cancelAnimationFrame(animationFrame);
      // Add momentum scrolling here
    };

    const element = containerRef.current;
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="touch-container"
    >
      {children}
    </div>
  );
};
```

### 2. Gesture Recognition
**Description:**  
Implementation of common touch gestures for data exploration.

**Implementation Pattern:**
```typescript
import { useGesture } from '@use-gesture/react';

interface GestureHandlerProps {
  onZoom: (scale: number) => void;
  onPan: (x: number, y: number) => void;
  showConfidenceIntervals: boolean;
  showMilestones: boolean;
}

const GestureHandler: React.FC<GestureHandlerProps> = ({
  onZoom,
  onPan,
  showConfidenceIntervals,
  showMilestones
}) => {
  const bind = useGesture({
    onDrag: ({ movement: [mx, my], first, last }) => {
      onPan(mx, my);
    },
    onPinch: ({ offset: [scale], first, last }) => {
      onZoom(scale);
    },
    onDoubleTap: () => {
      // Toggle data visualization options
      toggleVisualizationOptions();
    }
  });

  return (
    <div {...bind()} className="gesture-container">
      <div className="visualization-controls">
        <button 
          className="control-button"
          onClick={() => setShowConfidenceIntervals(!showConfidenceIntervals)}
        >
          {showConfidenceIntervals ? 'Hide' : 'Show'} Confidence
        </button>
        <button
          className="control-button"
          onClick={() => setShowMilestones(!showMilestones)}
        >
          {showMilestones ? 'Hide' : 'Show'} Milestones
        </button>
      </div>
    </div>
  );
};

interface DataPointTouchProps {
  point: {
    year: Date;
    gdp: number;
    confidenceInterval?: [number, number];
    economicIndicators?: Record<string, number>;
  };
  milestone?: {
    name: string;
    impact: string;
    date: string;
  };
}

const DataPointTouch: React.FC<DataPointTouchProps> = ({ point, milestone }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handlePress = useCallback(() => {
    setShowDetails(true);
  }, []);

  const handleLongPress = useCallback(() => {
    // Show extended information panel
    showExtendedInfo({
      point,
      milestone,
      economicContext: true
    });
  }, [point, milestone]);

  return (
    <div 
      className="touch-point"
      onTouchStart={handlePress}
      onTouchEnd={() => setShowDetails(false)}
    >
      {showDetails && (
        <div className="point-details">
          <div className="gdp-value">
            GDP: {point.gdp}
            {point.confidenceInterval && (
              <span className="confidence">
                ±{(point.confidenceInterval[1] - point.confidenceInterval[0]) / 2}
              </span>
            )}
          </div>
          {milestone && (
            <div className="milestone-info">
              <h4>{milestone.name}</h4>
              <p>{milestone.impact}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

## Viewport Considerations

### 1. Viewport Meta Tags
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

### 2. Safe Area Handling
```typescript
const SafeAreaContainer: React.FC = ({ children }) => (
  <div className="min-h-screen bg-white px-4 pb-safe-bottom pt-safe-top">
    {children}
  </div>
);
```

### 3. Dynamic Viewport Height
```typescript
const useDynamicViewportHeight = () => {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);
};
```

## Mobile Navigation Prototype

### 1. Bottom Navigation
```typescript
const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg pb-safe">
      <div className="flex justify-around items-center h-16">
        <button className="p-4 flex-1 flex flex-col items-center">
          <span>Overview</span>
        </button>
        <button className="p-4 flex-1 flex flex-col items-center">
          <span>Timeline</span>
        </button>
        <button className="p-4 flex-1 flex flex-col items-center">
          <span>Details</span>
        </button>
      </div>
    </nav>
  );
};
```

### 2. Swipe Navigation
```typescript
const SwipeNavigation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const bind = useGesture({
    onDrag: ({ movement: [mx], direction: [xDir], last }) => {
      if (last) {
        if (Math.abs(mx) > 50) {
          setActiveIndex(prev => 
            xDir > 0 ? Math.max(0, prev - 1) : Math.min(2, prev + 1)
          );
        }
      }
    },
  });

  return (
    <div {...bind()} className="swipe-container">
      {/* Content */}
    </div>
  );
};
```

## Performance Testing

### 1. Device Testing Matrix
- iPhone SE (Small screen)
- iPhone 12/13 (Medium screen)
- iPhone 12/13 Pro Max (Large screen)
- iPad Mini (Small tablet)
- iPad Pro (Large tablet)
- Various Android devices

### 2. Performance Metrics
- Time to Interactive (TTI)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Touch response time
- Scroll performance
- Animation frame rate

### 3. Performance Monitoring
```typescript
const usePerformanceMonitoring = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics
        console.log(`${entry.name}: ${entry.startTime}ms`);
      }
    });

    observer.observe({ entryTypes: ['first-input', 'layout-shift'] });
    return () => observer.disconnect();
  }, []);
};
```

## Responsive Design Patterns

### 1. Mobile-First Grid System
```typescript
const ResponsiveGrid: React.FC = () => (
  <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
    {/* Grid items */}
  </div>
);
```

### 2. Adaptive Typography
```typescript
const styles = {
  heading: 'text-2xl md:text-3xl lg:text-4xl font-bold',
  body: 'text-base md:text-lg lg:text-xl',
  caption: 'text-sm md:text-base',
};
```

### 3. Touch Target Sizes
```typescript
const TouchTarget: React.FC = ({ children }) => (
  <button className="min-h-[44px] min-w-[44px] p-2">
    {children}
  </button>
);
```

## Recommendations

### Primary Recommendation: Progressive Enhancement
1. Start with core touch functionality
2. Add advanced gestures where beneficial
3. Implement responsive breakpoints
4. Add performance monitoring
5. Include fallbacks for older devices

### Implementation Strategy
1. Use mobile-first development approach
2. Implement touch-friendly navigation
3. Optimize for various screen sizes
4. Add performance monitoring
5. Test across multiple devices
6. Include accessibility features

### Performance Optimization
1. Use passive event listeners
2. Implement touch event debouncing
3. Optimize animations with RAF
4. Use hardware acceleration
5. Implement lazy loading
6. Monitor memory usage

## Next Steps
1. Implement base touch handlers
2. Create responsive layouts
3. Add gesture recognition
4. Implement performance monitoring
5. Create device testing plan
6. Add error boundaries

## References
- [Touch Events MDN](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [Mobile Web Performance Checklist](https://web.dev/mobile-performance-checklist/)
- [TICKET-309: Mobile Layout](../tickets/04_UI_Implementation_Tickets.md)
- [TICKET-310: Touch Interactions](../tickets/04_UI_Implementation_Tickets.md) 