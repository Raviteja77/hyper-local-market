import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InventoryManager } from './InventoryManager';

/* eslint-disable @next/next/no-img-element */
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt="" {...props} />,
}));
/* eslint-enable @next/next/no-img-element */

describe('InventoryManager', () => {
  it('renders title', () => {
    render(<InventoryManager items={[]} onToggleStock={vi.fn()} />);
    expect(screen.getByText('Inventory Management')).toBeInTheDocument();
  });

  it('renders empty state when no items match', () => {
    render(<InventoryManager items={[]} onToggleStock={vi.fn()} />);
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('renders items', () => {
    const items = [
      { id: '1', name: 'Rice', category: 'Grains', price: 100, inStock: true },
    ];
    render(<InventoryManager items={items} onToggleStock={vi.fn()} />);
    expect(screen.getByText('Rice')).toBeInTheDocument();
  });
});