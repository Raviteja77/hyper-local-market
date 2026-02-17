import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AdminLayout } from './AdminLayout';

describe('AdminLayout', () => {
  it('renders children', () => {
    render(<AdminLayout><div>Admin Content</div></AdminLayout>);
    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });

  it('renders admin name', () => {
    render(<AdminLayout adminName="John"><div>Content</div></AdminLayout>);
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('renders default menu items', () => {
    render(<AdminLayout><div>Content</div></AdminLayout>);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });
});