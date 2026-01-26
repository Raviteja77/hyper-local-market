// services/web/src/components/organisms/ProductGrid/ProductGrid.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProductGrid } from './ProductGrid';

const mockProducts = [
  {
    id: '1',
    name: 'Organic Fresh Milk',
    price: 65,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    onAddToCart: (id: string) => console.log('Add to cart:', id),
  },
  {
    id: '2',
    name: 'Whole Wheat Bread',
    price: 40,
    discount: 20,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    onAddToCart: (id: string) => console.log('Add to cart:', id),
  },
  {
    id: '3',
    name: 'Fresh Tomatoes',
    price: 30,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400',
    onAddToCart: (id: string) => console.log('Add to cart:', id),
  },
  {
    id: '4',
    name: 'Premium Rice',
    price: 120,
    category: 'Grains',
    onAddToCart: (id: string) => console.log('Add to cart:', id),
  },
  {
    id: '5',
    name: 'Fresh Bananas',
    price: 50,
    discount: 15,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400',
    onAddToCart: (id: string) => console.log('Add to cart:', id),
  },
  {
    id: '6',
    name: 'Greek Yogurt',
    price: 85,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    onAddToCart: (id: string) => console.log('Add to cart:', id),
  },
];

const meta: Meta<typeof ProductGrid> = {
  title: 'Organisms/ProductGrid',
  component: ProductGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ProductGrid>;

export const Default: Story = {
  args: {
    products: mockProducts,
  },
};

export const WithTitle: Story = {
  args: {
    products: mockProducts,
    title: 'Featured Products',
  },
};

export const TwoColumns: Story = {
  args: {
    products: mockProducts,
    columns: 2,
    title: 'Popular Items',
  },
};

export const ThreeColumns: Story = {
  args: {
    products: mockProducts,
    columns: 3,
  },
};

export const FiveColumns: Story = {
  args: {
    products: mockProducts,
    columns: 5,
  },
};

export const Loading: Story = {
  args: {
    products: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    products: [],
    emptyMessage: 'No products available in your area',
  },
};

export const WithLoadMore: Story = {
  args: {
    products: mockProducts,
    showLoadMore: true,
    onLoadMore: () => console.log('Load more'),
  },
};

export const LoadingMore: Story = {
  args: {
    products: mockProducts,
    showLoadMore: true,
    loadingMore: true,
  },
};