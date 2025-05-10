import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

import '../styles/globals.css';
import '../styles/animations.css';
import { Database } from '../utils/types';
import { initializeLanguageStore, useLanguageStore } from '../store/languageStore';
import NoSSR from '../components/NoSSR';

// Using Supabase environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Log warning if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Authentication functionality will not work correctly.');
}

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

function AppContent({ Component, pageProps }: {
  Component: AppProps['Component'];
  pageProps: AppProps['pageProps'];
}) {
  // تهيئة مخزن اللغة بعد تحميل التطبيق في جانب العميل
  useEffect(() => {
    initializeLanguageStore();
  }, []);

  // الحصول على حالة اللغة الحالية
  const { language, direction, isInitialized } = useLanguageStore();

  // مؤقتًا عرض رسالة تحميل حتى تتم تهيئة مخزن اللغة
  if (!isInitialized) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" />
          <div suppressHydrationWarning>
            <NoSSR fallback={
              <div className="h-screen w-screen flex items-center justify-center">
                Loading EasyShop...
              </div>
            }>
              <AppContent Component={Component} pageProps={pageProps} />
            </NoSSR>
          </div>
        </QueryClientProvider>
      </SessionContextProvider>
    </>
  );
}

export default MyApp;
