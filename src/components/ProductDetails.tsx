import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/Button';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import { getProductImageUrl } from '../utils/imageUtils';
import ArrowLeftIcon from 'lucide-react/dist/esm/icons/arrow-left';
import ArrowRightIcon from 'lucide-react/dist/esm/icons/arrow-right';
import ShoppingCartIcon from 'lucide-react/dist/esm/icons/shopping-cart';
import HeartIcon from 'lucide-react/dist/esm/icons/heart';
import ShareIcon from 'lucide-react/dist/esm/icons/share';

interface ProductDetailsProps {
  product: any;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  
  // التحقق من الإرث (RTL أو LTR) مع تفادي أخطاء SSR
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    setIsRTL(document.documentElement.dir === 'rtl');
  }, []);
  
  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`تمت إضافة ${quantity} ${quantity > 1 ? 'قطع' : 'قطعة'} إلى السلة`);
  };
  
  // الإضافة للمفضلة
  const handleAddToWishlist = () => {
    toast.success('تمت الإضافة إلى المفضلة');
  };
  
  // مشاركة المنتج
  const handleShare = () => {
    // محاولة استخدام واجهة المشاركة الحديثة إذا كانت متوفرة
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
      .catch((error) => {
        console.error('فشل في المشاركة:', error);
        toast.error('فشل في مشاركة المنتج');
      });
    } else {
      // نسخ الرابط إلى الحافظة كحل بديل
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success('تم نسخ رابط المنتج'))
        .catch(() => toast.error('فشل في نسخ الرابط'));
    }
  };
  
  // تنسيق السعر مع منطقة عرض
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(typeof product.price === 'string' ? parseFloat(product.price) : product.price);
  
  // الحصول على رابط صورة آمن مع معالجة الروابط المكسورة
  const safeImageUrl = getProductImageUrl(product.image_url, product.id);
  
  // زيادة الكمية
  const incrementQuantity = () => {
    if (product.stock && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  // تقليل الكمية
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 md:p-8">
      {/* زر الرجوع */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-primary hover:text-primary/80 flex items-center"
          aria-label="العودة للمنتجات"
        >
          {isRTL ? (
            <>
              العودة للمنتجات
              <ArrowRightIcon className="ms-1 w-4 h-4" />
            </>
          ) : (
            <>
              <ArrowLeftIcon className="me-1 w-4 h-4" />
              العودة للمنتجات
            </>
          )}
        </button>
      </div>

      {/* تفاصيل المنتج الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* صورة المنتج */}
        <div className="relative h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={safeImageUrl}
            alt={product.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              // في حالة فشل تحميل الصورة، استخدم صورة بديلة
              const imgElement = e.currentTarget as HTMLImageElement;
              imgElement.onerror = null; // منع التكرار اللانهائي
              imgElement.src = `https://picsum.photos/seed/${product.id || Math.random() * 1000}/800/800`;
            }}
          />
          
          {/* شارة المنتج المميز */}
          {product.is_featured && (
            <span className="absolute top-2 start-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              مميز
            </span>
          )}
          
          {/* شارة الخصم */}
          {product.discount_percentage > 0 && (
            <span className="absolute top-2 end-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              خصم {product.discount_percentage}%
            </span>
          )}
        </div>

        {/* معلومات المنتج */}
        <div>
          {/* فئة المنتج */}
          <div className="mb-1">
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-primary dark:text-blue-200 rounded-full px-3 py-1 text-sm">
              {product.category ? product.category.name : 'غير مصنف'}
            </span>
          </div>
          
          {/* اسم المنتج */}
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{product.name}</h1>
          
          {/* التقييم */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star} 
                  className={`w-5 h-5 ${star <= (product.rating || 4) ? 'fill-current' : 'text-gray-300'}`} 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500 dark:text-gray-400 ms-2 text-sm">
              ({product.reviews_count || 0} تقييم)
            </span>
          </div>
          
          {/* السعر */}
          <div className="mb-4">
            <span className="text-2xl font-bold text-primary dark:text-blue-400">
              {formattedPrice}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-lg text-gray-500 line-through ms-2">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(product.original_price)}
              </span>
            )}
          </div>
          
          {/* الوصف */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">الوصف</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {product.description || 'لا يوجد وصف متاح لهذا المنتج.'}
            </p>
          </div>

          {/* التوفر */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">التوفر</h2>
            {product.stock > 0 ? (
              <p className="text-green-600 dark:text-green-400">
                متوفر ({product.stock} قطعة)
              </p>
            ) : (
              <p className="text-red-600 dark:text-red-400">غير متوفر</p>
            )}
          </div>
          
          {/* اختيار الكمية */}
          {product.stock > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">الكمية</h2>
              <div className="flex items-center">
                <button 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-s-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0 && val <= (product.stock || 999)) {
                      setQuantity(val);
                    }
                  }}
                  min="1"
                  max={product.stock || 999}
                  className="w-14 h-10 border-t border-b border-gray-300 dark:border-gray-600 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
                <button 
                  onClick={incrementQuantity}
                  disabled={product.stock && quantity >= product.stock}
                  className="w-10 h-10 rounded-e-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* أزرار الإجراءات */}
          <div className="flex flex-col space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              size="lg"
            >
              <ShoppingCartIcon className="w-5 h-5 me-2" />
              {product.stock > 0 ? 'إضافة إلى السلة' : 'غير متوفر'}
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleAddToWishlist}
                variant="outline"
                className="flex-1"
              >
                <HeartIcon className="w-5 h-5 me-2" />
                المفضلة
              </Button>
              
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1"
              >
                <ShareIcon className="w-5 h-5 me-2" />
                مشاركة
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* معلومات المنتج التفصيلية */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-12">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">تفاصيل المنتج</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">الفئة</h3>
              <p className="text-gray-900 dark:text-white">{product.category ? product.category.name : 'غير مصنف'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">رقم المنتج</h3>
              <p className="text-gray-900 dark:text-white">SKU-{product.id.toString().padStart(6, '0')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">تاريخ الإضافة</h3>
              <p className="text-gray-900 dark:text-white">{typeof product.created_at === 'string' ? new Date(product.created_at).toISOString().split('T')[0] : '---'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">المخزون</h3>
              <p className="text-gray-900 dark:text-white">{product.stock} قطعة</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* قسم المواصفات (إذا وجدت) */}
      {product.specifications && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">المواصفات</h2>
          <table className="w-full">
            <tbody>
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 text-gray-700 dark:text-gray-300 font-medium">{key}</td>
                  <td className="py-3 text-gray-900 dark:text-white">{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;