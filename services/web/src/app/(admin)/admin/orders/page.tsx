'use client';

import React from 'react';
import { Typography, Badge, Button } from '@/components/atoms';

// Mock Data
const orders = [
  { id: 'ORD-001', customer: 'John Doe', store: 'Sharma Kirana', total: 450, status: 'pending', date: '2023-10-25' },
  { id: 'ORD-002', customer: 'Jane Smith', store: 'Apollo Meds', total: 1200, status: 'processing', date: '2023-10-25' },
  { id: 'ORD-003', customer: 'Bob Wilson', store: 'Fresh Mart', total: 85, status: 'delivered', date: '2023-10-24' },
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="h2" weight="bold">All Orders</Typography>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">Export CSV</Button>
          <Button variant="primary" size="sm">Filter</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-medium text-gray-500 text-sm">Order ID</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Customer</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Store</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Status</th>
              <th className="p-4 font-medium text-gray-500 text-sm text-right">Total</th>
              <th className="p-4 font-medium text-gray-500 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-4 text-sm font-medium">{order.id}</td>
                <td className="p-4 text-sm text-gray-600">{order.customer}</td>
                <td className="p-4 text-sm text-gray-600">{order.store}</td>
                <td className="p-4">
                  <Badge variant={order.status === 'delivered' ? 'success' : order.status === 'pending' ? 'warning' : 'primary'}>
                    {order.status}
                  </Badge>
                </td>
                <td className="p-4 text-sm font-bold text-right">₹{order.total}</td>
                <td className="p-4">
                  <Button variant="ghost" size="sm" className="text-blue-600">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
