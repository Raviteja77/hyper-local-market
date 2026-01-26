'use client';

import React from 'react';
import Link from 'next/link';
import { BuyerLayout } from '@/components/templates';
import { Button, Icon, Typography, Badge } from '@/components/atoms';

export default function OrdersPage() {
  // Mock Data - Replace with API call
  const orders = [
    {
      id: 'ORD-2023-1001',
      date: 'Oct 24, 2023',
      status: 'Delivered',
      total: 250,
      items: 'Organic Fresh Milk (2), Whole Wheat Bread (1)',
      store: 'Sharma Kirana Store'
    },
    {
      id: 'ORD-2023-1002',
      date: 'Oct 20, 2023',
      status: 'Processing',
      total: 450,
      items: 'Basmati Rice (1kg), Toor Dal (500g), Spices',
      store: 'Apna Supermarket'
    },
    {
      id: 'ORD-2023-1003',
      date: 'Oct 15, 2023',
      status: 'Cancelled',
      total: 120,
      items: 'Curd (500g), Butter (100g)',
      store: 'Sharma Kirana Store'
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'processing': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <BuyerLayout userName="John Doe" cartItems={[]}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Typography variant="h2" weight="bold" className="mb-6">My Orders</Typography>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <Typography variant="h4" weight="bold">#{order.id}</Typography>
                    <Badge variant={getStatusVariant(order.status) as any} size="sm">{order.status}</Badge>
                  </div>
                  <Typography variant="small" color="muted">Placed on {order.date}</Typography>
                </div>
                <div className="text-right">
                  <Typography variant="h4" weight="bold" color="primary">₹{order.total}</Typography>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <Typography variant="body" weight="medium" className="mb-1">{order.store}</Typography>
                <Typography variant="body" color="muted" className="line-clamp-1">{order.items}</Typography>
              </div>

              <div className="flex justify-end">
                <Link href={`/orders/${order.id}`}>
                  <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    View Details
                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShoppingBag" size={32} color="#9CA3AF" />
              </div>
              <Typography variant="h4" weight="medium" className="mb-2">No orders yet</Typography>
              <Link href="/"><Button variant="primary">Start Shopping</Button></Link>
            </div>
          )}
        </div>
      </div>
    </BuyerLayout>
  );
}
