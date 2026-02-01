// services/web/src/app/(buyer)/products/[id]/page.tsx
'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Heart, Plus, Minus } from 'lucide-react';
import { BuyerLayout } from '@/components/templates';
import { Button, Typography } from '@/components/atoms';
import { PriceDisplay } from '@/components/molecules';
import { PRODUCT_SECTIONS } from '@/lib/mockData/buyerMock';
import { useCartStore, useAuthStore, useUIStore } from '@/store';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user } = useAuthStore();
  const { items: cartItems, addItem, updateQuantity } = useCartStore();
  const { showToast } = useUIStore();
  const [isFavorite, setIsFavorite] = useState(false);

  // Find product from mock data
  const allProducts = PRODUCT_SECTIONS.flatMap(section => section.products);
  const product = allProducts.find(p => p.id === resolvedParams.id);

  // Get cart quantity for this product
  const cartItem = cartItems.find(item => item.productId === resolvedParams.id);
  const inCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  if (!product) {
    return (
      <BuyerLayout userName={user?.name} cartItems={cartItems} showFooter={false}>
        <div className="flex items-center justify-center h-screen">
          <Typography variant="h3">Product not found</Typography>
        </div>
      </BuyerLayout>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      storeId: 'store-1',
      storeName: 'Sharma Kirana Store',
    });
    
    showToast({
      type: 'success',
      message: `${product.name} added to cart`,
      duration: 2000,
    });
  };

  const handleIncrement = () => {
    if (cartItem) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (cartItem && quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else if (cartItem && quantity === 1) {
      updateQuantity(product.id, 0); // This will remove the item
    }
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  return (
    <BuyerLayout userName={user?.name} userAvatar={user?.avatar} cartItems={cartItems} showFooter={false}>
      <div className="bg-white min-h-screen pb-24">
        {/* Full-bleed Product Image */}
        <div className="relative w-full h-[40vh] bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Back Arrow Button */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={24} color="#374151" />
          </button>

          {/* Heart/Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
          >
            <Heart
              size={24}
              color={isFavorite ? '#EF4444' : '#374151'}
              fill={isFavorite ? '#EF4444' : 'none'}
            />
          </button>
        </div>

        {/* Product Details Card */}
        <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-4 py-6">
          {/* Product Name */}
          <Typography variant="h2" weight="bold" className="mb-1">
            {product.name}
          </Typography>

          {/* Weight/Unit */}
          <Typography variant="caption" color="muted" className="mb-4">
            {product.pack}
          </Typography>

          {/* Price */}
          <div className="mb-6">
            <PriceDisplay price={product.price} originalPrice={product.original} size="lg" />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Description Section */}
          <div className="mb-6">
            <Typography variant="h4" weight="semibold" className="mb-3">
              About this product
            </Typography>
            <Typography variant="body" color="muted" className="leading-relaxed">
              {product.tag ? `${product.tag}. ` : ''}
              Premium quality product sourced from trusted manufacturers. Perfect for your daily needs. 
              Highly rated by {product.reviews.toLocaleString()} customers with an average rating of {product.rating} stars.
            </Typography>
          </div>

          {/* Rating Display */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h3" weight="bold" className="text-primary">
                  {product.rating}
                </Typography>
                <Typography variant="small" color="muted">
                  {product.reviews.toLocaleString()} reviews
                </Typography>
              </div>
              <div className="text-right">
                <Typography variant="body" weight="semibold" className="text-green-600">
                  {product.discount}% OFF
                </Typography>
                <Typography variant="small" color="muted">
                  Save ₹{product.original - product.price}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50">
          {!inCart ? (
            // Full-width "Add to Cart" button
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              className="rounded-full"
            >
              Add to Cart
            </Button>
          ) : (
            // Quantity stepper + "Go to Cart" button
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center gap-2 bg-primary bg-opacity-10 rounded-full px-3 py-2">
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <Minus size={16} color="#10B981" />
                </button>
                <Typography variant="body" weight="semibold" className="w-8 text-center text-primary">
                  {quantity}
                </Typography>
                <button
                  onClick={handleIncrement}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} color="#10B981" />
                </button>
              </div>

              {/* Go to Cart Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleGoToCart}
                className="rounded-full"
              >
                Go to Cart →
              </Button>
            </div>
          )}
        </div>
      </div>
    </BuyerLayout>
  );
}