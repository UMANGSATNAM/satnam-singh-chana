'use client';

import { useStore } from '@/stores/useStore';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import ProductGrid from './ProductGrid';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import WishlistPage from './WishlistPage';
import LoginPage from './LoginPage';
import OrdersPage from './OrdersPage';
import OrderDetailPage from './OrderDetailPage';
import CartSidebar from './CartSidebar';
import AdminLayout from '@/components/admin/AdminLayout';
import type { StoreSettings } from '@/types';

interface StoreAppProps {
  settings: StoreSettings | null;
}

export default function StoreApp({ settings }: StoreAppProps) {
  const currentView = useStore((s) => s.currentView);
  const showCartSidebar = useStore((s) => s.showCartSidebar);
  const isAdmin = currentView.startsWith('admin-');

  if (isAdmin) {
    return <AdminLayout />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage settings={settings} />;
      case 'products':
        return <ProductGrid />;
      case 'product-detail':
        return <ProductDetail />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'login':
      case 'register':
        return <LoginPage />;
      case 'orders':
        return <OrdersPage />;
      case 'order-detail':
        return <OrderDetailPage />;
      default:
        return <HomePage settings={settings} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header settings={settings} />
      <main className="flex-1">
        {renderView()}
      </main>
      <Footer settings={settings} />
      {showCartSidebar && <CartSidebar />}
    </div>
  );
}
