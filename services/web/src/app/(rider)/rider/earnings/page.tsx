'use client';

import React from 'react';
import { Typography, Button, Icon } from '@/components/atoms';

export default function RiderEarningsPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <Typography variant="h2" weight="bold">Earnings</Typography>

      {/* Balance Card */}
      <div className="bg-primary text-white p-6 rounded-2xl shadow-lg">
        <Typography variant="caption" className="opacity-90 mb-1">Available Balance</Typography>
        <Typography variant="h1" weight="bold" className="mb-6">₹1,240.50</Typography>
        <Button variant="secondary" className="w-full bg-white text-primary hover:bg-gray-100 border-none">
          Withdraw Money
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <Typography variant="caption" color="muted">This Week</Typography>
          <Typography variant="h3" weight="bold">₹4,500</Typography>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <Typography variant="caption" color="muted">Total Trips</Typography>
          <Typography variant="h3" weight="bold">42</Typography>
        </div>
      </div>

      {/* Recent Payouts */}
      <div>
        <Typography variant="h4" weight="bold" className="mb-4">Recent Payouts</Typography>
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Icon name="Check" size={20} className="text-green-600" />
                </div>
                <div>
                  <Typography variant="body" weight="medium">Bank Transfer</Typography>
                  <Typography variant="caption" color="muted">Oct 2{i}, 2023</Typography>
                </div>
              </div>
              <Typography variant="body" weight="bold">- ₹2,000</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
