import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from './Layout';
import { Button } from './ui/Button';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import ProductDetails from './ProductDetails';
import FeaturedProducts from './FeaturedProducts';
import NoSSR from './NoSSR';

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addItem } = useCartStore();
  
  // استخدام useState لتخزين المنتج بعد تحميله
  const [productData, setProductData] = useState<{
    product: any | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    product: null,
    isLoading: true,
    error: null
  });
  
  // استخدام useEffect لتحميل المنتج
  useEffect(() => {
    // التأكد من وجود معرف المنتج قبل الاستعلام
    if (!id) return;
    
    const fetchProduct = async () => {
      try {
        setProductData(prev => ({ ...prev, isLoading: true }));
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('المنتج غير موجود');
        }
        
        const data = await response.json();
        setProductData({
          product: data.product,
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
  }, [id]);
  
  const { product, isLoading, error } = productData;

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg h-96"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-500 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">خطأ في تحميل المنتج</h2>
          <p>لم نتمكن من تحميل هذا المنتج. يرجى المحاولة مرة أخرى لاحقًا.</p>
          <Button
            onClick={() => router.push('/products')}
            className="mt-4"
          >
            العودة إلى المنتجات
          </Button>
        </div>
      ) : product ? (
        <>
          {/* استخدام مكون تفاصيل المنتج */}
          <ProductDetails 
            product={product} 
            onBack={() => router.back()} 
          />
          
          {/* قسم المنتجات المشابهة */}
          <h2 className="text-2xl font-bold mb-6">قد يعجبك أيضًا</h2>
          <NoSSR>
            <FeaturedProducts />
          </NoSSR>
        </>
      ) : null}
    </div>
  );
};

export default ProductDetailPage;