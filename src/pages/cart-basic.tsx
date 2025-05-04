import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Button } from '../components/ui/Button';

// A simplified cart page for testing build process
const CartBasicPage: React.FC = () => {
  return (
    <Layout title="Shopping Cart | EasyShop">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="bg-blue-50 p-8 rounded-lg text-center">
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
            className="feather feather-shopping-cart mx-auto text-blue-500 mb-4"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link href="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CartBasicPage;