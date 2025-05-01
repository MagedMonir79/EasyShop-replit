import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { useProducts } from '../../hooks/useProducts';
import { Button } from '../../components/ui/Button';
import { useCartStore } from '../../store/cartStore';
import toast from 'react-hot-toast';
import FeaturedProducts from '../../components/FeaturedProducts';

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { useProductQuery } = useProducts();
  const { data: product, isLoading, error } = useProductQuery(Number(id));
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success('Added to cart');
    }
  };

  // Format the price with 2 decimal places
  const formattedPrice = product
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(product.price)
    : '';

  return (
    <Layout
      title={product ? `${product.name} | EasyShop` : 'Product | EasyShop'}
      description={product?.description}
    >
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg h-96"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Error Loading Product</h2>
            <p>We couldn't load this product. Please try again later.</p>
            <Button
              onClick={() => router.push('/products')}
              className="mt-4"
            >
              Return to Products
            </Button>
          </div>
        ) : product ? (
          <>
            <div className="mb-8">
              <button
                onClick={() => router.back()}
                className="text-primary hover:text-primary/80 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-arrow-left mr-1"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Products
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div>
                <span className="inline-block bg-blue-100 text-primary rounded-full px-3 py-1 text-sm mb-4">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-2xl font-bold text-primary mb-4">
                  {formattedPrice}
                </p>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Availability</h2>
                  {product.stock > 0 ? (
                    <p className="text-green-600">
                      In Stock ({product.stock} available)
                    </p>
                  ) : (
                    <p className="text-red-600">Out of Stock</p>
                  )}
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full"
                  size="lg"
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>

            {/* Product details/specifications */}
            <div className="bg-gray-50 rounded-lg p-6 mb-12">
              <h2 className="text-xl font-bold mb-4">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Category</h3>
                  <p>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">SKU</h3>
                  <p>SKU-{product.id.toString().padStart(6, '0')}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Added On</h3>
                  <p>{new Date(product.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Stock</h3>
                  <p>{product.stock} units</p>
                </div>
              </div>
            </div>

            {/* Similar products section */}
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <FeaturedProducts />
          </>
        ) : null}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
