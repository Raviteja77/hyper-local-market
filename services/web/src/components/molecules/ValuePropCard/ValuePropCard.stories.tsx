// services/web/src/components/molecules/ValuePropCard/ValuePropCard.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TrendingDown, Truck, Clock } from 'lucide-react';
import { ValuePropCard } from './ValuePropCard';

const meta: Meta<typeof ValuePropCard> = {
  title: 'Molecules/ValuePropCard',
  component: ValuePropCard,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
    },
    iconColor: {
      control: 'text',
    },
    iconBgColor: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ValuePropCard>;

// Story 1: Lowest Prices
export const LowestPrices: Story = {
  args: {
    icon: TrendingDown,
    title: 'Lowest Prices',
    subtitle: 'Best deals in town',
    iconColor: 'text-green-600',
    iconBgColor: 'bg-green-100',
  },
};

// Story 2: Free Delivery
export const FreeDelivery: Story = {
  args: {
    icon: Truck,
    title: 'Free Delivery',
    subtitle: 'On orders above ₹99',
    iconColor: 'text-blue-600',
    iconBgColor: 'bg-blue-100',
  },
};

// Story 3: Fast Delivery
export const FastDelivery: Story = {
  args: {
    icon: Clock,
    title: '5 Min Delivery',
    subtitle: 'Lightning fast service',
    iconColor: 'text-orange-600',
    iconBgColor: 'bg-orange-100',
  },
};

// Story 4: Default (Primary Colors)
export const Default: Story = {
  args: {
    icon: TrendingDown,
    title: 'Best Value',
    subtitle: 'Quality guaranteed',
  },
};

// Story 5: Three Cards in Grid (Horizontal Scroll)
export const ThreeCardsRow: Story = {
  render: () => {
    const cards = [
      {
        icon: TrendingDown,
        title: 'Lowest Prices',
        subtitle: 'Best deals in town',
        iconColor: 'text-green-600',
        iconBgColor: 'bg-green-100',
      },
      {
        icon: Truck,
        title: 'Free Delivery',
        subtitle: 'On orders above ₹99',
        iconColor: 'text-blue-600',
        iconBgColor: 'bg-blue-100',
      },
      {
        icon: Clock,
        title: '5 Min Delivery',
        subtitle: 'Lightning fast service',
        iconColor: 'text-orange-600',
        iconBgColor: 'bg-orange-100',
      },
    ];

    return (
      <div className="bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why Shop With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <ValuePropCard key={index} {...card} />
          ))}
        </div>
      </div>
    );
  },
};
