import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// استخدام متغيرات البيئة أو قيم افتراضية للتطوير
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// تكوين مباشر لعميل Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'easyshop-auth-storage',
    autoRefreshToken: true,
  }
});
