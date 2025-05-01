import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Button } from '../components/ui/Button';

const ServerErrorPage: React.FC = () => {
  return (
    <Layout title="Server Error | EasyShop">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-9xl font-bold text-primary mb-4">500</h1>
          <h2 className="text-3xl font-bold mb-6">Server Error</h2>
          <p className="text-gray-600 mb-8">
            Sorry, something went wrong on our server. We're working to fix the issue.
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

export default ServerErrorPage;
