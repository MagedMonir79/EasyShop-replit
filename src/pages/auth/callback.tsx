import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabase';
import { useUserStore } from '../../store/userStore';
import Layout from '../../components/Layout';

const AuthCallbackPage = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  useEffect(() => {
    // استدعاء وظيفة التحقق من جلسة المستخدم بعد إعادة التوجيه من Supabase
    const checkSession = async () => {
      try {
        // التحقق من المعلومات الحالية للمستخدم
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('خطأ في الحصول على معلومات الجلسة:', error.message);
          router.push('/auth/login');
          return;
        }
        
        if (!session) {
          // لا توجد جلسة نشطة
          router.push('/auth/login');
          return;
        }
        
        // الحصول على معلومات المستخدم من Supabase
        const user = session.user;
        
        if (user) {
          // تعيين بيانات المستخدم في حالة التطبيق
          setUser({
            id: user.id,
            email: user.email || '',
            first_name: user.user_metadata?.first_name || user.email?.split('@')[0] || '',
            last_name: user.user_metadata?.last_name || '',
            avatar_url: user.user_metadata?.avatar_url || '',
          });
          
          // إعادة التوجيه إلى الصفحة الرئيسية
          router.push('/');
        }
      } catch (error) {
        console.error('حدث خطأ غير متوقع:', error);
        router.push('/auth/login');
      }
    };

    checkSession();
  }, [router, setUser]);

  return (
    <Layout title="تسجيل الدخول | EasyShop">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">جاري التحقق من تسجيل الدخول...</h1>
          <p className="text-gray-600">يرجى الانتظار بينما نقوم بمعالجة المعلومات الخاصة بك.</p>
        </div>
      </div>
    </Layout>
  );
};

export default AuthCallbackPage;