// services/web/src/components/organisms/StoreList/StoreList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { StoreList } from './StoreList';

const mockStores = [
  {
    id: '1',
    name: 'Sharma Kirana Store',
    distance: 0.5,
    eta: 10,
    rating: 4.5,
    address: 'Shop 12, MG Road, Sector 5',
    onStoreClick: (id: string) => console.log('Store clicked:', id),
  },
  {
    id: '2',
    name: 'Fresh Mart',
    distance: 1.2,
    eta: 15,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200',
    address: 'Building 7A, Park Street',
    onStoreClick: (id: string) => console.log('Store clicked:', id),
  },
  {
    id: '3',
    name: 'City Grocers',
    distance: 2.0,
    eta: 20,
    rating: 4.2,
    isOpen: false,
    address: 'Main Market, Block C',
    onStoreClick: (id: string) => console.log('Store clicked:', id),
  },
  {
    id: '4',
    name: 'Quick Stop Store',
    distance: 0.8,
    eta: 12,
    rating: 4.6,
    address: '45 Link Road',
    onStoreClick: (id: string) => console.log('Store clicked:', id),
  },
  {
    id: '5',
    name: 'Corner Shop',
    distance: 0.2,
    eta: 5,
    rating: 4.0,
    address: 'Near Park Gate',
    onStoreClick: (id: string) => console.log('Store clicked:', id),
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