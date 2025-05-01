import { useCartStore } from '../store/cartStore';
import { useAuth } from './useAuth';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const useCart = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCartStore();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const router = useRouter();

  const checkout = async () => {
    if (!user) {
      router.push('/auth/login?redirect=/cart');
      return { success: false, error: 'الرجاء تسجيل الدخول لإتمام عملية الشراء' };
    }

    if (items.length === 0) {
      return { success: false, error: 'سلة التسوق فارغة' };
    }

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      // محاكاة تأخير API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // إنشاء رقم طلب وهمي للتطوير فقط
      const mockOrderId = `order-${Date.now()}`;
      
      // في البيئة الحقيقية، هنا سيتم إنشاء طلب جديد في قاعدة البيانات
      // وتحديث مستويات المخزون للمنتجات
      
      // تفريغ العربة بعد الانتهاء من عملية الشراء
      clearCart();
      
      // توجيه المستخدم إلى صفحة التأكيد
      router.push(`/order-confirmation?id=${mockOrderId}`);
      
      return { success: true, orderId: mockOrderId };
    } catch (error: any) {
      setCheckoutError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsCheckingOut(false);
    }
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    checkout,
    isCheckingOut,
    checkoutError,
  };
};
