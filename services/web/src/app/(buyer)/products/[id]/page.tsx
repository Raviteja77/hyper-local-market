// services/web/src/app/(buyer)/products/[id]/page.tsx
'use client';

import React, { useState } from 'react';
import { ChevronLeft, Heart, Plus, Minus } from 'lucide-react';
import { BuyerLayout } from '@/components/templates';
import { Button, Typography } from '@/components/atoms';
import { PriceDisplay } from '@/components/molecules';

export default function ProductDetailsPage() {
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = {
    id: '1',
    name: 'Organic Fresh Milk',
    weight: '1 Liter',
    description:
      'Premium quality organic milk sourced from local dairy farms. Rich in nutrients and free from harmful chemicals. Perfect for your daily needs. Fresh and pasteurized for maximum health benefits.',
    price: 65,
    mrp: 75,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=600&fit=crop',
    nutrition: {
      calories: '150 kcal',
      protein: '8g',
      fat: '8g',
      carbs: '12g',
    },
  };

  const handleAddToCart = () => {
    setInCart(true);
    setQuantity(1);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      setInCart(false);
      setQuantity(0);
    }
  };

  const handleGoToCart = () => {
    console.log('Go to cart');
  };

  return (
    <BuyerLayout userName="John Doe" cartItems={[]} showFooter={false}>
      <div className="bg-white min-h-screen pb-24">
        {/* Full-bleed Product Image */}
        <div className="relative w-full h-[40vh] bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Back Arrow Button */}
          <button
            onClick={() => console.log('Go back')}
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
          <Typography variant="small" color="muted" className="mb-4">
            {product.weight}
          </Typography>

          {/* Price */}
          <div className="mb-6">
            <PriceDisplay price={product.price} originalPrice={product.mrp} size="lg" />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Description Section */}
          <div className="mb-6">
            <Typography variant="h4" weight="semibold" className="mb-3">
              About this product
            </Typography>
            <Typography variant="body" color="muted" className="leading-relaxed">
              {product.description}
            </Typography>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Nutrition Info */}
          {product.nutrition && (
            <div className="mb-6">
              <Typography variant="h4" weight="semibold" className="mb-3">
                Nutrition Information
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <Typography variant="caption" color="muted" className="text-xs">
                    Calories
                  </Typography>
                  <Typography variant="body" weight="medium">
                    {product.nutrition.calories}
                  </Typography>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <Typography variant="caption" color="muted" className="text-xs">
                    Protein
                  </Typography>
                  <Typography variant="body" weight="medium">
                    {product.nutrition.protein}
                  </Typography>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <Typography variant="caption" color="muted" className="text-xs">
                    Fat
                  </Typography>
                  <Typography variant="body" weight="medium">
                    {product.nutrition.fat}
                  </Typography>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <Typography variant="caption" color="muted" className="text-xs">
                    Carbs
                  </Typography>
                  <Typography variant="body" weight="medium">
                    {product.nutrition.carbs}
                  </Typography>
                </div>
              </div>
            </div>
          )}
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