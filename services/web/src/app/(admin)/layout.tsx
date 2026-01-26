'use client';

import React from 'react';
import { AdminLayout } from '@/components/templates';

export const metadata = {
  title: 'HyperLocal - Admin Panel',
  description: 'Manage platform operations and analytics',
};

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
