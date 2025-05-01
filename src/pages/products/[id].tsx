import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import ProductDetailPage from '../../components/ProductDetailPage';

// بيانات تجريبية ثابتة للمنتجات
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "هاتف ذكي متطور",
    description: "هاتف ذكي بأحدث المواصفات التقنية وكاميرا متطورة",
    price: 699.99,
    image_url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 15,
    is_featured: true,
    created_at: "2023-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    name: "حاسوب محمول للمحترفين",
    description: "حاسوب محمول بمعالج قوي ومساحة تخزين كبيرة مناسب للأعمال والألعاب",
    price: 1299.99,
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 8,
    is_featured: true,
    created_at: "2023-01-02T00:00:00.000Z"
  },
  {
    id: 3,
    name: "سماعات رأس لاسلكية",
    description: "سماعات رأس لاسلكية مع خاصية إلغاء الضوضاء وجودة صوت عالية",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 20,
    is_featured: true,
    created_at: "2023-01-03T00:00:00.000Z"
  },
  {
    id: 4,
    name: "كاميرا احترافية",
    description: "كاميرا رقمية احترافية لالتقاط أفضل الصور واللحظات",
    price: 899.99,
    image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 5,
    is_featured: true,
    created_at: "2023-01-04T00:00:00.000Z"
  },
  {
    id: 5,
    name: "طاولة قهوة خشبية",
    description: "طاولة قهوة أنيقة مصنوعة من الخشب الطبيعي بتصميم عصري",
    price: 249.99,
    image_url: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=500",
    category_id: 2,
    category: "أثاث",
    stock: 12,
    is_featured: false,
    created_at: "2023-01-05T00:00:00.000Z"
  },
  {
    id: 6,
    name: "ساعة ذكية متطورة",
    description: "ساعة ذكية متعددة الاستخدامات لتتبع اللياقة البدنية والإشعارات",
    price: 299.99,
    image_url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
    category_id: 1,
    category: "إلكترونيات",
    stock: 18,
    is_featured: true,
    created_at: "2023-01-06T00:00:00.000Z"
  }
];

// تعريف واجهة البيانات
interface ProductPageProps {
  productId: number;
  initialProductData?: any;
  error?: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId, initialProductData, error }) => {
  // استخدام React.useId لحل مشاكل الهايدريشن
  const stableKey = React.useId();

  return (
    <Layout 
      title={initialProductData ? `${initialProductData.name} | EasyShop` : "تفاصيل المنتج | EasyShop"}
      description={initialProductData?.description || "تفاصيل المنتج في متجر EasyShop"}
    >
      <div key={stableKey} suppressHydrationWarning>
        <ProductDetailPage 
          productId={productId} 
          initialProductData={initialProductData}
          initialError={error}
        />
      </div>
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
  
  // البحث عن المنتج في البيانات المحلية أولاً للتأكد من تطابق الخادم والعميل
  const mockProduct = MOCK_PRODUCTS.find(p => p.id === productId);
  
  if (mockProduct) {
    return {
      props: {
        productId,
        initialProductData: mockProduct
      }
    };
  }
  
  // في حالة عدم وجود المنتج في البيانات المحلية
  return {
    props: {
      productId,
      error: "لم يتم العثور على المنتج"
    }
  };
};

export default ProductPage;
