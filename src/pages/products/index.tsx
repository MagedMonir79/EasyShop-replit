import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import ListIcon from 'lucide-react/dist/esm/icons/list';
import Grid3x3Icon from 'lucide-react/dist/esm/icons/grid';
import SearchIcon from 'lucide-react/dist/esm/icons/search';
import FilterIcon from 'lucide-react/dist/esm/icons/filter';
import { getProductImageUrl } from '../../utils/imageUtils';

// واجهة للمنتج الذي يتم تمريره للمكونات
interface ProductListItemProps {
  product: any;
  handleAddToCart: (product: any) => void;
}

// مكون عرض المنتج في طريقة العرض القائمة
const ProductListItem: React.FC<ProductListItemProps> = ({ product, handleAddToCart }) => {
  // تنسيق السعر برقمين عشريين
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(typeof product.price === 'string' ? parseFloat(product.price) : product.price);

  return (
    <div className="product-list-item flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800">
      <div className="relative w-full md:w-1/4 aspect-square md:aspect-auto">
        <img
          src={getProductImageUrl(product.image_url, product.id)}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // في حالة فشل تحميل الصورة، استخدم صورة بديلة
            const imgElement = e.currentTarget as HTMLImageElement;
            imgElement.onerror = null; // منع التكرار اللانهائي
            imgElement.src = `https://picsum.photos/seed/${product.id || Math.random() * 1000}/800/800`;
          }}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex flex-wrap justify-between items-start mb-2">
          <div>
            {product.category && (
              <span className="inline-block bg-blue-100 text-primary rounded-full px-2 py-0.5 text-xs mb-1 dark:bg-blue-900 dark:text-blue-100" suppressHydrationWarning>
                {product.category.name}
              </span>
            )}
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{product.name}</h3>
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white">{formattedPrice}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{product.description || 'لا يوجد وصف متاح لهذا المنتج.'}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {product.stock > 0 ? (
              <span className="text-green-600 dark:text-green-400">متوفر في المخزون ({product.stock})</span>
            ) : (
              <span className="text-red-600 dark:text-red-400">غير متوفر في المخزون</span>
            )}
          </div>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button variant="outline" size="sm" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `/products/${product.id}`;
            }}>
              عرض التفاصيل
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              إضافة إلى السلة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const { category: categoryParam, search: searchParam } = router.query;
  
  // حالات للفلترة والبحث
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    typeof categoryParam === 'string' ? categoryParam : undefined
  );
  
  const [searchQuery, setSearchQuery] = useState<string>(
    typeof searchParam === 'string' ? searchParam : ''
  );

  // حالة نمط العرض (شبكة أو قائمة)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // حالة لإظهار/إخفاء الفلاتر على الشاشات الصغيرة
  const [showFilters, setShowFilters] = useState(false);

  const { useProductsQuery, useCategoriesQuery } = useProducts();
  
  const { 
    data: products, 
    isLoading: productsLoading, 
    error: productsError 
  } = useProductsQuery(selectedCategory, searchQuery);
  
  const { 
    data: categories, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useCategoriesQuery();

  // تحديث الحالة عند تغيير معلمات URL
  useEffect(() => {
    if (typeof categoryParam === 'string') {
      setSelectedCategory(categoryParam);
    }
    if (typeof searchParam === 'string') {
      setSearchQuery(searchParam);
    }
  }, [categoryParam, searchParam]);

  // التعامل مع تغيير الفئة
  const handleCategoryChange = (categorySlug?: string) => {
    setSelectedCategory(categorySlug);
    
    // تحديث URL
    const query: { category?: string; search?: string } = {};
    if (categorySlug) query.category = categorySlug;
    if (searchQuery) query.search = searchQuery;
    
    router.push({
      pathname: '/products',
      query,
    }, undefined, { shallow: true });

    // إغلاق قائمة الفلاتر على الشاشات الصغيرة بعد الاختيار
    if (window.innerWidth < 1024) {
      setShowFilters(false);
    }
  };

  // التعامل مع البحث
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // تحديث URL
    const query: { category?: string; search?: string } = {};
    if (selectedCategory) query.category = selectedCategory;
    if (searchQuery) query.search = searchQuery;
    
    router.push({
      pathname: '/products',
      query,
    }, undefined, { shallow: true });

    // إغلاق قائمة الفلاتر على الشاشات الصغيرة بعد البحث
    if (window.innerWidth < 1024) {
      setShowFilters(false);
    }
  };

  // التعامل مع إضافة منتج إلى السلة
  const handleAddToCart = (product: any) => {
    try {
      const addToCart = require('../../store/cartStore').useCartStore.getState().addItem;
      addToCart(product);
      // يمكن إضافة إشعار هنا لتأكيد إضافة المنتج إلى السلة
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // التبديل بين عرض الشبكة والقائمة
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  // التبديل بين إظهار وإخفاء الفلاتر على الشاشات الصغيرة
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // مكون للحالة الفارغة
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
      <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 17a6 6 0 100-12 6 6 0 000 12z"></path>
      </svg>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">لم يتم العثور على منتجات</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">جرب تغيير معايير البحث أو الفلاتر المطبقة.</p>
      <Button 
        onClick={() => {
          setSelectedCategory(undefined);
          setSearchQuery('');
          router.push('/products', undefined, { shallow: true });
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        عرض جميع المنتجات
      </Button>
    </div>
  );

  // مكون للتحميل
  const LoadingState = () => (
    <div className={viewMode === 'grid' 
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      : "space-y-6"
    }>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={viewMode === 'grid'
            ? "bg-gray-100 dark:bg-gray-700 rounded-lg h-80 animate-pulse"
            : "bg-gray-100 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
          }
        ></div>
      ))}
    </div>
  );

  return (
    <Layout title="المنتجات | إيزي شوب" description="تصفح وتسوق المنتجات في إيزي شوب">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">المنتجات</h1>
          
          {/* أزرار للبحث وعرض الفلاتر وتبديل نمط العرض على الشاشات الصغيرة */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFilters}
              className="md:hidden flex items-center"
            >
              <FilterIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
              {showFilters ? 'إخفاء الفلاتر' : 'عرض الفلاتر'}
            </Button>
            
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-md p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                aria-label="عرض شبكي"
                title="عرض شبكي"
              >
                <Grid3x3Icon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                aria-label="عرض قائمة"
                title="عرض قائمة"
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* الشريط الجانبي مع الفلاتر */}
          <div className={`lg:col-span-1 ${showFilters || window.innerWidth >= 1024 ? 'block' : 'hidden'}`}>
            <div className="sticky top-24 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">الفلاتر</h2>
              
              {/* البحث */}
              <div className="mb-6">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="ابحث عن منتجات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 rtl:pl-10 rtl:pr-4 mb-2"
                  />
                  <button 
                    type="submit" 
                    className="absolute top-1/2 right-3 rtl:left-3 rtl:right-auto transform -translate-y-1/2 text-gray-400"
                  >
                    <SearchIcon className="w-5 h-5" />
                  </button>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                    بحث
                  </Button>
                </form>
              </div>
              
              {/* الفئات */}
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">الفئات</h3>
                {categoriesLoading ? (
                  <div className="animate-pulse">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded my-2"></div>
                    ))}
                  </div>
                ) : categoriesError ? (
                  <p className="text-red-500">فشل في تحميل الفئات</p>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategoryChange(undefined)}
                      className={`block w-full text-right rtl:text-right px-3 py-2 rounded-md ${
                        !selectedCategory
                          ? 'bg-blue-600 dark:bg-blue-700 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      جميع المنتجات
                    </button>
                    {categories?.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.slug)}
                        className={`block w-full text-right rtl:text-right px-3 py-2 rounded-md ${
                          selectedCategory === category.slug
                            ? 'bg-blue-600 dark:bg-blue-700 text-white'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* شبكة المنتجات */}
          <div className="lg:col-span-3">
            {productsLoading ? (
              <LoadingState />
            ) : productsError ? (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-4 rounded-md">
                فشل في تحميل المنتجات. يرجى المحاولة مرة أخرى لاحقًا.
              </div>
            ) : products?.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedCategory
                      ? `منتجات ${selectedCategory}`
                      : 'جميع المنتجات'}
                    {searchQuery && ` تطابق "${searchQuery}"`}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">تم العثور على {products?.length} منتج</p>
                </div>
                
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products?.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products?.map((product) => (
                      <ProductListItem 
                        key={product.id} 
                        product={product} 
                        handleAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
