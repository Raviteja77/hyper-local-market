import React from 'react';

export interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Optional brand gradient strip at top */}
      <div className="h-2 bg-gradient-to-r from-primary to-primary-hover"></div>
      
      {/* Content - Centered vertically and horizontally */}
      <div className="flex items-center justify-center min-h-[calc(100vh-0.5rem)] p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};