import React from 'react';
import Link from 'next/link';
import Layout from './Layout';
import { Button } from './ui/Button';

const NotFoundPage: React.FC = () => {
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