import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { useLanguageStore } from '../../store/languageStore';
import { db } from '../../server/db';
import { eq, like, desc } from 'drizzle-orm';
import { products, categories } from '../../shared/schema';

export default function ProductsPage() {
  const { language } = useLanguageStore();
  const router = useRouter();
  const { category, search } = router.query;
  const [productList, setProductList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    typeof category === 'string' ? category : null
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        // Fetch from our API route
        const queryParams = new URLSearchParams();
        if (category) queryParams.append('category', category.toString());
        if (search) queryParams.append('search', search.toString());
        
        const response = await fetch(`/api/products?${queryParams.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProductList(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Set empty array in case of error
        setProductList([]);
      } finally {
        setLoading(false);
      }
    }

    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        
        const data = await response.json();
        setCategoryList(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategoryList([]);
      }
    }

    fetchProducts();
    fetchCategories();
  }, [category, search]);

  // Update URL when category changes
  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    
    const query: { category?: string; search?: string } = {};
    if (categorySlug) query.category = categorySlug;
    if (search) query.search = search.toString();
    
    router.push({
      pathname: '/products',
      query
    });
  };

  return (
    <Layout
      title={language === 'en' ? 'Products - EasyShop' : 'المنتجات - إيزي شوب'}
      description={language === 'en' ? 'Browse our products' : 'تصفح منتجاتنا'}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'en' ? 'Products' : 'المنتجات'}
        </h1>

        {/* Category filters */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">
            {language === 'en' ? 'Categories' : 'الفئات'}
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === null
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {language === 'en' ? 'All' : 'الكل'}
            </button>
            
            {categoryList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === cat.slug
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search results notification */}
        {search && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p>
              {language === 'en'
                ? `Search results for "${search}"`
                : `نتائج البحث عن "${search}"`}
            </p>
            <button
              onClick={() => router.push('/products')}
              className="text-primary text-sm font-medium hover:underline mt-2"
            >
              {language === 'en' ? 'Clear search' : 'مسح البحث'}
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : productList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {language === 'en' ? 'No products found' : 'لم يتم العثور على منتجات'}
            </h3>
            <p className="mt-1 text-gray-500">
              {language === 'en'
                ? 'Try changing your filters or search term'
                : 'حاول تغيير عوامل التصفية أو مصطلح البحث'}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}