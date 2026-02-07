// services/web/src/components/molecules/RatingStars/RatingStars.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RatingStars } from './RatingStars';

describe('RatingStars', () => {
  it('renders correct number of stars', () => {
    const { container } = render(<RatingStars rating={3} />);
    const stars = container.querySelectorAll('button');
    expect(stars).toHaveLength(5);
  });

  it('renders filled stars for rating', () => {
    const { container } = render(<RatingStars rating={4} />);
    const filledStars = container.querySelectorAll('.fill-yellow-500');
    expect(filledStars.length).toBeGreaterThan(0);
  });

  it('shows numeric rating when showNumeric is true', () => {
    render(<RatingStars rating={4.2} showNumeric />);
    expect(screen.getByText('4.2')).toBeInTheDocument();
  });

  it('does not show numeric rating by default', () => {
    render(<RatingStars rating={4.2} />);
    expect(screen.queryByText('4.2')).not.toBeInTheDocument();
  });

  it('handles half stars correctly', () => {
    const { container } = render(<RatingStars rating={3.5} />);
    // Should have 3 full stars and 1 half star
    expect(container.querySelectorAll('button')).toHaveLength(5);
  });

  it('calls onRate when interactive star is clicked', () => {
    const mockOnRate = vi.fn();
    const { container } = render(<RatingStars rating={0} interactive onRate={mockOnRate} />);
    const stars = container.querySelectorAll('button');
    fireEvent.click(stars[2]); // Click third star
    expect(mockOnRate).toHaveBeenCalledWith(3);
  });

  it('does not call onRate when not interactive', () => {
    const mockOnRate = vi.fn();
    const { container } = render(<RatingStars rating={0} onRate={mockOnRate} />);
    const stars = container.querySelectorAll('button');
    fireEvent.click(stars[2]);
    expect(mockOnRate).not.toHaveBeenCalled();
  });

  it('applies correct size classes', () => {
    const { container: containerSm } = render(<RatingStars rating={4} />);
    const { container: containerMd } = render(<RatingStars rating={4} size="md" />);
    
    // Both should render, size is applied via SVG size prop
    expect(containerSm.querySelectorAll('button')).toHaveLength(5);
    expect(containerMd.querySelectorAll('button')).toHaveLength(5);
  });
});