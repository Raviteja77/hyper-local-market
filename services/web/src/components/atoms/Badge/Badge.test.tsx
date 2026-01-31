// services/web/src/components/atoms/Badge/Badge.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies discount variant styles', () => {
    const { container } = render(<Badge variant="discount">20% OFF</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-discount-bg', 'text-discount');
  });

  it('renders with left icon', () => {
    render(<Badge leftIcon={<span data-testid="icon">Icon</span>}>Badge</Badge>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders dot variant', () => {
    const { container } = render(<Badge dot variant="discount">In Stock</Badge>);
    const dot = container.querySelector('.rounded-full');
    expect(dot).toHaveClass('w-2', 'h-2');
  });

  it('applies correct dot color for variant', () => {
    const { container } = render(<Badge dot variant="error">Out of Stock</Badge>);
    const dot = container.querySelector('.rounded-full');
    expect(dot).toHaveClass('bg-error');
  });
});
