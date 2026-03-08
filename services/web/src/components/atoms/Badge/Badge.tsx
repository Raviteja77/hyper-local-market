// services/web/src/components/atoms/Badge/Badge.tsx
import React from 'react';

export interface BadgeProps {
  variant?: 'discount' | 'delivery' | 'stock' | 'error' | 'info' | 'default';
  dot?: boolean;
  leftIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  dot = false,
  leftIcon,
  children,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center gap-1 font-semibold';
  
  const variants = {
    discount: 'bg-discount-bg text-discount',
    delivery: 'bg-gray-100 text-gray-700',
    stock: 'bg-warning-light text-warning',
    error: 'bg-error-light text-error',
    info: 'bg-info-light text-info',
    default: 'bg-gray-100 text-gray-700',
  };
  
  const dotVariants = {
    discount: 'bg-discount',
    delivery: 'bg-gray-700',
    stock: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
    default: 'bg-gray-700',
  };
  
  if (dot) {
    const textColor = variants[variant].split(' ').find(c => c.startsWith('text-')) || 'text-gray-700';
    return (
      <span className={`${baseStyles} ${className}`}>
        <span className={`w-2 h-2 rounded-full ${dotVariants[variant]}`} />
        <span className={textColor}>{children}</span>
      </span>
    );
  }
  
  return (
    <span
      className={`${baseStyles} ${variants[variant]} px-2 py-0.5 text-xs rounded-full ${className}`}
    >
      {leftIcon && <span className="w-3 h-3">{leftIcon}</span>}
      {children}
    </span>
  );
};
