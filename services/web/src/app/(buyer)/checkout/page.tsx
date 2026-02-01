'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BuyerLayout } from '@/components/templates';
import { Button, Icon, Typography } from '@/components/atoms';
import { FormField } from '@/components/molecules';
import { useCartStore, useAuthStore, useOrderStore, useUIStore } from '@/store';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { items: cartItems, subtotal, deliveryFee, discount, total, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const { showToast } = useUIStore();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    pincode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.pincode) {
      showToast({
        type: 'error',
        message: 'Please fill in all required fields',
      });
      return;
    }

    if (cartItems.length === 0) {
      showToast({
        type: 'error',
        message: 'Your cart is empty',
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create order
      const orderId = `ORD-${Date.now()}`;
      const order = {
        id: `order-${Date.now()}`,
        orderId,
        status: 'pending' as const,
        items: cartItems.map(item => ({
          id: item.id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        deliveryFee,
        discount,
        total,
        storeId: cartItems[0]?.storeId || 'store-1',
        storeName: cartItems[0]?.storeName || 'Sharma Kirana Store',
        storeAddress: 'Shop 12, MG Road, Sector 5',
        deliveryAddress: {
          name: deliveryAddress.name,
          phone: deliveryAddress.phone,
          address: `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.pincode}`,
        },
        estimatedTime: '10-15 mins',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add order to store
      addOrder(order);

      // Clear cart
      clearCart();

      // Show success message
      showToast({
        type: 'success',
        message: 'Order placed successfully!',
      });

      // Navigate to order detail page
      router.push(`/orders/${orderId}`);
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Failed to place order. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <BuyerLayout userName={user?.name} userAvatar={user?.avatar} cartItems={cartItems} showFooter={false}>
        <div className="flex flex-col items-center justify-center h-screen px-4">
          <Typography variant="h3" className="mb-4">Your cart is empty</Typography>
          <Button variant="primary" onClick={() => router.push('/')}>
            Continue Shopping
          </Button>
        </div>
      </BuyerLayout>
    );
  }

  return (
    <BuyerLayout userName={user?.name} userAvatar={user?.avatar} cartItems={cartItems}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Typography variant="h2" weight="bold" className="mb-8">Checkout</Typography>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Forms */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Delivery Address */}
              <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="MapPin" size={24} color="#10B981" />
                  <Typography variant="h4" weight="bold">Delivery Address</Typography>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField 
                    label="Full Name" 
                    name="name"
                    placeholder="John Doe" 
                    value={deliveryAddress.name}
                    onChange={handleChange}
                    required 
                  />
                  <FormField 
                    label="Phone Number" 
                    name="phone"
                    placeholder="+91 98765 43210" 
                    value={deliveryAddress.phone}
                    onChange={handleChange}
                    required 
                  />
                  <div className="md:col-span-2">
                    <FormField 
                      label="Street Address" 
                      name="street"
                      placeholder="Flat No, Building, Street" 
                      value={deliveryAddress.street}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <FormField 
                    label="City" 
                    name="city"
                    placeholder="Mumbai" 
                    value={deliveryAddress.city}
                    onChange={handleChange}
                    required 
                  />
                  <FormField 
                    label="Pincode" 
                    name="pincode"
                    placeholder="400001" 
                    value={deliveryAddress.pincode}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="CreditCard" size={24} color="#3B82F6" />
                  <Typography variant="h4" weight="bold">Payment Method</Typography>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'upi', label: 'UPI (Google Pay, PhonePe)', icon: 'Smartphone' },
                    { id: 'card', label: 'Credit / Debit Card', icon: 'CreditCard' },
                    { id: 'cod', label: 'Cash on Delivery', icon: 'Banknote' },
                  ].map((method) => (
                    <label 
                      key={method.id}
                      className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id ? 'border-primary bg-green-50' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <Icon name={method.icon as any} size={20} color="#4B5563" />
                      <Typography variant="body" weight="medium">{method.label}</Typography>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
                <Typography variant="h4" weight="bold" className="mb-4">Order Summary</Typography>
                
                <div className="space-y-3 py-4 border-y border-gray-200">
                  <div className="flex justify-between">
                    <Typography variant="body" color="muted">Items Total</Typography>
                    <Typography variant="body">₹{subtotal.toFixed(2)}</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="body" color="muted">Delivery Fee</Typography>
                    <Typography variant="body">₹{deliveryFee.toFixed(2)}</Typography>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <Typography variant="body" color="success">Discount</Typography>
                      <Typography variant="body" color="success">-₹{discount.toFixed(2)}</Typography>
                    </div>
                  )}
                </div>

                <div className="flex justify-between py-4">
                  <Typography variant="h4" weight="bold">Total Amount</Typography>
                  <Typography variant="h4" weight="bold" color="primary">₹{total.toFixed(2)}</Typography>
                </div>

                <Button 
                  type="submit"
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </Button>

                <Typography variant="caption" color="muted" className="mt-4 block text-center">
                  By placing order you agree to our Terms & Conditions
                </Typography>
              </div>
            </div>
          </div>
        </form>
      </div>
    </BuyerLayout>
  );
}
