'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { orderTrackingClient, notificationClient } from '../websocket/client';
import { useAuthStore } from '@/store';

interface WebSocketContextValue {
  isOrderTrackingConnected: boolean;
  isNotificationConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextValue>({
  isOrderTrackingConnected: false,
  isNotificationConnected: false,
});

export function useWebSocket() {
  return useContext(WebSocketContext);
}

interface WebSocketProviderProps {
  children: React.ReactNode;
}

/**
 * WebSocket Provider component.
 * 
 * Manages WebSocket connections for order tracking and notifications.
 * Automatically connects when user is authenticated and disconnects on logout.
 */
export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [isOrderTrackingConnected, setIsOrderTrackingConnected] = useState(false);
  const [isNotificationConnected, setIsNotificationConnected] = useState(false);
  const { accessToken, user } = useAuthStore();

  useEffect(() => {
    if (!accessToken || !user) {
      // Disconnect if not authenticated
      orderTrackingClient.disconnect();
      notificationClient.disconnect();
      return;
    }

    // Connect to WebSocket servers
    orderTrackingClient.connect(accessToken);
    notificationClient.connect(accessToken);

    // Subscribe to connection status
    const unsubscribeOrderTracking = orderTrackingClient.onConnectionStatusChange(
      setIsOrderTrackingConnected
    );
    const unsubscribeNotification = notificationClient.onConnectionStatusChange(
      setIsNotificationConnected
    );

    return () => {
      unsubscribeOrderTracking();
      unsubscribeNotification();
    };
  }, [accessToken, user]);

  return (
    <WebSocketContext.Provider
      value={{
        isOrderTrackingConnected,
        isNotificationConnected,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}
