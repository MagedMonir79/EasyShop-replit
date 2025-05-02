import React from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import FeaturedProducts from '../components/FeaturedProducts';

// Simple index page with direct HTML elements
const IndexPage = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Shop Smart, Shop Easy
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100 animate-fade-in animate-delay-300">
                Discover amazing products at competitive prices. Shop comfortably from your home with EasyShop.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in animate-delay-600">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 text-lg px-8 py-3 rounded-full animate-pulse">
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
            <div className="hidden md:block animate-slide-right">
              <div className="bg-indigo-800 p-8 rounded-xl text-white text-center shadow-2xl">
                <h2 className="text-3xl font-bold mb-4">EasyShop</h2>
                <p className="text-xl">Your trusted online store</p>
                <div className="mt-6 flex justify-center">
                  <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Choose from a variety of categories to find what you're looking for easily</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Electronics Category */}
            <Link href="/products?category=electronics" className="block group animate-fade-in animate-delay-300">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 transform transition-transform duration-300 hover:scale-105">
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
            <Link href="/products?category=clothing" className="block group animate-fade-in animate-delay-600">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 transform transition-transform duration-300 hover:scale-105">
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
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Shop With Us</h2>
            <p className="text-gray-600 text-lg">We provide the best shopping experience with premium services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fast Delivery */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered quickly with our premium shipping partners in all regions.</p>
            </div>
            
            {/* Secure Payment */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-6 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payment</h3>
              <p className="text-gray-600">Shop with confidence using our secure payment methods protecting your data.</p>
            </div>
            
            {/* Customer Support */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
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
      
      <Toaster position="bottom-center" />
    </Layout>
  );
};

export default IndexPage;