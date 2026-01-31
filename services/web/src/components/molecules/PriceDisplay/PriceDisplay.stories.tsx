// services/web/src/components/molecules/PriceDisplay/PriceDisplay.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PriceDisplay } from './PriceDisplay';

const meta: Meta<typeof PriceDisplay> = {
  title: 'Molecules/PriceDisplay',
  component: PriceDisplay,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PriceDisplay>;

// Story 1: "With Discount" — price=177, original=249, discount=72
export const WithDiscount: Story = {
  args: {
    currentPrice: 177,
    originalPrice: 249,
    discountPercent: 72,
  },
};

// Story 2: "No Discount" — price=199 only (plain bold, no pill)
export const NoDiscount: Story = {
  args: {
    currentPrice: 199,
  },
};

// Story 3: "High Discount" — price=532, original=1499, discount=67
export const HighDiscount: Story = {
  args: {
    currentPrice: 532,
    originalPrice: 1499,
    discountPercent: 67,
  },
};

// Story 4: "All Sizes" — show sm, md, lg side by side
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Small (sm)</h3>
        <PriceDisplay currentPrice={177} originalPrice={249} discountPercent={72} size="sm" />
      </div>
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Medium (md) - Default</h3>
        <PriceDisplay currentPrice={177} originalPrice={249} discountPercent={72} size="md" />
      </div>
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Large (lg)</h3>
        <PriceDisplay currentPrice={177} originalPrice={249} discountPercent={72} size="lg" />
      </div>
    </div>
  ),
};