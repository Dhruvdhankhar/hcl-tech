import { atom } from 'recoil';
import type { User } from '@/types';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  },
});

export const tokenState = atom<string | null>({
  key: 'tokenState',
  default: null,
});
