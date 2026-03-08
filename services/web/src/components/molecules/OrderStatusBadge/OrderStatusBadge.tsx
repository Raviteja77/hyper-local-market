import React from 'react';
import { Clock, CheckCircle, PackageOpen, Truck, XCircle, Bike, Package } from 'lucide-react';
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
  variant: 'discount' | 'delivery' | 'stock' | 'error' | 'info' | 'default';
  icon: LucideIcon;
}> = {
  pending: {
    label: 'Pending',
    variant: 'info',
    icon: Clock,
  },
  confirmed: {
    label: 'Confirmed',
    variant: 'info',
    icon: CheckCircle,
  },
  preparing: {
    label: 'Preparing',
    variant: 'default',
    icon: PackageOpen,
  },
  ready: {
    label: 'Ready for Pickup',
    variant: 'stock',
    icon: Package,
  },
  picked_up: {
    label: 'Picked Up',
    variant: 'delivery',
    icon: Bike,
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    variant: 'delivery',
    icon: Truck,
  },
  delivered: {
    label: 'Delivered',
    variant: 'delivery',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'error',
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
    <Badge variant={config.variant} className={className}>
      <div className="flex items-center gap-1.5">
        {showIcon && <IconComponent size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />}
        <span>{config.label}</span>
      </div>
    </Badge>
  );
};