import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { signUp, signInWithGoogle, getSession } from '../../lib/auth';
import { useLanguageStore } from '../../store/languageStore';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch('password', '');

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { user } = await getSession();
      if (user) {
        setIsAuthenticated(true);
        router.push('/');
      }
    };
    
    checkAuth();
  }, [router]);

  // If already authenticated, don't render the signup form
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <p className="text-center">
            {language === 'en' ? 'Already logged in. Redirecting...' : 'أنت مسجل الدخول بالفعل. جارٍ إعادة التوجيه...'}
          </p>
        </div>
      </div>
    );
  }

  // If registration was successful, show success message
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <div className="text-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center mb-4 text-primary">
            {language === 'en' ? 'Registration Successful!' : 'تم التسجيل بنجاح!'}
          </h2>
          <p className="text-gray-600 text-center mb-6">
            {language === 'en' 
              ? 'Please check your email to confirm your account.' 
              : 'يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك.'}
          </p>
          <div className="text-center">
            <Link href="/auth/login"
              className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors"
            >
              {language === 'en' ? 'Go to Login' : 'الذهاب إلى تسجيل الدخول'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError(null);
      setLoading(true);
      
      // Send welcome email and register user
      const result = await signUp(
        data.email, 
        data.password, 
        data.firstName, 
        data.lastName
      );
      
      if (!result.success) {
        setError(result.error);
      } else {
        // If registration successful, show success message
        setSuccess(true);
        
        // Send welcome email
        try {
          const response = await fetch('/api/welcome-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: data.email,
              firstName: data.firstName,
            }),
          });
          
          const emailResult = await response.json();
          if (!emailResult.success) {
            console.warn('Welcome email could not be sent:', emailResult.message);
          }
        } catch (emailError) {
          console.error('Error sending welcome email:', emailError);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await signInWithGoogle();
      
      if (!result.success) {
        setError(result.error);
      }
      // No need to redirect here, as OAuth will redirect automatically
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string): string => {
    if (language === 'en') {
      switch (errorCode) {
        case 'User already registered':
          return 'This email is already registered.';
        default:
          return errorCode;
      }
    } else {
      // Arabic error messages
      switch (errorCode) {
        case 'User already registered':
          return 'هذا البريد الإلكتروني مسجل بالفعل.';
        default:
          return errorCode;
      }
    }
  };

  return (
    <>
      <Head>
        <title>{language === 'en' ? 'Create Account | EasyShop' : 'إنشاء حساب | إيزي شوب'}</title>
        <meta name="description" content={language === 'en' ? 'Create a new EasyShop account' : 'إنشاء حساب جديد في إيزي شوب'} />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
        <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary">
            {language === 'en' ? 'Create an account' : 'إنشاء حساب جديد'}
          </h2>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
              {getErrorMessage(error)}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {language === 'en' ? 'First Name' : 'الاسم الأول'}
                </label>
                <input
                  type="text"
                  {...register('firstName', { required: true })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">
                    {language === 'en' ? 'First name is required' : 'الاسم الأول مطلوب'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {language === 'en' ? 'Last Name' : 'الاسم الأخير'}
                </label>
                <input
                  type="text"
                  {...register('lastName', { required: true })}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">
                    {language === 'en' ? 'Last name is required' : 'الاسم الأخير مطلوب'}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/
                })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
              {errors.email?.type === 'required' && (
                <p className="text-xs text-red-500 mt-1">
                  {language === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب'}
                </p>
              )}
              {errors.email?.type === 'pattern' && (
                <p className="text-xs text-red-500 mt-1">
                  {language === 'en' ? 'Please enter a valid email' : 'يرجى إدخال بريد إلكتروني صحيح'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'en' ? 'Password' : 'كلمة المرور'}
              </label>
              <input
                type="password"
                {...register('password', { 
                  required: true,
                  minLength: 8
                })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
              {errors.password?.type === 'required' && (
                <p className="text-xs text-red-500 mt-1">
                  {language === 'en' ? 'Password is required' : 'كلمة المرور مطلوبة'}
                </p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className="text-xs text-red-500 mt-1">
                  {language === 'en' ? 'Password must be at least 8 characters' : 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'}
              </label>
              <input
                type="password"
                {...register('confirmPassword', { 
                  required: true,
                  validate: value => value === password || (language === 'en' ? 'Passwords do not match' : 'كلمات المرور غير متطابقة')
                })}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {typeof errors.confirmPassword.message === 'string' 
                    ? errors.confirmPassword.message 
                    : (language === 'en' ? 'Confirm password is required' : 'تأكيد كلمة المرور مطلوب')}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading 
                ? (language === 'en' ? 'Creating account...' : 'جاري إنشاء الحساب...') 
                : (language === 'en' ? 'Create Account' : 'إنشاء حساب')}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-4">
              {language === 'en' ? 'Or continue with' : 'أو تابع باستخدام'}
            </p>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2 px-4 border rounded text-sm hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="16" 
                height="16" 
                className="mr-2"
              >
                <path 
                  fill="#4285F4" 
                  d="M21.35 11.29c0-.756-.07-1.51-.21-2.244H12v4.26h5.2c-.22 1.18-.89 2.187-1.9 2.86v2.39h3.09c1.8-1.655 2.84-4.096 2.84-7.266z"
                />
                <path 
                  fill="#34A853" 
                  d="M12 22c2.59 0 4.77-.86 6.36-2.34l-3.09-2.39c-.85.57-1.94.91-3.27.91-2.53 0-4.67-1.71-5.43-4h-3.19v2.48C5.07 19.62 8.3 22 12 22z"
                />
                <path 
                  fill="#FBBC05" 
                  d="M6.57 14.18c-.19-.58-.3-1.19-.3-1.82 0-.63.11-1.24.3-1.82V8.06H3.38C2.5 9.25 2 10.62 2 12.13s.5 2.88 1.38 4.07l3.19-2.02z"
                />
                <path 
                  fill="#EA4335" 
                  d="M12 5.36c1.43 0 2.71.49 3.72 1.46l2.73-2.74C16.65 2.39 14.47 1.5 12 1.5c-3.7 0-6.93 2.38-8.62 5.93l3.19 2.48c.76-2.29 2.9-4 5.43-4z"
                />
              </svg>
              {language === 'en' ? 'Continue with Google' : 'تابع باستخدام جوجل'}
            </button>
          </div>

          <p className="mt-4 text-sm text-center">
            {language === 'en' ? 'Already have an account?' : 'لديك حساب بالفعل؟'}{' '}
            <Link href="/auth/login" className="text-primary hover:underline">
              {language === 'en' ? 'Sign in' : 'تسجيل الدخول'}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}