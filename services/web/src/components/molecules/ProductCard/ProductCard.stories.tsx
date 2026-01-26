// services/web/src/components/molecules/ProductCard/ProductCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {
    inStock: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    id: '1',
    name: 'Organic Fresh Milk',
    price: 65,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop',
    onAddToCart: (id) => console.log('Add to cart:', id),
    onCardClick: (id) => console.log('Card clicked:', id),
  },
};

export const WithDiscount: Story = {
  args: {
    id: '2',
    name: 'Whole Wheat Bread',
    price: 40,
    discount: 20,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    onAddToCart: (id) => console.log('Add to cart:', id),
  },
};

export const OutOfStock: Story = {
  args: {
    id: '3',
    name: 'Fresh Tomatoes',
    price: 30,
    category: 'Vegetables',
    inStock: false,
    image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400&h=400&fit=crop',
    onAddToCart: (id) => console.log('Add to cart:', id),
  },
};

export const NoImage: Story = {
  args: {
    id: '4',
    name: 'Premium Rice',
    price: 120,
    category: 'Grains',
    onAddToCart: (id) => console.log('Add to cart:', id),
  },
};

export const LongName: Story = {
  args: {
    id: '5',
    name: 'Organic Extra Virgin Cold Pressed Olive Oil - Premium Quality',
    price: 450,
    category: 'Oils & Ghee',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
    onAddToCart: (id) => console.log('Add to cart:', id),
  },
};

export const HighDiscount: Story = {
  args: {
    id: '6',
    name: 'Fresh Bananas',
    price: 50,
    discount: 50,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop',
    onAddToCart: (id) => console.log('Add to cart:', id),
  },
};