// services/web/src/app/(buyer)/products/[id]/page.tsx
'use client';

import React, { useState } from 'react';
import { BuyerLayout } from '@/components/templates';
import { Badge, Button, Icon, Typography } from '@/components/atoms';
import { PriceDisplay, ProductCard, RatingStars } from '@/components/molecules';

export default function ProductDetailsPage() {
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: '1',
    name: 'Organic Fresh Milk',
    description: 'Premium quality organic milk sourced from local dairy farms. Rich in nutrients and free from harmful chemicals. Perfect for your daily needs.',
    price: 65,
    mrp: 75,
    discount: 13,
    category: 'Dairy',
    rating: 4.5,
    totalReviews: 128,
    inStock: true,
    unit: 'liter',
    quantity: 1,
    images: [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600',
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600',
    ],
    tags: ['Organic', 'Fresh', 'Local'],
    storeName: 'Sharma Kirana Store',
    storeDistance: 0.5,
    deliveryTime: 10,
  };

  const relatedProducts = [
    {
      id: '2',
      name: 'Greek Yogurt',
      price: 85,
      category: 'Dairy',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
      onAddToCart: (id: string) => console.log('Add to cart:', id),
    },
    {
      id: '3',
      name: 'Cottage Cheese',
      price: 120,
      category: 'Dairy',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400',
      onAddToCart: (id: string) => console.log('Add to cart:', id),
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const handleAddToCart = () => {
    console.log(`Add ${quantity} to cart`);
  };

  const handleBuyNow = () => {
    console.log(`Buy now ${quantity}`);
  };

  return (
    <BuyerLayout
      userName="John Doe"
      cartItems={[]}
      onCartCheckout={() => {}}
      onCartUpdateQuantity={() => {}}
      onCartRemoveItem={() => {}}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <button onClick={() => console.log('Go home')} className="text-gray-500 hover:text-primary">
            Home
          </button>
          <Icon name="ChevronRight" size={16} color="#6B7280" />
          <button onClick={() => console.log('Go to category')} className="text-gray-500 hover:text-primary">
            {product.category}
          </button>
          <Icon name="ChevronRight" size={16} color="#6B7280" />
          <Typography variant="small" color="default">
            {product.name}
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left - Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div>
            <Typography variant="h2" weight="bold" className="mb-2">
              {product.name}
            </Typography>

            <div className="flex items-center gap-4 mb-4">
              <RatingStars rating={product.rating} showValue showCount count={product.totalReviews} />
              {product.inStock ? (
                <Badge variant="success">In Stock</Badge>
              ) : (
                <Badge variant="danger">Out of Stock</Badge>
              )}
            </div>

            <PriceDisplay price={product.price} originalPrice={product.mrp} size="lg" className="mb-4" />

            <Typography variant="body" color="muted" className="mb-6">
              {product.description}
            </Typography>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="info">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <Typography variant="small" weight="medium" className="mb-2">
                Quantity
              </Typography>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                >
                  <Icon name="Minus" size={20} />
                </button>
                <Typography variant="h4" weight="medium" className="w-12 text-center">
                  {quantity}
                </Typography>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                >
                  <Icon name="Plus" size={20} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart} disabled={!product.inStock}>
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Add to Cart
              </Button>
              <Button variant="secondary" size="lg" fullWidth onClick={handleBuyNow} disabled={!product.inStock}>
                Buy Now
              </Button>
            </div>

            {/* Store Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Typography variant="small" weight="semibold">
                  Available at {product.storeName}
                </Typography>
                <button className="text-primary hover:underline text-sm">View Store</button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={16} />
                  <span>{product.storeDistance} km away</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={16} />
                  <span>{product.deliveryTime} min delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <Typography variant="h3" weight="bold" className="mb-6">
            Related Products
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
}