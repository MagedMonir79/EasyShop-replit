import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import NoSSR from '../../components/NoSSR';
import ProductDetailPage from '../../components/ProductDetailPage';
import { getProductById } from '../../utils/supabaseClient';

// تعريف واجهة البيانات
interface ProductPageProps {
  productId: number;
  initialProductData?: any;
  error?: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId, initialProductData, error }) => {
  return (
    <Layout 
      title={initialProductData ? `${initialProductData.name} | EasyShop` : "تفاصيل المنتج | EasyShop"}
      description={initialProductData?.description || "تفاصيل المنتج في متجر EasyShop"}
    >
      <NoSSR>
        <ProductDetailPage 
          productId={productId} 
          initialProductData={initialProductData}
          initialError={error}
        />
      </NoSSR>
    </Layout>
  );
};

// تحميل البيانات الأولية على الخادم
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  
  if (!id || Array.isArray(id)) {
    return {
      props: {
        productId: 0,
        error: "معرف المنتج غير صالح"
      }
    };
  }
  
  const productId = parseInt(id, 10);
  
  if (isNaN(productId)) {
    return {
      props: {
        productId: 0,
        error: "معرف المنتج يجب أن يكون رقمًا"
      }
    };
  }
  
  try {
    // محاولة تحميل المنتج من الخادم
    const productData = await getProductById(productId);
    
    return {
      props: {
        productId,
        initialProductData: JSON.parse(JSON.stringify(productData)) // التعامل مع التواريخ وبيانات JSON غير القياسية
      }
    };
  } catch (err) {
    // إرجاع الخطأ إذا فشل التحميل
    return {
      props: {
        productId,
        error: "لم يتم العثور على المنتج"
      }
    };
  }
};

export default ProductPage;
