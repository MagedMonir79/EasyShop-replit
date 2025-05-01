import React from 'react';
import Image from 'next/image';
import { Button } from './ui/Button';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

interface ProductDetailsProps {
  product: any;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  const { addItem } = useCartStore();
  
  const handleAddToCart = () => {
    addItem(product);
    toast.success('تمت الإضافة إلى السلة');
  };
  
  // تنسيق السعر مع منطقة عرض
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(typeof product.price === 'string' ? parseFloat(product.price) : product.price);
  
  return (
    <>
      <div className="mb-8">
        <button
          onClick={onBack}
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
          العودة للمنتجات
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">الصورة غير متوفرة</span>
            </div>
          )}
        </div>

        <div>
          <span className="inline-block bg-blue-100 text-primary rounded-full px-3 py-1 text-sm mb-4">
            {product.category ? product.category.name : 'غير مصنف'}
          </span>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-primary mb-4">
            {formattedPrice}
          </p>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">الوصف</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">التوفر</h2>
            {product.stock > 0 ? (
              <p className="text-green-600">
                متوفر ({product.stock} قطعة)
              </p>
            ) : (
              <p className="text-red-600">غير متوفر</p>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full"
            size="lg"
          >
            {product.stock > 0 ? 'إضافة إلى السلة' : 'غير متوفر'}
          </Button>
        </div>
      </div>

      {/* معلومات المنتج */}
      <div className="bg-gray-50 rounded-lg p-6 mb-12">
        <h2 className="text-xl font-bold mb-4">تفاصيل المنتج</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700">الفئة</h3>
            <p>{product.category ? product.category.name : 'غير مصنف'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">رقم المنتج</h3>
            <p>SKU-{product.id.toString().padStart(6, '0')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">تاريخ الإضافة</h3>
            <p>{typeof product.created_at === 'string' ? new Date(product.created_at).toISOString().split('T')[0] : '---'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">المخزون</h3>
            <p>{product.stock} قطعة</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;