// services/web/src/components/atoms/Avatar/Avatar.tsx
import React from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  className = '',
}) => {
  const [imgError, setImgError] = React.useState(false);
  
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };
  
  const baseStyles = 'rounded-full object-cover flex items-center justify-center';
  
  const showFallback = !src || imgError;
  const initials = fallback || alt.substring(0, 2).toUpperCase();
  
  if (showFallback) {
    return (
      <div
        className={`${baseStyles} ${sizes[size]} bg-gray-300 text-gray-700 font-semibold ${className}`}
      >
        {initials}
      </div>
    );
  }
  
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImgError(true)}
      className={`${baseStyles} ${sizes[size]} ${className}`}
    />
  );
};