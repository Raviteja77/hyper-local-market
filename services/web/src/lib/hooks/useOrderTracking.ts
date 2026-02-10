import { useEffect, useState, useCallback } from 'react';
import { orderTrackingClient, OrderUpdateEvent, OrderStatusChangedEvent, WebSocketEvent } from '../websocket/client';
import { useAuthStore } from '@/store';

/**
 * Hook for real-time order tracking via WebSocket.
 * 
 * @param orderId - Order ID to track (optional)
 * @returns Object with connection status and order update handlers
 */
export function useOrderTracking(orderId?: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<WebSocketEvent | null>(null);
  const { accessToken } = useAuthStore();

  // Handle WebSocket events
  const handleEvent = useCallback((event: WebSocketEvent) => {
    setLastUpdate(event);
    
    // Log different event types
    switch (event.type) {
      case 'order_update':
        console.log('[Order Tracking] Order updated:', event);
        break;
      case 'order_status_changed':
        console.log('[Order Tracking] Status changed:', event);
        break;
      case 'rider_location_update':
        console.log('[Order Tracking] Rider location:', event);
        break;
    }
  }, []);

  // Connect to WebSocket
  useEffect(() => {
    if (!accessToken) {
      return;
    }

    // Connect to order tracking WebSocket
    orderTrackingClient.connect(accessToken);

    // Subscribe to connection status changes
    const unsubscribeStatus = orderTrackingClient.onConnectionStatusChange(setIsConnected);

    // Subscribe to events
    const unsubscribeEvents = orderTrackingClient.on(handleEvent);

    return () => {
      unsubscribeStatus();
      unsubscribeEvents();
    };
  }, [accessToken, handleEvent]);

  // Subscribe to specific order
  useEffect(() => {
    if (!orderId || !isConnected) {
      return;
    }

    orderTrackingClient.subscribeToOrder(orderId);

    return () => {
      orderTrackingClient.unsubscribeFromOrder(orderId);
    };
  }, [orderId, isConnected]);

  return {
    isConnected,
    lastUpdate,
  };
}

/**
 * Hook for handling order status changes.
 * 
 * @param orderId - Order ID to track
 * @param onStatusChange - Callback when status changes
 */
export function useOrderStatusUpdates(
  orderId: string,
  onStatusChange?: (event: OrderStatusChangedEvent) => void
) {
  const { lastUpdate } = useOrderTracking(orderId);

  useEffect(() => {
    if (lastUpdate?.type === 'order_status_changed' && onStatusChange) {
      onStatusChange(lastUpdate);
    }
  }, [lastUpdate, onStatusChange]);
}

/**
 * Hook for handling order updates.
 * 
 * @param onUpdate - Callback when order is updated
 */
export function useOrderUpdates(
  onUpdate?: (event: OrderUpdateEvent) => void
) {
  const { lastUpdate } = useOrderTracking();

  useEffect(() => {
    if (lastUpdate?.type === 'order_update' && onUpdate) {
      onUpdate(lastUpdate);
    }
  }, [lastUpdate, onUpdate]);
}
