import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// استخدام نفس إعدادات Supabase التي تستخدمها صفحات HTML المستقلة
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rkxqcnyujnxjjpnanojp.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJreHFjbnl1am54ampwbmFub2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5MTM5MDEsImV4cCI6MjAzMDQ4OTkwMX0.IZFUgsjZIyVcGZOH7D9KUw_QMWpYYQA0U-LwndTlkHw';

// تكوين مباشر لعميل Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'easyshop-auth-storage',
    autoRefreshToken: true,
  }
});
