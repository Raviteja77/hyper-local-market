'use client';

import React from 'react';
import { Typography, Button, Icon } from '@/components/atoms';

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
          JD
        </div>
        <div>
          <Typography variant="h2" weight="bold">John Doe</Typography>
          <Typography variant="body" color="muted">+91 98765 43210</Typography>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Typography variant="h3" weight="bold">Saved Addresses</Typography>
          <Button variant="ghost" className="text-primary text-sm">+ Add New</Button>
        </div>

        {/* Address Card */}
        <div className="border border-gray-200 rounded-xl p-4 flex gap-4 items-start">
          <Icon name="Home" className="text-gray-400 mt-1" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Typography variant="body" weight="bold">Home</Typography>
              <span className="bg-gray-100 text-xs px-2 py-0.5 rounded text-gray-600">Default</span>
            </div>
            <Typography variant="small" color="muted">
              Flat 402, Galaxy Apartments, MG Road, Indiranagar, Bangalore - 560038
            </Typography>
          </div>
          <Button variant="ghost" size="sm"><Icon name="Edit" size={16} /></Button>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <Button variant="secondary" className="w-full text-red-500 border-red-200 hover:bg-red-50">
          Log Out
        </Button>
      </div>
    </div>
  );
}
