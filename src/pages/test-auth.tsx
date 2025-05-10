import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageStore } from '@/store/languageStore';

export default function TestAuthPage() {
  const { user, isLoading } = useAuth();
  const { language, toggleLanguage } = useLanguageStore();
  const [supabaseStatus, setSupabaseStatus] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkSupabaseConnection = async () => {
    try {
      setIsChecking(true);
      const response = await fetch('/api/check-supabase');
      const data = await response.json();
      setSupabaseStatus(data);
    } catch (error) {
      console.error('Error checking Supabase:', error);
      setSupabaseStatus({ success: false, message: 'Failed to fetch status' });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>EasyShop - Auth Test</title>
        <meta name="description" content="Testing authentication functionality" />
      </Head>

      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'en' ? 'Auth Test Page' : 'صفحة اختبار المصادقة'}
          </h1>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
          >
            {language === 'en' ? 'AR' : 'EN'}
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="font-medium text-gray-700 mb-2">
              {language === 'en' ? 'Authentication Status' : 'حالة المصادقة'}
            </h2>
            {isLoading ? (
              <p className="text-gray-500 text-sm">
                {language === 'en' ? 'Checking auth status...' : 'جاري التحقق من حالة المصادقة...'}
              </p>
            ) : user ? (
              <div className="space-y-2">
                <p className="text-green-600">
                  {language === 'en' ? 'Authenticated' : 'تم المصادقة'}
                </p>
                <div className="bg-green-50 p-2 rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">{language === 'en' ? 'User ID:' : 'معرف المستخدم:'}</span> {user.id}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">{language === 'en' ? 'Email:' : 'البريد الإلكتروني:'}</span> {user.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">{language === 'en' ? 'Name:' : 'الاسم:'}</span>{' '}
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-yellow-600">
                {language === 'en' ? 'Not authenticated' : 'لم يتم المصادقة'}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="font-medium text-gray-700 mb-2">
              {language === 'en' ? 'Supabase Connection' : 'اتصال Supabase'}
            </h2>
            {isChecking ? (
              <p className="text-gray-500 text-sm">
                {language === 'en' ? 'Checking connection...' : 'جاري التحقق من الاتصال...'}
              </p>
            ) : supabaseStatus ? (
              <div className="space-y-2">
                <p className={supabaseStatus.success ? 'text-green-600' : 'text-red-600'}>
                  {supabaseStatus.message}
                </p>
                {supabaseStatus.data && (
                  <div className={`p-2 rounded-md ${supabaseStatus.success ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="text-sm">
                      <span className="font-medium">{language === 'en' ? 'Session Exists:' : 'الجلسة موجودة:'}</span>{' '}
                      {supabaseStatus.data.sessionExists ? 'Yes' : 'No'}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">{language === 'en' ? 'URL Config:' : 'تكوين URL:'}</span>{' '}
                      {supabaseStatus.data.configPresent.url ? 'Yes' : 'No'}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">{language === 'en' ? 'Anon Key Config:' : 'تكوين المفتاح المجهول:'}</span>{' '}
                      {supabaseStatus.data.configPresent.anonKey ? 'Yes' : 'No'}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-yellow-600">
                {language === 'en' ? 'No connection information available' : 'لا تتوفر معلومات الاتصال'}
              </p>
            )}
            <button
              onClick={checkSupabaseConnection}
              className="mt-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-md text-sm font-medium transition-colors"
            >
              {language === 'en' ? 'Refresh Status' : 'تحديث الحالة'}
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="font-medium text-gray-700 mb-2">
              {language === 'en' ? 'Auth Links Test' : 'اختبار روابط المصادقة'}
            </h2>
            <div className="space-y-2">
              <Link
                href="/auth/login"
                className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {language === 'en' ? 'Go to Login Page' : 'الذهاب إلى صفحة تسجيل الدخول'}
              </Link>
              <Link
                href="/auth/signup"
                className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
              >
                {language === 'en' ? 'Go to Sign Up Page' : 'الذهاب إلى صفحة التسجيل'}
              </Link>
              <Link
                href="/cart"
                className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {language === 'en' ? 'Go to Cart Page' : 'الذهاب إلى صفحة السلة'}
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              {language === 'en' ? '← Back to Home' : '← العودة إلى الصفحة الرئيسية'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}