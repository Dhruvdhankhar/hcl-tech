'use client';

import { useEffect, useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { authState, tokenState } from '@/store';
import { authAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export function useAuth() {
  const [auth, setAuth] = useRecoilState(authState);
  const setToken = useSetRecoilState(tokenState);
  const router = useRouter();

  // Define fetchUser before useEffect to satisfy dependency ordering
  const fetchUser = useCallback(async () => {
    try {
      const response = await authAPI.getMe();
      setAuth({
        user: response.data.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      localStorage.removeItem('token');
      setToken(null);
      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, [setAuth, setToken]);

  // Check auth status on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !auth.user) {
      setToken(storedToken);
      fetchUser();
    } else if (!storedToken) {
      setAuth((prev) => ({ ...prev, isLoading: false }));
    }
  }, [auth.user, fetchUser, setAuth, setToken]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setAuth((prev) => ({ ...prev, isLoading: true }));
        const response = await authAPI.login({ email, password });
        const { token: newToken, user } = response.data;

        localStorage.setItem('token', newToken);
        setToken(newToken);
        setAuth({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        toast.success('Login successful!');
        router.push('/');
        return { success: true };
      } catch (error: unknown) {
        setAuth((prev) => ({ ...prev, isLoading: false }));
        const err = error as { response?: { data?: { message?: string } } };
        const message = err.response?.data?.message || 'Login failed';
        toast.error(message);
        return { success: false, message };
      }
    },
    [router, setAuth, setToken]
  );

  const register = useCallback(
    async (data: { name: string; email: string; password: string; phone: string }) => {
      try {
        setAuth((prev) => ({ ...prev, isLoading: true }));
        const response = await authAPI.register(data);
        const { token: newToken, user } = response.data;

        localStorage.setItem('token', newToken);
        setToken(newToken);
        setAuth({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        toast.success('Registration successful!');
        router.push('/');
        return { success: true };
      } catch (error: unknown) {
        setAuth((prev) => ({ ...prev, isLoading: false }));
        const err = error as { response?: { data?: { message?: string } } };
        const message = err.response?.data?.message || 'Registration failed';
        toast.error(message);
        return { success: false, message };
      }
    },
    [router, setAuth, setToken]
  );

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      toast.success('Logged out successfully');
      router.push('/login');
    }
  }, [router, setAuth, setToken]);

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    login,
    register,
    logout,
    fetchUser,
  };
}
