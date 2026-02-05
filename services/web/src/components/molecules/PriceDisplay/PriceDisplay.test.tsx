// services/web/src/components/molecules/PriceDisplay/PriceDisplay.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PriceDisplay } from './PriceDisplay';

describe('PriceDisplay', () => {
  it('renders current price without discount', () => {
    render(<PriceDisplay currentPrice={199} />);
    expect(screen.getByText('₹199')).toBeInTheDocument();
  });

  it('renders with discount in red pill', () => {
    const { container } = render(
      <PriceDisplay currentPrice={177} originalPrice={249} discountPercent={72} />
    );
    const pricePill = container.querySelector('.bg-primary');
    expect(pricePill).toBeInTheDocument();
    expect(pricePill).toHaveTextContent('₹177');
  });

  it('renders strikethrough original price', () => {
    render(<PriceDisplay currentPrice={177} originalPrice={249} discountPercent={72} />);
    const original = screen.getByText('₹249');
    expect(original).toHaveClass('line-through');
  });

  it('renders discount percentage', () => {
    render(<PriceDisplay currentPrice={177} originalPrice={249} discountPercent={72} />);
    expect(screen.getByText('72% OFF')).toBeInTheDocument();
  });

  it('does not render discount text when not provided', () => {
    render(<PriceDisplay currentPrice={177} originalPrice={249} />);
    expect(screen.queryByText(/% OFF/)).not.toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { container } = render(
      <PriceDisplay currentPrice={177} originalPrice={249} discountPercent={72} />
    );
    const pricePill = container.querySelector('.bg-primary');
    expect(pricePill).toHaveClass('text-xs');
  });
});