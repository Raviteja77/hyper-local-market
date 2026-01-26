// services/web/src/components/atoms/Input/Input.tsx
import React from 'react';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  name?: string;
  id?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onKeyDown,
  disabled = false,
  error = false,
  fullWidth = false,
  size = 'md',
  className = '',
  name,
  id,
  required = false,
}) => {
  const baseStyles = 'border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
  
  const stateStyles = error
    ? 'border-danger focus:ring-danger focus:border-danger'
    : 'border-gray-300 focus:ring-primary focus:border-primary';
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white';
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      disabled={disabled}
      name={name}
      id={id}
      required={required}
      className={`${baseStyles} ${stateStyles} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
    />
  );
};