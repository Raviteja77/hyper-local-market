'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BuyerLayout } from '@/components/templates';
import { Button, Icon, Input, Typography } from '@/components/atoms';
import { PriceDisplay } from '@/components/molecules';
import { useCartStore, useAuthStore, useUIStore } from '@/store';

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { showToast } = useUIStore();
  const { 
    items: cartItems, 
    subtotal, 
    deliveryFee, 
    discount, 
    total,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    couponCode: appliedCoupon,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState('');

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      // Mock coupon validation - in real app, this would be an API call
      if (couponCode.toUpperCase() === 'SAVE30') {
        applyCoupon(couponCode, 30);
        setCouponCode('');
      } else {
        showToast({
          type: 'error',
          message: 'Invalid coupon code. Try "SAVE30"',
        });
      }
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
  };

  const handleCheckout = () => {
    if (!user) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }
    router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <BuyerLayout userName={user?.name} userAvatar={user?.avatar} cartItems={[]}>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ShoppingCart" size={48} color="#D1D5DB" />
            </div>
            <Typography variant="h2" weight="bold" className="mb-2">
              Your Cart is Empty
            </Typography>
            <Typography variant="body" color="muted" className="mb-6">
              Start adding items to your cart to see them here
            </Typography>
            <Button variant="primary" size="lg" onClick={() => router.push('/')}>
              Start Shopping
            </Button>
          </div>
        </div>
      </BuyerLayout>
    );
  }

  return (
    <BuyerLayout userName={user?.name} userAvatar={user?.avatar} cartItems={cartItems}>
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
                    <Typography variant="h4" weight="semibold" className="mb-1">
                      {item.name}
                    </Typography>
                    {item.storeName && (
                      <Typography variant="caption" color="muted" className="mb-2">
                        {item.storeName}
                      </Typography>
                    )}
                    <PriceDisplay currentPrice={item.price} size="md" />

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Icon name="Minus" size={16} />
                        </button>
                        <Typography variant="body" weight="medium" className="w-8 text-center">
                          {item.quantity}
                        </Typography>
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                        >
                          <Icon name="Plus" size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="ml-auto text-danger hover:bg-red-50 p-2 rounded flex items-center gap-1"
                      >
                        <Icon name="Trash2" size={20} color="#EF4444" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <Typography variant="body" weight="bold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </Typography>
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
                <Typography variant="body" weight="medium" className="mb-2">
                  Have a coupon?
                </Typography>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                    <Typography variant="caption" className="text-success">
                      Coupon "{appliedCoupon}" applied!
                    </Typography>
                    <button onClick={handleRemoveCoupon} className="text-error">
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button variant="secondary" onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </div>
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
                    <Typography variant="body" className="text-success">
                      Discount
                    </Typography>
                    <Typography variant="body" className="text-success">
                      -₹{discount.toFixed(2)}
                    </Typography>
                  </div>
                )}
              </div>

              <div className="flex justify-between py-4">
                <Typography variant="h4" weight="bold">
                  Total
                </Typography>
                <Typography variant="h4" weight="bold" color="primary">
                  ₹{total.toFixed(2)}
                </Typography>
              </div>

              <Button variant="primary" size="lg" fullWidth onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
}