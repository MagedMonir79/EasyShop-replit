import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

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

  // Check if user is authenticated for protected routes
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
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
