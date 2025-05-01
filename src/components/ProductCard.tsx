import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/shared/schema';
import { useCartStore } from '../store/cartStore';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';

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

  // Format the price with 2 decimal places
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(typeof product.price === 'string' ? parseFloat(product.price) : product.price);

  return (
    <div className="product-card group">
      <Link href={`/products/${product.id}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
        <div className="p-4">
          {product.category && (
            <span className="inline-block bg-blue-100 text-primary rounded-full px-2 py-0.5 text-xs mb-2" suppressHydrationWarning>
              {product.category.name}
            </span>
          )}
          <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-900">{formattedPrice}</span>
            <Button
              variant="default"
              size="sm"
              onClick={handleAddToCart}
              className={cn("opacity-0 group-hover:opacity-100 transition-opacity", "bg-blue-600 hover:bg-blue-700 text-white")}
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
