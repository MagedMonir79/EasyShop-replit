import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// استخدام عنوان URL ثابت للتطوير فقط
const supabaseUrl = 'https://example.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMzA5ODI0MCwiZXhwIjoxOTM4MTU0MjQwfQ.S-MJF5spP6aRhVCUAzMSH9KK9gLyCaOBaYDA_bJyHm8';

// تهيئة Supabase بقيم ثابتة للتطوير فقط
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// ملاحظة: هذه بيانات وهمية للتطوير فقط
// سنحتاج إلى استبدالها بالبيانات الحقيقية عند التوفر
