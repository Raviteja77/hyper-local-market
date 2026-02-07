// services/web/src/components/atoms/Typography/Typography.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';
import React from 'react';

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'body', 'caption', 'overline'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'error', 'success'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'Default Typography',
  },
};

export const TypeScale: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1 - The quick brown fox</Typography>
      <Typography variant="h2">Heading 2 - The quick brown fox</Typography>
      <Typography variant="h3">Heading 3 - The quick brown fox</Typography>
      <Typography variant="h4">Heading 4 - The quick brown fox</Typography>
      <Typography variant="body">Body - The quick brown fox jumps over the lazy dog</Typography>
      <Typography variant="caption">Caption - Additional information text</Typography>
      <Typography variant="overline">Overline - Label text</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography color="primary">Primary color text</Typography>
      <Typography color="secondary">Secondary color text</Typography>
      <Typography color="muted">Muted color text</Typography>
      <Typography color="error">Error color text</Typography>
      <Typography color="success">Success color text</Typography>
    </div>
  ),
};

export const ZeptoProductTitle: Story = {
  render: () => (
    <div className="p-4 bg-white rounded-lg border border-gray-200 max-w-xs">
      <Typography variant="h4">Organic Milk 1L</Typography>
      <div className="flex items-baseline gap-2 mt-2">
        <Typography variant="body" weight="bold" color="primary">₹89</Typography>
        <Typography variant="caption" className="line-through">₹110</Typography>
      </div>
    </div>
  ),
};
