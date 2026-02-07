// services/web/src/components/molecules/ValuePropCard/ValuePropCard.tsx
'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ValuePropCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  iconColor?: string;
  iconBgColor?: string;
}

export const ValuePropCard: React.FC<ValuePropCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  iconColor = 'text-primary',
  iconBgColor = 'bg-primary-light',
}) => {
  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200">
      {/* Icon container */}
      <div className={`${iconBgColor}-full p-3 flex-shrink-0`}>
        <Icon className={`${iconColor} w-6 h-6`} />
      </div>

      {/* Text content */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">
          {title}
        </span>
        <span className="text-xs text-gray-500">
          {subtitle}
        </span>
      </div>
    </div>
  );
};
