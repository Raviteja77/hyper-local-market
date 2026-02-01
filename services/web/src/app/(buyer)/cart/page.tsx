'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BuyerLayout } from '@/components/templates';
import { Button, Icon, Input, Typography } from '@/components/atoms';
import { PriceDisplay } from '@/components/molecules';
import { useCartStore, useAuthStore } from '@/store';

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuthStore();
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
        alert('Invalid coupon code. Try "SAVE30"');
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

  return (
    <BuyerLayout userName={user?.name} userAvatar={user?.avatar} cartItems={cartItems}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Typography variant="h2" weight="bold" className="mb-6">Shopping Cart</Typography>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ShoppingCart" size={32} color="#9CA3AF" />
            </div>
            <Typography variant="h4" weight="medium" className="mb-2">Your cart is empty</Typography>
            <Button variant="primary" onClick={() => router.push('/')}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
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
                    <Typography variant="body" weight="semibold" className="mb-1">
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="muted" className="mb-2">
                      {item.storeName}
                    </Typography>
                    <PriceDisplay price={item.price} size="sm" />

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2 border border-gray-300 rounded">
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-50"
                        >
                          <Icon name="Minus" size={16} />
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-50"
                        >
                          <Icon name="Plus" size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-error hover:underline flex items-center gap-1"
                      >
                        <Icon name="Trash2" size={16} color="#EF4444" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <Typography variant="body" weight="bold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                <Typography variant="h4" weight="bold" className="mb-4">Order Summary</Typography>

                <div className="space-y-3 py-4 border-y border-gray-200">
                  <div className="flex justify-between">
                    <Typography variant="body" color="muted">Subtotal</Typography>
                    <Typography variant="body">₹{subtotal.toFixed(2)}</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="body" color="muted">Delivery Fee</Typography>
                    <Typography variant="body">₹{deliveryFee.toFixed(2)}</Typography>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <Typography variant="body" className="text-success">Discount</Typography>
                      <Typography variant="body" className="text-success">-₹{discount.toFixed(2)}</Typography>
                    </div>
                  )}
                </div>

                <div className="flex justify-between py-4">
                  <Typography variant="h4" weight="bold">Total</Typography>
                  <Typography variant="h4" weight="bold" color="primary">₹{total.toFixed(2)}</Typography>
                </div>

                {/* Coupon Code */}
                <div className="mb-4">
                  <Typography variant="body" weight="medium" className="mb-2">Have a coupon?</Typography>
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

                <Button variant="primary" size="lg" fullWidth onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BuyerLayout>
  );
}
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
                  <Typography variant="caption" className="mt-1 text-success">
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