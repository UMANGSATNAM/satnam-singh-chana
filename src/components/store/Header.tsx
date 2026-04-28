'use client';

import { useState, useEffect, useRef } from 'react';
import { useStore, getCartItemCount } from '@/stores/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Package,
  LogOut,
  Shield,
  Home,
  Grid3X3,
} from 'lucide-react';
import type { StoreSettings } from '@/types';

interface HeaderProps {
  settings: StoreSettings | null;
}

export default function Header({ settings }: HeaderProps) {
  const {
    currentView,
    setView,
    cart,
    wishlist,
    user,
    isAuthenticated,
    searchQuery,
    setSearchQuery,
    setCartSidebar,
    filters,
    setFilters,
    showMobileMenu,
    setMobileMenu,
  } = useStore();

  const cartItemCount = getCartItemCount(cart);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearch = (value: string) => {
    setLocalSearch(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(value);
      if (value && currentView !== 'products') {
        setView('products');
      }
    }, 300);
  };

  const handleCategoryFilter = (category: string | undefined) => {
    setFilters({ category });
    setView('products');
    setMobileMenu(false);
  };

  const storeName = settings?.storeName || 'Satnam Singh Chana';
  const tagline = settings?.storeTagline || 'Premium Roasted Snacks';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-200/50 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button
            onClick={() => setView('home')}
            className="flex items-center gap-2 shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-sm">SS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors">
                {storeName}
              </h1>
              <p className="text-[10px] text-emerald-600 font-medium -mt-0.5">{tagline}</p>
            </div>
          </button>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search snacks..."
                value={localSearch}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-emerald-50/50 border-emerald-200/50 focus:border-emerald-400 focus:ring-emerald-400/20 h-10"
              />
              {localSearch && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category tabs - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { label: 'All', value: undefined },
              { label: 'Sing', value: 'sing' },
              { label: 'Chana', value: 'chana' },
            ].map((cat) => (
              <Button
                key={cat.label}
                variant={filters.category === cat.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleCategoryFilter(cat.value)}
                className={
                  filters.category === cat.value
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                }
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search icon - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-600 hover:text-emerald-700"
              onClick={() => {
                setView('products');
                setSearchQuery('');
              }}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
              onClick={() => setView('wishlist')}
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-rose-500 text-[10px] text-white border-0">
                  {wishlist.length}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
              onClick={() => setCartSidebar(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 p-0 flex items-center justify-center bg-emerald-600 text-[10px] text-white border-0">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setView('orders')}>
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setView('wishlist')}>
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setView('admin-dashboard')}>
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Panel
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => useStore.getState().setUser(null)}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => setView('login')}>
                      <User className="mr-2 h-4 w-4" />
                      Login / Register
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={showMobileMenu} onOpenChange={setMobileMenu}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-gray-600 hover:text-emerald-700"
                  onClick={() => setMobileMenu(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile header */}
                  <div className="p-4 border-b bg-gradient-to-r from-emerald-600 to-green-600">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">SS</span>
                      </div>
                      <div>
                        <h2 className="text-white font-bold">{storeName}</h2>
                        <p className="text-white/80 text-xs">{tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile search */}
                  <div className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search snacks..."
                        value={localSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Mobile nav links */}
                  <nav className="flex-1 px-2">
                    <MobileNavItem
                      icon={<Home className="h-5 w-5" />}
                      label="Home"
                      active={currentView === 'home'}
                      onClick={() => { setView('home'); setMobileMenu(false); }}
                    />
                    <MobileNavItem
                      icon={<Grid3X3 className="h-5 w-5" />}
                      label="All Products"
                      active={currentView === 'products' && !filters.category}
                      onClick={() => { handleCategoryFilter(undefined); }}
                    />
                    
                    <div className="px-3 py-2 mt-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categories</p>
                    </div>
                    <MobileNavItem
                      icon={<span className="text-lg">🥜</span>}
                      label="Sing (Peanuts)"
                      active={filters.category === 'sing'}
                      onClick={() => handleCategoryFilter('sing')}
                    />
                    <MobileNavItem
                      icon={<span className="text-lg">🌰</span>}
                      label="Chana (Chickpeas)"
                      active={filters.category === 'chana'}
                      onClick={() => handleCategoryFilter('chana')}
                    />

                    <div className="px-3 py-2 mt-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</p>
                    </div>
                    <MobileNavItem
                      icon={<ShoppingCart className="h-5 w-5" />}
                      label="Cart"
                      badge={cartItemCount > 0 ? String(cartItemCount) : undefined}
                      onClick={() => { setView('cart'); setMobileMenu(false); }}
                    />
                    <MobileNavItem
                      icon={<Heart className="h-5 w-5" />}
                      label="Wishlist"
                      badge={wishlist.length > 0 ? String(wishlist.length) : undefined}
                      onClick={() => { setView('wishlist'); setMobileMenu(false); }}
                    />
                    {isAuthenticated ? (
                      <>
                        <MobileNavItem
                          icon={<Package className="h-5 w-5" />}
                          label="My Orders"
                          onClick={() => { setView('orders'); setMobileMenu(false); }}
                        />
                        {user?.role === 'admin' && (
                          <MobileNavItem
                            icon={<Shield className="h-5 w-5" />}
                            label="Admin Panel"
                            onClick={() => { setView('admin-dashboard'); setMobileMenu(false); }}
                          />
                        )}
                        <MobileNavItem
                          icon={<LogOut className="h-5 w-5" />}
                          label="Logout"
                          onClick={() => { useStore.getState().setUser(null); setMobileMenu(false); }}
                        />
                      </>
                    ) : (
                      <MobileNavItem
                        icon={<User className="h-5 w-5" />}
                        label="Login / Register"
                        onClick={() => { setView('login'); setMobileMenu(false); }}
                      />
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileNavItem({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
        active
          ? 'bg-emerald-100 text-emerald-800 font-medium'
          : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <Badge className="bg-emerald-600 text-white text-[10px] h-5 min-w-5 border-0">
          {badge}
        </Badge>
      )}
    </button>
  );
}
