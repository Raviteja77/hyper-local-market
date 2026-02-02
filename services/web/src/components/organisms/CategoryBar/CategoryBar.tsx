import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Typography } from '../../atoms';

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface CategoryBarProps {
  categories: Category[];
  activeCategory?: string;
  onCategoryClick?: (categoryId: string) => void;
  className?: string;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  activeCategory,
  onCategoryClick,
  className = '',
}) => {
  return (
    <div
      className={`w-full bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide ${className}`}
    >
      <div className="flex flex-nowrap">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const IconComponent = category.icon;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryClick?.(category.id)}
              className={`
                flex flex-col items-center justify-center gap-1 px-4 py-3 min-w-fit
                border-b-2 transition-all duration-300 ease-in-out
                ${
                  isActive
                    ? 'border-primary bg-primary-light'
                    : 'border-transparent hover:text-primary hover:bg-gray-50'
                }
              `}
            >
              <IconComponent
                size={20}
                className={isActive ? 'text-primary' : 'text-gray-600'}
              />
              <Typography
                variant="caption"
                weight={isActive ? 'semibold' : 'regular'}
                color={isActive ? 'primary' : 'secondary'}
                className="text-xs whitespace-nowrap"
              >
                {category.label}
              </Typography>
            </button>
          );
        })}
      </div>
    </div>
  );
};
