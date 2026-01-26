'use client';

import React, { useState } from 'react';
import { BuyerLayout } from '@/components/templates';
import { Button, Icon, Typography } from '@/components/atoms';
import { FormField } from '@/components/molecules';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Mock Cart Summary
  const cartTotal = {
    subtotal: 260,
    delivery: 20,
    discount: 30,
    total: 250
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order placed with:', paymentMethod);
    // Redirect to order confirmation
  };

  return (
    <BuyerLayout userName="John Doe" cartItems={[]}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Typography variant="h2" weight="bold" className="mb-8">Checkout</Typography>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Delivery Address */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="MapPin" size={24} color="#10B981" />
                <Typography variant="h4" weight="bold">Delivery Address</Typography>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Full Name" placeholder="John Doe" required />
                <FormField label="Phone Number" placeholder="+91 98765 43210" required />
                <div className="md:col-span-2">
                  <FormField label="Street Address" placeholder="Flat No, Building, Street" required />
                </div>
                <FormField label="City" placeholder="Mumbai" required />
                <FormField label="Pincode" placeholder="400001" required />
              </form>
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
                  <Typography variant="body">₹{cartTotal.subtotal}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body" color="muted">Delivery Fee</Typography>
                  <Typography variant="body">₹{cartTotal.delivery}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body" color="success">Discount</Typography>
                  <Typography variant="body" color="success">-₹{cartTotal.discount}</Typography>
                </div>
              </div>

              <div className="flex justify-between py-4">
                <Typography variant="h4" weight="bold">Total Amount</Typography>
                <Typography variant="h4" weight="bold" color="primary">₹{cartTotal.total}</Typography>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                fullWidth 
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>

              <Typography variant="caption" color="muted" align="center" className="mt-4 block">
                By placing order you agree to our Terms & Conditions
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
}
