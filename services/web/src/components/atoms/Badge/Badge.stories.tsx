// services/web/src/components/atoms/Badge/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import React from 'react';
import { Clock } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['discount', 'delivery', 'stock', 'error', 'info', 'default'],
    },
    dot: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Discount: Story = {
  args: {
    variant: 'discount',
    children: '20% OFF',
  },
};

export const DeliveryTime: Story = {
  args: {
    variant: 'delivery',
    leftIcon: <Clock size={12} />,
    children: '10 min',
  },
};

export const LowStock: Story = {
  args: {
    variant: 'stock',
    children: 'Only 3 left',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="discount">20% OFF</Badge>
      <Badge variant="delivery" leftIcon={<Clock size={12} />}>10 min</Badge>
      <Badge variant="stock">Only 3 left</Badge>
      <Badge variant="error">Out of Stock</Badge>
      <Badge variant="info">New</Badge>
      <Badge variant="default">Default</Badge>
    </div>
  ),
};

export const DotVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="discount" dot>In Stock</Badge>
      <Badge variant="error" dot>Out of Stock</Badge>
    </div>
  ),
};

export const OnProductCardZepto: Story = {
  render: () => (
    <div className="relative w-48 h-32 bg-white-lg border border-gray-200 p-4">
      <div className="absolute top-2 right-2">
        <Badge variant="discount">20% OFF</Badge>
      </div>
      <div className="text-sm text-gray-600 mt-8">Product Card</div>
    </div>
  ),
};
