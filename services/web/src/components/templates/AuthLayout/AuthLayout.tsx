import React from 'react';
import Link from 'next/link';

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
      {/* Header with logo for navigation back to home */}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-xl hover:opacity-80 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          HyperLocal
        </Link>
      </header>

      {/* Content - Centered vertically and horizontally */}
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] p-8">
        <div className="w-full max-w-lg">
          {children}
        </div>
      </div>
    </div>
  );
};