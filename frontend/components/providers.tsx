'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from './auth-context';
import { SocketProvider } from './socket-provider';
import { I18nProvider } from './i18n-context';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SocketProvider>{children}</SocketProvider>
        </AuthProvider>
        <Toaster position="top-right" richColors />
      </QueryClientProvider>
    </I18nProvider>
  );
}
