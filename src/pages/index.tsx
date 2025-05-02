import React from 'react';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';

// Load the homepage component dynamically to avoid hydration issues
const DynamicHomePage = dynamic(() => import('./homepage'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <div className="w-24 h-24 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-lg">Loading the store...</p>
      </div>
    </div>
  ),
});

// Export the dynamic component as the main page component
const IndexPage = () => (
  <div suppressHydrationWarning>
    <DynamicHomePage />
    <Toaster position="bottom-center" />
  </div>
);

export default IndexPage;