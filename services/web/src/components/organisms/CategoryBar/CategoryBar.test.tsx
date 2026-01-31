import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CategoryBar } from './CategoryBar';
import { ShoppingBag, Apple, Carrot } from 'lucide-react';

const mockCategories = [
  { id: 'all', label: 'All', icon: ShoppingBag },
  { id: 'fruits', label: 'Fruits', icon: Apple },
  { id: 'vegetables', label: 'Vegetables', icon: Carrot },
];

describe('CategoryBar', () => {
  it('renders all categories', () => {
    render(<CategoryBar categories={mockCategories} />);
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByText('Vegetables')).toBeInTheDocument();
  });

  it('calls onCategoryClick when a category is clicked', () => {
    const handleClick = vi.fn();
    render(
      <CategoryBar 
        categories={mockCategories} 
        onCategoryClick={handleClick}
      />
    );
    
    fireEvent.click(screen.getByText('Fruits'));
    expect(handleClick).toHaveBeenCalledWith('fruits');
  });

  it('applies active styles to the active category', () => {
    render(
      <CategoryBar 
        categories={mockCategories} 
        activeCategory="fruits"
      />
    );
    
    const fruitsButton = screen.getByText('Fruits').closest('button');
    expect(fruitsButton).toHaveClass('border-primary');
  });
});
