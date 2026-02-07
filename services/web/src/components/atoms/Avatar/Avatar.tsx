// services/web/src/components/atoms/Avatar/Avatar.tsx
import React from 'react';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  online?: boolean;
  alt?: string;
  className?: string;
}

// Simple hash function to generate a consistent color based on name
const getColorFromName = (name: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-yellow-500',
  ];
  
  let hash = 0;
  for (let i = 0; i < name?.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

// Get initials from name (first letter of first and last name)
const getInitials = (name: string): string => {
  const parts = name?.trim().split(' ');
  if (!parts || parts.length === 0) {
    return '';
  } else if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  } else {
    const first = parts[0]?.[0] || '';
    const last = parts[parts.length - 1]?.[0] || '';
    return (first + last).toUpperCase();
  }
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  online = false,
  alt,
  className = '',
}) => {
  const [imgError, setImgError] = React.useState(false);
  
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };
  
  const onlineSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };
  
  const baseStyles = 'rounded-full overflow-hidden flex items-center justify-center relative';
  const showFallback = !src || imgError;
  
  return (
    <div className={`${baseStyles} ${sizes[size]} ${className}`}>
      {showFallback ? (
        <div
          className={`w-full h-full flex items-center justify-center ${getColorFromName(name)} text-white font-semibold`}
        >
          {getInitials(name)}
        </div>
      ) : (
        <img
          src={src}
          alt={alt || name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      )}
      
      {online && (
        <span
          className={`absolute bottom-0 right-0 ${onlineSizes[size]} bg-success-full border-2 border-white`}
        />
      )}
    </div>
  );
};
