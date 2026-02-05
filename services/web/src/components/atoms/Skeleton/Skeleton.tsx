import React from 'react';

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div
    className={`animate-pulse bg-gray-200 ${className}`}
    aria-busy="true"
    aria-live="polite"
    role="status"
  />
);
