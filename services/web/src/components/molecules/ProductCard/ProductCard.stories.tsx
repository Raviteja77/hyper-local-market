// services/web/src/components/molecules/ProductCard/ProductCard.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

// Story 1 — "Default Card": Single card, qty=0, with all fields filled
export const DefaultCard: Story = {
  args: {
    id: '1',
    name: 'Rin Matic Top Load Detergent Liquid | Pouch',
    price: 177,
    originalPrice: 249,
    discountPercent: 72,
    packInfo: '1 pack (2 L)',
    categoryTag: 'Fresh & Fragrant',
    rating: 4.8,
    reviewCount: 29800,
    isNew: true,
    quantity: 0,
    image: 'https://picsum.photos/seed/1/200/200',
    onAdd: (id) => console.log('Add', id),
    onRemove: (id) => console.log('Remove', id),
  },
};

// Story 2 — "In Cart (Stepper Visible)": Same card but quantity: 2
export const InCart: Story = {
  args: {
    id: '1',
    name: 'Rin Matic Top Load Detergent Liquid | Pouch',
    price: 177,
    originalPrice: 249,
    discountPercent: 72,
    packInfo: '1 pack (2 L)',
    categoryTag: 'Fresh & Fragrant',
    rating: 4.8,
    reviewCount: 29800,
    isNew: true,
    quantity: 2,
    image: 'https://picsum.photos/seed/1/200/200',
    onAdd: (id) => console.log('Add', id),
    onRemove: (id) => console.log('Remove', id),
  },
};

// Story 3 — "No Discount": price: 199, no originalPrice, no discountPercent
export const NoDiscount: Story = {
  args: {
    id: '1',
    name: 'Rin Matic Top Load Detergent Liquid | Pouch',
    price: 199,
    packInfo: '1 pack (2 L)',
    categoryTag: 'Fresh & Fragrant',
    rating: 4.8,
    reviewCount: 29800,
    isNew: false,
    quantity: 0,
    image: 'https://picsum.photos/seed/1/200/200',
    onAdd: (id) => console.log('Add', id),
    onRemove: (id) => console.log('Remove', id),
  },
};

// Story 4 — "8-Column Desktop Grid (Zepto Laundry Care)"
export const ZeptoLaundryCareGrid: Story = {
  render: function RenderProductCardGrid() {
    const [cart, setCart] = useState<Record<string, number>>({});
    
    const products = [
      {
        id: '1',
        name: 'Rin Matic Top Load Detergent Liquid | Pouch',
        price: 177,
        originalPrice: 249,
        discountPercent: 72,
        packInfo: '1 pack (2 L)',
        categoryTag: 'Fresh & Fragrant',
        rating: 4.8,
        reviewCount: 29800,
        isNew: true,
        image: 'https://picsum.photos/seed/1/200/200',
      },
      {
        id: '2',
        name: 'Surf Excel Matic Refill Pack | Tough on Dried Stains',
        price: 268,
        originalPrice: 329,
        discountPercent: 61,
        packInfo: '1 pack (2 kg)',
        categoryTag: 'Stain Removal',
        rating: 4.7,
        reviewCount: 10600,
        isNew: false,
        image: 'https://picsum.photos/seed/2/200/200',
      },
      {
        id: '3',
        name: 'Ariel Matic Liquid Detergent | Front Load',
        price: 299,
        originalPrice: 450,
        discountPercent: 66,
        packInfo: '1 bottle (2 L)',
        categoryTag: 'Deep Clean',
        rating: 4.6,
        reviewCount: 8400,
        isNew: true,
        image: 'https://picsum.photos/seed/3/200/200',
      },
      {
        id: '4',
        name: 'Tide Plus Detergent Powder | Extra Power',
        price: 189,
        originalPrice: 275,
        discountPercent: 69,
        packInfo: '1 pack (1 kg)',
        categoryTag: 'Whitening',
        rating: 4.5,
        reviewCount: 15200,
        isNew: false,
        image: 'https://picsum.photos/seed/4/200/200',
      },
      {
        id: '5',
        name: 'Comfort Fabric Conditioner | Fresh Bloom',
        price: 145,
        originalPrice: 200,
        discountPercent: 55,
        packInfo: '1 bottle (800 ml)',
        categoryTag: 'Softener',
        rating: 4.7,
        reviewCount: 6700,
        isNew: false,
        image: 'https://picsum.photos/seed/5/200/200',
      },
      {
        id: '6',
        name: 'Vanish Stain Remover | Liquid',
        price: 235,
        originalPrice: 310,
        discountPercent: 75,
        packInfo: '1 bottle (500 ml)',
        categoryTag: 'Stain Removal',
        rating: 4.8,
        reviewCount: 5300,
        isNew: true,
        image: 'https://picsum.photos/seed/6/200/200',
      },
      {
        id: '7',
        name: 'Henko Matic Detergent | Front Load',
        price: 156,
        originalPrice: 220,
        discountPercent: 64,
        packInfo: '1 pack (1 kg)',
        categoryTag: 'Fresh & Fragrant',
        rating: 4.4,
        reviewCount: 3900,
        isNew: false,
        image: 'https://picsum.photos/seed/7/200/200',
      },
      {
        id: '8',
        name: 'Godrej Ezee Liquid Detergent | Winterwear',
        price: 198,
        originalPrice: 280,
        discountPercent: 70,
        packInfo: '1 bottle (1 L)',
        categoryTag: 'Gentle Care',
        rating: 4.6,
        reviewCount: 4100,
        isNew: false,
        image: 'https://picsum.photos/seed/8/200/200',
      },
    ];

    return (
      <div className="bg-white p-6 min-h-screen">
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Laundry Care</h2>
          <a
            href="#"
            className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
          >
            See All <ChevronRight size={14} />
          </a>
        </div>
        {/* 8-column grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              {...p}
              quantity={cart[p.id] || 0}
              onAdd={() => setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }))}
              onRemove={() => setCart((c) => ({ ...c, [p.id]: Math.max(0, (c[p.id] || 1) - 1) }))}
            />
          ))}
        </div>
      </div>
    );
  },
};
