'use client';

import React, { useState } from 'react';
import { Typography, Button, Badge, Icon } from '@/components/atoms';
import { MapPin, TrendingUp, Package } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  location: string;
  products: number;
  revenue: number;
  rating: number;
  status: 'active' | 'inactive' | 'suspended';
  verified: boolean;
}

const mockStores: Store[] = [
  { id: '1', name: 'Sharma Kirana', location: 'Sector 12, Gurgaon', products: 245, revenue: 125000, rating: 4.8, status: 'active', verified: true },
  { id: '2', name: 'Apollo Meds', location: 'MG Road, Bangalore', products: 189, revenue: 98500, rating: 4.6, status: 'active', verified: true },
  { id: '3', name: 'Fresh Mart', location: 'Indiranagar, Bangalore', products: 156, revenue: 65200, rating: 4.4, status: 'active', verified: false },
  { id: '4', name: 'Daily Needs', location: 'Whitefield, Bangalore', products: 201, revenue: 89000, rating: 4.5, status: 'active', verified: true },
  { id: '5', name: 'Quick Shop', location: 'Koramangala, Bangalore', products: 78, revenue: 32100, rating: 4.2, status: 'inactive', verified: false },
  { id: '6', name: 'Premium Store', location: 'Banjara Hills, Hyderabad', products: 312, revenue: 156800, rating: 4.9, status: 'active', verified: true },
];

export default function AdminStoresPage() {
  const [stores] = useState<Store[]>(mockStores);
  const [search, setSearch] = useState('');

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = stores.reduce((sum, store) => sum + store.revenue, 0);
  const activeStores = stores.filter((s) => s.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Typography variant="body" className="text-gray-600 mb-2">
            Total Stores
          </Typography>
          <Typography variant="h3" weight="bold" className="text-gray-900">
            {stores.length}
          </Typography>
          <Typography variant="small" className="text-green-600 mt-2">
            +2 this month
          </Typography>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Typography variant="body" className="text-gray-600 mb-2">
            Active Stores
          </Typography>
          <Typography variant="h3" weight="bold" className="text-gray-900">
            {activeStores}
          </Typography>
          <Typography variant="small" className="text-green-600 mt-2">
            {Math.round((activeStores / stores.length) * 100)}% active
          </Typography>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Typography variant="body" className="text-gray-600 mb-2">
            Total Revenue
          </Typography>
          <Typography variant="h3" weight="bold" className="text-gray-900">
            ₹{(totalRevenue / 100000).toFixed(1)}L
          </Typography>
          <Typography variant="small" className="text-green-600 mt-2">
            +15% from last month
          </Typography>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Typography variant="h2" weight="bold">
            Stores
          </Typography>
          <Typography variant="body" className="text-gray-600 mt-1">
            Manage and monitor all seller stores
          </Typography>
        </div>
        <Button variant="primary" size="sm">
          Add Store
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search stores by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
        />
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <Typography variant="h4" weight="bold" className="text-gray-900">
                  {store.name}
                </Typography>
                <div className="flex items-center gap-1 mt-2 text-gray-600">
                  <MapPin size={16} />
                  <Typography variant="small">{store.location}</Typography>
                </div>
              </div>
              <Badge variant={store.status === 'active' ? 'success' : store.status === 'inactive' ? 'warning' : 'danger'}>
                {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
              </Badge>
            </div>

            {/* Store Stats */}
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <Typography variant="small" className="text-gray-600">
                  Products
                </Typography>
                <Typography variant="small" weight="bold" className="text-gray-900">
                  {store.products}
                </Typography>
              </div>
              <div className="flex justify-between items-center">
                <Typography variant="small" className="text-gray-600">
                  Revenue
                </Typography>
                <Typography variant="small" weight="bold" className="text-gray-900">
                  ₹{store.revenue.toLocaleString()}
                </Typography>
              </div>
              <div className="flex justify-between items-center">
                <Typography variant="small" className="text-gray-600">
                  Rating
                </Typography>
                <Typography variant="small" weight="bold" className="text-amber-600">
                  ⭐ {store.rating}
                </Typography>
              </div>
            </div>

            {/* Verification */}
            {store.verified && (
              <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg mb-4 text-sm font-medium">
                ✓ Verified Store
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors">
                View
              </button>
              <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm font-medium transition-colors">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <div className="text-center py-12">
          <Typography variant="body" className="text-gray-600">
            No stores found
          </Typography>
        </div>
      )}
    </div>
  );
}
