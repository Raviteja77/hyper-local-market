import React from 'react';
import { Icon, Typography } from '../../atoms';

export interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBranding?: boolean;
  backgroundImage?: string;
  className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title = 'HyperLocal',
  subtitle = 'Fresh groceries from local stores, delivered fast',
  showBranding = true,
  backgroundImage,
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex ${className}`}>
      {/* Left Side - Branding */}
      {showBranding && (
        <div
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-green-700 p-12 items-center justify-center relative overflow-hidden"
          style={
            backgroundImage
              ? {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined
          }
        >
          {!backgroundImage && (
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>
          )}

          <div className="relative z-10 text-white max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="ShoppingBag" size={48} color="white" />
              <Typography variant="h2" weight="bold" className="text-white">
                {title}
              </Typography>
            </div>
            <Typography variant="h4" className="text-white mb-4">
              {subtitle}
            </Typography>
            <Typography variant="body" className="text-white opacity-90">
              Connect with local kirana stores in your neighborhood. Fresh products, quick delivery, supporting your community.
            </Typography>

            {/* Feature List */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <Typography variant="body" className="text-white">
                  10-minute delivery from nearby stores
                </Typography>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} color="white" />
                </div>
                <Typography variant="body" className="text-white">
                  Fresh products, quality guaranteed
                </Typography>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={20} color="white" />
                </div>
                <Typography variant="body" className="text-white">
                  Support local businesses in your area
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right Side - Form Content */}
      <div className={`flex-1 flex items-center justify-center p-8 bg-gray-50 ${showBranding ? 'lg:w-1/2' : 'w-full'}`}>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};