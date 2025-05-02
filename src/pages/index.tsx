import React from 'react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';
import { Button } from '../components/ui/Button';

// إنشاء صفحة رئيسية مبسطة تستخدم الصور الثابتة بدلاً من مكون Image
const IndexPage = () => {
  return (
    <Layout>
      <div suppressHydrationWarning>
        <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  تسوق بذكاء،<br/> تسوق بسهولة
                  <span className="block text-base md:text-xl mt-2 font-normal">Shop Smart, Shop Easy</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-blue-100">
                  اكتشف منتجات مذهلة بأسعار تنافسية. تسوق براحة من منزلك مع إيزي شوب.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                  <Link href="/products">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 text-lg px-8 py-3 rounded-full">
                      تسوق الآن
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 transition-all duration-300 text-lg px-8 py-3 rounded-full">
                      إنشاء حساب
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <img 
                  src="/logo.svg" 
                  alt="المتجر"
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">المنتجات المميزة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex justify-center p-4 bg-indigo-100">
                    <div className="text-center py-8 w-full">
                      <div className="flex justify-center">
                        <div className="w-24 h-24 bg-indigo-600 rounded flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">منتج {i}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">منتج {i}</h3>
                    <p className="text-gray-600 mb-4">وصف للمنتج رقم {i}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${(i * 25).toFixed(2)}</span>
                      <Button>أضف للسلة</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Toaster position="bottom-center" />
      </div>
    </Layout>
  );
};

export default IndexPage;