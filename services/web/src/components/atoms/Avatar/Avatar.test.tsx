// services/web/src/components/atoms/Avatar/Avatar.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" name="John Doe" />);
    const img = screen.getByAltText('John Doe');
    expect(img).toBeInTheDocument();
  });

  it('renders initials fallback when no src', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders single name initials correctly', () => {
    render(<Avatar name="Madonna" />);
    expect(screen.getByText('MA')).toBeInTheDocument();
  });

  it('shows online indicator when online is true', () => {
    const { container } = render(<Avatar name="John Doe" online />);
    const onlineIndicator = container.querySelector('.bg-success');
    expect(onlineIndicator).toBeInTheDocument();
  });

  it('does not show online indicator when online is false', () => {
    const { container } = render(<Avatar name="John Doe" online={false} />);
    const onlineIndicator = container.querySelector('.bg-success');
    expect(onlineIndicator).not.toBeInTheDocument();
  });

  it('applies correct size class', () => {
    const { container } = render(<Avatar name="John Doe" size="lg" />);
    const avatar = container.firstChild;
    expect(avatar).toHaveClass('w-14', 'h-14');
  });
});
