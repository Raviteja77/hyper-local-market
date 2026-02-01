'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BuyerLayout } from '@/components/templates';
import { Button, Icon, Typography, Badge } from '@/components/atoms';
import { useOrderStore, useAuthStore } from '@/store';

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { orders } = useOrderStore();

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'pending':
      case 'processing':
      case 'out_for_delivery':
        return 'warning';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Confirmed';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <BuyerLayout userName={user?.name} userAvatar={user?.avatar} cartItems={[]} activeRoute="profile">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <Icon name="ArrowLeft" size={20} />
          </button>
          <Typography variant="h2" weight="bold">My Orders</Typography>
        </div>

        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShoppingBag" size={32} color="#9CA3AF" />
              </div>
              <Typography variant="h4" weight="medium" className="mb-2">No orders yet</Typography>
              <Typography variant="body" color="muted" className="mb-4">Start shopping to see your orders here</Typography>
              <Button variant="primary" onClick={() => router.push('/')}>Start Shopping</Button>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <Typography variant="h4" weight="bold">#{order.orderId}</Typography>
                      <Badge variant={getStatusVariant(order.status) as any} size="sm">
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                    <Typography variant="caption" color="muted">
                      Placed on {formatDate(order.createdAt)}
                    </Typography>
                  </div>
                  <div className="text-right">
                    <Typography variant="h4" weight="bold" color="primary">
                      ₹{order.total.toFixed(2)}
                    </Typography>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <Typography variant="body" weight="medium" className="mb-1">
                    {order.storeName}
                  </Typography>
                  <Typography variant="body" color="muted" className="line-clamp-1">
                    {order.items.map((item, index) => 
                      `${item.name} (${item.quantity})${index < order.items.length - 1 ? ', ' : ''}`
                    )}
                  </Typography>
                </div>

                <div className="flex justify-end">
                  <Link href={`/orders/${order.orderId}`}>
                    <Button variant="secondary" size="sm" className="flex items-center gap-2">
                      View Details
                      <Icon name="ChevronRight" size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </BuyerLayout>
  );
}
