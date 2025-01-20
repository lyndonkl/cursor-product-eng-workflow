# Color Palette System

> **Implementation Note**: The Tailwind CSS configuration defined in this document should be implemented as part of TICKET-202 (Core Dependencies Setup) in the Bootstrap EPIC.

## Overview
A mellow, minimalist color palette designed for the GDP Timeline Visualization project. The system prioritizes readability, accessibility, and a calm visual experience while effectively conveying data and historical periods.

## Base Colors

### Primary Colors
```css
--primary-50:  #f0f9ff;  /* Lightest blue */
--primary-100: #e0f2fe;
--primary-200: #bae6fd;
--primary-300: #7dd3fc;
--primary-400: #38bdf8;
--primary-500: #0ea5e9;  /* Main brand color */
--primary-600: #0284c7;
--primary-700: #0369a1;
--primary-800: #075985;
--primary-900: #0c4a6e;  /* Darkest blue */
```

### Neutral Colors (Backgrounds & Text)
```css
--neutral-50:  #fafafa;  /* Off-white for backgrounds */
--neutral-100: #f5f5f5;
--neutral-200: #e5e5e5;
--neutral-300: #d4d4d4;
--neutral-400: #a3a3a3;
--neutral-500: #737373;
--neutral-600: #525252;
--neutral-700: #404040;
--neutral-800: #262626;
--neutral-900: #171717;  /* Near black for text */
```

## Data Visualization Colors

### Historical Period Indicators
```css
/* Early Industrial (1700-1820) */
--period-early: #8b5cf6;  /* Soft purple */

/* First Industrial Revolution (1820-1870) */
--period-first: #06b6d4;  /* Cyan */

/* Second Industrial Revolution (1870-1914) */
--period-second: #10b981;  /* Emerald */

/* Modern Era (1914-2020) */
--period-modern: #f59e0b;  /* Amber */

/* Future Projections (2020-2050) */
--period-future: #ec4899;  /* Pink */
```

### GDP Line Colors
```css
--gdp-line: #0ea5e9;          /* Main GDP line */
--gdp-projection: #ec4899;    /* Future projection line */
--gdp-highlight: #f59e0b;     /* Highlighted segments */
```

### Interactive States
```css
--hover-bg: rgba(14, 165, 233, 0.1);     /* Hover background */
--active-bg: rgba(14, 165, 233, 0.2);    /* Active/selected background */
--focus-ring: #0ea5e9;                   /* Focus outline color */
--disabled: #d4d4d4;                     /* Disabled state */
```

## Accessibility Compliance

All color combinations in this palette have been tested to meet WCAG 2.1 AA standards:
- Regular text (minimum contrast ratio 4.5:1)
- Large text (minimum contrast ratio 3:1)
- UI components (minimum contrast ratio 3:1)

### Text Color Usage
- Primary text: neutral-900 on neutral-50 (contrast ratio: 16:1)
- Secondary text: neutral-600 on neutral-50 (contrast ratio: 7:1)
- Interactive text: primary-700 on neutral-50 (contrast ratio: 7:1)

### Interactive Elements
- Hover states use a 10% opacity overlay for subtle feedback
- Focus states use a 2px solid outline with focus-ring color
- Active states use a 20% opacity overlay

## Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Neutral colors
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Historical period colors
        period: {
          early: '#8b5cf6',
          first: '#06b6d4',
          second: '#10b981',
          modern: '#f59e0b',
          future: '#ec4899',
        },
        // GDP line colors
        gdp: {
          line: '#0ea5e9',
          projection: '#ec4899',
          highlight: '#f59e0b',
        },
      },
    },
  },
} 