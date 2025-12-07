import { atom, selector } from 'recoil';
import type { CartItem } from '@/types';

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
}

export const cartState = atom<CartState>({
  key: 'cartState',
  default: {
    items: [],
    isLoading: false,
  },
});

export const cartItemsCountSelector = selector({
  key: 'cartItemsCount',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  },
});

export const cartTotalSelector = selector({
  key: 'cartTotal',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.items.reduce((total, item) => total + item.itemTotal, 0);
  },
});
