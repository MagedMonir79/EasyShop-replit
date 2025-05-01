import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { Button } from '../../components/ui/Button';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

// تحميل جميع المكونات التي تتطلب بيانات ديناميكية بشكل ديناميكي
const FeaturedProducts = dynamic(
  () => import('../../components/FeaturedProducts'),
  { ssr: false }
);

// مكون ديناميكي لتفاصيل المنتج
const ProductDetails = dynamic(
  () => import('../../components/ProductDetails'),
  { ssr: false }
);

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addItem } = useCartStore();
  
  // استخدام useState لتخزين المنتج بعد تحميله
  const [productData, setProductData] = React.useState<{
    product: any | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    product: null,
    isLoading: true,
    error: null
  });
  
  // استخدام useEffect بدلاً من useQuery لتجنب مشاكل Hydration
  React.useEffect(() => {
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

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success('تمت الإضافة إلى السلة');
    }
  };

  // Format the price with 2 decimal places
  const formattedPrice = product
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(typeof product.price === 'string' ? parseFloat(product.price) : product.price)
    : '';

  return (
    <Layout
      title={product ? `${product.name} | EasyShop` : 'Product | EasyShop'}
      description={product?.description}
    >
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
            <h2 className="text-xl font-bold mb-2">Error Loading Product</h2>
            <p>We couldn't load this product. Please try again later.</p>
            <Button
              onClick={() => router.push('/products')}
              className="mt-4"
            >
              Return to Products
            </Button>
          </div>
        ) : product ? (
          <>
            {/* استخدام المكون الديناميكي للمنتج */}
            <ProductDetails 
              product={product} 
              onBack={() => router.back()} 
            />
            
            {/* قسم المنتجات المشابهة */}
            <h2 className="text-2xl font-bold mb-6">قد يعجبك أيضًا</h2>
            <FeaturedProducts />
          </>
        ) : null}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
