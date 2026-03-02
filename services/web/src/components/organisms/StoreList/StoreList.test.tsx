import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StoreList } from './StoreList';

/* eslint-disable @next/next/no-img-element */
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt="" {...props} />,
}));
/* eslint-enable @next/next/no-img-element */

describe('StoreList', () => {
  it('renders title', () => {
    const stores = [
      { id: '1', name: 'Fresh Mart', image: '/store.jpg', deliveryTime: '15 min', distance: 1.2, rating: 4.5, eta: 15, onClick: vi.fn() },
    ];
    render(<StoreList stores={stores} />);
    expect(screen.getByText('Nearby Stores')).toBeInTheDocument();
  });

  it('renders empty message when no stores', () => {
    render(<StoreList stores={[]} />);
    expect(screen.getByText('No stores found in your area')).toBeInTheDocument();
  });

  it('shows sort options by default', () => {
    const stores = [
      { id: '1', name: 'Fresh Mart', image: '/store.jpg', deliveryTime: '15 min', distance: 1.2, rating: 4.5, eta: 15, onClick: vi.fn() },
    ];
    render(<StoreList stores={stores} />);
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
  });
});