// services/web/src/components/molecules/StoreCard/StoreCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StoreCard } from './StoreCard';

describe('StoreCard', () => {
  const mockOnClick = vi.fn();

  const defaultProps = {
    id: '1',
    name: 'Quick Mart',
    image: 'https://example.com/image.jpg',
    deliveryTime: '8-12 min',
    rating: 4.5,
    onClick: mockOnClick,
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders store name', () => {
    render(<StoreCard {...defaultProps} />);
    expect(screen.getByText('Quick Mart')).toBeInTheDocument();
  });

  it('renders delivery time badge', () => {
    render(<StoreCard {...defaultProps} />);
    expect(screen.getByText('8-12 min')).toBeInTheDocument();
  });

  it('renders rating', () => {
    render(<StoreCard {...defaultProps} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders store image', () => {
    render(<StoreCard {...defaultProps} />);
    const img = screen.getByAltText('Quick Mart');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders free delivery text when isFreeDelivery is true', () => {
    render(<StoreCard {...defaultProps} isFreeDelivery />);
    expect(screen.getByText('Free delivery')).toBeInTheDocument();
  });

  it('does not render free delivery text by default', () => {
    render(<StoreCard {...defaultProps} />);
    expect(screen.queryByText('Free delivery')).not.toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<StoreCard {...defaultProps} />);
    fireEvent.click(screen.getByText('Quick Mart'));
    expect(mockOnClick).toHaveBeenCalledWith('1');
  });

  it('handles keyboard navigation', () => {
    render(<StoreCard {...defaultProps} />);
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(mockOnClick).toHaveBeenCalledWith('1');
  });
});