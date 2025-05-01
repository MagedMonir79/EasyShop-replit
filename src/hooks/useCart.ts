import { useCartStore } from '../store/cartStore';
import { useAuth } from './useAuth';
import { supabase } from '../utils/supabase';
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
      return { success: false, error: 'Please login to checkout' };
    }

    if (items.length === 0) {
      return { success: false, error: 'Your cart is empty' };
    }

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      // Create a new order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'pending',
          total: getTotalPrice(),
        })
        .select('id')
        .single();

      if (orderError) throw orderError;

      // Add order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Update product stock levels
      for (const item of items) {
        const { error: stockError } = await supabase
          .from('products')
          .update({ 
            stock: item.product.stock - item.quantity 
          })
          .eq('id', item.product.id);

        if (stockError) throw stockError;
      }

      // Clear the cart after successful checkout
      clearCart();
      
      return { success: true, orderId: order.id };
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
