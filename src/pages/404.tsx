import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Button } from '../components/ui/Button';

// استخدام نهج بسيط لحل مشكلة hydration
const NotFoundPage: React.FC = () => {
  // إنشاء حالة لتتبع ما إذا كنا على جانب العميل أم لا
  const [isClient, setIsClient] = useState(false);
  
  // تعيين isClient إلى true عند تحميل المكون على جانب المتصفح
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // إذا لم نكن على جانب العميل، ارجع شاشة تحميل
  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <div className="w-24 h-24 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }
  
  // بخلاف ذلك، نعرض صفحة 404
  return (
    <Layout title="الصفحة غير موجودة | إيزي شوب">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-6">الصفحة غير موجودة</h2>
          <p className="text-gray-600 mb-8">
            الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/">
              <Button>الصفحة الرئيسية</Button>
            </Link>
            <Link href="/products">
              <Button variant="outline">تصفح المنتجات</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
