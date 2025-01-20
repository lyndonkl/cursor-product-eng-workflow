# Typography System

> **Implementation References**:
> - TICKET-202 (Core Dependencies Setup): Implement Tailwind CSS configuration and font dependencies
> - TICKET-204 (App Directory Structure): Add font files to public/fonts directory
> - TICKET-205 (Component Architecture): Use typography system in component templates

## Overview
A modern, minimalist typography system designed for clarity and readability in data visualization and long-form content. The system uses Inter as the primary font family, chosen for its excellent legibility at various sizes and weights.

## Font Family Selection

### Primary Font: Inter
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**Rationale for Inter:**
- Modern, clean design aligning with minimalist aesthetic
- Excellent legibility at all sizes
- Comprehensive weight range
- Strong support for numerals (essential for data visualization)
- Optimized for screens with pixel-perfect alignment
- Open source and widely available

### Font Loading Strategy
1. **Preload Critical Weights:**
   ```html
   <link 
     rel="preload" 
     href="/fonts/inter-var.woff2" 
     as="font" 
     type="font/woff2" 
     crossorigin
   />
   ```

2. **Variable Font Usage:**
   - Use Inter's variable font version for optimal performance
   - Fall back to system fonts for immediate text display

## Type Scale

### Heading Scale (Mobile → Desktop)
```css
--h1: clamp(2rem, 5vw, 3rem);        /* 32px → 48px */
--h2: clamp(1.5rem, 4vw, 2.25rem);   /* 24px → 36px */
--h3: clamp(1.25rem, 3vw, 1.75rem);  /* 20px → 28px */
--h4: clamp(1.125rem, 2vw, 1.5rem);  /* 18px → 24px */
--h5: clamp(1rem, 1.5vw, 1.25rem);   /* 16px → 20px */
--h6: 1rem;                          /* 16px */
```

### Body Text
```css
--text-xs: 0.75rem;    /* 12px - Small labels */
--text-sm: 0.875rem;   /* 14px - Secondary text */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px - Large body text */
```

### Data Label Typography
```css
--label-sm: 0.75rem;   /* 12px - Small data labels */
--label-base: 0.875rem; /* 14px - Standard data labels */
--label-lg: 1rem;      /* 16px - Large data labels */
```

## Font Weights
```css
--font-thin: 100;
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## Line Heights
```css
--leading-none: 1;      /* Headlines */
--leading-tight: 1.25;  /* Data labels */
--leading-normal: 1.5;  /* Body text */
--leading-relaxed: 1.75; /* Long-form content */
```

## Usage Guidelines

### Headings
- Use appropriate semantic heading levels (h1-h6)
- Maintain consistent spacing around headings
- Keep headings concise and descriptive

### Body Text
- Use `--text-base` (16px) for main content
- Maintain comfortable line length (60-75 characters)
- Use proper paragraph spacing

### Data Labels
- Use condensed spacing for data-dense areas
- Ensure sufficient contrast with backgrounds
- Keep labels brief and clear

### Responsive Behavior
- Font sizes scale smoothly between breakpoints
- Maintain readability at all screen sizes
- Adjust line heights for optimal reading experience

## Accessibility Considerations
- Minimum text size of 12px
- Sufficient color contrast (see color system)
- Clear typographic hierarchy
- Proper heading structure
- Scalable text support

## Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
} 