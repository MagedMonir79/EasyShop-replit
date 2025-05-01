import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '../utils/types';
import { useCartStore } from '../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value);
    updateQuantity(product.id, newQuantity);
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  // Format the price with 2 decimal places
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const subtotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price * quantity);

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0 relative">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 100px"
          className="object-cover rounded-md"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row flex-1 sm:ml-4">
        <div className="flex-1">
          <Link href={`/products/${product.id}`} className="text-lg font-medium text-gray-900 hover:text-primary">
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
          <p className="mt-1 text-sm font-medium text-gray-900">{formattedPrice}</p>
        </div>
        
        <div className="flex items-center mt-4 sm:mt-0">
          <div className="mr-4">
            <label htmlFor={`quantity-${product.id}`} className="sr-only">
              Quantity
            </label>
            <select
              id={`quantity-${product.id}`}
              value={quantity}
              onChange={handleQuantityChange}
              className="rounded-md border border-gray-300 py-1.5 text-base leading-5 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <span className="text-base font-medium text-gray-900 sm:w-20">{subtotal}</span>
            <button
              type="button"
              onClick={handleRemove}
              className="ml-4 text-sm font-medium text-primary hover:text-primary/80"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
