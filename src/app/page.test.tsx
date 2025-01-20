import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Home from './page'

describe('Home', () => {
  it('renders the title', () => {
    render(<Home />)
    const titleElement = screen.getByText('GDP Timeline Visualization')
    expect(titleElement).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<Home />)
    const descElement = screen.getByText('An interactive visualization of global GDP growth from 1700 to 2050.')
    expect(descElement).toBeInTheDocument()
  })

  it('renders all project status items', () => {
    render(<Home />)
    const items = [
      'Next.js setup complete',
      'TypeScript configured',
      'Tailwind CSS working',
      'ESLint and Prettier configured'
    ]
    
    items.forEach(item => {
      const element = screen.getByText(new RegExp(item))
      expect(element).toBeInTheDocument()
    })
  })
}) 