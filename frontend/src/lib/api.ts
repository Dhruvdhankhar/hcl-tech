import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string; phone: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
};

// Products API
export const productsAPI = {
  getAll: (params?: { category?: string; page?: number; limit?: number }) =>
    api.get('/products', { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  getByCategory: (category: string) => api.get(`/products/category/${category}`),
  create: (data: FormData) =>
    api.post('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id: string, data: FormData) =>
    api.put(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  addItem: (data: {
    productId: string;
    quantity: number;
    size: string;
    crust: string;
    toppings: string[];
  }) => api.post('/cart/add', data),
  updateItem: (itemId: string, quantity: number) =>
    api.put(`/cart/update/${itemId}`, { quantity }),
  removeItem: (itemId: string) => api.delete(`/cart/remove/${itemId}`),
  clear: () => api.delete('/cart/clear'),
};

// Orders API
export const ordersAPI = {
  create: (data: {
    addressId: string;
    paymentMethod: 'cod' | 'online';
    couponCode?: string;
  }) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id: string) => api.get(`/orders/${id}`),
  track: (orderNumber: string) => api.get(`/orders/track/${orderNumber}`),
  updateStatus: (id: string, status: string) =>
    api.put(`/orders/${id}/status`, { status }),
  getAllAdmin: () => api.get('/orders/admin/all'),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: { name?: string; phone?: string }) =>
    api.put('/users/profile', data),
  addAddress: (data: Omit<Address, '_id'>) => api.post('/users/address', data),
  updateAddress: (id: string, data: Partial<Address>) =>
    api.put(`/users/address/${id}`, data),
  deleteAddress: (id: string) => api.delete(`/users/address/${id}`),
};

// Coupons API
export const couponsAPI = {
  validate: (code: string) => api.post('/coupons/validate', { code }),
  getAll: () => api.get('/coupons'),
  create: (data: Omit<Coupon, '_id'>) => api.post('/coupons', data),
  update: (id: string, data: Partial<Coupon>) => api.put(`/coupons/${id}`, data),
  delete: (id: string) => api.delete(`/coupons/${id}`),
};

// Type imports
import type { Address, Coupon } from '@/types';
