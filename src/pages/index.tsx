import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { useLanguageStore } from '../store/languageStore';

const testimonials = [
  {
    name: 'محمد أحمد',
    title: 'عميل منتظم',
    text: 'تجربة تسوق رائعة! المنتجات ذات جودة عالية والتوصيل سريع.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
  },
  {
    name: 'سارة محمود',
    title: 'متسوقة متحمسة',
    text: 'أحب تنوع المنتجات وسهولة استخدام المنصة. دائماً ما أجد ما أبحث عنه.',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
  },
  {
    name: 'أحمد خالد',
    title: 'مشتري جديد',
    text: 'خدمة عملاء ممتازة ومنتجات عالية الجودة. سأتسوق هنا مرة أخرى بالتأكيد.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
  }
];

const IndexPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { language } = useLanguageStore();
  
  useEffect(() => {
    // Mark as loaded after component mounts
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{language === 'en' ? 'EasyShop - Online Shopping' : 'إيزي شوب - تسوق أونلاين'}</title>
        <meta name="description" content={language === 'en' ? 'Shop smart with EasyShop' : 'تسوق بذكاء مع إيزي شوب'} />
      </Head>
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 text-white overflow-hidden">
          {/* Background Image with overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-800/90 to-purple-900/90 z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop')",
                filter: "brightness(0.6)"
              }}
            ></div>
          </div>

          <div className="container mx-auto px-4 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {language === 'en' 
                    ? 'Discover Amazing Products at EasyShop' 
                    : 'اكتشف منتجات رائعة في إيزي شوب'}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-lg">
                  {language === 'en'
                    ? 'Explore thousands of high-quality products with fast delivery and secure payment options.'
                    : 'استكشف آلاف المنتجات عالية الجودة مع توصيل سريع وخيارات دفع آمنة.'}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 rtl:sm:space-x-reverse">
                  <Link href="/products" className="inline-block bg-white text-blue-700 hover:bg-blue-50 rounded-full px-8 py-4 font-bold text-lg shadow-lg transform transition-transform hover:scale-105">
                    {language === 'en' ? 'Shop Now' : 'تسوق الآن'}
                  </Link>
                  <Link href="/auth/signup" className="inline-block border-2 border-white text-white hover:bg-white/20 rounded-full px-8 py-4 font-bold text-lg transform transition-transform hover:scale-105">
                    {language === 'en' ? 'Create Account' : 'إنشاء حساب'}
                  </Link>
                </div>
              </div>
              <div className={`hidden md:flex justify-center transition-all duration-1000 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20 max-w-md">
                  <div className="relative w-full h-80 rounded-xl overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1974&auto=format&fit=crop" 
                      alt="Shopping Experience" 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {language === 'en' ? 'New Collection Available' : 'مجموعة جديدة متاحة'}
                  </h2>
                  <p className="text-blue-100 mb-4">
                    {language === 'en' 
                      ? 'Explore our latest summer collection with amazing discounts' 
                      : 'استكشف مجموعة الصيف الجديدة مع خصومات مذهلة'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                      {language === 'en' ? 'Up to 50% Off' : 'خصم يصل إلى 50%'}
                    </span>
                    <Link href="/products" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-medium hover:opacity-90">
                      {language === 'en' ? 'View Collection' : 'عرض المجموعة'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section - Just a sample */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'en' ? 'Shop by Category' : 'تسوق حسب الفئة'}
              </h2>
              <p className="text-gray-600 text-lg">
                {language === 'en' 
                  ? 'Choose from a variety of categories to find what you\'re looking for easily' 
                  : 'اختر من بين مجموعة متنوعة من الفئات للعثور على ما تبحث عنه بسهولة'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Electronics Category */}
              <Link href="/products?category=electronics" className="block group">
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop" 
                    alt="Electronics Category" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10 flex items-end p-6">
                    <div className="w-full">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {language === 'en' ? 'Electronics' : 'الإلكترونيات'}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-200">+1000 products</span>
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">
                          {language === 'en' ? 'Deals' : 'عروض'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Clothing Category */}
              <Link href="/products?category=clothing" className="block group">
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" 
                    alt="Clothing Category" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10 flex items-end p-6">
                    <div className="w-full">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {language === 'en' ? 'Clothing' : 'الملابس'}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-200">+500 products</span>
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">
                          {language === 'en' ? 'New' : 'جديد'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Home & Kitchen Category */}
              <Link href="/products?category=home" className="block group">
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=2070&auto=format&fit=crop" 
                    alt="Home & Kitchen Category" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10 flex items-end p-6">
                    <div className="w-full">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {language === 'en' ? 'Home & Kitchen' : 'المنزل والمطبخ'}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-200">+800 products</span>
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">
                          {language === 'en' ? 'Popular' : 'شائع'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Books Category */}
              <Link href="/products?category=books" className="block group">
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop" 
                    alt="Books Category" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10 flex items-end p-6">
                    <div className="w-full">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {language === 'en' ? 'Books' : 'الكتب'}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-200">+300 products</span>
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">
                          {language === 'en' ? 'Sale' : 'تخفيضات'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-10">
              {language === 'en' ? 'Our Customers Love Us' : 'عملاؤنا يحبوننا'}
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-500 transform ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="h-20 w-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-600 mb-4">{testimonial.title}</p>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default IndexPage;