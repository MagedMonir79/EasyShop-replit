import { useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useCartStore } from '../store/cartStore';
import { useLanguageStore } from '../store/languageStore';
import Layout from '../components/Layout';

const CartPage: NextPage = () => {
  const { language } = useLanguageStore();
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCartStore();

  // Format currency based on language
  const formatCurrency = (amount: number) => {
    return language === 'en'
      ? `${amount.toFixed(2)} ج.م`  // Egyptian Pound in English format
      : `${amount.toFixed(2)} ج.م`; // Egyptian Pound in Arabic format
  };

  // Check if cart is empty
  const isCartEmpty = items.length === 0;

  return (
    <Layout 
      title={language === 'en' ? 'Shopping Cart' : 'عربة التسوق'} 
      description={language === 'en' ? 'Manage your EasyShop cart' : 'إدارة سلة التسوق الخاصة بك'}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">
          {language === 'en' ? 'Shopping Cart' : 'عربة التسوق'} {!isCartEmpty && `(${getTotalItems()})`}
        </h1>

        {isCartEmpty ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-4">
              {language === 'en' ? 'Your cart is empty' : 'سلة التسوق فارغة'}
            </h2>
            <p className="text-gray-500 mb-6">
              {language === 'en' 
                ? "Looks like you haven't added anything to your cart yet." 
                : 'يبدو أنك لم تضف أي شيء إلى سلة التسوق الخاصة بك حتى الآن.'}
            </p>
            <Link
              href="/products"
              className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
            >
              {language === 'en' ? 'Start Shopping' : 'ابدأ التسوق'}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'en' ? 'Product' : 'المنتج'}
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'en' ? 'Quantity' : 'الكمية'}
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'en' ? 'Price' : 'السعر'}
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {language === 'en' ? 'Total' : 'الإجمالي'}
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <span className="sr-only">{language === 'en' ? 'Actions' : 'إجراءات'}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {items.map((item) => {
                        const price = typeof item.product.price === 'string' 
                          ? parseFloat(item.product.price) 
                          : item.product.price;
                        const itemTotal = price * item.quantity;
                        
                        return (
                          <tr key={item.product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-16 w-16 border border-gray-200 rounded overflow-hidden">
                                  {item.product.image_url ? (
                                    <img 
                                      src={item.product.image_url} 
                                      alt={item.product.name} 
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-gray-400"
                                      >
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                        <polyline points="21 15 16 10 5 21"></polyline>
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <Link href={`/products/${item.product.id}`} className="font-medium text-gray-900 hover:text-primary">
                                    {item.product.name}
                                  </Link>
                                  {item.product.category && (
                                    <div className="text-gray-500 text-sm">
                                      {item.product.category}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center justify-center">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </button>
                                <span className="mx-3 w-10 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-gray-100"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                              {formatCurrency(price)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {formatCurrency(itemTotal)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-900 text-sm font-medium flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      {language === 'en' ? 'Clear cart' : 'إفراغ السلة'}
                    </button>
                    <Link
                      href="/products"
                      className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="15 18 9 12 15 6"></polyline></svg>
                      {language === 'en' ? 'Continue shopping' : 'مواصلة التسوق'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">
                  {language === 'en' ? 'Order Summary' : 'ملخص الطلب'}
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <span className="text-gray-600">
                      {language === 'en' ? 'Subtotal' : 'المجموع الفرعي'}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(getTotalPrice())}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <span className="text-gray-600">
                      {language === 'en' ? 'Shipping' : 'الشحن'}
                    </span>
                    <span className="font-medium text-green-600">
                      {language === 'en' ? 'Free' : 'مجاني'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <span className="text-gray-600">
                      {language === 'en' ? 'Tax' : 'الضريبة'}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(getTotalPrice() * 0.14)} {/* 14% VAT in Egypt */}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold">
                      {language === 'en' ? 'Total' : 'الإجمالي'}
                    </span>
                    <span className="font-bold text-lg">
                      {formatCurrency(getTotalPrice() * 1.14)} {/* Including 14% VAT */}
                    </span>
                  </div>
                  
                  <button
                    className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary-dark transition-colors mt-6"
                  >
                    {language === 'en' ? 'Proceed to Checkout' : 'متابعة إلى الدفع'}
                  </button>
                  
                  <div className="text-center text-gray-500 text-sm mt-4">
                    {language === 'en' 
                      ? 'Secure checkout powered by EasyShop' 
                      : 'الدفع الآمن مقدم من إيزي شوب'}
                  </div>
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