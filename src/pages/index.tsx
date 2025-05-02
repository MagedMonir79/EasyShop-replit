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
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Shop Smart, Shop Easy
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Discover amazing products at competitive prices. Shop comfortably from your home with EasyShop.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/products" className="inline-block bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8 py-3 font-semibold text-lg">
                  Shop Now
                </Link>
                <Link href="/auth/signup" className="inline-block border-2 border-white text-white hover:bg-white/20 rounded-full px-8 py-3 font-semibold text-lg">
                  Create Account
                </Link>
              </div>
            </div>
            <div className={`hidden md:block transition-opacity duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-indigo-800 p-8 rounded-xl text-white text-center shadow-2xl">
                <h2 className="text-3xl font-bold mb-4">EasyShop</h2>
                <p className="text-xl">Your trusted online store</p>
                <div className="mt-6 flex justify-center">
                  <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
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
            <Link href="/products?category=clothing" className="block group">
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

            {/* Home & Kitchen Category */}
            <Link href="/products?category=home" className="block group">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-green-500 to-teal-600">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
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
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-yellow-500 to-amber-600">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
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
            {/* Product card placeholders */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Product {item}</h3>
                  <p className="text-gray-500 text-sm mb-2">High-quality product with amazing features</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${(item * 50) - 0.01}</span>
                    <button className="bg-blue-600 text-white py-1 px-4 rounded-full text-sm hover:bg-blue-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered quickly with our premium shipping partners in all regions.</p>
            </div>
            
            {/* Secure Payment */}
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-6 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payment</h3>
              <p className="text-gray-600">Shop with confidence using our secure payment methods protecting your data.</p>
            </div>
            
            {/* Customer Support */}
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-6 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-gray-600">Our dedicated customer service team is available 24/7 to assist you with any questions.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-indigo-100 text-lg mb-8">Subscribe to our newsletter to receive the latest updates, promotions, and exclusive deals.</p>
            
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
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EasyShop</h3>
              <p className="text-gray-400">Your one-stop online shopping destination for all your needs.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><Link href="/products?category=electronics" className="text-gray-400 hover:text-white">Electronics</Link></li>
                <li><Link href="/products?category=fashion" className="text-gray-400 hover:text-white">Fashion</Link></li>
                <li><Link href="/products?category=home" className="text-gray-400 hover:text-white">Home & Kitchen</Link></li>
                <li><Link href="/products?category=beauty" className="text-gray-400 hover:text-white">Beauty & Health</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <address className="text-gray-400 not-italic">
                <p>1234 Shopping Street</p>
                <p>Commerce City, ST 12345</p>
                <p className="mt-2">Email: info@easyshop.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EasyShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <Toaster position="bottom-center" />
    </div>
  );
};

export default IndexPage;