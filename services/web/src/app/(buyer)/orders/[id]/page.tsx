// services/web/src/app/(buyer)/orders/[id]/page.tsx
'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { BuyerLayout } from '@/components/templates';
import { OrderTracker } from '@/components/organisms';
import { Avatar, Button, Icon, Typography } from '@/components/atoms';
import { useOrderStore, useAuthStore } from '@/store';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user } = useAuthStore();
  const { getOrderById } = useOrderStore();
  
  const order = getOrderById(resolvedParams.id);

  if (!order) {
    return (
      <BuyerLayout userName={user?.name} userAvatar={user?.avatar} cartItems={[]}>
        <div className="flex flex-col items-center justify-center h-screen px-4">
          <Typography variant="h3" className="mb-4">Order not found</Typography>
          <Button variant="primary" onClick={() => router.push('/orders')}>
            View All Orders
          </Button>
        </div>
      </BuyerLayout>
    );
  }

  return (
    <BuyerLayout
      userName={user?.name}
      userAvatar={user?.avatar}
      cartItems={[]}
      showFooter={false}
    >
      <div className="px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <Icon name="ArrowLeft" size={20} />
              <Typography variant="body" color="primary">
                Back
              </Typography>
            </button>
            <Typography variant="h3" weight="bold" className="flex-1 text-center -ml-16">
              Order #{order.orderId}
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Tracker */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Tracker */}
            <OrderTracker
              currentStatus={order.status}
              orderId={order.orderId}
              estimatedTime={order.estimatedTime}
              riderName={order.riderName}
              riderPhone={order.riderPhone}
            />

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <Typography variant="h4" weight="bold" className="mb-4">
                Order Items
              </Typography>
              <div className="space-y-4">
                {order.items.map((item) => (
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
                      <Typography variant="caption" color="muted">
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
                    {order.storeName}
                  </Typography>
                  <Typography variant="caption" color="muted" className="mt-1">
                    {order.storeAddress}
                  </Typography>
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
                  <Typography variant="body">₹{order.subtotal.toFixed(2)}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body" color="muted">
                    Delivery Fee
                  </Typography>
                  <Typography variant="body">₹{order.deliveryFee.toFixed(2)}</Typography>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between">
                    <Typography variant="body" color="success">
                      Discount
                    </Typography>
                    <Typography variant="body" color="success">
                      -₹{order.discount.toFixed(2)}
                    </Typography>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <Typography variant="h4" weight="bold">
                    Total Paid
                  </Typography>
                  <Typography variant="h4" weight="bold" color="primary">
                    ₹{order.total.toFixed(2)}
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
                    {order.deliveryAddress.name}
                  </Typography>
                  <Typography variant="caption" color="muted" className="mt-1">
                    {order.deliveryAddress.address}
                  </Typography>
                  <Typography variant="caption" color="muted" className="mt-1">
                    {order.deliveryAddress.phone}
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
            </div>
          </div>
        </div>

        {/* Need help? link */}
        <div className="text-center mt-8">
          <button onClick={() => console.log('Need help')} className="text-primary hover:underline">
            Need help?
          </Button>
        </div>
      </div>
    </BuyerLayout>
  );
}