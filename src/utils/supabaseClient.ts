import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// بيانات تجريبية للمنتجات
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
    created_at: new Date().toISOString()
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
    created_at: new Date().toISOString()
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
    created_at: new Date().toISOString()
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
    created_at: new Date().toISOString()
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
    created_at: new Date().toISOString()
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
    created_at: new Date().toISOString()
  }
];

// بيانات تجريبية للفئات
const MOCK_CATEGORIES = [
  {
    id: 1,
    name: "إلكترونيات",
    slug: "electronics",
    description: "أجهزة إلكترونية وتقنية حديثة",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "أثاث",
    slug: "furniture",
    description: "أثاث منزلي بتصاميم عصرية",
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "ملابس",
    slug: "clothing",
    description: "ملابس عصرية للرجال والنساء",
    created_at: new Date().toISOString()
  }
];

// التحقق من قيم بيئة Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// تحقق من صلاحية بيانات الاعتماد
const isValidSupabaseConfig = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your-supabase-url' && 
  supabaseAnonKey !== 'your-supabase-anon-key';

// استخدام البيانات التجريبية إذا لم تكن بيانات الاعتماد صالحة
const useLocalMockData = !isValidSupabaseConfig;

// إعداد عميل Supabase إذا كانت البيانات متوفرة
let supabase: any = null;

if (isValidSupabaseConfig) {
  supabase = createClient<Database>(
    supabaseUrl!,
    supabaseAnonKey!
  );
  console.log('Using Supabase client with provided credentials');
} else {
  console.warn('Missing or invalid Supabase credentials. Using mock data instead.');
}

// واجهة للحصول على المنتجات
export const getProducts = async (options?: { 
  category?: string;
  limit?: number;
  featured?: boolean;
  search?: string;
}) => {
  // استخدام البيانات المحلية إذا لم تكن هناك اتصال بـ Supabase
  if (useLocalMockData) {
    console.log('Using mock products data');
    let filteredProducts = [...MOCK_PRODUCTS];
    
    // تطبيق الفلاتر
    if (options?.category) {
      filteredProducts = filteredProducts.filter(p => p.category === options.category);
    }
    
    if (options?.featured) {
      filteredProducts = filteredProducts.filter(p => p.is_featured);
    }
    
    if (options?.search) {
      const searchTerm = options.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        (p.description && p.description.toLowerCase().includes(searchTerm))
      );
    }
    
    // تطبيق الحد
    if (options?.limit && options.limit > 0) {
      filteredProducts = filteredProducts.slice(0, options.limit);
    }
    
    return filteredProducts;
  }
  
  // إذا كان الاتصال بـ Supabase متاحًا، استخدم API الفعلي
  // بناء استعلام قاعدة البيانات
  let query = supabase.from('products').select('*');
  
  // إضافة الفلاتر إذا تم تحديدها
  if (options?.category) {
    query = query.eq('category', options.category);
  }
  
  if (options?.featured) {
    query = query.eq('is_featured', true);
  }
  
  if (options?.search) {
    query = query.ilike('name', `%${options.search}%`);
  }
  
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  // تنفيذ الاستعلام
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
  
  return data || [];
};

// واجهة للحصول على منتج واحد بالمعرف
export const getProductById = async (id: number) => {
  // استخدام البيانات المحلية إذا لم تكن هناك اتصال بـ Supabase
  if (useLocalMockData) {
    console.log(`Using mock data for product ID: ${id}`);
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    return product;
  }
  
  // إذا كان الاتصال بـ Supabase متاحًا، استخدم API الفعلي
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

// واجهة للحصول على الفئات
export const getCategories = async () => {
  // استخدام البيانات المحلية إذا لم تكن هناك اتصال بـ Supabase
  if (useLocalMockData) {
    console.log('Using mock categories data');
    return MOCK_CATEGORIES;
  }
  
  // إذا كان الاتصال بـ Supabase متاحًا، استخدم API الفعلي
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  
  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  
  return data || [];
};