import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../utils/types';
import { useCartStore } from '../store/cartStore';
import { Button } from './ui/Button';

interface ProductCardProps {
  product: Product;
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
          <Image
            src={product.image_url || 'https://via.placeholder.com/300'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-900">{formattedPrice}</span>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
