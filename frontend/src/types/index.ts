// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  _id: string;
  label?: string;
  type: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault?: boolean;
}

// Product Types
export interface Product {
  _id: string;
  name: string;
  description: string;
  category: 'pizza' | 'sides' | 'beverages' | 'desserts';
  basePrice: number;
  image: string;
  isVeg: boolean;
  isAvailable: boolean;
}

// Cart Types
export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  itemTotal: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalAmount: number;
  updatedAt: string;
}

// Order Types
export interface OrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: string;
  items: OrderItem[];
  deliveryAddress: Omit<Address, '_id' | 'label' | 'isDefault'>;
  paymentMethod: 'cod' | 'online';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  totalAmount: number;
  couponApplied?: string;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

// Coupon Types
export interface Coupon {
  _id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}
