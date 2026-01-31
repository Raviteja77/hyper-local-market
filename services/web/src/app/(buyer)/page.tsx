'use client';

import React, { useState } from 'react';
import { BuyerLayout } from '@/components/templates';
import { CategoryBar } from '@/components/organisms';
import { Badge, Typography } from '@/components/atoms';
import { PriceDisplay, RatingStars } from '@/components/molecules';
import { CATEGORIES, PRODUCT_SECTIONS, Product } from '@/lib/mockData/buyerMock';

export default function HomePage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [searchValue, setSearchValue] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Derive cart count
  const totalCartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const handleAddToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleSearch = (query: string) => {
    setSearchValue(query);
    console.log('Searching for:', query);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    console.log('Category changed:', categoryId);
  };

  const handleNavClick = (route: string) => {
    console.log('Nav clicked:', route);
  };

  return (
    <BuyerLayout
      userName="John Doe"
      cartItems={[]}
      cartCount={totalCartCount}
      onSearch={handleSearch}
      onCartCheckout={() => console.log('Checkout')}
      onCartUpdateQuantity={(id, qty) => console.log('Update:', id, qty)}
      onCartRemoveItem={(id) => console.log('Remove:', id)}
      onProfileClick={() => console.log('Profile clicked')}
      onLogoClick={() => console.log('Logo clicked')}
      activeRoute="home"
      onNavClick={handleNavClick}
      showFooter={false}
    >
      {/* White page - no red gradient */}
      <div className="bg-white min-h-screen">
        {/* Category Bar */}
        <CategoryBar
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryChange}
        />

        {/* Product Sections */}
        <div className="px-4 py-6 space-y-8">
          {PRODUCT_SECTIONS.map((section) => (
            <section key={section.title}>
              <Typography variant="h3" weight="bold" className="mb-4">
                {section.title}
              </Typography>

              {/* Horizontal scrollable product grid */}
              <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
                  {section.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      cartQuantity={cart[product.id] || 0}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </BuyerLayout>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  cartQuantity: number;
}

function ProductCard({ product, onAddToCart, cartQuantity }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 w-40 flex-shrink-0 hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="relative mb-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-cover rounded-md"
        />
        {product.isNew && (
          <div className="absolute top-1 left-1">
            <Badge variant="info" size="sm">
              NEW
            </Badge>
          </div>
        )}
        {product.tag && (
          <div className="absolute bottom-1 left-1 right-1">
            <div className="bg-white bg-opacity-90 rounded px-1.5 py-0.5">
              <Typography variant="caption" className="text-xs text-primary">
                {product.tag}
              </Typography>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        {/* Name (truncated to 2 lines) */}
        <Typography variant="small" weight="medium" className="line-clamp-2 text-xs leading-tight h-8">
          {product.name}
        </Typography>

        {/* Pack Size */}
        <Typography variant="caption" color="muted" className="text-xs">
          {product.pack}
        </Typography>

        {/* Price */}
        <div className="flex items-center gap-1">
          <Typography variant="body" weight="bold" className="text-sm">
            ₹{product.price}
          </Typography>
          <Typography variant="caption" color="muted" className="text-xs line-through">
            ₹{product.original}
          </Typography>
        </div>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="inline-block">
            <Badge variant="success" size="sm" className="text-xs">
              {product.discount}% OFF
            </Badge>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1">
          <RatingStars rating={product.rating} size="sm" showValue={false} />
          <Typography variant="caption" color="muted" className="text-xs">
            ({product.reviews.toLocaleString()})
          </Typography>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product.id)}
          className="w-full mt-2 bg-primary hover:bg-primary-hover text-white text-xs font-medium py-1.5 px-3 rounded-md transition-colors"
        >
          {cartQuantity > 0 ? `Added (${cartQuantity})` : 'Add'}
        </button>
      </div>
    </div>
  );
}