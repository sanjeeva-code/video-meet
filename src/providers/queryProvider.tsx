'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'

export default function QueryProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
