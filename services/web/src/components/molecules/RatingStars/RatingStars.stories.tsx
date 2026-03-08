// services/web/src/components/molecules/RatingStars/RatingStars.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../atoms';
import { Clock } from 'lucide-react';
import { RatingStars } from './RatingStars';
import Image from 'next/image';

const meta: Meta<typeof RatingStars> = {
  title: 'Molecules/RatingStars',
  component: RatingStars,
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 0.1 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    showNumeric: {
      control: 'boolean',
    },
    interactive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RatingStars>;

// Story 1: "Read Only" — rating=4.2, showNumeric=true
export const ReadOnly: Story = {
  args: {
    rating: 4.2,
    showNumeric: true,
  },
};

// Story 2: "All Ratings" — show 1 through 5 stars stacked
export const AllRatings: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {[1, 2, 3, 4, 5].map((r) => (
        <div key={r} className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700 w-16">{r} star{r > 1 ? 's' : ''}</span>
          <RatingStars rating={r} showNumeric />
        </div>
      ))}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700 w-16">Half</span>
        <RatingStars rating={3.5} showNumeric />
      </div>
    </div>
  ),
};

// Story 3: "Interactive" — interactive=true
export const Interactive: Story = {
  args: {
    rating: 0,
    interactive: true,
    showNumeric: true,
    onRate: (rating) => console.log('Rated:', rating),
  },
};

// Story 4: "On Store Card" — embedded in a mini StoreCard-like layout
export const OnStoreCard: Story = {
  render: () => (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 max-w-sm">
      <div className="flex items-start gap-3">
        <Image
          src="https://picsum.photos/seed/store1/64/64"
          alt="Store"
          className="w-16 h-16-lg object-cover"
        />
        <div className="flex-1">
          <h4 className="text-base font-semibold text-gray-900 mb-1">Quick Mart</h4>
          <Badge variant="delivery" leftIcon={<Clock size={12} />}>
            8-12 min
          </Badge>
          <div className="mt-2">
            <RatingStars rating={4.5} showNumeric />
          </div>
          <p className="text-xs text-success mt-1">Free delivery</p>
        </div>
      </div>
    </div>
  ),
};