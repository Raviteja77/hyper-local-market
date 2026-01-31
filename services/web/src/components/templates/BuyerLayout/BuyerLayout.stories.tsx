// services/web/src/components/templates/BuyerLayout/BuyerLayout.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BuyerLayout } from './BuyerLayout';
import { ProductGrid } from '../../organisms';

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
];

const mockCartItems = [
  {
    id: '1',
    name: 'Organic Fresh Milk',
    price: 65,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200',
  },
];

const meta: Meta<typeof BuyerLayout> = {
  title: 'Templates/BuyerLayout',
  component: BuyerLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BuyerLayout>;

export const Default: Story = {
  args: {
    userName: 'John Doe',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    cartItems: mockCartItems,
    cartSubtotal: 130,
    cartDeliveryFee: 15,
    activeRoute: 'home',
    onSearch: (query) => console.log('Search:', query),
    onCartCheckout: () => console.log('Checkout'),
    onCartUpdateQuantity: (id, qty) => console.log('Update:', id, qty),
    onCartRemoveItem: (id) => console.log('Remove:', id),
    onNavClick: (route) => console.log('Nav clicked:', route),
    children: (
      <div className="px-4 py-8">
        <ProductGrid products={mockProducts} title="Featured Products" />
      </div>
    ),
  },
};

export const HomeLayout: Story = {
  args: {
    userName: 'John Doe',
    cartItems: [],
    activeRoute: 'home',
    onNavClick: (route) => console.log('Nav clicked:', route),
    children: (
      <div className="px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Home Content</h1>
        <p className="text-gray-600">This is the home page layout with bottom navigation.</p>
      </div>
    ),
  },
};

export const SearchLayout: Story = {
  args: {
    userName: 'John Doe',
    cartItems: [],
    activeRoute: 'search',
    onNavClick: (route) => console.log('Nav clicked:', route),
    children: (
      <div className="px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Search Content</h1>
        <p className="text-gray-600">This is the search page layout with bottom navigation.</p>
      </div>
    ),
  },
};

export const GuestUser: Story = {
  args: {
    activeRoute: 'home',
    onSearch: (query) => console.log('Search:', query),
    onLoginClick: () => console.log('Login clicked'),
    onNavClick: (route) => console.log('Nav clicked:', route),
    children: (
      <div className="px-4 py-8">
        <ProductGrid products={mockProducts} title="Featured Products" />
      </div>
    ),
  },
};

export const WithFullCart: Story = {
  args: {
    userName: 'Jane Smith',
    cartItems: [
      ...mockCartItems,
      {
        id: '2',
        name: 'Whole Wheat Bread',
        price: 40,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200',
      },
      {
        id: '3',
        name: 'Fresh Tomatoes',
        price: 30,
        quantity: 3,
      },
    ],
    cartSubtotal: 260,
    cartDeliveryFee: 20,
    cartDiscount: 30,
    activeRoute: 'cart',
    onSearch: (query) => console.log('Search:', query),
    onCartCheckout: () => console.log('Checkout'),
    onCartUpdateQuantity: (id, qty) => console.log('Update:', id, qty),
    onCartRemoveItem: (id) => console.log('Remove:', id),
    onNavClick: (route) => console.log('Nav clicked:', route),
    children: (
      <div className="px-4 py-8">
        <ProductGrid products={mockProducts} title="Popular Today" />
      </div>
    ),
  },
};

export const WithoutFooter: Story = {
  args: {
    userName: 'Alex Kumar',
    showFooter: false,
    activeRoute: 'profile',
    onSearch: (query) => console.log('Search:', query),
    onNavClick: (route) => console.log('Nav clicked:', route),
    children: (
      <div className="px-4 py-8">
        <ProductGrid products={mockProducts} />
      </div>
    ),
  },
};