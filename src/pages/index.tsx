import React from 'react';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';

// تحميل صفحة المنتجات الرئيسية بشكل ديناميكي وتعطيل SSR
// لحل مشكلة hydration
const DynamicHomePage = dynamic(() => import('./homepage'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <div className="w-24 h-24 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-lg">جاري تحميل المتجر...</p>
      </div>
    </div>
  ),
});

// تصدير المكون الديناميكي كمكون الصفحة الرئيسية
const IndexPage = () => (
  <div suppressHydrationWarning>
    <DynamicHomePage />
    <Toaster position="bottom-center" />
  </div>
);

export default IndexPage;