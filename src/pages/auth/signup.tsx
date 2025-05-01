import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import NoSSR from '../../components/NoSSR';

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
      const result = await signInWithGoogle();
      
      // Supabase يقوم بإعادة توجيه المستخدم إلى صفحة Google لإتمام عملية المصادقة
      // لذلك قد لا يتم تنفيذ الكود التالي حتى يعود المستخدم
      
      if (!result.success) {
        setError(result.error || 'فشل تسجيل الدخول باستخدام Google');
        setIsLoading(false);
        return;
      }
      
      // تنفيذ الكود بعد المصادقة الناجحة
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
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Layout title="Sign Up Successful | EasyShop">
        <NoSSR>
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
              <h1 className="text-2xl font-bold mb-4">Registration Successful!</h1>
              <p className="text-gray-600 mb-4">
                Your account has been created successfully. You will be redirected to the login page shortly.
              </p>
              <Link href="/auth/login">
                <Button>Go to Login</Button>
              </Link>
            </div>
          </div>
        </NoSSR>
      </Layout>
    );
  }

  return (
    <Layout title="Sign Up | EasyShop">
      <NoSSR>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    label="First Name"
                    error={errors.firstName?.message}
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                  />
                </div>
                <div>
                  <Input
                    label="Last Name"
                    error={errors.lastName?.message}
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                  />
                </div>
              </div>
              
              <div>
                <Input
                  label="Email"
                  type="email"
                  error={errors.email?.message}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
              </div>
              
              <div>
                <Input
                  label="Password"
                  type="password"
                  error={errors.password?.message}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
              </div>
              
              <div>
                <Input
                  label="Confirm Password"
                  type="password"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </form>
            
            {/* زر تسجيل الدخول باستخدام Google */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">أو</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>جاري المعالجة...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                    </svg>
                    Sign in with Google
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </NoSSR>
    </Layout>
  );
};

export default SignupPage;
