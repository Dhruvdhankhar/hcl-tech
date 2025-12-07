'use client';

import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { productState, filteredProductsSelector, productsByCategorySelector } from '@/store';
import { productsAPI } from '@/lib/api';
import type { Product } from '@/types';

export function useProducts() {
  const [state, setState] = useRecoilState(productState);
  const filteredProducts = useRecoilValue(filteredProductsSelector);
  const productsByCategory = useRecoilValue(productsByCategorySelector);

  const fetchProducts = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const response = await productsAPI.getAll();
      setState((prev) => ({
        ...prev,
        products: response.data.data,
        isLoading: false,
      }));
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [setState]);

  const fetchProductsByCategory = useCallback(
    async (category: string) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const response = await productsAPI.getByCategory(category);
        setState((prev) => ({
          ...prev,
          products: response.data.data,
          selectedCategory: category,
          isLoading: false,
        }));
      } catch {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [setState]
  );

  const setCategory = useCallback(
    (category: string | null) => {
      setState((prev) => ({ ...prev, selectedCategory: category }));
    },
    [setState]
  );

  const getProductById = useCallback(
    (id: string): Product | undefined => {
      return state.products.find((p) => p._id === id);
    },
    [state.products]
  );

  return {
    products: state.products,
    filteredProducts,
    productsByCategory,
    isLoading: state.isLoading,
    selectedCategory: state.selectedCategory,
    fetchProducts,
    fetchProductsByCategory,
    setCategory,
    getProductById,
  };
}
