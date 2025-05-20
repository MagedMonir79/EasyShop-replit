import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { supabase } from '@/utils/supabaseBrowser';
import { useLanguageStore } from '@/store/languageStore';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });
  }, []);

  useEffect(() => {
    if (user?.email) router.push('/');
  }, [user]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) setError(error.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) setError(error.message);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          {language === 'en' ? 'Sign in to your account' : 'تسجيل الدخول إلى حسابك'}
        </h2>

        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.email && (
              <p className="text-xs text-red-500">
                {language === 'en' ? 'Email is required' : 'البريد مطلوب'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {language === 'en' ? 'Password' : 'كلمة المرور'}
            </label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.password && (
              <p className="text-xs text-red-500">
                {language === 'en' ? 'Password is required' : 'كلمة المرور مطلوبة'}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark transition"
          >
            {loading
              ? language === 'en'
                ? 'Signing in...'
                : 'جاري الدخول...'
              : language === 'en'
                ? 'Sign in'
                : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-2 px-4 border rounded text-sm hover:bg-gray-50"
          >
            {language === 'en' ? 'Continue with Google' : 'الدخول باستخدام جوجل'}
          </button>
        </div>

        <p className="mt-4 text-sm text-center">
          {language === 'en' ? "Don't have an account?" : 'ليس لديك حساب؟'}{' '}
          <Link href="/auth/signup" className="text-primary hover:underline">
            {language === 'en' ? 'Sign up' : 'سجل الآن'}
          </Link>
        </p>
      </div>
    </div>
  );
}
