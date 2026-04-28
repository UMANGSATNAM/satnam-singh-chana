// ============ TYPES FOR SATNAM SINGH CHANA E-COMMERCE ============

// Store Views
export type StoreView = 
  | 'home' 
  | 'products' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'wishlist' 
  | 'login' 
  | 'register' 
  | 'orders' 
  | 'order-detail'
  | 'profile'
  | 'admin-dashboard'
  | 'admin-products'
  | 'admin-add-product'
  | 'admin-edit-product'
  | 'admin-orders'
  | 'admin-order-detail'
  | 'admin-customers'
  | 'admin-promo-codes'
  | 'admin-flash-sales'
  | 'admin-banners'
  | 'admin-homepage'
  | 'admin-settings'
  | 'admin-settings-payment'
  | 'admin-settings-notifications'
  | 'admin-settings-shipping'
  | 'admin-settings-seo'
  | 'admin-settings-general';

// Product Types
export interface ProductVariant {
  id: string;
  sku: string;
  weight: string;
  price: number;
  mrp: number;
  stock: number;
  isActive: boolean;
}

export interface Product {
  id: string;
  productId: string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  images: string[];
  metaTitle?: string;
  metaDesc?: string;
  badge?: string;
  isDigital: boolean;
  relatedProducts: string[];
  isActive: boolean;
  variants: ProductVariant[];
  averageRating?: number;
  reviewCount?: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
}

// Cart Types
export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  productName: string;
  productSlug: string;
  variantWeight: string;
  variantSku: string;
  price: number;
  mrp: number;
  quantity: number;
  maxStock: number;
}

// Order Types
export type OrderStatus = 'placed' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'razorpay' | 'payu' | 'stripe' | 'cod' | 'wallet';

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  variantWeight: string;
  quantity: number;
  price: number;
  mrp: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  addressId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  discount: number;
  shipping: number;
  codFee: number;
  total: number;
  promoCode?: string;
  notes?: string;
  trackingNumber?: string;
  trackingLink?: string;
  deliveryPartner?: string;
  items: OrderItem[];
  address: Address;
  createdAt: string;
  updatedAt: string;
}

// Address Types
export interface Address {
  id: string;
  label?: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

// User Types
export type UserRole = 'customer' | 'admin' | 'super_admin';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  loyaltyPoints: number;
  storeCredits: number;
  addresses: Address[];
}

// Review Types
export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
  images: string[];
  userName: string;
  createdAt: string;
}

// Promo Code Types
export interface PromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'flat';
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  perUserLimit: number;
  validFrom: string;
  validUntil: string;
  applicableTo: 'all' | 'categories' | 'products';
  excludeSale: boolean;
  firstTimeOnly: boolean;
  showOnCheckout: boolean;
  autoApply: boolean;
  isActive: boolean;
}

export interface PromoCodeValidation {
  valid: boolean;
  discount: number;
  message: string;
  code?: string;
}

// Flash Sale Types
export interface FlashSale {
  id: string;
  name: string;
  startAt: string;
  endAt: string;
  isActive: boolean;
  products: FlashSaleProductItem[];
}

export interface FlashSaleProductItem {
  id: string;
  variantId: string;
  productId: string;
  productName: string;
  variantWeight: string;
  salePrice: number;
  originalPrice: number;
  stockLimit: number;
}

// Banner Types
export interface Banner {
  id: string;
  type: 'hero' | 'promo' | 'category_strip' | 'popup';
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaLink?: string;
  imageDesktop?: string;
  imageMobile?: string;
  sortOrder: number;
  startAt?: string;
  endAt?: string;
  popupDelay?: number;
  isActive: boolean;
}

// Homepage Section Types
export interface HomepageSection {
  id: string;
  type: string;
  heading: string;
  source: 'manual' | 'rule_based';
  ruleConfig?: string;
  content?: string;
  productIds: string[];
  isActive: boolean;
  sortOrder: number;
}

// Store Settings Types
export interface StoreSettings {
  storeName: string;
  storeTagline: string;
  storeEmail: string;
  storePhone: string;
  storeWhatsapp: string;
  storeAddress: string;
  storeGstin: string;
  storePan: string;
  invoicePrefix: string;
  currency: string;
  timezone: string;
  language: string;
  maintenanceMode: boolean;
  freeShippingAbove: number;
  flatShippingRate: number;
  codEnabled: boolean;
  codHandlingFee: number;
  codMinOrder: number;
  codMaxOrder: number;
  razorpayEnabled: boolean;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  razorpayTestMode: boolean;
  payuEnabled: boolean;
  stripeEnabled: boolean;
  returnWindowDays: number;
  returnReasons: string[];
  refundMethods: string[];
  socialFacebook: string;
  socialInstagram: string;
  socialTwitter: string;
  socialYoutube: string;
  ga4TrackingId: string;
  fbPixelId: string;
  gtmId: string;
}

// Notification Template Types
export interface NotificationTemplate {
  id: string;
  type: 'email' | 'sms' | 'whatsapp';
  event: string;
  subject?: string;
  template: string;
  variables: string[];
  isActive: boolean;
}

// Admin Dashboard Types
export interface DashboardStats {
  totalOrdersToday: number;
  totalOrdersWeek: number;
  totalOrdersMonth: number;
  revenueToday: number;
  revenueWeek: number;
  revenueMonth: number;
  totalCustomers: number;
  newCustomersThisMonth: number;
  pendingOrders: number;
  pendingReturns: number;
  lowStockProducts: number;
  topSellingProducts: { name: string; orders: number; revenue: number }[];
  revenueChart: { label: string; revenue: number; orders: number }[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter Types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  weight?: string;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'newest' | 'rating';
  badge?: string;
}
