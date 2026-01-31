// services/web/src/components/atoms/Icon/Icon.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from './Icon';
import { ShoppingCart } from 'lucide-react';

describe('Icon', () => {
  it('renders the icon component', () => {
    const { container } = render(<Icon icon={ShoppingCart} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies correct size', () => {
    const { container } = render(<Icon icon={ShoppingCart} size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('applies color class', () => {
    const { container } = render(<Icon icon={ShoppingCart} color="primary" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-primary');
  });

  it('applies custom className', () => {
    const { container } = render(<Icon icon={ShoppingCart} className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });
});
