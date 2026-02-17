import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BuyerLayout } from './BuyerLayout';

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
}));

vi.mock('@/store', () => ({
  useCartStore: () => ({
    items: [],
    subtotal: 0,
    deliveryFee: 0,
    discount: 0,
    total: 0,
    updateQuantity: vi.fn(),
    removeItem: vi.fn(),
  }),
}));

describe('BuyerLayout', () => {
  it('renders children', () => {
    render(<BuyerLayout><div>Page Content</div></BuyerLayout>);
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  it('renders navbar brand', () => {
    render(<BuyerLayout><div>Content</div></BuyerLayout>);
    expect(screen.getAllByText('HyperLocal').length).toBeGreaterThanOrEqual(1);
  });
});