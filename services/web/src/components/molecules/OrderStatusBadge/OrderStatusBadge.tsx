import React from 'react';
import { Badge, Icon, IconName } from '../../atoms';

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'picked_up'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderStatusBadgeProps {
  status: OrderStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig: Record<OrderStatus, {
  label: string;
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  icon: IconName;
}> = {
  pending: {
    label: 'Pending',
    variant: 'warning',
    icon: 'Clock',
  },
  confirmed: {
    label: 'Confirmed',
    variant: 'info',
    icon: 'CheckCircle',
  },
  preparing: {
    label: 'Preparing',
    variant: 'secondary',
    icon: 'PackageOpen',
  },
  ready: {
    label: 'Ready for Pickup',
    variant: 'primary',
    icon: 'PackageCheck',
  },
  picked_up: {
    label: 'Picked Up',
    variant: 'primary',
    icon: 'Bike',
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    variant: 'secondary',
    icon: 'Truck',
  },
  delivered: {
    label: 'Delivered',
    variant: 'success',
    icon: 'CheckCircle',
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'danger',
    icon: 'XCircle',
  },
};

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  showIcon = true,
  size = 'md',
  className = '',
}) => {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size={size} className={className}>
      <div className="flex items-center gap-1.5">
        {showIcon && <Icon name={config.icon} size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />}
        <span>{config.label}</span>
      </div>
    </Badge>
  );
};