import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InventoryManager } from './InventoryManager';

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

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