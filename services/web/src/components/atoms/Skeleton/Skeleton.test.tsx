// services/web/src/components/atoms/Skeleton/Skeleton.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with default styles', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild;
    expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200', 'rounded');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="w-full h-8" />);
    const skeleton = container.firstChild;
    expect(skeleton).toHaveClass('w-full', 'h-8');
  });

  it('has proper ARIA attributes for loading state', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
    expect(skeleton).toHaveAttribute('aria-live', 'polite');
    expect(skeleton).toHaveAttribute('role', 'status');
  });

  it('can be used for different shapes', () => {
    const { container } = render(
      <div>
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />
      </div>
    );
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(3);
  });
});
