'use client';

import React from 'react';
import { Typography, Badge, Icon } from '@/components/atoms';

// Mock Data
const pastOrders = [
  { id: 'ORD-12345', date: 'Today, 2:30 PM', store: 'Sharma Kirana', amount: 45, status: 'delivered' },
  { id: 'ORD-12344', date: 'Today, 1:15 PM', store: 'Fresh Veggies', amount: 32, status: 'delivered' },
  { id: 'ORD-12342', date: 'Yesterday', store: 'MediPlus Pharmacy', amount: 55, status: 'cancelled' },
];

export default function RiderOrdersPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <Typography variant="h2" weight="bold">Delivery History</Typography>

      <div className="space-y-4">
        {pastOrders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Typography variant="body" weight="semibold">{order.store}</Typography>
                {order.status === 'cancelled' ? (
                  <Badge variant="danger" size="sm">Cancelled</Badge>
                ) : (
                  <Badge variant="success" size="sm">Delivered</Badge>
                )}
              </div>
              <Typography variant="small" color="muted">{order.date} • #{order.id}</Typography>
            </div>
            <div className="text-right">
              <Typography variant="h4" weight="bold" color={order.status === 'cancelled' ? 'muted' : 'primary'}>
                ₹{order.amount}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
