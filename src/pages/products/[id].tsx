import React from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';

// تحميل صفحة المنتج بالكامل على جانب العميل فقط (بدون تصيير على الخادم)
const ProductDetailPageClient = dynamic(
  () => import('../../components/ProductDetailPage'),
  { ssr: false }
);

const ProductDetailPage: React.FC = () => {
  return (
    <Layout title="تفاصيل المنتج | EasyShop" description="تفاصيل المنتج">
      <ProductDetailPageClient />
    </Layout>
  );
};

export default ProductDetailPage;
