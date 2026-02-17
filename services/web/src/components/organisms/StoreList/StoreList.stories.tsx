// services/web/src/components/organisms/StoreList/StoreList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { StoreList } from './StoreList';

const mockStores = [
  {
    id: '1',
    name: 'Sharma Kirana Store',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200',
    deliveryTime: '10 min',
    rating: 4.5,
    distance: 0.5,
    eta: 10,
    onClick: (id: string) => console.log('Store clicked:', id),
  },
  {
    id: '2',
    name: 'Fresh Mart',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200',
    deliveryTime: '15 min',
    rating: 4.8,
    distance: 1.2,
    eta: 15,
    onClick: (id: string) => console.log('Store clicked:', id),
  },
  {
    id: '3',
    name: 'City Grocers',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200',
    deliveryTime: '20 min',
    rating: 4.2,
    distance: 2.0,
    eta: 20,
    onClick: (id: string) => console.log('Store clicked:', id),
  },
  {
    id: '4',
    name: 'Quick Stop Store',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200',
    deliveryTime: '12 min',
    rating: 4.6,
    distance: 0.8,
    eta: 12,
    onClick: (id: string) => console.log('Store clicked:', id),
  },
  {
    id: '5',
    name: 'Corner Shop',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200',
    deliveryTime: '5 min',
    rating: 4.0,
    distance: 0.2,
    eta: 5,
    onClick: (id: string) => console.log('Store clicked:', id),
  },
];

const meta: Meta<typeof StoreList> = {
  title: 'Organisms/StoreList',
  component: StoreList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoreList>;

export const Default: Story = {
  args: {
    stores: mockStores,
    onSortChange: (sort) => console.log('Sort changed:', sort),
  },
};

export const Loading: Story = {
  args: {
    stores: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    stores: [],
    emptyMessage: 'No stores available in your location',
  },
};

export const WithoutSortOptions: Story = {
  args: {
    stores: mockStores,
    showSortOptions: false,
  },
};

export const FewStores: Story = {
  args: {
    stores: mockStores.slice(0, 2),
    onSortChange: (sort) => console.log('Sort changed:', sort),
  },
};

export const CustomTitle: Story = {
  args: {
    stores: mockStores,
    title: 'Available Stores Near You',
    onSortChange: (sort) => console.log('Sort changed:', sort),
  },
};

export const SortedByRating: Story = {
  args: {
    stores: mockStores,
    defaultSort: 'rating',
    onSortChange: (sort) => console.log('Sort changed:', sort),
  },
};