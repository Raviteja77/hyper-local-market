'use client';

import React, { useState } from 'react';
import { BuyerLayout } from '@/components/templates';
import { ProductGrid, StoreList } from '@/components/organisms';
import { Icon, Typography } from '@/components/atoms';

// Mock data
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
];

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
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  return (
    <BuyerLayout
      userName="John Doe"
      userAvatar="https://i.pravatar.cc/150?img=1"
      cartItems={[]}
      onSearch={handleSearch}
      onCartCheckout={() => console.log('Checkout')}
      onCartUpdateQuantity={(id, qty) => console.log('Update:', id, qty)}
      onCartRemoveItem={(id) => console.log('Remove:', id)}
      onProfileClick={() => console.log('Profile clicked')}
      onLogoClick={() => console.log('Logo clicked')}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <Typography variant="h1" weight="bold" className="text-white mb-4">
              Fresh Groceries from Your Local Stores
            </Typography>
            <Typography variant="h4" className="text-white opacity-90 mb-6">
              Get your daily essentials delivered in 10 minutes from nearby kirana stores
            </Typography>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={24} color="white" />
                <Typography variant="body" className="text-white">
                  10-min delivery
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={24} color="white" />
                <Typography variant="body" className="text-white">
                  Fresh quality
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Heart" size={24} color="white" />
                <Typography variant="body" className="text-white">
                  Support local
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Stores */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <StoreList stores={mockStores} />
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
        <ProductGrid
          products={mockProducts}
          title="Popular Products"
          columns={4}
        />
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <Typography variant="h3" weight="bold" className="mb-6">
          Shop by Category
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Beverages', 'Snacks'].map((category) => (
            <button
              key={category}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Package" size={32} color="#10B981" />
              </div>
              <Typography variant="body" weight="medium">
                {category}
              </Typography>
            </button>
          ))}
        </div>
      </section>
    </BuyerLayout>
  );
}