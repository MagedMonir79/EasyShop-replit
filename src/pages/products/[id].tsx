import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useLanguageStore } from '../../store/languageStore';
import { useCartStore } from '../../store/cartStore';
import Link from 'next/link';
import { getSafeProductImageUrl } from '../../utils/imageUtils';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { language } = useLanguageStore();
  const { addItem } = useCartStore();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    // Only fetch when id is available
    if (!id) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error(
            language === 'en' 
              ? 'Failed to fetch product details' 
              : 'فشل في الحصول على تفاصيل المنتج'
          );
        }
        
        const data = await response.json();
        setProduct(data);
        
        // Also fetch related products
        const relatedResponse = await fetch(`/api/products?category=${data.category_id}&limit=4`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          // Filter out the current product
          setRelatedProducts(relatedData.filter((p: any) => p.id !== data.id).slice(0, 4));
        }
      } catch (err: any) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, language]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      
      // Show a notification - you can use toast or any other notification system
      // For simplicity, we'll just use an alert here
      alert(
        language === 'en' 
          ? 'Product added to cart!' 
          : 'تمت إضافة المنتج إلى السلة!'
      );
    }
  };

  if (loading) {
    return (
      <Layout title={language === 'en' ? 'Loading...' : 'جاري التحميل...'}>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout title={language === 'en' ? 'Error' : 'خطأ'}>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {language === 'en' ? 'Error Loading Product' : 'خطأ في تحميل المنتج'}
          </h1>
          <p className="mb-8">{error}</p>
          <Link
            href="/products"
            className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            {language === 'en' ? 'Back to Products' : 'العودة إلى المنتجات'}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${product.name} | ${language === 'en' ? 'EasyShop' : 'إيزي شوب'}`}
      description={product.description || (language === 'en' ? 'Product details' : 'تفاصيل المنتج')}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 rtl:space-x-reverse">
            <li>
              <Link href="/" className="text-gray-500 hover:text-primary">
                {language === 'en' ? 'Home' : 'الرئيسية'}
              </Link>
            </li>
            <li className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <Link href="/products" className="text-gray-500 hover:text-primary">
                {language === 'en' ? 'Products' : 'المنتجات'}
              </Link>
            </li>
            <li className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="font-medium text-gray-900 truncate max-w-xs">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="flex flex-col">
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200 mb-4 aspect-square">
              <img
                src={getSafeProductImageUrl(product.image_url)}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="mb-4 flex items-center">
              <div className="flex items-center mr-4">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-gray-600">4.5 (24 {language === 'en' ? 'reviews' : 'تقييم'})</span>
              </div>
              {product.stock_status && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {language === 'en' ? 'In Stock' : 'متوفر'}
                </span>
              )}
            </div>
            
            <div className="text-3xl font-bold text-primary mb-6">
              {product.price} {language === 'en' ? 'EGP' : 'ج.م'}
            </div>
            
            <div className="prose prose-sm mb-8 text-gray-600">
              <p>{product.description || (language === 'en' ? 'No description available.' : 'لا يوجد وصف متاح.')}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{language === 'en' ? 'Category' : 'الفئة'}:</span>
                  <span className="text-gray-900">{product.category?.name || 'General'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{language === 'en' ? 'SKU' : 'رمز المنتج'}:</span>
                  <span className="text-gray-900">ES-{product.id}</span>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <span className="mr-3 text-gray-700">{language === 'en' ? 'Quantity' : 'الكمية'}:</span>
                <div className="custom-number-input flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <span className="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input
                    type="number"
                    className="w-12 h-10 text-center text-gray-700 border-x border-gray-300"
                    value={quantity}
                    min="1"
                    max="10"
                    readOnly
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition"
                >
                  {language === 'en' ? 'Add to Cart' : 'أضف إلى السلة'}
                </button>
                <button className="flex-1 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition">
                  {language === 'en' ? 'Add to Wishlist' : 'أضف للمفضلة'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {language === 'en' ? 'Related Products' : 'منتجات ذات صلة'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="aspect-square relative">
                      <img
                        src={getSafeProductImageUrl(relatedProduct.image_url)}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 truncate">{relatedProduct.name}</h3>
                      <p className="text-primary font-bold mt-2">
                        {relatedProduct.price} {language === 'en' ? 'EGP' : 'ج.م'}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}