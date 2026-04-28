import { create } from 'zustand';
import type { StoreView, Product, CartItem, ProductFilters, User, Address, Order, PromoCodeValidation } from '@/types';

interface StoreState {
  // Navigation
  currentView: StoreView;
  selectedProductId: string | null;
  selectedVariantId: string | null;
  selectedOrderId: string | null;
  
  // Products
  products: Product[];
  filteredProducts: Product[];
  filters: ProductFilters;
  
  // Cart
  cart: CartItem[];
  appliedPromo: PromoCodeValidation | null;
  
  // Wishlist
  wishlist: string[]; // product IDs
  
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // Orders
  orders: Order[];
  
  // UI
  isLoading: boolean;
  searchQuery: string;
  showMobileMenu: boolean;
  showCartSidebar: boolean;
  
  // Actions
  setView: (view: StoreView, id?: string) => void;
  setProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string) => void;
  updateCartQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (validation: PromoCodeValidation) => void;
  removePromo: () => void;
  toggleWishlist: (productId: string) => void;
  setUser: (user: User | null) => void;
  setOrders: (orders: Order[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setMobileMenu: (show: boolean) => void;
  setCartSidebar: (show: boolean) => void;
}

const defaultFilters: ProductFilters = {
  category: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  weight: undefined,
  search: undefined,
  sortBy: undefined,
  badge: undefined,
};

export const useStore = create<StoreState>((set, get) => ({
  // Initial state
  currentView: 'home',
  selectedProductId: null,
  selectedVariantId: null,
  selectedOrderId: null,
  products: [],
  filteredProducts: [],
  filters: defaultFilters,
  cart: [],
  appliedPromo: null,
  wishlist: [],
  user: null,
  isAuthenticated: false,
  orders: [],
  isLoading: false,
  searchQuery: '',
  showMobileMenu: false,
  showCartSidebar: false,

  // Navigation
  setView: (view, id) => set({
    currentView: view,
    selectedProductId: view === 'product-detail' ? (id ?? null) : get().selectedProductId,
    selectedVariantId: view === 'product-detail' ? null : get().selectedVariantId,
    selectedOrderId: view === 'order-detail' ? (id ?? null) : get().selectedOrderId,
    showMobileMenu: false,
  }),

  // Products
  setProducts: (products) => set({ products, filteredProducts: products }),
  
  setFilters: (newFilters) => {
    const filters = { ...get().filters, ...newFilters };
    let filtered = [...get().products];
    
    if (filters.category) {
      filtered = filtered.filter(p => p.categorySlug === filters.category);
    }
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.variants.some(v => v.price >= (filters.minPrice ?? 0)));
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.variants.some(v => v.price <= (filters.maxPrice ?? Infinity)));
    }
    if (filters.weight) {
      filtered = filtered.filter(p => p.variants.some(v => v.weight === filters.weight));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (filters.badge) {
      filtered = filtered.filter(p => p.badge === filters.badge);
    }
    
    // Sort
    switch (filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => Math.min(...a.variants.map(v => v.price)) - Math.min(...b.variants.map(v => v.price)));
        break;
      case 'price_desc':
        filtered.sort((a, b) => Math.min(...b.variants.map(v => v.price)) - Math.min(...a.variants.map(v => v.price)));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    
    set({ filters, filteredProducts: filtered });
  },

  clearFilters: () => set({ filters: defaultFilters, filteredProducts: get().products }),

  // Cart
  addToCart: (item) => {
    const cart = get().cart;
    const existing = cart.find(c => c.variantId === item.variantId);
    if (existing) {
      set({
        cart: cart.map(c => 
          c.variantId === item.variantId 
            ? { ...c, quantity: Math.min(c.quantity + item.quantity, c.maxStock) }
            : c
        ),
      });
    } else {
      set({ cart: [...cart, item] });
    }
  },

  removeFromCart: (variantId) => set({
    cart: get().cart.filter(c => c.variantId !== variantId),
  }),

  updateCartQuantity: (variantId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(variantId);
      return;
    }
    set({
      cart: get().cart.map(c => 
        c.variantId === variantId ? { ...c, quantity: Math.min(quantity, c.maxStock) } : c
      ),
    });
  },

  clearCart: () => set({ cart: [], appliedPromo: null }),
  
  applyPromo: (validation) => set({ appliedPromo: validation }),
  removePromo: () => set({ appliedPromo: null }),

  // Wishlist
  toggleWishlist: (productId) => {
    const wishlist = get().wishlist;
    if (wishlist.includes(productId)) {
      set({ wishlist: wishlist.filter(id => id !== productId) });
    } else {
      set({ wishlist: [...wishlist, productId] });
    }
  },

  // Auth
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  // Orders
  setOrders: (orders) => set({ orders }),

  // UI
  setLoading: (isLoading) => set({ isLoading }),
  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
    if (searchQuery) {
      get().setFilters({ search: searchQuery });
    } else {
      get().setFilters({ search: undefined });
    }
  },
  setMobileMenu: (showMobileMenu) => set({ showMobileMenu }),
  setCartSidebar: (showCartSidebar) => set({ showCartSidebar }),
}));

// Computed values
export const getCartTotal = (cart: CartItem[]) => 
  cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

export const getCartMrpTotal = (cart: CartItem[]) => 
  cart.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);

export const getCartItemCount = (cart: CartItem[]) => 
  cart.reduce((sum, item) => sum + item.quantity, 0);

export const getShippingCost = (subtotal: number, freeAbove: number = 500, flatRate: number = 49) =>
  subtotal >= freeAbove ? 0 : flatRate;

export const getDiscount = (subtotal: number, promo: PromoCodeValidation | null) => {
  if (!promo || !promo.valid) return 0;
  return promo.discount;
};
