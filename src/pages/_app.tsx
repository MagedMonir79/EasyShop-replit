import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';
import { Database } from '@/utils/types';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// استخدام عنوان URL ثابت للتطوير فقط
const supabaseUrl = 'https://example.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMzA5ODI0MCwiZXhwIjoxOTM4MTU0MjQwfQ.S-MJF5spP6aRhVCUAzMSH9KK9gLyCaOBaYDA_bJyHm8';

// إنشاء عميل Supabase
const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
