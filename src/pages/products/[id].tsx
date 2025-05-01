import React from 'react';
import Layout from '../../components/Layout';
import NoSSR from '../../components/NoSSR';
import ProductDetailPage from '../../components/ProductDetailPage';

const ProductPage: React.FC = () => {
  return (
    <Layout title="تفاصيل المنتج | EasyShop" description="تفاصيل المنتج">
      <NoSSR>
        <ProductDetailPage />
      </NoSSR>
    </Layout>
  );
};

export default ProductPage;
