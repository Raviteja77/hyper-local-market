import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CartSidebar } from './CartSidebar';

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe('CartSidebar', () => {
  const defaultProps = {
    isOpen: true,
    items: [],
    subtotal: 0,
    onClose: vi.fn(),
    onCheckout: vi.fn(),
    onUpdateQuantity: vi.fn(),
    onRemoveItem: vi.fn(),
  };

  it('returns null when not open', () => {
    const { container } = render(<CartSidebar {...defaultProps} isOpen={false} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders empty cart message', () => {
    render(<CartSidebar {...defaultProps} />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders cart items when provided', () => {
    const items = [
      { id: '1', name: 'Apple', price: 50, quantity: 2 },
    ];
    render(<CartSidebar {...defaultProps} items={items} subtotal={100} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });
});