// services/web/src/components/atoms/Icon/Icon.tsx
import React from 'react';
import { LucideProps } from 'lucide-react';

export interface IconProps {
  icon: React.ComponentType<LucideProps>;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'primary' | 'gray' | 'success' | 'error' | 'warning' | 'current';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color = 'current',
  className = '',
}) => {
  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
  };
  
  const colorMap = {
    primary: 'text-primary',
    gray: 'text-gray-500',
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
    current: 'text-current',
  };

  if (!IconComponent) {
    return <span>Error: Icon component is undefined</span>;
  }
  
  return (
    <IconComponent 
      size={sizeMap[size]} 
      className={`${colorMap[color]} ${className}`}
    />
  );
};
