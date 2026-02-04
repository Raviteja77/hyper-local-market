// services/web/src/components/atoms/Skeleton/Skeleton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import React from 'react';

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'w-48 h-6',
  },
};

export const Circle: Story = {
  args: {
    className: 'w-12 h-12 rounded-full',
  },
};

export const Rectangle: Story = {
  args: {
    className: 'w-full h-32',
  },
};

export const ProductCardSkeleton: Story = {
  render: () => (
    <div className="bg-white rounded-lg border border-gray-100 p-4 w-64">
      {/* Image skeleton */}
      <Skeleton className="w-full h-48 rounded-lg mb-3" />
      
      {/* Price skeleton */}
      <Skeleton className="w-20 h-6 mb-2" />
      
      {/* Title skeleton */}
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-3/4 h-4 mb-3" />
      
      {/* Pack info skeleton */}
      <Skeleton className="w-1/2 h-3 mb-2" />
      
      {/* Rating skeleton */}
      <Skeleton className="w-24 h-4" />
    </div>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="space-y-3 w-full max-w-md">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="w-16 h-16 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-3" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TextLineSkeleton: Story = {
  render: () => (
    <div className="space-y-2 w-full max-w-md">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-4/5 h-4" />
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-5/6 h-4" />
    </div>
  ),
};

export const UserProfileSkeleton: Story = {
  render: () => (
    <div className="flex items-start gap-4 max-w-sm">
      <Skeleton className="w-20 h-20 rounded-full" />
      <div className="flex-1 space-y-3">
        <Skeleton className="w-32 h-5" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>
    </div>
  ),
};
