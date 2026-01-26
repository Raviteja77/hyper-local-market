'use client';

import React from 'react';
import { Typography, Button, Icon } from '@/components/atoms';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="h2" weight="bold">Users</Typography>
        <Button variant="primary" className="flex items-center gap-2">
          <Icon name="Plus" size={16} /> Add User
        </Button>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
        <Typography variant="body" color="muted">
          User management table (Buyers, Sellers, Riders) goes here. 
          Similar structure to Orders table but with Role columns.
        </Typography>
      </div>
    </div>
  );
}
