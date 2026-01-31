import React from 'react';
import { Clock, CheckCircle, PackageOpen, Truck, XCircle } from 'lucide-react';
import { Badge } from '../../atoms';
import type { LucideIcon } from 'lucide-react';

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
  icon: LucideIcon;
}> = {
  pending: {
    label: 'Pending',
    variant: 'warning',
    icon: Clock,
  },
  confirmed: {
    label: 'Confirmed',
    variant: 'info',
    icon: CheckCircle,
  },
  preparing: {
    label: 'Preparing',
    variant: 'secondary',
    icon: PackageOpen,
  },
  ready: {
    label: 'Ready for Pickup',
    variant: 'primary',
    icon: CheckCircle,
  },
  picked_up: {
    label: 'Picked Up',
    variant: 'primary',
    icon: CheckCircle,
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    variant: 'secondary',
    icon: Truck,
  },
  delivered: {
    label: 'Delivered',
    variant: 'success',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'danger',
    icon: XCircle,
  },
};

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  showIcon = true,
  size = 'md',
  className = '',
}) => {
  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <Badge variant={config.variant} size={size} className={className}>
      <div className="flex items-center gap-1.5">
        {showIcon && <IconComponent size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />}
        <span>{config.label}</span>
      </div>
    </Badge>
  );
};