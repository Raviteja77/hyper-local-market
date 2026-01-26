'use client';

import React, { useState } from 'react';
import { Typography, Button, Badge } from '@/components/atoms';

interface Order {
  id: string;
  orderId: string;
  customer: string;
  store: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
  items: number;
}

const mockOrders: Order[] = [
  { id: '1', orderId: 'ORD-001', customer: 'John Doe', store: 'Sharma Kirana', total: 450, status: 'pending', date: '2023-10-25', items: 8 },
  { id: '2', orderId: 'ORD-002', customer: 'Jane Smith', store: 'Apollo Meds', total: 1200, status: 'processing', date: '2023-10-25', items: 15 },
  { id: '3', orderId: 'ORD-003', customer: 'Bob Wilson', store: 'Fresh Mart', total: 85, status: 'delivered', date: '2023-10-24', items: 3 },
  { id: '4', orderId: 'ORD-004', customer: 'Alice Brown', store: 'Daily Needs', total: 650, status: 'pending', date: '2023-10-25', items: 12 },
  { id: '5', orderId: 'ORD-005', customer: 'Charlie Davis', store: 'Quick Shop', total: 320, status: 'completed', date: '2023-10-23', items: 6 },
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'processing':
      return 'info';
    case 'completed':
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
};

export default function AdminOrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<string>('all');

  const filteredOrders = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="h2" weight="bold">
            All Orders
          </Typography>
          <Typography variant="body" className="text-gray-600 mt-1">
            {filteredOrders.length} orders found
          </Typography>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Export CSV
          </Button>
          <Button variant="primary" size="sm">
            Add Filter
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'processing', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-medium text-sm text-gray-500">Order ID</th>
              <th className="p-4 font-medium text-sm text-gray-500">Customer</th>
              <th className="p-4 font-medium text-sm text-gray-500">Store</th>
              <th className="p-4 font-medium text-sm text-gray-500">Items</th>
              <th className="p-4 font-medium text-sm text-gray-500">Amount</th>
              <th className="p-4 font-medium text-sm text-gray-500">Status</th>
              <th className="p-4 font-medium text-sm text-gray-500">Date</th>
              <th className="p-4 font-medium text-sm text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-sm text-gray-900">{order.orderId}</td>
                <td className="p-4 text-sm text-gray-600">{order.customer}</td>
                <td className="p-4 text-sm text-gray-600">{order.store}</td>
                <td className="p-4 text-sm text-gray-600">{order.items}</td>
                <td className="p-4 font-medium text-sm text-gray-900">₹{order.total}</td>
                <td className="p-4">
                  <Badge variant={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </td>
                <td className="p-4 text-sm text-gray-600">{order.date}</td>
                <td className="p-4 text-sm">
                  <button className="text-primary hover:underline font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
