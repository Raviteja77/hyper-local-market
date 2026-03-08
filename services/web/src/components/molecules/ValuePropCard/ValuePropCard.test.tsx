// services/web/src/components/molecules/ValuePropCard/ValuePropCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrendingDown, Truck, Clock } from 'lucide-react';
import { ValuePropCard } from './ValuePropCard';

describe('ValuePropCard', () => {
  const defaultProps = {
    icon: TrendingDown,
    title: 'Lowest Prices',
    subtitle: 'Best deals in town',
  };

  it('renders title text', () => {
    render(<ValuePropCard {...defaultProps} />);
    expect(screen.getByText('Lowest Prices')).toBeInTheDocument();
  });

  it('renders subtitle text', () => {
    render(<ValuePropCard {...defaultProps} />);
    expect(screen.getByText('Best deals in town')).toBeInTheDocument();
  });

  it('renders with custom icon colors', () => {
    const { container } = render(
      <ValuePropCard
        {...defaultProps}
        iconColor="text-green-600"
        iconBgColor="bg-green-100"
      />
    );
    const iconContainer = container.querySelector('.bg-green-100');
    expect(iconContainer).toBeInTheDocument();
  });

  it('renders with default colors when not provided', () => {
    const { container } = render(<ValuePropCard {...defaultProps} />);
    const iconContainer = container.querySelector('.bg-primary-light');
    expect(iconContainer).toBeInTheDocument();
  });

  it('renders different icons correctly', () => {
    const { rerender } = render(<ValuePropCard {...defaultProps} icon={TrendingDown} />);
    expect(screen.getByText('Lowest Prices')).toBeInTheDocument();

    rerender(<ValuePropCard {...defaultProps} icon={Truck} title="Free Delivery" />);
    expect(screen.getByText('Free Delivery')).toBeInTheDocument();

    rerender(<ValuePropCard {...defaultProps} icon={Clock} title="5 Min Delivery" />);
    expect(screen.getByText('5 Min Delivery')).toBeInTheDocument();
  });

  it('applies correct structure with icon and text', () => {
    const { container } = render(<ValuePropCard {...defaultProps} />);
    
    // Check for the main card container
    const card = container.querySelector('.flex.items-center.gap-3');
    expect(card).toBeInTheDocument();

    // Check for icon container
    const iconContainer = container.querySelector('.rounded-full');
    expect(iconContainer).toBeInTheDocument();
  });

  it('renders multiple cards with different content', () => {
    const cards = [
      { icon: TrendingDown, title: 'Lowest Prices', subtitle: 'Best deals' },
      { icon: Truck, title: 'Free Delivery', subtitle: 'On orders above ₹99' },
      { icon: Clock, title: '5 Min Delivery', subtitle: 'Fast service' },
    ];

    const { container } = render(
      <div>
        {cards.map((card, index) => (
          <ValuePropCard key={index} {...card} />
        ))}
      </div>
    );

    expect(screen.getByText('Lowest Prices')).toBeInTheDocument();
    expect(screen.getByText('Free Delivery')).toBeInTheDocument();
    expect(screen.getByText('5 Min Delivery')).toBeInTheDocument();
  });
});
