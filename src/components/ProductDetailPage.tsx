import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from './ui/Button';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import ProductDetails from './ProductDetails';
import FeaturedProducts from './FeaturedProducts';
import { getProductById } from '../utils/supabaseClient';

interface ProductDetailPageProps {
  productId: number;
  initialProductData?: any;
  initialError?: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  productId, 
  initialProductData, 
  initialError 
}) => {
  const router = useRouter();
  const { addItem } = useCartStore();
  
  // استخدام useState لتخزين المنتج بعد تحميله
  const [productData, setProductData] = useState<{
    product: any | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    product: initialProductData || null,
    isLoading: !initialProductData && !initialError,
    error: initialError ? new Error(initialError) : null
  });
  
  // استخدام useEffect لضمان أننا نشغل هذا على جانب العميل فقط
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // استخدام useEffect لتحميل المنتج إذا لم يكن لدينا بيانات أولية
  useEffect(() => {
    // إذا كان لدينا بيانات أولية، لا حاجة للتحميل مرة أخرى
    if (initialProductData || !productId) return;
    
    const fetchProduct = async () => {
      try {
        setProductData(prev => ({ ...prev, isLoading: true }));
        
        // استخدام الوظيفة المباشرة للحصول على المنتج
        const product = await getProductById(productId);
        
        setProductData({
          product,
          isLoading: false,
          error: null
        });
      } catch (error) {
        setProductData({
          product: null,
          isLoading: false,
          error: error as Error
        });
      }
    };
    
    fetchProduct();
  }, [productId, initialProductData]);
  
  const { product, isLoading, error } = productData;

  // عرض شاشة تحميل إذا كنا على الخادم أو البيانات قيد التحميل
  if (!isClient || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // عرض رسالة خطأ إذا حدث خلل في تحميل المنتج
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">خطأ في تحميل المنتج</h2>
          <p>{error.message || 'لم نتمكن من تحميل هذا المنتج. يرجى المحاولة مرة أخرى لاحقًا.'}</p>
          <Button
            onClick={() => router.push('/products')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
          >
            العودة إلى المنتجات
          </Button>
        </div>
      </div>
    );
  }

  // عرض المنتج إذا تم تحميله بنجاح
  if (product) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* استخدام مكون تفاصيل المنتج */}
        <ProductDetails 
          product={product} 
          onBack={() => router.back()} 
        />
        
        {/* قسم المنتجات المشابهة */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">قد يعجبك أيضًا</h2>
          <FeaturedProducts />
        </div>
      </div>
    );
  }

  // إذا لم يكن لدينا منتج (ولا أخطاء ولا تحميل)، نعرض رسالة بسيطة
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <p className="text-gray-600 dark:text-gray-400">لم يتم العثور على المنتج</p>
      <Button
        onClick={() => router.push('/products')}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
      >
        تصفح المنتجات
      </Button>
    </div>
  );
};

export default ProductDetailPage;