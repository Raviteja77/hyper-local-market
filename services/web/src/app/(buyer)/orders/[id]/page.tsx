// services/web/src/app/(buyer)/orders/[id]/page.tsx
'use client';

import React from 'react';
import { BuyerLayout } from '@/components/templates';
import { OrderTracker } from '@/components/organisms';
import { Avatar, Button, Icon, Typography } from '@/components/atoms';

export default function OrderDetailsPage() {
  const orderId = 'ORD-12345';
  const orderStatus = 'out_for_delivery';

  const orderItems = [
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
    },
  ];

  const subtotal = 260;
  const deliveryFee = 20;
  const discount = 30;
  const total = 250;

  const storeInfo = {
    name: 'Sharma Kirana Store',
    address: 'Shop 12, MG Road, Sector 5',
    phone: '+91 98765 43210',
  };

  const deliveryAddress = {
    name: 'John Doe',
    address: '123 Main Street, Apartment 4B, Near Park Gate, Sector 10',
    phone: '+91 98765 12345',
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
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => console.log('Go back')}
            className="flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <Icon name="ArrowLeft" size={20} />
            <Typography variant="body" color="primary">
              Back to Orders
            </Typography>
          </button>
          <Typography variant="h2" weight="bold">
            Order Details
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Tracker */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Tracker */}
            <OrderTracker
              currentStatus={orderStatus}
              orderId={orderId}
              estimatedTime="8 mins"
              riderName="Rajesh Kumar"
              riderPhone="+91 98765 99999"
            />

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <Typography variant="h4" weight="bold" className="mb-4">
                Order Items
              </Typography>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <Icon name="Package" size={24} color="#D1D5DB" />
                      </div>
                    )}
                    <div className="flex-1">
                      <Typography variant="body" weight="semibold">
                        {item.name}
                      </Typography>
                      <Typography variant="small" color="muted">
                        Qty: {item.quantity}
                      </Typography>
                    </div>
                    <Typography variant="body" weight="medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>

            {/* Store Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <Typography variant="h4" weight="bold" className="mb-4">
                Store Information
              </Typography>
              <div className="flex items-start gap-3">
                <Avatar size="lg" fallback="SK" />
                <div className="flex-1">
                  <Typography variant="body" weight="semibold">
                    {storeInfo.name}
                  </Typography>
                  <Typography variant="small" color="muted" className="mt-1">
                    {storeInfo.address}
                  </Typography>
                  <a
                    href={`tel:${storeInfo.phone}`}
                    className="flex items-center gap-2 mt-3 text-primary hover:underline"
                  >
                    <Icon name="Phone" size={16} color="#10B981" />
                    <Typography variant="small" color="primary">
                      {storeInfo.phone}
                    </Typography>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Address */}
          <div className="lg:col-span-1 space-y-6">
            {/* Price Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <Typography variant="h4" weight="bold" className="mb-4">
                Payment Summary
              </Typography>
              <div className="space-y-3">
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
                    Total Paid
                  </Typography>
                  <Typography variant="h4" weight="bold" color="primary">
                    ₹{total.toFixed(2)}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <Typography variant="h4" weight="bold" className="mb-4">
                Delivery Address
              </Typography>
              <div className="flex items-start gap-2 mb-2">
                <Icon name="MapPin" size={20} color="#10B981" className="mt-0.5" />
                <div>
                  <Typography variant="body" weight="semibold">
                    {deliveryAddress.name}
                  </Typography>
                  <Typography variant="small" color="muted" className="mt-1">
                    {deliveryAddress.address}
                  </Typography>
                  <Typography variant="small" color="muted" className="mt-1">
                    {deliveryAddress.phone}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button variant="secondary" fullWidth>
                <Icon name="Download" size={18} className="mr-2" />
                Download Invoice
              </Button>
              <Button variant="ghost" fullWidth>
                <Icon name="HeadphonesIcon" size={18} className="mr-2" />
                Get Help
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
}