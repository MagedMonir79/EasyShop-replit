import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
// استبدلنا useProducts بـ fetch مباشر

const FeaturedProducts: React.FC = () => {
  // استخدام useState و useEffect بدلاً من useQuery للتخفيف من مشاكل Hydration
  const [productData, setProductData] = React.useState<{
    products: any[] | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    products: null,
    isLoading: true,
    error: null
  });
  
  // استخدام useEffect للحصول على المنتجات المميزة
  React.useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setProductData(prev => ({ ...prev, isLoading: true }));
        const response = await fetch('/api/products/featured');
        
        if (!response.ok) {
          throw new Error('فشل في تحميل المنتجات المميزة');
        }
        
        const data = await response.json();
        setProductData({
          products: data.products,
          isLoading: false,
          error: null
        });
      } catch (error) {
        setProductData({
          products: null,
          isLoading: false,
          error: error as Error
        });
      }
    };
    
    fetchFeaturedProducts();
  }, []);
  
  const { products, isLoading, error } = productData;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="section-title">المنتجات المميزة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !products) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="section-title">المنتجات المميزة</h2>
        <p className="text-red-500">فشل في تحميل المنتجات المميزة. يرجى المحاولة مرة أخرى لاحقًا.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">المنتجات المميزة</h2>
        <Link
          href="/products"
          className="text-primary hover:text-primary/80 font-medium flex items-center"
        >
          عرض الكل
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-right ml-1"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
