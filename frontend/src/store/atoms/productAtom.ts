import { atom, selector } from 'recoil';
import type { Product } from '@/types';

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  selectedCategory: string | null;
}

export const productState = atom<ProductState>({
  key: 'productState',
  default: {
    products: [],
    isLoading: false,
    selectedCategory: null,
  },
});

export const filteredProductsSelector = selector({
  key: 'filteredProducts',
  get: ({ get }) => {
    const { products, selectedCategory } = get(productState);
    if (!selectedCategory) return products;
    return products.filter((product) => product.category === selectedCategory);
  },
});

export const productsByCategorySelector = selector({
  key: 'productsByCategory',
  get: ({ get }) => {
    const { products } = get(productState);
    return {
      pizza: products.filter((p) => p.category === 'pizza'),
      sides: products.filter((p) => p.category === 'sides'),
      beverages: products.filter((p) => p.category === 'beverages'),
      desserts: products.filter((p) => p.category === 'desserts'),
    };
  },
});
