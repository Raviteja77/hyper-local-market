'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BuyerLayout } from '@/components/templates';
import { CategoryBar, LocationModal, PromoBannerCarousel } from '@/components/organisms';
import { Badge, Typography } from '@/components/atoms';
import { PriceDisplay, RatingStars } from '@/components/molecules';
import { CATEGORIES, PRODUCT_SECTIONS, PROMO_BANNERS, Product } from '@/lib/mockData/buyerMock';
import { useCartStore, useAuthStore, useUIStore } from '@/store';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { items: cartItems, addItem } = useCartStore();
  const { showToast } = useUIStore();
  const [searchValue, setSearchValue] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('Koramangala, Bengaluru');

  // Derive cart count from store
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    // Add product to cart using store
    addItem({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      storeId: 'store-1', // Mock store ID
      storeName: 'Sharma Kirana Store', // Mock store name
    });
    
    // Show success toast
    showToast({
      type: 'success',
      message: `${product.name} added to cart`,
      duration: 2000,
    });
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
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
    if (route === 'home') {
      router.push('/');
    } else if (route === 'search') {
      // Future: Navigate to search page
      showToast({ type: 'info', message: 'Search page coming soon!' });
    } else if (route === 'profile') {
      router.push('/profile');
    }
  };

  return (
    <>
      <BuyerLayout
        userName={user?.name}
        userAvatar={user?.avatar}
        cartItems={cartItems}
        cartCount={totalCartCount}
        address={currentAddress}
        onAddressClick={() => setLocationModalOpen(true)}
        onSearch={handleSearch}
        onCartCheckout={() => router.push('/checkout')}
        onCartUpdateQuantity={(id, qty) => console.log('Update:', id, qty)}
        onCartRemoveItem={(id) => console.log('Remove:', id)}
        onLoginClick={() => router.push('/login')}
        onProfileClick={() => router.push('/profile')}
        onLogoClick={() => router.push('/')}
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

        {/* 3. PROMO BANNER CAROUSEL */}
        <PromoBannerCarousel banners={PROMO_BANNERS} autoPlayInterval={4000} />

        {/* Product Sections */}
        <div className="px-4 py-6 space-y-8">
          {PRODUCT_SECTIONS.map((section) => (
            <section key={section.title}>
              <Typography variant="h3" weight="bold" className="mb-4">
                {section.title}
              </Typography>

              {/* Horizontal scrollable product grid */}
              {/* scrollbar-hide utility defined in tailwind.config.ts */}
              <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
                  {section.products.map((product) => {
                    const cartItem = cartItems.find(item => item.productId === product.id);
                    const cartQuantity = cartItem?.quantity || 0;
                    
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onProductClick={handleProductClick}
                        cartQuantity={cartQuantity}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </BuyerLayout>

    <LocationModal
      isOpen={locationModalOpen}
      onClose={() => setLocationModalOpen(false)}
      onSelectLocation={setCurrentAddress}
      currentLocation={currentAddress}
    />
  </>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (productId: string) => void;
  cartQuantity: number;
}

function ProductCard({ product, onAddToCart, onProductClick, cartQuantity }: ProductCardProps) {
  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-3 w-40 flex-shrink-0 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onProductClick(product.id)}
    >
      {/* Product Image */}
      <div className="relative mb-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-cover rounded-md"
        />
        {product.isNew && (
          <div className="absolute top-1 left-1">
            <Badge variant="info">
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
        <Typography variant="caption" weight="medium" className="line-clamp-2 text-xs leading-tight h-8">
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
            <Badge variant="discount" className="text-xs">
              {product.discount}% OFF
            </Badge>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1">
          <RatingStars rating={product.rating} size="sm" />
          <Typography variant="caption" color="muted" className="text-xs">
            ({product.reviews.toLocaleString()})
          </Typography>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when clicking button
            onAddToCart(product);
          }}
          className="w-full mt-2 bg-primary hover:bg-primary-hover text-white text-xs font-medium py-1.5 px-3 rounded-md transition-colors"
        >
          {cartQuantity > 0 ? `In Cart (${cartQuantity})` : 'Add'}
        </button>
      </div>
    </div>
  );
}