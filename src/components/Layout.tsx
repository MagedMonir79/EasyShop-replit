import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { useLanguageStore } from '../store/languageStore';
import NoSSR from './NoSSR';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  requireAuth?: boolean;
};

const LayoutContent: React.FC<LayoutProps> = ({
  children,
  title = 'EasyShop - Online Shopping Made Easy',
  description = 'Shop the latest products from EasyShop, your one-stop online shopping destination',
  requireAuth = false,
}) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { language, direction, isInitialized } = useLanguageStore();

  // تغيير اتجاه الصفحة عند تغيير اللغة
  useEffect(() => {
    if (!isInitialized) return;

    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    
    // إضافة الاتجاه كفئة CSS على عنصر الجسم للتنسيق
    if (direction === 'rtl') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [direction, language, isInitialized]);

  // التحقق من مصادقة المستخدم للصفحات المحمية
  if (requireAuth && !isLoading && !user) {
    router.push(`/auth/login?redirect=${router.asPath}`);
    return null;
  }

  // ترجمة العنوان حسب اللغة الحالية
  const localizedTitle = () => {
    if (title === 'EasyShop - Online Shopping Made Easy') {
      return language === 'en' 
        ? 'EasyShop - Online Shopping Made Easy'
        : 'EasyShop - تسوق اونلاين بسهولة';
    }
    // إبقاء العنوان كما هو إذا كان مخصصًا
    return title;
  };

  // ترجمة الوصف حسب اللغة الحالية
  const localizedDescription = () => {
    if (description === 'Shop the latest products from EasyShop, your one-stop online shopping destination') {
      return language === 'en'
        ? 'Shop the latest products from EasyShop, your one-stop online shopping destination'
        : 'تسوق أحدث المنتجات من EasyShop، وجهتك الشاملة للتسوق عبر الإنترنت';
    }
    // إبقاء الوصف كما هو إذا كان مخصصًا
    return description;
  };

  return (
    <>
      <Head>
        <title>{localizedTitle()}</title>
        <meta name="description" content={localizedDescription()} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`flex flex-col min-h-screen ${direction === 'rtl' ? 'font-arabic' : 'font-sans'}`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

// استخدام المكون NoSSR لتجنب مشاكل الهيدراشن
const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <NoSSR fallback={
      <div className="flex flex-col min-h-screen">
        <div className="h-16 bg-white shadow-sm"></div>
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading EasyShop...</p>
          </div>
        </main>
        <div className="h-20 bg-gray-100"></div>
      </div>
    }>
      <LayoutContent {...props} />
    </NoSSR>
  );
};

export default Layout;
