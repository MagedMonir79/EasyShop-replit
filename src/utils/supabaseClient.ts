import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// تحقق من وجود متغيرات البيئة اللازمة
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variables for Supabase connection');
}

// إنشاء عميل Supabase
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// واجهة للحصول على المنتجات
export const getProducts = async (options?: { 
  category?: string;
  limit?: number;
  featured?: boolean;
  search?: string;
}) => {
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
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  
  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  
  return data || [];
};