import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// نتأكد من أن عنوان URL صالح (يجب أن يبدأ بـ http:// أو https://)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// عند استلام المفاتيح الصحيحة، سنحتاج إلى استبدال القيم المؤقتة
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
