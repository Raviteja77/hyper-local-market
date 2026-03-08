// services/web/src/lib/hooks/useWebSocket.ts
import { useEffect, useRef, useState, useCallback } from 'react';
import { useAuthStore } from '@/store';
import { useOrderStore } from '@/store';
import { OrderStatus } from '@/components/molecules';

const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws';

type WebSocketMessage = {
  type: 'order_status' | 'rider_location' | 'notification' | 'ping' | 'pong';
  data: any;
};

interface RiderLocation {
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface OrderStatusUpdate {
  orderId: string;
  status: OrderStatus;
  riderName?: string;
  riderPhone?: string;
  estimatedTime?: string;
}

export const useWebSocket = (channel?: string) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const [riderLocation, setRiderLocation] = useState<RiderLocation | null>(null);

  const { accessToken, user } = useAuthStore();
  const { updateOrderStatus, updateOrder } = useOrderStore();

  // Connect to WebSocket
  const connect = useCallback(() => {
    if (!accessToken || !user) {
      console.log('No auth token, skipping WebSocket connection');
      return;
    }

    // Determine channel based on user role or provided channel
    let wsChannel = channel;
    if (!wsChannel) {
      wsChannel = user.role === 'buyer' ? 'buyer' : user.role === 'seller' ? 'seller' : user.role === 'rider' ? 'rider' : 'general';
    }

    const wsUrl = `${WS_BASE_URL}/${wsChannel}/?token=${accessToken}`;

    try {
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);

        // Send ping every 30 seconds to keep connection alive
        const pingInterval = setInterval(() => {
          if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ type: 'ping' }));
          }
        }, 30000);

        // Store interval ID to clear on disconnect
        (ws.current as any).pingInterval = pingInterval;
      };

      ws.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          setLastMessage(message);
          handleMessage(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);

        // Clear ping interval
        if ((ws.current as any)?.pingInterval) {
          clearInterval((ws.current as any).pingInterval);
        }

        // Attempt reconnection after 3 seconds
        reconnectTimeout.current = setTimeout(() => {
          console.log('Attempting to reconnect WebSocket...');
          connect();
        }, 3000);
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, user, channel]);

  // Handle incoming messages
  const handleMessage = (message: WebSocketMessage) => {
    switch (message.type) {
      case 'order_status':
        handleOrderStatusUpdate(message.data);
        break;
      case 'rider_location':
        handleRiderLocationUpdate(message.data);
        break;
      case 'notification':
        handleNotification(message.data);
        break;
      case 'pong':
        // Connection is alive
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  };

  // Handle order status updates
  const handleOrderStatusUpdate = (data: OrderStatusUpdate) => {
    const { orderId, status, riderName, riderPhone, estimatedTime } = data;

    updateOrderStatus(orderId, status);

    if (riderName || riderPhone || estimatedTime) {
      updateOrder(orderId, {
        riderName,
        riderPhone,
        estimatedTime,
      });
    }

    console.log(`Order ${orderId} status updated to ${status}`);
  };

  // Handle rider location updates
  const handleRiderLocationUpdate = (data: RiderLocation) => {
    setRiderLocation(data);
    console.log('Rider location updated:', data);
  };

  // Handle notifications
  const handleNotification = (data: any) => {
    console.log('Notification received:', data);
    // You can integrate with toast notifications here
  };

  // Send message through WebSocket
  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }, []);

  // Disconnect WebSocket
  const disconnect = useCallback(() => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
    }

    if ((ws.current as any)?.pingInterval) {
      clearInterval((ws.current as any).pingInterval);
    }

    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }

    setIsConnected(false);
  }, []);

  // Connect on mount, disconnect on unmount
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    lastMessage,
    riderLocation,
    sendMessage,
    disconnect,
    reconnect: connect,
  };
};

// Specific hook for order tracking
export const useOrderTracking = (orderId: string) => {
  const { lastMessage, riderLocation, isConnected } = useWebSocket('orders');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);

  useEffect(() => {
    if (lastMessage?.type === 'order_status' && lastMessage.data.orderId === orderId) {
      setOrderStatus(lastMessage.data.status);
    }
  }, [lastMessage, orderId]);

  return {
    orderStatus,
    riderLocation,
    isConnected,
  };
};

// Specific hook for rider location tracking
export const useRiderTracking = (orderId?: string) => {
  const { riderLocation, isConnected } = useWebSocket('rider');

  return {
    riderLocation,
    isConnected,
  };
};