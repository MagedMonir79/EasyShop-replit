import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/shared/schema';
import { useCartStore } from '../store/cartStore';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';
import { getProductImageUrl } from '../utils/imageUtils';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // تنسيق السعر برقمين عشريين
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(typeof product.price === 'string' ? parseFloat(product.price) : product.price);

  // الحصول على رابط صورة آمن مع معالجة الروابط المكسورة
  const safeImageUrl = getProductImageUrl(product.image_url, product.id);

  return (
    <div className="product-card group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/products/${product.id}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={safeImageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // في حالة فشل تحميل الصورة، استخدم صورة بديلة
              const imgElement = e.currentTarget as HTMLImageElement;
              imgElement.onerror = null; // منع التكرار اللانهائي
              imgElement.src = `https://picsum.photos/seed/${product.id || Math.random() * 1000}/800/800`;
            }}
          />
          
          {/* شارة الحالة - مميز أو جديد أو خصم */}
          {product.is_featured && (
            <span className="absolute top-2 start-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              مميز
            </span>
          )}
          
          {/* شارة الخصم إذا وجدت */}
          {product.discount_percentage > 0 && (
            <span className="absolute top-2 end-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              خصم {product.discount_percentage}%
            </span>
          )}
          
          {/* شارة المخزون */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                نفدت الكمية
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          {/* الفئة */}
          {product.category && (
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-primary dark:text-blue-200 rounded-full px-2 py-0.5 text-xs mb-2" suppressHydrationWarning>
              {product.category.name}
            </span>
          )}
          
          {/* اسم المنتج */}
          <h3 dir="auto" className="font-medium text-gray-900 dark:text-white mb-1 truncate">{product.name}</h3>
          
          {/* وصف المنتج - مقتطف صغير */}
          <p dir="auto" className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{product.description || 'لا يوجد وصف'}</p>
          
          {/* السعر وزر الإضافة إلى السلة */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-900 dark:text-white">{formattedPrice}</span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-sm text-gray-500 line-through ms-2">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(product.original_price)}
                </span>
              )}
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={cn(
                "opacity-0 group-hover:opacity-100 transition-opacity", 
                "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800",
                product.stock === 0 && "opacity-50 cursor-not-allowed"
              )}
            >
              إضافة إلى السلة
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
