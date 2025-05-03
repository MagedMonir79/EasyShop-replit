import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import Link from 'next/link';
import { Product } from '../utils/types';

interface CartItem {
  product: Product;
  quantity: number;
}

// We'll create a simple implementation that doesn't depend on CartItem
const CartPage: React.FC = () => {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
    }).format(price);
  };

  // Simple CartItem component directly in the page
  const CartItemComponent = ({ item }: { item: CartItem }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-4">
          {item.product.image_url ? (
            <img 
              src={item.product.image_url.toString()} 
              alt={item.product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{item.product.name}</h3>
          <p className="text-sm text-gray-500">
            {formatPrice(Number(item.product.price))} × {item.quantity}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <p className="font-medium text-gray-900 mr-4">
          {formatPrice(Number(item.product.price) * item.quantity)}
        </p>
        <button
          onClick={() => useCartStore.getState().removeItem(item.product.id)}
          className="text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );

  const handleCheckout = async () => {
    setCheckoutSuccess(true);
  };

  if (checkoutSuccess) {
    return (
      <Layout title="Order Completed | EasyShop">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-green-50 p-8 rounded-lg max-w-lg mx-auto">
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
            <h1 className="text-3xl font-bold mb-4">Order Completed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been placed successfully and will be processed soon.
            </p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Shopping Cart | EasyShop">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">
                    Cart Items ({getTotalItems()})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItemComponent key={item.product.id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-lg font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {formatPrice(0)}
                    </span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                  variant="prominent"
                >
                  Checkout
                </Button>

                <div className="mt-4 text-center">
                  <Link
                    href="/products"
                    className="text-primary hover:underline text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;