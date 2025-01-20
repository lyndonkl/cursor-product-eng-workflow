import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge
 * Useful for combining Tailwind CSS classes conditionally
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as currency
 * @param value - The number to format
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @param currency - The currency to use (default: 'USD')
 */
export function formatCurrency(
  value: number,
  locale = 'en-US',
  currency = 'USD'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

/**
 * Formats a number with appropriate precision
 * @param value - The number to format
 */
export function formatLargeNumber(value: number): string {
  if (value < 1) {
    return value.toFixed(3)
  }
  if (value < 10) {
    return value.toFixed(2)
  }
  if (value < 100) {
    return value.toFixed(1)
  }
  return value.toFixed(0)
}

/**
 * Formats a year range as a string
 * @param startYear - The start year
 * @param endYear - The end year
 */
export function formatYearRange(startYear: number, endYear: number): string {
  return `${startYear}–${endYear}`
}

/**
 * Calculates the percentage change between two values
 * @param oldValue - The original value
 * @param newValue - The new value
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  return ((newValue - oldValue) / oldValue) * 100
}

/**
 * Formats a percentage with appropriate sign and decimals
 * @param value - The percentage value
 * @param decimals - Number of decimal places (default: 1)
 */
export function formatPercentage(value: number, decimals = 1): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
} 