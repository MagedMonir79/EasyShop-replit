import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Button } from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <Layout title="Page Not Found | EasyShop">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/">
              <Button>Go to Home</Button>
            </Link>
            <Link href="/products">
              <Button variant="outline">Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
