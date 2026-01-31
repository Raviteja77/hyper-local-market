// services/web/src/components/molecules/StoreCard/StoreCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { StoreCard } from './StoreCard';

const meta: Meta<typeof StoreCard> = {
  title: 'Molecules/StoreCard',
  component: StoreCard,
  tags: ['autodocs'],
  argTypes: {
    isFreeDelivery: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StoreCard>;

// Story 1: "Default"
export const Default: Story = {
  args: {
    id: '1',
    name: 'Quick Mart',
    image: 'https://picsum.photos/seed/store1/64/64',
    deliveryTime: '8-12 min',
    rating: 4.5,
    onClick: (id) => console.log('Store clicked:', id),
  },
};

// Story 2: "Free Delivery"
export const FreeDelivery: Story = {
  args: {
    id: '2',
    name: 'Fresh Mart',
    image: 'https://picsum.photos/seed/store2/64/64',
    deliveryTime: '10-15 min',
    rating: 4.8,
    isFreeDelivery: true,
    onClick: (id) => console.log('Store clicked:', id),
  },
};

// Story 3: "Horizontal Scroll Row (Zepto)"
export const HorizontalScrollRow: Story = {
  render: () => {
    const stores = [
      {
        id: '1',
        name: 'Quick Mart',
        image: 'https://picsum.photos/seed/store1/64/64',
        deliveryTime: '8-12 min',
        rating: 4.5,
        isFreeDelivery: true,
      },
      {
        id: '2',
        name: 'Fresh Mart',
        image: 'https://picsum.photos/seed/store2/64/64',
        deliveryTime: '10-15 min',
        rating: 4.8,
        isFreeDelivery: false,
      },
      {
        id: '3',
        name: 'Super Store',
        image: 'https://picsum.photos/seed/store3/64/64',
        deliveryTime: '12-18 min',
        rating: 4.6,
        isFreeDelivery: true,
      },
      {
        id: '4',
        name: 'City Grocers',
        image: 'https://picsum.photos/seed/store4/64/64',
        deliveryTime: '15-20 min',
        rating: 4.3,
        isFreeDelivery: false,
      },
      {
        id: '5',
        name: 'Daily Needs',
        image: 'https://picsum.photos/seed/store5/64/64',
        deliveryTime: '8-10 min',
        rating: 4.7,
        isFreeDelivery: true,
      },
    ];

    return (
      <div className="bg-gray-50 p-6 min-h-screen">
        {/* Section heading */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Stores near you</h2>
        
        {/* Horizontal scrolling container */}
        <div className="flex gap-3 overflow-x-auto pb-4">
          {stores.map((store) => (
            <div key={store.id} className="flex-shrink-0 w-64">
              <StoreCard
                {...store}
                onClick={(id) => console.log('Store clicked:', id)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};