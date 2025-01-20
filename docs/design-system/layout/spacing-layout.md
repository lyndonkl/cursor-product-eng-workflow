# Spacing and Layout System

> **Implementation References**:
> - TICKET-202 (Core Dependencies Setup): Implement Tailwind CSS configuration
> - TICKET-204 (App Directory Structure): Set up layout components
> - TICKET-205 (Component Architecture): Apply spacing and layout system in components
> - TICKET-304 (Scroll Container Setup): Use spacing system for scrollytelling layout
> - TICKET-309 (Mobile Layout): Implement responsive breakpoints and spacing

## Overview
A consistent spacing and layout system designed for a scrollytelling experience, focusing on readability, visual hierarchy, and smooth transitions between sections.

## Spacing Scale

### Base Unit
```css
--spacing-unit: 0.25rem; /* 4px - Base unit for all spacing calculations */
```

### Spacing Scale
```css
--space-0: 0;
--space-1: 0.25rem;  /*  4px - Minimal spacing */
--space-2: 0.5rem;   /*  8px - Tight spacing */
--space-3: 0.75rem;  /* 12px - Compact spacing */
--space-4: 1rem;     /* 16px - Standard spacing */
--space-5: 1.25rem;  /* 20px - Comfortable spacing */
--space-6: 1.5rem;   /* 24px - Loose spacing */
--space-8: 2rem;     /* 32px - Section spacing */
--space-10: 2.5rem;  /* 40px - Large section spacing */
--space-12: 3rem;    /* 48px - Extra large spacing */
--space-16: 4rem;    /* 64px - Major section spacing */
--space-20: 5rem;    /* 80px - Hero section spacing */
--space-24: 6rem;    /* 96px - Maximum spacing */
```

## Section Padding Rules

### Content Sections
```css
/* Main content container */
--content-padding-x: clamp(1rem, 5vw, 2rem);
--content-max-width: 80rem; /* 1280px */

/* Text sections */
--text-section-spacing: var(--space-16);
--text-section-padding: var(--space-8);

/* Visualization sections */
--viz-section-spacing: var(--space-20);
--viz-section-padding: var(--space-10);
```

### Component Spacing
```css
/* Card components */
--card-padding: var(--space-6);
--card-gap: var(--space-4);

/* Data visualization */
--chart-padding: var(--space-8);
--label-spacing: var(--space-2);
--tooltip-padding: var(--space-4);
```

## Grid System

### Main Grid
```css
/* Base 12-column grid */
--grid-columns: 12;
--grid-gap: var(--space-6);
--grid-container: min(var(--content-max-width), 100% - 2 * var(--content-padding-x));
```

### Responsive Grid Areas
```css
/* Content layout areas */
--sidebar-width: 20rem;     /* 320px */
--main-content: 1fr;
--visualization-height: min(80vh, 48rem); /* 768px maximum */
```

## Breakpoint System

### Core Breakpoints
```css
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X large devices */
```

### Usage Guidelines
- Mobile-first approach: Default styles for mobile, use min-width queries
- Key breakpoints for layout changes:
  - 640px: Single column to two columns
  - 768px: Navigation changes
  - 1024px: Major layout shifts
  - 1280px: Content width caps

## Component Spacing Guidelines

### Text Components
- Paragraphs: `--space-4` bottom margin
- Headings: `--space-6` top, `--space-4` bottom
- Lists: `--space-2` between items
- Blockquotes: `--space-6` vertical margins

### Interactive Elements
- Buttons: `--space-4` padding
- Form fields: `--space-2` padding, `--space-4` between fields
- Tooltips: `--space-2` padding, `--space-2` offset from trigger

### Data Visualization
- Chart margins: `--space-8` all sides
- Axis labels: `--space-4` offset
- Legend items: `--space-2` between items
- Tooltip spacing: `--space-2` internal, `--space-4` offset

## Scrollytelling-Specific Guidelines

### Section Heights
```css
--section-min-height: 100vh;
--section-content-max-width: 45rem; /* 720px */
--section-side-padding: max(var(--space-4), 5vw);
```

### Transition Spaces
```css
--section-gap: var(--space-16);
--transition-padding: var(--space-24);
```

## Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
      },
      maxWidth: {
        'content': '80rem',
        'section': '45rem',
      },
      height: {
        'section': '100vh',
        'visualization': 'min(80vh, 48rem)',
      },
      padding: {
        'section': 'max(1rem, 5vw)',
      },
      gap: {
        'grid': '1.5rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      gridTemplateColumns: {
        'main': 'minmax(0, 1fr)',
        'with-sidebar': '20rem minmax(0, 1fr)',
      },
    },
  },
} 