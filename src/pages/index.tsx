import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Head from 'next/head';

// Simple direct HTML instead of using complex components
const IndexPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Mark as loaded after component mounts
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>EasyShop - Online Shopping</title>
        <meta name="description" content="Shop smart with EasyShop" />
      </Head>
      
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">EasyShop</div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-600">Categories</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-blue-600">
              <span>Cart (0)</span>
            </Link>
            <Link href="/auth/login" className="text-gray-700 hover:text-blue-600">
              <span>Login</span>
            </Link>
          </div>
        </div>
      </header>
      
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
                Discover Amazing Products at EasyShop
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-lg">
                Explore thousands of high-quality products with fast delivery and secure payment options. Your one-stop shop for all your needs.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/products" className="inline-block bg-white text-blue-700 hover:bg-blue-50 rounded-full px-8 py-4 font-bold text-lg shadow-lg transform transition-transform hover:scale-105">
                  Shop Now
                </Link>
                <Link href="/auth/signup" className="inline-block border-2 border-white text-white hover:bg-white/20 rounded-full px-8 py-4 font-bold text-lg transform transition-transform hover:scale-105">
                  Create Account
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
                <h2 className="text-2xl font-bold mb-2">New Collection Available</h2>
                <p className="text-blue-100 mb-4">Explore our latest summer collection with amazing discounts</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Up to 50% Off</span>
                  <Link href="/products" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-medium hover:opacity-90">View Collection</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Advertisements Slider Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            {/* Slider Component */}
            <div className="flex flex-nowrap overflow-hidden relative">
              {/* First Ad Slide */}
              <div className="min-w-full transition-transform duration-500">
                <div className="relative h-80 md:h-96 w-full bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2115&auto=format&fit=crop" 
                      alt="Special Deals" 
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center">
                    <div className="w-full md:w-1/2 p-8 md:p-12">
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                        <span className="inline-block bg-white/20 text-white px-3 py-1 text-xs rounded-full mb-3">العرض الأسبوعي</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">خصم 30% على الإلكترونيات</h2>
                        <p className="text-white/90 mb-6">استمتع بخصومات استثنائية على مجموعة متنوعة من المنتجات الإلكترونية هذا الأسبوع فقط!</p>
                        <Link href="/products?category=electronics" className="inline-block bg-white text-indigo-700 py-2 px-6 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                          تسوق الآن
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Second Ad Slide (Hidden Initially) */}
              <div className="min-w-full transition-transform duration-500 absolute top-0 left-full">
                <div className="relative h-80 md:h-96 w-full bg-gradient-to-r from-pink-600 to-red-600 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
                      alt="Fashion Sale" 
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-end">
                    <div className="w-full md:w-1/2 p-8 md:p-12">
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                        <span className="inline-block bg-white/20 text-white px-3 py-1 text-xs rounded-full mb-3">حصري</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">تخفيضات الموسم</h2>
                        <p className="text-white/90 mb-6">أحدث صيحات الموضة بأسعار مخفضة تصل إلى 50%. تألقي بأجمل الإطلالات هذا الموسم!</p>
                        <Link href="/products?category=fashion" className="inline-block bg-white text-pink-700 py-2 px-6 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                          اكتشفي المجموعة
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Third Ad Slide (Hidden Initially) */}
              <div className="min-w-full transition-transform duration-500 absolute top-0 left-[200%]">
                <div className="relative h-80 md:h-96 w-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1901&auto=format&fit=crop" 
                      alt="Home Appliances" 
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center">
                    <div className="w-full md:w-1/2 p-8 md:p-12">
                      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                        <span className="inline-block bg-white/20 text-white px-3 py-1 text-xs rounded-full mb-3">عروض محدودة</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">الأجهزة المنزلية</h2>
                        <p className="text-white/90 mb-6">جدد منزلك مع أحدث الأجهزة المنزلية بأسعار لا تقبل المنافسة. عروض حصرية لفترة محدودة!</p>
                        <Link href="/products?category=home" className="inline-block bg-white text-blue-700 py-2 px-6 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                          اكتشف العروض
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Slider Controls */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-3 rtl:space-x-reverse">
              <button className="w-3 h-3 rounded-full bg-white opacity-100"></button>
              <button className="w-3 h-3 rounded-full bg-white opacity-50"></button>
              <button className="w-3 h-3 rounded-full bg-white opacity-50"></button>
            </div>
            
            {/* Next/Prev Buttons */}
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-colors rtl:left-auto rtl:right-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-colors rtl:right-auto rtl:left-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Choose from a variety of categories to find what you're looking for easily</p>
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
            <Link href="/products?category=clothing" className="block group">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" 
                  alt="Clothing Category" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10 flex items-end p-6">
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
                    <h3 className="text-xl font-bold text-white mb-2">Home & Kitchen</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">+800 products</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">Popular</span>
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
                    <h3 className="text-xl font-bold text-white mb-2">Books</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-200">+1200 products</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs py-1 px-3 rounded-full">Sale</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600">Discover our popular and trending products</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product cards */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop" 
                  alt="Wireless Headphones" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs py-1 px-2 rounded">-20%</div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Wireless Headphones</h3>
                <p className="text-gray-500 text-sm mb-2">Premium noise-cancelling wireless headphones with long battery life</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">4,649 ج.م</span>
                    <span className="text-gray-400 text-sm line-through ml-2">5,889 ج.م</span>
                  </div>
                  <button className="bg-blue-600 text-white py-1 px-4 rounded-full text-sm hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2127&auto=format&fit=crop" 
                  alt="Smartphone Pro Max" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs py-1 px-2 rounded">New</div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Smartphone Pro Max</h3>
                <p className="text-gray-500 text-sm mb-2">Latest smartphone with high-resolution camera and fast processor</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">31,000 ج.م</span>
                  <button className="bg-blue-600 text-white py-1 px-4 rounded-full text-sm hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" 
                  alt="Smart Watch Elite" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs py-1 px-2 rounded">Popular</div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Smart Watch Elite</h3>
                <p className="text-gray-500 text-sm mb-2">Track fitness, notifications and calls with this premium smartwatch</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">$299.99</span>
                  <button className="bg-blue-600 text-white py-1 px-4 rounded-full text-sm hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop" 
                  alt="Wireless Speaker" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs py-1 px-2 rounded">Hot</div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Wireless Speaker</h3>
                <p className="text-gray-500 text-sm mb-2">Portable bluetooth speaker with amazing sound quality and water resistance</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">$79.99</span>
                  <button className="bg-blue-600 text-white py-1 px-4 rounded-full text-sm hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/products" className="inline-block bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Shop With Us</h2>
            <p className="text-gray-600 text-lg">We provide the best shopping experience with premium services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fast Delivery */}
            <div className="p-0 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070&auto=format&fit=crop" 
                  alt="Fast Delivery" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-white">Fast Delivery</h3>
                </div>
              </div>
              <div className="p-6 bg-white">
                <p className="text-gray-600">Get your orders delivered quickly with our premium shipping partners in all regions. We ensure your packages arrive safely and on time.</p>
              </div>
            </div>
            
            {/* Secure Payment */}
            <div className="p-0 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop" 
                  alt="Secure Payment" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-white">Secure Payment</h3>
                </div>
              </div>
              <div className="p-6 bg-white">
                <p className="text-gray-600">Shop with confidence using our secure payment methods protecting your data. We support multiple payment options for your convenience.</p>
              </div>
            </div>
            
            {/* Customer Support */}
            <div className="p-0 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=2070&auto=format&fit=crop" 
                  alt="Customer Support" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-white">24/7 Support</h3>
                </div>
              </div>
              <div className="p-6 bg-white">
                <p className="text-gray-600">Our dedicated customer service team is available 24/7 to assist you with any questions. We're committed to providing the best shopping experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seller Registration Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <circle cx="25" cy="25" r="20" className="fill-white" />
            <circle cx="75" cy="75" r="20" className="fill-white" />
            <circle cx="75" cy="25" r="10" className="fill-white" />
            <circle cx="25" cy="75" r="10" className="fill-white" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="transform transition-all duration-500 hover:scale-105">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl">
                <div className="mb-6">
                  <span className="inline-block bg-white/20 text-white text-xs py-1 px-3 rounded-full mb-2">للتجار</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">انضم إلينا كتاجر</h2>
                  <p className="text-gray-100 mb-6">
                    ابدأ رحلتك في بيع منتجاتك عبر منصتنا واصل إلى ملايين العملاء المحتملين. نوفر حلولًا متكاملة لإدارة متجرك بسهولة وفعالية.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>رسوم تنافسية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>تسويق مجاني</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>دعم على مدار الساعة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>أدوات تحليلية</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/seller/register" className="px-6 py-3 bg-white text-indigo-700 rounded-lg font-bold hover:bg-gray-100 transition-colors text-center">
                    سجل كتاجر
                  </Link>
                  <Link href="/seller/learn-more" className="px-6 py-3 bg-transparent border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-center">
                    معرفة المزيد
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-6">مميزات البيع معنا</h3>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">زيادة المبيعات</h4>
                    <p className="text-gray-200">الوصول إلى قاعدة واسعة من العملاء النشطين يبحثون عن منتجات مثل منتجاتك.</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">حماية البائع</h4>
                    <p className="text-gray-200">نظام دفع آمن وسياسات حماية للبائعين تضمن حقوقك وتجعل عملية البيع سلسة وآمنة.</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">أدوات تسويقية متطورة</h4>
                    <p className="text-gray-200">حملات ترويجية وإشعارات للعملاء وقسائم تخفيض لزيادة ظهور منتجاتك وتحسين المبيعات.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 text-white relative overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-indigo-900/90 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=2070&auto=format&fit=crop')",
              filter: "brightness(0.6)"
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Connected with EasyShop</h2>
                <p className="text-white/80 text-lg mb-8">
                  Subscribe to our newsletter and be the first to know about new products, 
                  exclusive offers, and seasonal promotions. Join our community of smart shoppers today!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-grow py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
                  />
                  <button className="bg-white text-indigo-600 hover:bg-indigo-50 py-3 px-8 rounded-full font-semibold transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
                
                <p className="text-white/70 text-sm mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from EasyShop.
                </p>
              </div>
              
              <div className="md:col-span-2 hidden md:block">
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 mb-4">
                    <h3 className="font-bold text-lg">Special Offer</h3>
                    <p className="text-white/80 text-sm">For new subscribers only</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-5 text-center">
                    <div className="text-3xl font-bold mb-2">15% OFF</div>
                    <div className="text-lg mb-3">Your First Purchase</div>
                    <div className="text-xs text-white/70">Use code: WELCOME15</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-5">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">EasyShop</h3>
              </div>
              <p className="text-gray-400 mb-6 pr-8">Your one-stop online shopping destination for all your needs. We offer a wide range of products with the best prices and quality.</p>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-4 text-gray-300">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.379.06-3.808.06h-.104c-2.43 0-2.784-.012-3.808-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.104c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-300">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-white hover:underline transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white hover:underline transition-colors">Contact</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white hover:underline transition-colors">FAQ</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white hover:underline transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white hover:underline transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-300">Categories</h4>
              <ul className="space-y-3">
                <li><Link href="/products?category=electronics" className="text-gray-400 hover:text-white hover:underline transition-colors">Electronics</Link></li>
                <li><Link href="/products?category=fashion" className="text-gray-400 hover:text-white hover:underline transition-colors">Fashion</Link></li>
                <li><Link href="/products?category=home" className="text-gray-400 hover:text-white hover:underline transition-colors">Home & Kitchen</Link></li>
                <li><Link href="/products?category=beauty" className="text-gray-400 hover:text-white hover:underline transition-colors">Beauty & Health</Link></li>
                <li><Link href="/products?category=books" className="text-gray-400 hover:text-white hover:underline transition-colors">Books</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-300">Contact Us</h4>
              <address className="text-gray-400 not-italic space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p>1234 Shopping Street</p>
                    <p>Commerce City, ST 12345</p>
                  </div>
                </div>
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@easyshop.com</span>
                </div>
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(123) 456-7890</span>
                </div>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
              <p className="mb-4 md:mb-0">&copy; 2025 EasyShop. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster position="bottom-center" />
    </div>
  );
};

export default IndexPage;