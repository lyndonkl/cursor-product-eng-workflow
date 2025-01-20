import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h3 className="heading-3 mb-2">Card Title</h3>
        <p className="body-text">This is a default card component.</p>
      </div>
    ),
  },
}

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    children: (
      <div className="p-6">
        <h3 className="heading-3 mb-2">Interactive Card</h3>
        <p className="body-text">This card has hover and active states.</p>
      </div>
    ),
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: (
      <div className="p-6">
        <h3 className="heading-3 mb-2">Outline Card</h3>
        <p className="body-text">This card has a more prominent border.</p>
      </div>
    ),
  },
} 