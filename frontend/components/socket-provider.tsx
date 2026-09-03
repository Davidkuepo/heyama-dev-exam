'use client';

import React, { createContext, useContext, useEffect, ReactNode, useState } from 'react';

const SocketContext = createContext<any>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    try {
      // Lazy load socket.io-client to avoid SSR issues
      const initSocket = async () => {
        const { default: io } = await import('socket.io-client');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        const newSocket = io(`${apiUrl}/objects`, {
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5,
        });

        newSocket.on('connect', () => {
          console.log('✅ Connected to WebSocket');
        });

        newSocket.on('disconnect', () => {
          console.log('❌ Disconnected from WebSocket');
        });

        newSocket.on('error', (error: any) => {
          console.error('WebSocket error:', error);
        });

        setSocket(newSocket);
      };

      initSocket();
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
    }
  }, [mounted]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const socket = useContext(SocketContext);
  return socket;
}
