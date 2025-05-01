import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';
import { Database } from '@/utils/types';

// استخدام الأسرار البيئية إذا كانت موجودة
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMzA5ODI0MCwiZXhwIjoxOTM4MTU0MjQwfQ.S-MJF5spP6aRhVCUAzMSH9KK9gLyCaOBaYDA_bJyHm8';

// إنشاء عميل Supabase
const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

// إنشاء عميل React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" />
          <div suppressHydrationWarning>
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </SessionContextProvider>
    </>
  );
}

export default MyApp;
