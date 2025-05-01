import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '../store/userStore';
import { User } from '../utils/types';
import { supabase } from '../utils/supabase';

// مستخدم وهمي للتطوير فقط
const mockUser: User = {
  id: 'user-123',
  email: 'user@example.com',
  first_name: 'محمد',
  last_name: 'أحمد',
  avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg',
};

export const useAuth = () => {
  const router = useRouter();
  const { user, setUser, isLoading, setLoading } = useUserStore();

  useEffect(() => {
    // محاكاة تأخير تحميل البيانات
    const timer = setTimeout(() => {
      // بشكل افتراضي، المستخدم غير مسجل الدخول
      setUser(null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // تأخير وهمي لمحاكاة طلب API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // التحقق البسيط من بيانات الاعتماد (للتطوير فقط)
      if (email === 'user@example.com' && password === 'password') {
        setUser(mockUser);
        router.push('/');
        return { success: true };
      }
      
      throw new Error('بيانات الاعتماد غير صحيحة');
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      // تأخير وهمي لمحاكاة طلب API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // تحقق بسيط من البريد الإلكتروني (للتطوير فقط)
      if (email === 'user@example.com') {
        throw new Error('البريد الإلكتروني مستخدم بالفعل');
      }
      
      // إنشاء مستخدم وهمي جديد
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        first_name: firstName,
        last_name: lastName,
        avatar_url: 'https://randomuser.me/api/portraits/lego/1.jpg',
      };
      
      setUser(newUser);
      router.push('/');
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      // تأخير وهمي لمحاكاة طلب API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      router.push('/');
    } catch (error: any) {
      console.error('خطأ في تسجيل الخروج:', error.message);
    }
  };

  const updateProfile = async (
    updates: { first_name?: string; last_name?: string; avatar_url?: string }
  ) => {
    try {
      if (!user) throw new Error('المستخدم غير مصادق');

      // تأخير وهمي لمحاكاة طلب API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUser({
        ...user,
        ...updates,
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // تسجيل الدخول باستخدام حساب Google
  const signInWithGoogle = async () => {
    try {
      // استخدام Supabase للمصادقة مع Google
      // ملاحظة: هذه الوظيفة تقوم بإعادة توجيه المستخدم إلى صفحة تسجيل دخول Google
      // سيتم إعادة توجيه المستخدم إلى التطبيق بعد التسجيل الناجح
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' 
            ? `${window.location.origin}/auth/callback` 
            : undefined,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });
      
      if (error) {
        throw error;
      }
      
      // لن يتم الوصول إلى هذه النقطة في الحالة العادية لأن المستعرض 
      // سيتم إعادة توجيهه قبل تنفيذ هذا الكود
      
      return { 
        success: true,
      };
    } catch (error: any) {
      // معالجة الأخطاء
      let customError = 'حدث خطأ أثناء تسجيل الدخول باستخدام Google';
      
      if (error.message) {
        customError = error.message;
      }
      
      return { 
        success: false, 
        error: customError 
      };
    }
  };

  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    signInWithGoogle
  };
};
