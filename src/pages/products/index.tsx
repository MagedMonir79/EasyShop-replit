import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const { category: categoryParam, search: searchParam } = router.query;
  
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    typeof categoryParam === 'string' ? categoryParam : undefined
  );
  
  const [searchQuery, setSearchQuery] = useState<string>(
    typeof searchParam === 'string' ? searchParam : ''
  );

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

  // Update state when URL query params change
  useEffect(() => {
    if (typeof categoryParam === 'string') {
      setSelectedCategory(categoryParam);
    }
    if (typeof searchParam === 'string') {
      setSearchQuery(searchParam);
    }
  }, [categoryParam, searchParam]);

  const handleCategoryChange = (category?: string) => {
    setSelectedCategory(category);
    
    // Update URL
    const query: { category?: string; search?: string } = {};
    if (category) query.category = category;
    if (searchQuery) query.search = searchQuery;
    
    router.push({
      pathname: '/products',
      query,
    }, undefined, { shallow: true });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL
    const query: { category?: string; search?: string } = {};
    if (selectedCategory) query.category = selectedCategory;
    if (searchQuery) query.search = searchQuery;
    
    router.push({
      pathname: '/products',
      query,
    }, undefined, { shallow: true });
  };

  return (
    <Layout title="Products | EasyShop" description="Browse and shop products at EasyShop">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <form onSubmit={handleSearch}>
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-2"
                  />
                  <Button type="submit" className="w-full">
                    Search
                  </Button>
                </form>
              </div>
              
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                {categoriesLoading ? (
                  <div className="animate-pulse">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 bg-gray-200 rounded my-2"></div>
                    ))}
                  </div>
                ) : categoriesError ? (
                  <p className="text-red-500">Failed to load categories</p>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategoryChange(undefined)}
                      className={`block w-full text-left px-3 py-2 rounded-md ${
                        !selectedCategory
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      All Products
                    </button>
                    {categories?.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`block w-full text-left px-3 py-2 rounded-md ${
                          selectedCategory === category
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="lg:col-span-3">
            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg h-80 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : productsError ? (
              <div className="bg-red-50 text-red-500 p-4 rounded-md">
                Failed to load products. Please try again later.
              </div>
            ) : products?.length === 0 ? (
              <div className="bg-blue-50 text-blue-500 p-4 rounded-md">
                No products found. Try changing your filters.
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    {selectedCategory
                      ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
                      : 'All Products'}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </h2>
                  <p className="text-gray-500">{products?.length} products found</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
