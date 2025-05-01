import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Button } from '../components/ui/Button';
import dynamic from 'next/dynamic';

// استيراد المكونات بشكل ديناميكي لتجنب مشاكل hydration
const FeaturedProducts = dynamic(() => import('../components/FeaturedProducts'), {
  ssr: false,
  loading: () => (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">منتجات مميزة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="h-64 bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
});

const HomePage: React.FC = () => {
  // إضافة تأثيرات حركية عند التمرير
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section - قسم الترحيب الرئيسي */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-700 text-white overflow-hidden">
        {/* خلفية متحركة */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pattern-bg.svg')] opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-on-scroll opacity-0 transition-opacity duration-1000">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                تسوق بذكاء،<br/> تسوق بسهولة
                <span className="block text-base md:text-xl mt-2 font-normal">Shop Smart, Shop Easy</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                اكتشف منتجات مذهلة بأسعار تنافسية. تسوق براحة من منزلك مع إيزي شوب.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:shadow-glow transition-all duration-300 text-lg px-8 py-3 rounded-full">
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
            <div className="hidden md:block relative h-[500px] animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
              <Image
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="تسوق عبر الإنترنت"
                fill
                priority
                className="object-cover rounded-lg shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-purple-600/20 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* شريط متموج في الأسفل */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#f9fafb" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,218.7C672,224,768,224,864,213.3C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Categories Section - قسم التصنيفات */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">تسوق حسب الفئة</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">اختر من بين مجموعة متنوعة من الفئات لتجد ما تبحث عنه بسهولة</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <Link href="/products?category=electronics" className="block group animate-on-scroll opacity-0 transition-opacity duration-1000">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1593344484962-796055d4a3a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="الإلكترونيات"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-white mb-2 rtl:text-right">الإلكترونيات</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">+1000 منتج</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">تخفيضات</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/products?category=clothing" className="block group animate-on-scroll opacity-0 transition-opacity duration-1000 delay-100">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="الملابس"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-white mb-2 rtl:text-right">الملابس</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">+500 منتج</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">جديد</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/products?category=home-garden" className="block group animate-on-scroll opacity-0 transition-opacity duration-1000 delay-200">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="المنزل والحديقة"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-white mb-2 rtl:text-right">المنزل والحديقة</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">+350 منتج</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">موسمي</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/products?category=beauty" className="block group animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="الجمال والعناية"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-white mb-2 rtl:text-right">الجمال والعناية</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">+200 منتج</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">حصري</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="mt-12 text-center animate-on-scroll opacity-0 transition-opacity duration-1000 delay-400">
            <Link href="/products">
              <Button variant="default" size="lg" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 transition-all duration-300 rounded-full py-2.5 px-6">
                عرض جميع الفئات <span className="inline-block mr-2 rtl:ml-2 rtl:mr-0">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section - قسم المنتجات المميزة */}
      <FeaturedProducts />
      
      {/* Advertisement Banner - قسم الإعلانات */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/images/pattern-bg.svg"
            alt="نمط خلفية" 
            fill
            className="object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 animate-on-scroll opacity-0 transition-opacity duration-1000">
              <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">عرض محدود</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">خصم 30% على جميع المنتجات الإلكترونية</h2>
              <p className="text-blue-100 mb-6 text-lg">استمتع بأفضل العروض على أحدث المنتجات. العرض ساري حتى نهاية الشهر!</p>
              <Link href="/products?category=electronics">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 transition-all duration-300 rounded-full">
                  تسوق الآن
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2 relative h-64 md:h-80 animate-on-scroll opacity-0 transition-opacity duration-1000 delay-200">
              <Image
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="منتجات إلكترونية"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 shadow-xl transform rotate-3">
                  <div className="text-center">
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">خصم 30%</p>
                    <p className="text-gray-600 dark:text-gray-300">استخدم الكود: <span className="font-mono font-bold">SUMMER30</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seller Recruitment - انضم إلينا كتاجر */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0 transition-opacity duration-1000">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">انضم إلينا كتاجر واعرض منتجاتك للملايين</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                هل تملك منتجات مميزة وترغب في الوصول إلى عملاء جدد؟ انضم إلى منصة إيزي شوب وابدأ ببيع منتجاتك الآن. نوفر لك حلول متكاملة لتنمية تجارتك عبر الإنترنت.
              </p>
              <div className="space-y-4">
                <div className="flex items-start rtl:space-x-reverse space-x-3">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white">بدون رسوم إدارية</h3>
                    <p className="text-gray-600 dark:text-gray-400">بدء البيع مجانًا بدون أي رسوم تسجيل أو اشتراك شهري</p>
                  </div>
                </div>
                <div className="flex items-start rtl:space-x-reverse space-x-3">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white">لوحة تحكم متطورة</h3>
                    <p className="text-gray-600 dark:text-gray-400">إدارة منتجاتك ومبيعاتك بسهولة من خلال لوحة تحكم متطورة</p>
                  </div>
                </div>
                <div className="flex items-start rtl:space-x-reverse space-x-3">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white">دعم فني على مدار الساعة</h3>
                    <p className="text-gray-600 dark:text-gray-400">فريق دعم متخصص جاهز لمساعدتك في أي وقت</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/seller/signup">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-700 dark:hover:bg-indigo-800 transition-all duration-300 rounded-full px-8">
                    سجل كتاجر الآن
                  </Button>
                </Link>
                <Link href="/seller/learn-more" className="inline-block mr-4 rtl:ml-4 rtl:mr-0 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                  تعرف على المزيد <span className="inline-block ml-1 rtl:mr-1 rtl:ml-0">←</span>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="تاجر على المنصة"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">1000+ تاجر ناجح</h3>
                      <p className="text-blue-100 text-sm">انضم إلى مجتمع التجار الناجحين</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg transform rotate-3 animate-pulse hidden md:block">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3 rtl:ml-3 rtl:mr-0">
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">مبيعات شهرية</span>
                    <span className="font-bold text-gray-900 dark:text-white">+250,000 ريال</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - آراء العملاء */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">ماذا يقول عملاؤنا</h2>
            <p className="text-gray-600 dark:text-gray-300">انضم إلى آلاف العملاء السعداء الذين يتسوقون معنا</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2 animate-on-scroll opacity-0 transition-opacity duration-1000">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-indigo-900 ml-4 rtl:mr-4 rtl:ml-0">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    alt="عميل"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg dark:text-white">سارة الأحمد</h4>
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-right">
                "أحب التسوق في إيزي شوب! المنتجات ذات جودة عالية والتوصيل دائمًا في الوقت المحدد. أنصح به بشدة!"
              </p>
              <div className="mt-4 text-right">
                <span className="text-xs text-gray-500 dark:text-gray-400">عميل منذ 2023</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2 animate-on-scroll opacity-0 transition-opacity duration-1000 delay-100">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-indigo-900 ml-4 rtl:mr-4 rtl:ml-0">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    alt="عميل"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg dark:text-white">محمد العبدالله</h4>
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-right">
                "مجموعة رائعة من المنتجات وخدمة عملاء ممتازة. لقد كنت عميلاً مخلصًا لسنوات ولم أشعر بخيبة أمل أبدًا. سرعة التوصيل مذهلة!"
              </p>
              <div className="mt-4 text-right">
                <span className="text-xs text-gray-500 dark:text-gray-400">مشتريات متكررة</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2 animate-on-scroll opacity-0 transition-opacity duration-1000 delay-200">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-indigo-900 ml-4 rtl:mr-4 rtl:ml-0">
                  <Image
                    src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                    alt="عميل"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg dark:text-white">ليلى المحمد</h4>
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-right">
                "إيزي شوب لديه أفضل الأسعار وصفقات مذهلة. تجربة المستخدم سلسة وأحب مدى سهولة العثور على ما أبحث عنه."
              </p>
              <div className="mt-4 text-right">
                <span className="text-xs text-gray-500 dark:text-gray-400">أكثر من 50 طلب</span>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
            <Link href="/reviews" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-lg inline-flex items-center">
              <span>قراءة المزيد من تقييمات العملاء</span>
              <svg className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - قسم الدعوة للتسجيل */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
          <div className="absolute inset-0 bg-[url('/images/pattern-bg.svg')] opacity-5"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-on-scroll opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">هل أنت مستعد للتسوق؟</h2>
            <p className="text-lg text-blue-100 mb-8 mx-auto">
              انضم إلى آلاف العملاء الراضين الذين يتسوقون مع إيزي شوب. سجل اليوم واحصل على عروض حصرية.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-center">
              <Link href="/auth/signup" className="sm:ml-4 rtl:sm:mr-4 rtl:sm:ml-0">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:shadow-glow transition-all duration-300 text-lg px-8 py-3 rounded-full">
                  إنشاء حساب جديد
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 transition-all duration-300 text-lg px-8 py-3 rounded-full">
                  تصفح المنتجات
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              بالفعل لديك حساب؟ <Link href="/auth/login" className="text-white hover:underline font-medium">تسجيل الدخول</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;