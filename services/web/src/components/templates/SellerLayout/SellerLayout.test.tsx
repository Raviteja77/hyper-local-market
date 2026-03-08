import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SellerLayout } from './SellerLayout';

describe('SellerLayout', () => {
  it('renders children', () => {
    render(<SellerLayout><div>Seller Content</div></SellerLayout>);
    expect(screen.getByText('Seller Content')).toBeInTheDocument();
  });

  it('renders store name', () => {
    render(<SellerLayout storeName="Fresh Mart"><div>Content</div></SellerLayout>);
    expect(screen.getByText('Fresh Mart')).toBeInTheDocument();
  });

  it('renders default menu items', () => {
    render(<SellerLayout><div>Content</div></SellerLayout>);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Inventory')).toBeInTheDocument();
  });
});