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
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
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
          className="pl-10"
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