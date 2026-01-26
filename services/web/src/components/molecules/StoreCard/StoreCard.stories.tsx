// services/web/src/components/molecules/StoreCard/StoreCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { StoreCard } from './StoreCard';

const meta: Meta<typeof StoreCard> = {
  title: 'Molecules/StoreCard',
  component: StoreCard,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StoreCard>;

export const Default: Story = {
  args: {
    id: '1',
    name: 'Sharma Kirana Store',
    distance: 0.5,
    eta: 10,
    rating: 4.5,
    address: 'Shop 12, MG Road, Sector 5',
    onStoreClick: (id) => console.log('Store clicked:', id),
  },
};

export const WithImage: Story = {
  args: {
    id: '2',
    name: 'Fresh Mart',
    distance: 1.2,
    eta: 15,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop',
    address: 'Building 7A, Park Street',
    onStoreClick: (id) => console.log('Store clicked:', id),
  },
};

export const Closed: Story = {
  args: {
    id: '3',
    name: 'City Grocers',
    distance: 2.0,
    eta: 20,
    rating: 4.2,
    isOpen: false,
    address: 'Main Market, Block C',
    onStoreClick: (id) => console.log('Store clicked:', id),
  },
};

export const NoRating: Story = {
  args: {
    id: '4',
    name: 'Quick Stop Store',
    distance: 0.8,
    eta: 12,
    address: '45 Link Road',
    onStoreClick: (id) => console.log('Store clicked:', id),
  },
};

export const LongName: Story = {
  args: {
    id: '5',
    name: 'Premium Organic Grocery & Fresh Vegetables Store',
    distance: 1.5,
    eta: 18,
    rating: 4.9,
    address: 'Shop 23-24, Green Valley Complex, Phase 2',
    onStoreClick: (id) => console.log('Store clicked:', id),
  },
};

export const NearbyStore: Story = {
  args: {
    id: '6',
    name: 'Corner Shop',
    distance: 0.2,
    eta: 5,
    rating: 4.0,
    address: 'Near Park Gate',
    onStoreClick: (id) => console.log('Store clicked:', id),
  },
};