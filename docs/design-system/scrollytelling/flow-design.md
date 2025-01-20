# Scrollytelling Flow Design

## Overview
This document outlines the complete scrollytelling experience for the GDP Timeline Visualization project, detailing the flow, transitions, and interactions between different historical periods.

## Landing View

### Initial State
- Full viewport height landing section
- Centered title and introduction
- Subtle scroll indicator animation
- Initial GDP timeline preview (zoomed out)

### Visual Elements
```typescript
interface LandingSection {
  title: string;
  subtitle: string;
  timelinePreview: {
    startYear: 1700;
    endYear: 2050;
    initialZoom: 0.5;
  };
  scrollIndicator: {
    animation: 'pulse';
    duration: '2s';
    repeat: 'infinite';
  };
}
```

## Section Transitions

### 1. Pre-Industrial to First Industrial Revolution
**Trigger Point:** 20% viewport scroll
```typescript
interface TransitionSpec {
  from: {
    period: 'pre-industrial';
    year: 1700;
    gdpHighlight: [startYear: 1700, endYear: 1760];
  };
  to: {
    period: 'first-industrial-revolution';
    year: 1760;
    gdpHighlight: [startYear: 1760, endYear: 1840];
  };
  animation: {
    duration: '1s';
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)';
    properties: ['opacity', 'transform'];
  };
}
```

### 2. First to Second Industrial Revolution
**Trigger Point:** 40% viewport scroll
```typescript
interface TransitionSpec {
  from: {
    period: 'first-industrial-revolution';
    year: 1760;
    gdpHighlight: [startYear: 1760, endYear: 1840];
  };
  to: {
    period: 'second-industrial-revolution';
    year: 1840;
    gdpHighlight: [startYear: 1840, endYear: 1914];
  };
  animation: {
    duration: '1s';
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)';
    properties: ['opacity', 'transform'];
  };
}
```

### 3. Second Industrial Revolution to Modern Era
**Trigger Point:** 60% viewport scroll
```typescript
interface TransitionSpec {
  from: {
    period: 'second-industrial-revolution';
    year: 1840;
    gdpHighlight: [startYear: 1840, endYear: 1914];
  };
  to: {
    period: 'modern-era';
    year: 1914;
    gdpHighlight: [startYear: 1914, endYear: 2020];
  };
  animation: {
    duration: '1s';
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)';
    properties: ['opacity', 'transform'];
  };
}
```

### 4. Modern Era to Future Projections
**Trigger Point:** 80% viewport scroll
```typescript
interface TransitionSpec {
  from: {
    period: 'modern-era';
    year: 1914;
    gdpHighlight: [startYear: 1914, endYear: 2020];
  };
  to: {
    period: 'future-projections';
    year: 2020;
    gdpHighlight: [startYear: 2020, endYear: 2050];
  };
  animation: {
    duration: '1s';
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)';
    properties: ['opacity', 'transform'];
  };
}
```

## Progress Indicators

### 1. Timeline Progress
```typescript
interface TimelineProgress {
  type: 'continuous';
  position: 'top';
  style: {
    height: '4px';
    background: 'gradient';
    animation: 'slide';
  };
  markers: {
    type: 'period-boundaries';
    style: 'dot';
  };
}
```

### 2. Section Progress
```typescript
interface SectionProgress {
  type: 'discrete';
  position: 'right';
  style: {
    width: '4px';
    height: '100vh';
    fixed: true;
  };
  markers: {
    type: 'sections';
    style: 'line';
    active: 'highlight';
  };
}
```

## Expanded Information Panels

### 1. Period Overview Panel
```typescript
interface PeriodPanel {
  trigger: 'scroll-into-view';
  position: 'left';
  width: '400px';
  content: {
    id: string;
    title: string;
    description: string;
    characteristics: string[];
    keyEvents: Array<{
      year: number;
      event: string;
      impact: string;
    }>;
    statistics: {
      gdpGrowth: number;
      timespan: [number, number];
      regionalImpact: Record<string, {
        country: string;
        description: string;
        significance: 'high' | 'medium' | 'low';
        gdpImpact: number;
      }>;
      economicIndicators: {
        averageGDPGrowth: number;
        peakGDPYear?: number;
        significantFactors: string[];
      };
    };
    context: {
      talkingPoints: string[];
      keyIndustries?: string[];
      breakthroughs?: Array<{
        name: string;
        year?: number;
        description: string;
      }>;
      humanDevelopment?: string[];
      environment?: string[];
      policyGovernance?: string[];
      culturalImpacts?: string[];
    };
  };
  animation: {
    enter: 'slide-in-left';
    exit: 'fade-out';
  };
}
```