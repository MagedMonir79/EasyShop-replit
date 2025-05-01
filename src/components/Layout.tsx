import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { useLanguageStore } from '../store/languageStore';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  requireAuth?: boolean;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'EasyShop - Online Shopping Made Easy',
  description = 'Shop the latest products from EasyShop, your one-stop online shopping destination',
  requireAuth = false,
}) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { language, direction } = useLanguageStore();

  // تغيير اتجاه الصفحة عند تغيير اللغة
  useEffect(() => {
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
  }, [direction, language]);

  // التحقق من مصادقة المستخدم للصفحات المحمية
  if (requireAuth && !isLoading && !user) {
    router.push(`/auth/login?redirect=${router.asPath}`);
    return null;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
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

export default Layout;
