import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

// Import SignupForm with NoSSR to prevent hydration errors
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
  const { signUp, signInWithGoogle, user } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // If user is already logged in, redirect to homepage
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);
  
  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signInWithGoogle();
      
      if (!result.success) {
        setError(result.error || 'Failed to sign in with Google');
        setIsLoading(false);
        return;
      }
      
      // Google sign-in automatically redirects the browser, so we don't need to set loading to false
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch('password');

  // Handle form submission
  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the signup function from useAuth
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

      // Show success state and toast notification
      setIsSuccess(true);
      toast.success('Account created successfully!', {
        duration: 5000,
        position: 'top-center',
      });
      
      // Reset form
      reset();
      
      // Redirect after a short delay to allow the user to see the success message
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'An unexpected error occurred');
      toast.error('Failed to create account. Please try again.');
      setIsLoading(false);
    }
  };

  // Success screen after successful registration
  if (isSuccess) {
    return (
      <Layout title="Registration Successful | EasyShop">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-green-600">Registration Successful!</h1>
            <p className="text-gray-600 mb-6">
              Your account has been created successfully. You'll now be redirected to the homepage.
            </p>
            <p className="text-gray-500 mb-8 text-sm">
              We've sent a welcome email to your inbox with important information about your new account.
            </p>
            <Link href="/">
              <Button variant="prominent" size="lg" className="w-full">
                Continue to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Form props to pass to SignupForm component
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
    <Layout title="Create Account | EasyShop">
      <SignupForm {...props} />
    </Layout>
  );
};

export default SignupPage;