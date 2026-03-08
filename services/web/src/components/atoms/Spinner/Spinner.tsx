// services/web/src/components/atoms/Spinner/Spinner.tsx
import React from 'react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white';
  label?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  label,
  className = '',
}) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-3',
    lg: 'w-8 h-8 border-4',
    xl: 'w-12 h-12 border-4',
  };

  const borderColor = color === 'white' ? 'border-t-white' : 'border-t-primary';
  
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <div
        className={`${sizes[size]} border-gray-200 ${borderColor} rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      {label && (
        <span className="text-sm text-gray-500">{label}</span>
      )}
    </div>
  );
};
