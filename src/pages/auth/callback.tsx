import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../../lib/auth';
import { useLanguageStore } from '../../store/languageStore';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Process the callback when the component mounts
    const handleCallback = async () => {
      try {
        // Check if we have a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError.message);
          setError(sessionError.message);
          return;
        }
        
        if (session) {
          // Session exists, redirect to home page or stored redirect URL
          const redirectTo = localStorage.getItem('authRedirectTo') || '/';
          localStorage.removeItem('authRedirectTo'); // Clean up
          
          // Delay slightly to ensure session is fully processed
          setTimeout(() => {
            router.push(redirectTo);
          }, 500);
          
        } else {
          // No session found, might be an error or user canceled
          console.warn('No session found during auth callback');
          setError(language === 'en' 
            ? 'Authentication failed or was canceled' 
            : 'فشلت المصادقة أو تم إلغاؤها');
          
          // Redirect to login after a delay
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(language === 'en' 
          ? 'An unexpected error occurred' 
          : 'حدث خطأ غير متوقع');
          
        // Redirect to login after a delay
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    };
    
    // Only run the callback handler if URL contains code or error params
    if (router.isReady && (router.query.code || router.query.error)) {
      handleCallback();
    } else if (router.isReady) {
      // If URL doesn't have required params, redirect to login
      router.push('/auth/login');
    }
  }, [router, language]);
  
  return (
    <>
      <Head>
        <title>{language === 'en' ? 'Processing Authentication | EasyShop' : 'معالجة المصادقة | إيزي شوب'}</title>
      </Head>
      
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {error ? (
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              {language === 'en' ? 'Authentication Error' : 'خطأ في المصادقة'}
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">
              {language === 'en' ? 'Redirecting to login...' : 'جاري إعادة التوجيه إلى صفحة تسجيل الدخول...'}
            </p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
            <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">
              {language === 'en' ? 'Processing Authentication' : 'جاري معالجة المصادقة'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Please wait while we complete your authentication...' 
                : 'يرجى الانتظار بينما نكمل عملية المصادقة الخاصة بك...'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}