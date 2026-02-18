import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StoreList } from './StoreList';

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe('StoreList', () => {
  it('renders title', () => {
    const stores = [
      { id: '1', name: 'Fresh Mart', distance: 1.2, rating: 4.5, eta: 15 },
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
      { id: '1', name: 'Fresh Mart', distance: 1.2, rating: 4.5, eta: 15 },
    ];
    render(<StoreList stores={stores} />);
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
  });
});