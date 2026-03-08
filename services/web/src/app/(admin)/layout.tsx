import React from 'react';
import { AdminLayout } from '@/components/templates';
import type { Metadata } from 'next';

export const metadata: Metadata = {
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