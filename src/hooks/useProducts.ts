import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product } from '@/shared/schema';
import type { Category } from '@/shared/schema';

export const useProducts = () => {
  const queryClient = useQueryClient();

  // استخدام واجهة برمجة التطبيقات (API) للحصول على المنتجات مع تصفية اختيارية
  const getProducts = async (category?: string, search?: string): Promise<Product[]> => {
    let url = '/api/products';
    
    // إضافة معلمات الاستعلام (query parameters) إذا تم تحديدها
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('فشل في جلب المنتجات');
    }
    
    const data = await response.json();
    return data.products;
  };

  // الحصول على منتج واحد حسب المعرف
  const getProduct = async (id: number): Promise<Product> => {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error('المنتج غير موجود');
    }
    
    const data = await response.json();
    return data.product;
  };

  // الحصول على المنتجات المميزة للصفحة الرئيسية
  const getFeaturedProducts = async (): Promise<Product[]> => {
    const response = await fetch('/api/products/featured');
    if (!response.ok) {
      throw new Error('فشل في جلب المنتجات المميزة');
    }
    
    const data = await response.json();
    return data.products;
  };

  // الحصول على جميع الفئات
  const getCategories = async (): Promise<Category[]> => {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error('فشل في جلب الفئات');
    }
    
    const data = await response.json();
    return data.categories;
  };

  const useProductsQuery = (category?: string, search?: string) => {
    return useQuery({
      queryKey: ['products', { category, search }], 
      queryFn: () => getProducts(category, search),
    });
  };

  const useProductQuery = (id: number) => {
    return useQuery({
      queryKey: ['product', id], 
      queryFn: () => getProduct(id),
      enabled: !!id,
    });
  };

  const useFeaturedProductsQuery = () => {
    return useQuery({
      queryKey: ['featuredProducts'], 
      queryFn: getFeaturedProducts,
    });
  };

  const useCategoriesQuery = () => {
    return useQuery({
      queryKey: ['categories'], 
      queryFn: getCategories,
    });
  };

  return {
    useProductsQuery,
    useProductQuery,
    useFeaturedProductsQuery,
    useCategoriesQuery,
  };
};
