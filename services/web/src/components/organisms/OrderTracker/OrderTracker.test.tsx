import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrderTracker } from './OrderTracker';

describe('OrderTracker', () => {
  it('renders order id', () => {
    render(<OrderTracker currentStatus="pending" orderId="ORD-123" />);
    expect(screen.getByText('Order ID: ORD-123')).toBeInTheDocument();
  });

  it('renders timeline steps', () => {
    render(<OrderTracker currentStatus="confirmed" />);
    expect(screen.getByText('Order Placed')).toBeInTheDocument();
    expect(screen.getAllByText('Confirmed').length).toBeGreaterThanOrEqual(1);
  });

  it('renders cancelled state', () => {
    render(<OrderTracker currentStatus="cancelled" />);
    expect(screen.getByText('Order Cancelled')).toBeInTheDocument();
  });
});