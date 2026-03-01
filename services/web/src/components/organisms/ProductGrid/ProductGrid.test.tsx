import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductGrid } from './ProductGrid';

/* eslint-disable @next/next/no-img-element */
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt="" {...props} />,
}));
/* eslint-enable @next/next/no-img-element */

describe('ProductGrid', () => {
  it('renders empty message when no products', () => {
    render(<ProductGrid products={[]} />);
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    const products = [
      { id: '1', name: 'Apple', price: 50, storeName: 'Store A', distance: 1 },
    ];
    render(<ProductGrid products={products} title="Fresh Fruits" />);
    expect(screen.getByText('Fresh Fruits')).toBeInTheDocument();
  });
});