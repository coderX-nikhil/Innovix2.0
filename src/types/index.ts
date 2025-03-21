export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  discountPrice?: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  stock: number;
  rating: number;
  reviews: Review[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  createdAt: string;
  updatedAt: string;
  sku?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'manager' | 'staff';
  avatar?: string;
  addresses: Address[];
  wishlist: string[];
  createdAt: string;
}

export type PermissionLevel = 'no_access' | 'read' | 'write' | 'full_access';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  status: 'active' | 'inactive';
  lastLogin?: string;
  permissions: {
    dashboard: PermissionLevel;
    products: PermissionLevel;
    orders: PermissionLevel;
    customers: PermissionLevel;
    analytics: PermissionLevel;
    promotions: PermissionLevel;
    content: PermissionLevel;
    team: PermissionLevel;
    settings: PermissionLevel;
  };
}

export interface Permissions {
  dashboard: PermissionLevel;
  products: PermissionLevel;
  orders: PermissionLevel;
  customers: PermissionLevel;
  analytics: PermissionLevel;
  promotions: PermissionLevel;
  content: PermissionLevel;
  team: PermissionLevel;
  settings: PermissionLevel;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
  items: number;
  trackingNumber?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  code: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  applicableProducts: string[] | 'all';
}