// services/web/src/components/molecules/ProductCard/ProductCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockOnAdd = vi.fn();
  const mockOnRemove = vi.fn();
  const mockOnClick = vi.fn();

  const defaultProps = {
    id: '1',
    name: 'Test Product',
    price: 177,
    image: 'https://example.com/image.jpg',
    quantity: 0,
    onAdd: mockOnAdd,
    onRemove: mockOnRemove,
  };

  beforeEach(() => {
    mockOnAdd.mockClear();
    mockOnRemove.mockClear();
    mockOnClick.mockClear();
  });

  it('renders product name', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renders ADD button when quantity is 0', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText('ADD')).toBeInTheDocument();
  });

  it('renders stepper when quantity > 0', () => {
    render(<ProductCard {...defaultProps} quantity={2} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('−')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('calls onAdd when ADD button is clicked', () => {
    render(<ProductCard {...defaultProps} />);
    fireEvent.click(screen.getByText('ADD'));
    expect(mockOnAdd).toHaveBeenCalledWith('1');
  });

  it('calls onAdd when + button is clicked', () => {
    render(<ProductCard {...defaultProps} quantity={1} />);
    fireEvent.click(screen.getByText('+'));
    expect(mockOnAdd).toHaveBeenCalledWith('1');
  });

  it('calls onRemove when − button is clicked', () => {
    render(<ProductCard {...defaultProps} quantity={1} />);
    fireEvent.click(screen.getByText('−'));
    expect(mockOnRemove).toHaveBeenCalledWith('1');
  });

  it('renders NEW badge when isNew is true', () => {
    render(<ProductCard {...defaultProps} isNew />);
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('renders discount in red pill when discounted', () => {
    const { container } = render(
      <ProductCard {...defaultProps} originalPrice={249} discountPercent={72} />
    );
    const pricePill = container.querySelector('.bg-primary');
    expect(pricePill).toBeInTheDocument();
    expect(pricePill).toHaveTextContent('₹177');
  });

  it('renders discount percentage', () => {
    render(<ProductCard {...defaultProps} originalPrice={249} discountPercent={72} />);
    expect(screen.getByText('72% OFF')).toBeInTheDocument();
  });

  it('renders pack info when provided', () => {
    render(<ProductCard {...defaultProps} packInfo="1 pack (2 L)" />);
    expect(screen.getByText('1 pack (2 L)')).toBeInTheDocument();
  });

  it('renders category tag when provided', () => {
    render(<ProductCard {...defaultProps} categoryTag="Fresh & Fragrant" />);
    expect(screen.getByText('Fresh & Fragrant')).toBeInTheDocument();
  });

  it('renders rating when provided', () => {
    render(<ProductCard {...defaultProps} rating={4.8} reviewCount={29800} />);
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('(29.8k)')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<ProductCard {...defaultProps} onClick={mockOnClick} />);
    fireEvent.click(screen.getByText('Test Product'));
    expect(mockOnClick).toHaveBeenCalledWith('1');
  });
});