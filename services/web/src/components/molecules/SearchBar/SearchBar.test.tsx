import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders with default placeholder', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('renders search button by default', () => {
    render(<SearchBar />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('hides search button when showButton is false', () => {
    render(<SearchBar showButton={false} />);
    expect(screen.queryByText('Search')).not.toBeInTheDocument();
  });

  it('calls onSearch when button is clicked', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    fireEvent.click(screen.getByText('Search'));
    expect(onSearch).toHaveBeenCalledWith('');
  });
});