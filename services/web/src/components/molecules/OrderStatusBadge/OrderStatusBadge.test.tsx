import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrderStatusBadge } from './OrderStatusBadge';

describe('OrderStatusBadge', () => {
  it('renders pending status label', () => {
    render(<OrderStatusBadge status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders delivered status label', () => {
    render(<OrderStatusBadge status="delivered" />);
    expect(screen.getByText('Delivered')).toBeInTheDocument();
  });

  it('renders cancelled status label', () => {
    render(<OrderStatusBadge status="cancelled" />);
    expect(screen.getByText('Cancelled')).toBeInTheDocument();
  });
});