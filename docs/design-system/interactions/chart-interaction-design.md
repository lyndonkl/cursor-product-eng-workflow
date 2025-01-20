# Chart Interaction Design

## Overview
This document outlines the interaction patterns for the GDP Timeline Chart, ensuring a consistent and intuitive user experience across desktop and mobile devices.

## Hover States

### Data Point Hover
```typescript
interface DataPointHover {
  state: {
    scale: 1.2;
    transitionDuration: '150ms';
    cursor: 'pointer';
  };
  highlight: {
    radius: '6px';
    strokeWidth: '2px';
    strokeColor: 'var(--color-accent-500)';
    fill: 'var(--color-background)';
  };
  effects: {
    showTooltip: true;
    highlightYear: true;
  };
}
```

### Timeline Hover
```typescript
interface TimelineHover {
  state: {
    cursor: 'crosshair';
  };
  highlight: {
    verticalGuide: {
      strokeWidth: '1px';
      strokeColor: 'var(--color-neutral-400)';
      strokeDasharray: '4,4';
    };
    yearIndicator: true;
  };
}
```

### Period Region Hover
```typescript
interface PeriodHover {
  state: {
    cursor: 'pointer';
  };
  highlight: {
    opacity: 0.1;
    backgroundColor: 'var(--color-accent-200)';
  };
  effects: {
    showPeriodSummary: true;
  };
}
```

## Tooltip Design

### Data Point Tooltip
```typescript
interface DataPointTooltip {
  layout: {
    maxWidth: '300px';
    padding: 'var(--spacing-4)';
    borderRadius: 'var(--radius-lg)';
    backgroundColor: 'var(--color-background)';
    boxShadow: 'var(--shadow-lg)';
  };
  content: {
    year: string;
    gdpValue: string;
    percentageChange: string;
    confidenceInterval?: [number, number];
    historicalContext?: string;
    economicIndicators?: Record<string, number>;
  };
  positioning: {
    offset: 8;
    placement: 'top' | 'bottom' | 'left' | 'right';
    autoAdjust: true;
  };
}
```

### Period Summary Tooltip
```typescript
interface PeriodTooltip {
  layout: {
    maxWidth: '400px';
    padding: 'var(--spacing-4)';
    borderRadius: 'var(--radius-lg)';
    backgroundColor: 'var(--color-background)';
    boxShadow: 'var(--shadow-lg)';
  };
  content: {
    periodName: string;
    timespan: string;
    keyEvents: string[];
    gdpGrowth: string;
  };
  positioning: {
    offset: 12;
    placement: 'right';
    autoAdjust: true;
  };
}
```

## Click Interactions

### Data Point Click
```typescript
interface DataPointClick {
  trigger: {
    type: 'click' | 'keyEnter';
    target: 'dataPoint';
  };
  action: {
    openDetailPanel: true;
    highlightPoint: true;
    updateURL: true;
  };
  panel: {
    type: 'modal' | 'sidebar';
    width: {
      desktop: '600px';
      mobile: '100%';
    };
    content: DataPointDetail;
  };
}

interface DataPointDetail {
  header: {
    year: number;
    gdpValue: string;
    growthRate: string;
    confidenceInterval?: [number, number];
  };
  content: {
    historicalContext: string;
    keyEvents: string[];
    impactAnalysis: string;
    economicContext: {
      indicators: Record<string, number>;
      analysis: string;
    };
    technologicalMilestones: {
      name: string;
      impact: string;
      date: string;
    }[];
  };
  visualization: {
    type: 'miniChart';
    range: [number, number]; // 5 years before and after
    confidenceIntervalDisplay?: boolean;
  };
}

interface MilestoneInteraction {
  trigger: {
    type: 'click' | 'keyEnter';
    target: 'milestone';
  };
  action: {
    openDetailPanel: true;
    highlightMilestone: true;
    updateURL: true;
  };
  panel: {
    type: 'modal' | 'sidebar';
    width: {
      desktop: '500px';
      mobile: '100%';
    };
    content: {
      name: string;
      date: string;
      description: string;
      impact: string;
      relatedGDPData: {
        before: number;
        after: number;
        growthRate: string;
      };
    };
  };
}
```

### Period Click
```typescript
interface PeriodClick {
  trigger: {
    type: 'click' | 'keyEnter';
    target: 'periodRegion';
  };
  action: {
    scrollToSection: true;
    highlightPeriod: true;
    updateURL: true;
  };
}
```

## Data Point Indicators

### Standard Point
```typescript
interface DataPoint {
  default: {
    radius: '4px';
    fill: 'var(--color-primary-500)';
    stroke: 'var(--color-background)';
    strokeWidth: '1px';
  };
  hover: DataPointHover;
  active: {
    radius: '6px';
    strokeWidth: '2px';
    strokeColor: 'var(--color-accent-500)';
  };
}
```

### Milestone Point
```typescript
interface MilestonePoint {
  default: {
    radius: '6px';
    fill: 'var(--color-accent-500)';
    stroke: 'var(--color-background)';
    strokeWidth: '2px';
  };
  hover: DataPointHover;
  active: {
    radius: '8px';
    strokeWidth: '3px';
    strokeColor: 'var(--color-accent-600)';
  };
  indicator: {
    type: 'star' | 'diamond';
    size: '12px';
  };
}
```

## Animation Patterns

### Transition Animations
```typescript
interface Transitions {
  dataPoint: {
    properties: ['transform', 'stroke-width', 'r'];
    duration: '150ms';
    easing: 'ease-out';
  };
  tooltip: {
    properties: ['opacity', 'transform'];
    duration: '200ms';
    easing: 'ease-in-out';
  };
  periodHighlight: {
    properties: ['opacity', 'background-color'];
    duration: '200ms';
    easing: 'ease-in-out';
  };
  detailPanel: {
    properties: ['transform', 'opacity'];
    duration: '300ms';
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)';
  };
}
```

### Chart Animations
```typescript
interface ChartAnimations {
  initial: {
    type: 'draw';
    duration: '1000ms';
    easing: 'ease-in-out';
  };
  periodTransition: {
    type: 'morph';
    duration: '500ms';
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)';
  };
  dataUpdate: {
    type: 'interpolate';
    duration: '300ms';
    easing: 'ease-out';
  };
}
```

## Mobile Interaction Alternatives

### Touch Interactions
```typescript
interface TouchInteractions {
  dataPoint: {
    tap: {
      action: 'openDetail';
      feedback: 'highlight';
    };
    doubleTap: {
      action: 'zoom';
      scale: 1.5;
    };
    longPress: {
      action: 'showTooltip';
      duration: '500ms';
    };
  };
  chart: {
    pinchZoom: {
      enabled: true;
      maxScale: 3;
      minScale: 0.5;
    };
    pan: {
      enabled: true;
      momentum: true;
      boundaries: 'chart';
    };
  };
}
```

### Mobile-Specific UI
```typescript
interface MobileUI {
  tooltip: {
    position: 'bottom';
    height: '30vh';
    swipeToClose: true;
  };
  detailPanel: {
    fullscreen: true;
    gestureClose: true;
  };
  periodNavigation: {
    type: 'carousel';
    snapPoints: 'periods';
  };
}
```

## Implementation References
- D3.js Integration: `docs/research-spikes/SPIKE-002-d3-integration.md`
- Mobile Interactions: `docs/research-spikes/SPIKE-003-mobile-interaction-patterns.md`
- Layout System: `docs/design-system/layout/spacing-layout.md`
- Typography System: `docs/design-system/typography/typography-system.md`
- Color System: `docs/design-system/colors/color-palette.md`

## Related Implementation Tickets
- [TICKET-301: Timeline Chart Base Implementation](../../project_planning/tickets/04_UI_Implementation_Tickets.md)
- [TICKET-303: Tooltip System](../../project_planning/tickets/04_UI_Implementation_Tickets.md)
- [TICKET-307: Data Point Interactions](../../project_planning/tickets/04_UI_Implementation_Tickets.md)
- [TICKET-310: Touch Interactions](../../project_planning/tickets/04_UI_Implementation_Tickets.md)
- [TICKET-311: Core Animations](../../project_planning/tickets/04_UI_Implementation_Tickets.md) 