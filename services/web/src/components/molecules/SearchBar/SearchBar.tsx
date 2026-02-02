import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button, Input } from '../../atoms';

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  showButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search products...',
  onSearch,
  showButton = true,
  size = 'md',
  className = '',
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-1 flex items-center bg-white rounded-full px-4 py-2 h-10 focus-within:ring-2 focus-within:ring-primary-light transition-all duration-150 border border-gray-200">
        <div className="flex-shrink-0">
          <Search size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} color="#6B7280" />
        </div>
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          size={size}
          fullWidth
          className="pl-2 bg-transparent border-0 focus:ring-0"
        />
      </div>
      {showButton && (
        <Button variant="primary" size={size} onClick={handleSearch}>
          Search
        </Button>
      )}
    </div>
  );
};