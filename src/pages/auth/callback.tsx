import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // التأكد من أن العنوان URL يحتوي على البيانات المطلوبة
        const { hash, search } = window.location;
        
        if (!hash && !search) {
          throw new Error('No hash or search parameters in URL');
        }

        // معالجة رد المصادقة من Supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        // في حالة النجاح، توجيه المستخدم إلى الصفحة الرئيسية
        router.push('/');
      } catch (error) {
        console.error('Error in auth callback:', error);
        // في حالة الخطأ، توجيه المستخدم إلى صفحة تسجيل الدخول
        router.push('/auth/login');
      }
    };

    // معالجة الاستجابة عند تحميل الصفحة
    handleAuthCallback();
  }, [router]);

  // عرض رسالة انتظار حتى يتم التوجيه
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">جاري التحقق من المصادقة...</h1>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">سيتم توجيهك خلال لحظات...</p>
      </div>
    </div>
  );
}