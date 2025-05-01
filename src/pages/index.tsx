import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import FeaturedProducts from '../components/FeaturedProducts';
import { Button } from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Shop Smart, Shop Easy
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Discover amazing products at competitive prices. Shop from the comfort of your home with EasyShop.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative h-96">
              <Image
                src="https://images.unsplash.com/photo-1483181957632-8bda974cbc91"
                alt="Shopping cart"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/products?category=electronics" className="block group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
                  alt="Electronics"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white">Electronics</h3>
                </div>
              </div>
            </Link>
            <Link href="/products?category=clothing" className="block group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1509695507497-903c140c43b0"
                  alt="Clothing"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white">Clothing</h3>
                </div>
              </div>
            </Link>
            <Link href="/products?category=home" className="block group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1525904097878-94fb15835963"
                  alt="Home & Kitchen"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white">Home & Kitchen</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                    alt="Customer"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I love shopping at EasyShop! The products are high quality and the delivery is always on time. Highly recommended!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5"
                    alt="Customer"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Michael Davis</h4>
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Great selection of products and excellent customer service. I've been a loyal customer for years and never been disappointed."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://images.unsplash.com/photo-1499557354967-2b2d8910bcca"
                    alt="Customer"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Amelia Thompson</h4>
                  <div className="flex text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "EasyShop has the best prices and amazing deals. The user experience is smooth and I love how easy it is to find what I'm looking for."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who shop with EasyShop. Register today and get exclusive offers.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
