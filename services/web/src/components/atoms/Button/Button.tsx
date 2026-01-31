// services/web/src/components/atoms/Button/Button.tsx
import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  type = 'button',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
}) => {
  const baseStyles = `font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed ${
    disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
  }`;

  
  const variants = {
    primary: 'rounded-full bg-primary text-white hover:shadow-md focus:ring-primary',
    secondary: 'rounded-lg bg-white text-primary border border-primary hover:shadow-md focus:ring-primary',
    ghost: 'rounded-lg bg-transparent text-primary hover:bg-gray-100 focus:ring-primary',
    danger: 'rounded-lg bg-danger text-white hover:shadow-md focus:ring-danger',
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-md font-semibold',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        // Prevent onClick being called while loading
        pointerEvents: isLoading ? 'none' : undefined,
        // Prevent cursor changing while loading
        cursor: isLoading ? 'not-allowed' : undefined,
      }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};