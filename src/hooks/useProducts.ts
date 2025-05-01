import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '../utils/types';

// بيانات وهمية للعمل أثناء التطوير
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'هاتف ذكي متميز',
    description: 'هاتف ذكي فائق السرعة مع كاميرا ممتازة وبطارية طويلة الأمد',
    price: 999.99,
    image_url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    stock: 15,
    created_at: '2023-04-01T12:00:00Z',
  },
  {
    id: 2,
    name: 'سماعات لاسلكية',
    description: 'سماعات لاسلكية مع إلغاء الضوضاء وجودة صوت استثنائية',
    price: 199.99,
    image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'electronics',
    stock: 25,
    created_at: '2023-04-02T12:00:00Z',
  },
  {
    id: 3,
    name: 'قميص كلاسيكي',
    description: 'قميص كلاسيكي مصنوع من القطن المصري الفاخر',
    price: 59.99,
    image_url: 'https://images.unsplash.com/photo-1602810318660-d2c46b750f88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'clothing',
    stock: 30,
    created_at: '2023-04-03T12:00:00Z',
  },
  {
    id: 4,
    name: 'ماكينة قهوة',
    description: 'ماكينة قهوة اسبريسو أوتوماتيكية بالكامل',
    price: 399.99,
    image_url: 'https://images.unsplash.com/photo-1520232644591-d66f5913ba39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'home',
    stock: 10,
    created_at: '2023-04-04T12:00:00Z',
  },
  {
    id: 5,
    name: 'سرير مريح',
    description: 'سرير كينغ سايز مع مرتبة فائقة الراحة',
    price: 799.99,
    image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'home',
    stock: 5,
    created_at: '2023-04-05T12:00:00Z',
  },
  {
    id: 6,
    name: 'طاولة طعام خشبية',
    description: 'طاولة طعام خشبية أنيقة مناسبة لـ 6 أشخاص',
    price: 599.99,
    image_url: 'https://images.unsplash.com/photo-1617098900591-3f90928e8c54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'home',
    stock: 8,
    created_at: '2023-04-06T12:00:00Z',
  },
];

export const useProducts = () => {
  const queryClient = useQueryClient();

  // Get products with optional filters
  const getProducts = async (category?: string, search?: string) => {
    // ملاحظة: هذه بيانات وهمية للتطوير فقط
    // عندما نحصل على مفاتيح Supabase الصحيحة، سنستبدلها بطلبات API حقيقية
    
    return mockProducts.filter(product => {
      // تطبيق مرشحات الفئة إذا تم تحديدها
      if (category && product.category !== category) {
        return false;
      }
      
      // تطبيق مرشحات البحث إذا تم تحديدها
      if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      return true;
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  };

  // Get a single product by ID
  const getProduct = async (id: number) => {
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  };

  // Get featured products (just returns a few products for the homepage)
  const getFeaturedProducts = async () => {
    return mockProducts.slice(0, 6).sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  };

  // Get all unique categories
  const getCategories = async () => {
    const uniqueCategories: string[] = [];
    mockProducts.forEach(product => {
      if (!uniqueCategories.includes(product.category)) {
        uniqueCategories.push(product.category);
      }
    });
    return uniqueCategories.sort();
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
