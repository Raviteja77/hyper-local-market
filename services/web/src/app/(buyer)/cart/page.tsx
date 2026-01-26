'use client';

import React, { useState } from 'react';
import { BuyerLayout } from '@/components/templates';
import { Button, Icon, Input,Typography } from '@/components/atoms';
import { PriceDisplay } from '@/components/molecules';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Organic Fresh Milk',
      price: 65,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200',
    },
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
      image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=200',
    },
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 20;
  const discount = appliedCoupon ? 30 : 0;
  const total = subtotal + deliveryFee - discount;

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'save30') {
      setAppliedCoupon(couponCode);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout');
    // router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <BuyerLayout
        userName="John Doe"
        cartItems={[]}
        onCartCheckout={() => {}}
        onCartUpdateQuantity={() => {}}
        onCartRemoveItem={() => {}}
      >
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <Icon name="ShoppingCart" size={80} color="#D1D5DB" className="mx-auto mb-6" />
            <Typography variant="h2" weight="bold" className="mb-2">
              Your Cart is Empty
            </Typography>
            <Typography variant="body" color="muted" className="mb-6">
              Start adding items to your cart to see them here
            </Typography>
            <Button variant="primary" size="lg" onClick={() => console.log('Go to home')}>
              Start Shopping
            </Button>
          </div>
        </div>
      </BuyerLayout>
    );
  }

  return (
    <BuyerLayout
      userName="John Doe"
      cartItems={cartItems}
      cartSubtotal={subtotal}
      cartDeliveryFee={deliveryFee}
      cartDiscount={discount}
      onCartCheckout={handleCheckout}
      onCartUpdateQuantity={handleUpdateQuantity}
      onCartRemoveItem={handleRemoveItem}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Typography variant="h2" weight="bold" className="mb-8">
          Shopping Cart
        </Typography>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex gap-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                      <Icon name="Package" size={32} color="#D1D5DB" />
                    </div>
                  )}

                  <div className="flex-1">
                    <Typography variant="h4" weight="semibold" className="mb-2">
                      {item.name}
                    </Typography>
                    <PriceDisplay price={item.price} size="md" />

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Icon name="Minus" size={16} />
                        </button>
                        <Typography variant="body" weight="medium" className="w-8 text-center">
                          {item.quantity}
                        </Typography>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Icon name="Plus" size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-auto text-danger hover:bg-red-50 p-2 rounded"
                      >
                        <Icon name="Trash2" size={20} color="#EF4444" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <Typography variant="h4" weight="bold" className="mb-4">
                Order Summary
              </Typography>

              {/* Coupon */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={!!appliedCoupon}
                  />
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handleApplyCoupon}
                    disabled={!!appliedCoupon}
                  >
                    Apply
                  </Button>
                </div>
                {appliedCoupon && (
                  <Typography variant="small" color="success" className="mt-1">
                    Coupon "{appliedCoupon}" applied!
                  </Typography>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 py-4 border-y border-gray-200">
                <div className="flex justify-between">
                  <Typography variant="body" color="muted">
                    Subtotal
                  </Typography>
                  <Typography variant="body">₹{subtotal.toFixed(2)}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body" color="muted">
                    Delivery Fee
                  </Typography>
                  <Typography variant="body">₹{deliveryFee.toFixed(2)}</Typography>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <Typography variant="body" color="success">
                      Discount
                    </Typography>
                    <Typography variant="body" color="success">
                      -₹{discount.toFixed(2)}
                    </Typography>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <Typography variant="h4" weight="bold">
                    Total
                  </Typography>
                  <Typography variant="h4" weight="bold" color="primary">
                    ₹{total.toFixed(2)}
                  </Typography>
                </div>
              </div>

              <Button variant="primary" size="lg" fullWidth className="mt-6" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
}