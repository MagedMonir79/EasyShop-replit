import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

// استيراد مكون NoSSR بطريقة تمنع أخطاء الـ Hydration
const SignupForm = dynamic(() => import('../../components/SignupForm'), {
  ssr: false,
});

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupPage: React.FC = () => {
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // دالة تسجيل الدخول عبر Google
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // حل مؤقت: إعادة توجيه المستخدم مباشرة إلى صفحة تسجيل الدخول
      router.push('/auth/login');
      return;
      
      // هذا الكود غير فعال حاليًا - سيتم تنفيذه بعد إعداد Supabase بشكل كامل
      const result = await signInWithGoogle();
      
      if (!result.success) {
        setError(result.error || 'فشل تسجيل الدخول باستخدام Google');
        setIsLoading(false);
        return;
      }
      
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع');
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signUp(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      );

      if (!result.success) {
        setError(result.error || 'Failed to create account');
        setIsLoading(false);
        return;
      }

      // تم تسجيل المستخدم بنجاح - سيتم توجيهه للصفحة الرئيسية تلقائياً
      // بواسطة دالة signUp في useAuth.ts
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Layout title="تم التسجيل بنجاح | إيزي شوب">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-check-circle mx-auto text-green-500 mb-4"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h1 className="text-2xl font-bold mb-4">تم التسجيل بنجاح!</h1>
            <p className="text-gray-600 mb-4">
              تم إنشاء حسابك بنجاح. سيتم توجيهك إلى الصفحة الرئيسية تلقائيًا.
            </p>
            <Link href="/">
              <Button>الذهاب للصفحة الرئيسية</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const props = {
    onSubmit: handleSubmit(onSubmit),
    register,
    errors,
    password,
    isLoading,
    error,
    handleGoogleSignIn
  };

  return (
    <Layout title="إنشاء حساب جديد | إيزي شوب">
      <SignupForm {...props} />
    </Layout>
  );
};

export default SignupPage;