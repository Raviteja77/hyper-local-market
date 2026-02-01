import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, X, Menu, MapPin, ChevronDown } from 'lucide-react';
import { Avatar, Badge, Button, Typography } from '../../atoms';
import { SearchBar } from '../../molecules';

export interface NavbarProps {
  brandName?: string;
  cartItemCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  showSearch?: boolean;
  currentAddress?: string;  // e.g. "Koramangala, Bengaluru"
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onLoginClick?: () => void;
  onLogoClick?: () => void;
  onProfileClick?: () => void;
  onLocationClick?: () => void;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  brandName = 'HyperLocal',
  cartItemCount = 0,
  isLoggedIn = false,
  userName,
  userAvatar,
  showSearch = true,
  currentAddress,
  onSearch,
  onCartClick,
  onLoginClick,
  onLogoClick,
  onProfileClick,
  onLocationClick,
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <ShoppingBag size={28} color="#10B981" />
            <Typography variant="h4" weight="bold" color="primary">
              {brandName}
            </Typography>
          </div>

          {/* Location Selector - Desktop */}
          {currentAddress && (
            <button
              onClick={onLocationClick}
              aria-label="Select delivery location"
              className="hidden md:flex items-center gap-2 px-3 py-2 ml-4 
                hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
            >
              <MapPin size={18} className="text-primary" />
              <div className="flex flex-col items-start">
                <Typography variant="caption" color="muted" className="text-xs">
                  Deliver to
                </Typography>
                <Typography variant="small" weight="medium" className="text-sm">
                  {currentAddress}
                </Typography>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
          )}

          {/* Desktop Search */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <SearchBar 
                onSearch={onSearch} 
                placeholder="Search products, stores..."
                showButton={false}
              />
            </div>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart size={24} color="#374151" />
              {cartItemCount > 0 && (
                <div className="absolute -top-1 -right-1">
                  <Badge variant="danger" size="sm" rounded>
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </Badge>
                </div>
              )}
            </button>

            {/* User */}
            {isLoggedIn ? (
              <button
                onClick={onProfileClick}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Avatar src={userAvatar} alt={userName} size="sm" />
                <Typography variant="small" weight="medium">
                  {userName}
                </Typography>
              </button>
            ) : (
              <Button variant="primary" size="sm" onClick={onLoginClick}>
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden pb-3">
            <SearchBar 
              onSearch={onSearch} 
              placeholder="Search..."
              showButton={false}
              size="sm"
            />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            {/* Location Selector - Mobile */}
            {currentAddress && (
              <button
                onClick={onLocationClick}
                aria-label="Select delivery location"
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  <div className="flex flex-col items-start">
                    <Typography variant="caption" color="muted" className="text-xs">
                      Deliver to
                    </Typography>
                    <Typography variant="small" weight="medium" className="text-sm">
                      {currentAddress}
                    </Typography>
                  </div>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            )}

            <button
              onClick={onCartClick}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} />
                <Typography variant="body">Cart</Typography>
              </div>
              {cartItemCount > 0 && (
                <Badge variant="danger" size="sm" rounded>
                  {cartItemCount}
                </Badge>
              )}
            </button>

            {isLoggedIn ? (
              <button
                onClick={onProfileClick}
                className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg"
              >
                <Avatar src={userAvatar} alt={userName} size="sm" />
                <Typography variant="body">{userName}</Typography>
              </button>
            ) : (
              <Button variant="primary" fullWidth onClick={onLoginClick}>
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};