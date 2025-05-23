import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Button } from '../components/ui/Button';
import FeaturedProducts from '../components/FeaturedProducts';

// CSS для анимации
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
  }

  .bg-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
`;

const HomePage = () => {
  // إضافة تأثيرات حركية عند التمرير
  useEffect(() => {
    // التأكد من أننا في بيئة المتصفح قبل استخدام document
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      }, { threshold: 0.1 });

      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        observer.observe(element);
      });

      return () => {
        elements.forEach((element) => {
          observer.unobserve(element);
        });
      };
    }
  }, []);

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-700 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-on-scroll opacity-0 transition-opacity duration-1000">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Shop Smart,<br/> Shop Easy
                <span className="block text-base md:text-xl mt-2 font-normal">The smart way to shop online</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Discover amazing products at competitive prices. Shop comfortably from your home with EasyShop.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:shadow-glow transition-all duration-300 text-lg px-8 py-3 rounded-full">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 transition-all duration-300 text-lg px-8 py-3 rounded-full">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
              <div className="relative rounded-lg shadow-2xl h-[500px] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-600 rounded-lg">
                  <div className="text-white text-center p-8">
                    <div className="text-6xl font-bold mb-4">EasyShop</div>
                    <div className="text-2xl">Smart Shopping Experience</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-purple-600/20 rounded-lg"></div>
              </div>
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

      {/* Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Shop by Category</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Choose from a variety of categories to find what you're looking for easily</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Electronics Category */}
            <Link href="/products?category=electronics" className="block group animate-on-scroll opacity-0 transition-opacity duration-1000">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-blue-500 to-blue-700">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-white mb-2">Electronics</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">+1000 products</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">Deals</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Clothing Category */}
            <Link href="/products?category=clothing" className="block group animate-on-scroll opacity-0 transition-opacity duration-1000 delay-100">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-pink-500 to-purple-600">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-white mb-2">Clothing</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">+500 products</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">New</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Home & Garden Category */}
            <Link href="/products?category=home-garden" className="block group animate-on-scroll opacity-0 transition-opacity duration-1000 delay-200">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-green-500 to-teal-600">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-white mb-2">Home & Garden</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">+350 products</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">Seasonal</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Beauty Category */}
            <Link href="/products?category=beauty" className="block group animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-purple-500 to-indigo-700">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-white mb-2">Beauty & Care</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">+200 products</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">Exclusive</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="mt-12 text-center animate-on-scroll opacity-0 transition-opacity duration-1000 delay-400">
            <Link href="/products">
              <Button variant="default" size="lg" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 transition-all duration-300 rounded-full py-2.5 px-6">
                View All Categories <span className="inline-block ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* Advertisement Banner */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 animate-on-scroll opacity-0 transition-opacity duration-1000">
              <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">Limited Offer</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">30% Off All Electronics</h2>
              <p className="text-blue-100 mb-6 text-lg">Enjoy the best deals on latest products. Offer valid until the end of month!</p>
              <Link href="/products?category=electronics">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 transition-all duration-300 rounded-full">
                  Shop Now
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2 relative h-64 md:h-80 animate-on-scroll opacity-0 transition-opacity duration-1000 delay-200">
              <div className="absolute inset-0 bg-blue-900/30 rounded-lg flex items-center justify-center">
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 shadow-xl transform rotate-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">30% OFF</div>
                    <p className="text-gray-600 dark:text-gray-300">Use code: <span className="font-mono font-bold">SUMMER30</span></p>
                    <div className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full inline-block">Limited Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Customer Testimonials</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">See what our customers are saying about their experience with EasyShop</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2 animate-on-scroll opacity-0 transition-opacity duration-1000">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-indigo-900 mr-4 bg-indigo-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">AM</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Ahmed Mahmoud</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Customer since 2023</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "I've used EasyShop for buying electronics and clothing multiple times. Fast delivery and high-quality products. Great shopping experience!"
              </p>
              <div className="flex text-yellow-400 space-x-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2 animate-on-scroll opacity-0 transition-opacity duration-1000 delay-100">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-indigo-900 mr-4 bg-pink-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">SA</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Sarah Ahmed</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Customer since 2022</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "Return policy is flexible and customer service is excellent. Found the best products at reasonable prices. Will definitely continue shopping from EasyShop."
              </p>
              <div className="flex text-yellow-400 space-x-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2 animate-on-scroll opacity-0 transition-opacity duration-1000 delay-200">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-indigo-900 mr-4 bg-green-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">MA</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Mohammed Ali</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Customer since 2024</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "Easy-to-use platform with a wide range of products. Payment is secure and fast. I recommend EasyShop to all my friends and family."
              </p>
              <div className="flex text-yellow-400 space-x-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-3 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="flex items-center justify-center md:justify-start space-x-4 rtl:space-x-reverse mb-6 md:mb-0">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Trusted Products</span>
                    <span className="font-bold text-gray-900 dark:text-white">+25,000 Products</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-4 rtl:space-x-reverse mb-6 md:mb-0">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Happy Customers</span>
                    <span className="font-bold text-gray-900 dark:text-white">+100,000 Customers</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start space-x-4 rtl:space-x-reverse">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Monthly Sales</span>
                    <span className="font-bold text-gray-900 dark:text-white">+$250,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action - قسم التسجيل */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0 transition-opacity duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ابدأ التسوق مع إيزي شوب اليوم</h2>
            <p className="text-lg text-indigo-100 mb-8">
              انضم إلى آلاف العملاء السعداء واستمتع بتجربة تسوق فريدة. سجل الآن واحصل على خصم 15% على أول طلب لك.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 rounded-full px-8 py-3 text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                إنشاء حساب مجاني
              </Button>
            </Link>
            <p className="mt-4 text-sm text-indigo-200">
              بالفعل لديك حساب؟ <Link href="/auth/login" className="text-white hover:underline font-medium">تسجيل الدخول</Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;