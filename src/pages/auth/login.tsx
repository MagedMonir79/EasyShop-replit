import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useLanguageStore } from '../../store/languageStore';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const { user, isLoading, signIn, signInWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  useEffect(() => {
    // If user is already logged in, redirect to home page
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      setLoginLoading(true);
      const result = await signIn(data.email, data.password);
      
      if (!result.success) {
        setError(result.error);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
      // No need to handle redirect here, as signInWithGoogle will redirect to Google
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Show loading state when checking user auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <div>
            <Link href="/" className="flex items-center mb-8">
              <span className="text-3xl font-bold text-primary">EasyShop</span>
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {language === 'en' ? 'Sign in to your account' : 'تسجيل الدخول إلى حسابك'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {language === 'en' ? "Don't have an account?" : 'ليس لديك حساب؟'}{' '}
              <Link
                href="/auth/signup"
                className="font-medium text-primary hover:text-primary-dark"
              >
                {language === 'en' ? 'Sign up now' : 'سجل الآن'}
              </Link>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {language === 'en' ? 'Email address' : 'البريد الإلكتروني'}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-sm`}
                  {...register('email', {
                    required: language === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: language === 'en' ? 'Invalid email address' : 'عنوان بريد إلكتروني غير صالح',
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {language === 'en' ? 'Password' : 'كلمة المرور'}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-sm`}
                  {...register('password', {
                    required: language === 'en' ? 'Password is required' : 'كلمة المرور مطلوبة',
                    minLength: {
                      value: 6,
                      message: language === 'en' 
                        ? 'Password must be at least 6 characters' 
                        : 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  {language === 'en' ? 'Remember me' : 'تذكرني'}
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-dark">
                  {language === 'en' ? 'Forgot your password?' : 'نسيت كلمة المرور؟'}
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loginLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                  loginLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loginLoading ? (
                  <>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>
                    {language === 'en' ? 'Signing in...' : 'جاري تسجيل الدخول...'}
                  </>
                ) : (
                  language === 'en' ? 'Sign in' : 'تسجيل الدخول'
                )}
              </button>
            </div>
          </form>

          {/* Social Sign In */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  {language === 'en' ? 'Or continue with' : 'أو متابعة باستخدام'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                {language === 'en' ? 'Google' : 'جوجل'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600">
        <div className="flex flex-col justify-center items-center px-8 py-12 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {language === 'en' 
              ? 'Welcome to EasyShop' 
              : 'مرحبًا بك في إيزي شوب'}
          </h2>
          <p className="text-lg text-center mb-8 max-w-md">
            {language === 'en'
              ? 'The ultimate shopping experience with thousands of products at amazing prices.'
              : 'تجربة تسوق مثالية مع آلاف المنتجات بأسعار مذهلة.'}
          </p>
          <div className="w-full max-w-md h-64 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="160"
              height="160"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}