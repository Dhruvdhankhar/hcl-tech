'use client';

import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, cartItemsCountSelector, cartTotalSelector } from '@/store';
import { cartAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import type { CartItem } from '@/types';

export function useCart() {
  const [cart, setCart] = useRecoilState(cartState);
  const itemsCount = useRecoilValue(cartItemsCountSelector);
  const total = useRecoilValue(cartTotalSelector);

  const fetchCart = useCallback(async () => {
    try {
      setCart((prev) => ({ ...prev, isLoading: true }));
      const response = await cartAPI.get();
      setCart({
        items: response.data.data?.items || [],
        isLoading: false,
      });
    } catch {
      setCart((prev) => ({ ...prev, isLoading: false }));
    }
  }, [setCart]);

  const addToCart = useCallback(
    async (data: {
      productId: string;
      quantity: number;
    }) => {
      try {
        setCart((prev) => ({ ...prev, isLoading: true }));
        const response = await cartAPI.addItem(data);
        setCart({
          items: response.data.data.items,
          isLoading: false,
        });
        toast.success('Added to cart!');
        return { success: true };
      } catch (error: unknown) {
        setCart((prev) => ({ ...prev, isLoading: false }));
        const err = error as { response?: { data?: { message?: string } } };
        const message = err.response?.data?.message || 'Failed to add to cart';
        toast.error(message);
        return { success: false, message };
      }
    },
    [setCart]
  );

  const removeFromCart = useCallback(
    async (itemId: string) => {
      try {
        setCart((prev) => ({ ...prev, isLoading: true }));
        const response = await cartAPI.removeItem(itemId);
        setCart({
          items: response.data.data?.items || [],
          isLoading: false,
        });
        toast.success('Removed from cart');
        return { success: true };
      } catch (error: unknown) {
        setCart((prev) => ({ ...prev, isLoading: false }));
        const err = error as { response?: { data?: { message?: string } } };
        const message = err.response?.data?.message || 'Failed to remove item';
        toast.error(message);
        return { success: false, message };
      }
    },
    [setCart]
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      try {
        if (quantity < 1) {
          return removeFromCart(itemId);
        }
        setCart((prev) => ({ ...prev, isLoading: true }));
        const response = await cartAPI.updateItem(itemId, quantity);
        setCart({
          items: response.data.data.items,
          isLoading: false,
        });
        return { success: true };
      } catch (error: unknown) {
        setCart((prev) => ({ ...prev, isLoading: false }));
        const err = error as { response?: { data?: { message?: string } } };
        const message = err.response?.data?.message || 'Failed to update cart';
        toast.error(message);
        return { success: false, message };
      }
    },
    [setCart, removeFromCart]
  );

  const clearCart = useCallback(async () => {
    try {
      setCart((prev) => ({ ...prev, isLoading: true }));
      await cartAPI.clear();
      setCart({
        items: [],
        isLoading: false,
      });
      toast.success('Cart cleared');
      return { success: true };
    } catch (error: unknown) {
      setCart((prev) => ({ ...prev, isLoading: false }));
      const err = error as { response?: { data?: { message?: string } } };
      const message = err.response?.data?.message || 'Failed to clear cart';
      toast.error(message);
      return { success: false, message };
    }
  }, [setCart]);

  // Local cart operations (for guests)
  const addToLocalCart = useCallback(
    (item: CartItem) => {
      setCart((prev) => {
        const existingIndex = prev.items.findIndex(
          (i) => i.product._id === item.product._id
        );

        if (existingIndex > -1) {
          const newItems = [...prev.items];
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newItems[existingIndex].quantity + item.quantity,
            itemTotal: newItems[existingIndex].itemTotal + item.itemTotal,
          };
          return { ...prev, items: newItems };
        }

        return { ...prev, items: [...prev.items, item] };
      });
      toast.success('Added to cart!');
    },
    [setCart]
  );

  return {
    items: cart.items,
    isLoading: cart.isLoading,
    itemsCount,
    total,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    addToLocalCart,
  };
}
