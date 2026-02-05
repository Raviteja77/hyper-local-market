import React from 'react';
import { Typography } from '../../atoms';
import { OrderStatus, OrderStatusBadge } from '../../molecules';
import { Bike, Phone, Check, XCircle } from 'lucide-react';

export interface OrderStep {
  status: OrderStatus;
  label: string;
  timestamp?: string;
  description?: string;
}

export interface OrderTrackerProps {
  currentStatus: OrderStatus;
  steps?: OrderStep[];
  orderId?: string;
  estimatedTime?: string;
  riderName?: string;
  riderPhone?: string;
  className?: string;
}

const defaultSteps: OrderStep[] = [
  { status: 'pending', label: 'Order Placed' },
  { status: 'confirmed', label: 'Confirmed' },
  { status: 'preparing', label: 'Preparing' },
  { status: 'ready', label: 'Ready for Pickup' },
  { status: 'picked_up', label: 'Picked Up' },
  { status: 'out_for_delivery', label: 'Out for Delivery' },
  { status: 'delivered', label: 'Delivered' },
];

const statusOrder: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'picked_up',
  'out_for_delivery',
  'delivered',
];

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  currentStatus,
  steps = defaultSteps,
  orderId,
  estimatedTime,
  riderName,
  riderPhone,
  className = '',
}) => {
  const currentIndex = statusOrder.indexOf(currentStatus);
  const isCancelled = currentStatus === 'cancelled';

  return (
    <div className={`bg-white-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          {orderId && (
            <Typography variant="caption" color="muted" className="mb-1">
              Order ID: {orderId}
            </Typography>
          )}
          <OrderStatusBadge status={currentStatus} size="lg" />
        </div>
        {estimatedTime && !isCancelled && (
          <div className="text-right">
            <Typography variant="caption" color="muted">
              Estimated Time
            </Typography>
            <Typography variant="h4" weight="bold" color="primary">
              {estimatedTime}
            </Typography>
          </div>
        )}
      </div>

      {/* Rider Info */}
      {riderName && !isCancelled && (
        <div className="flex items-center gap-3 p-3 bg-gray-50-lg mb-6">
          <div className="w-10 h-10 bg-primary-full flex items-center justify-center">
            <Bike size={20} color="white" />
          </div>
          <div className="flex-1">
            <Typography variant="caption" color="muted">
              Delivery Partner
            </Typography>
            <Typography variant="body" weight="semibold">
              {riderName}
            </Typography>
          </div>
          {riderPhone && (
            <a href={`tel:${riderPhone}`}>
              <button className="p-2 hover:bg-gray-200-lg transition-colors">
                <Phone size={20} color="#10B981" />
              </button>
            </a>
          )}
        </div>
      )}

      {/* Timeline */}
      {!isCancelled ? (
        <div className="space-y-4">
          {steps.map((step, index) => {
            const stepIndex = statusOrder.indexOf(step.status);
            const isCompleted = stepIndex <= currentIndex;
            const isCurrent = stepIndex === currentIndex;

            return (
              <div key={step.status} className="flex gap-4">
                {/* Icon */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-primary'
                        : 'bg-gray-200'
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={20} color="white" />
                    ) : (
                      <div className="w-3 h-3 bg-gray-400-full" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-12 ${
                        isCompleted ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <Typography
                    variant="body"
                    weight={isCurrent ? 'bold' : 'medium'}
                    color={isCompleted ? 'primary' : 'muted'}
                  >
                    {step.label}
                  </Typography>
                  {step.timestamp && (
                    <Typography variant="caption" color="muted" className="mt-1">
                      {step.timestamp}
                    </Typography>
                  )}
                  {step.description && (
                    <Typography variant="caption" color="muted" className="mt-1">
                      {step.description}
                    </Typography>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <XCircle size={64} color="#EF4444" className="mx-auto mb-4" />
          <Typography variant="h4" color="error" className="mb-2">
            Order Cancelled
          </Typography>
          <Typography variant="body" color="muted">
            This order has been cancelled. Refund will be processed within 3-5 business days.
          </Typography>
        </div>
      )}
    </div>
  );
};