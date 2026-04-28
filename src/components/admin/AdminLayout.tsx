'use client';

import { useStore } from '@/stores/useStore';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminAddProduct from './AdminAddProduct';
import AdminOrders from './AdminOrders';
import AdminOrderDetail from './AdminOrderDetail';
import AdminCustomers from './AdminCustomers';
import AdminPromoCodes from './AdminPromoCodes';
import AdminBanners from './AdminBanners';
import AdminHomepage from './AdminHomepage';
import AdminSettings from './AdminSettings';
import AdminSettingsGeneral from './AdminSettingsGeneral';
import AdminSettingsPayment from './AdminSettingsPayment';
import AdminSettingsNotifications from './AdminSettingsNotifications';
import AdminSettingsShipping from './AdminSettingsShipping';
import AdminSettingsSEO from './AdminSettingsSEO';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Image,
  Layout,
  Settings,
  ArrowLeft,
  Menu,
  X,
  Search,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { view: 'admin-dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { view: 'admin-products' as const, label: 'Products', icon: Package },
  { view: 'admin-orders' as const, label: 'Orders', icon: ShoppingBag },
  { view: 'admin-customers' as const, label: 'Customers', icon: Users },
  { view: 'admin-promo-codes' as const, label: 'Promo Codes', icon: Tag },
  { view: 'admin-flash-sales' as const, label: 'Flash Sales', icon: Zap },
  { view: 'admin-banners' as const, label: 'Banners', icon: Image },
  { view: 'admin-homepage' as const, label: 'Homepage', icon: Layout },
  { view: 'admin-settings' as const, label: 'Settings', icon: Settings },
];

interface SidebarContentProps {
  currentView: string;
  setView: (view: string) => void;
  user: { name?: string } | null;
  onNavClick?: () => void;
}

function SidebarContent({ currentView, setView, user, onNavClick }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
          <span className="text-white font-bold text-sm">SS</span>
        </div>
        <div>
          <h2 className="text-white font-semibold text-sm">Satnam Singh Chana</h2>
          <p className="text-emerald-400 text-xs">Admin Panel</p>
        </div>
      </div>
      <Separator className="bg-gray-800" />
      <ScrollArea className="flex-1 py-2">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view || 
              (item.view === 'admin-settings' && currentView.startsWith('admin-settings'));
            return (
              <button
                key={item.view}
                onClick={() => { setView(item.view); onNavClick?.(); }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-400 hover:bg-emerald-900/30 hover:text-emerald-400'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </ScrollArea>
      <Separator className="bg-gray-800" />
      <div className="p-3">
        <Button
          variant="ghost"
          className="w-full text-gray-400 hover:text-emerald-400 hover:bg-emerald-900/30 justify-start gap-2"
          onClick={() => setView('home')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Button>
        <div className="mt-2 px-3 py-2 text-xs text-gray-600">
          {user?.name || 'Admin User'}
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const currentView = useStore((s) => s.currentView);
  const setView = useStore((s) => s.setView);
  const user = useStore((s) => s.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'admin-dashboard': return <AdminDashboard />;
      case 'admin-products': return <AdminProducts />;
      case 'admin-add-product': return <AdminAddProduct />;
      case 'admin-edit-product': return <AdminAddProduct />;
      case 'admin-orders': return <AdminOrders />;
      case 'admin-order-detail': return <AdminOrderDetail />;
      case 'admin-customers': return <AdminCustomers />;
      case 'admin-promo-codes': return <AdminPromoCodes />;
      case 'admin-flash-sales': return <AdminBanners />;
      case 'admin-banners': return <AdminBanners />;
      case 'admin-homepage': return <AdminHomepage />;
      case 'admin-settings': return <AdminSettings />;
      case 'admin-settings-general': return <AdminSettingsGeneral />;
      case 'admin-settings-payment': return <AdminSettingsPayment />;
      case 'admin-settings-notifications': return <AdminSettingsNotifications />;
      case 'admin-settings-shipping': return <AdminSettingsShipping />;
      case 'admin-settings-seo': return <AdminSettingsSEO />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-black flex-shrink-0">
        <SidebarContent currentView={currentView} setView={setView} user={user} />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-64 bg-black z-50">
            <div className="absolute top-3 right-3">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-emerald-400">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SidebarContent currentView={currentView} setView={setView} user={user} onNavClick={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b sticky top-0 z-40 px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900 capitalize">
              {currentView.replace('admin-', '').replace(/-/g, ' ')}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5">
              <Search className="h-4 w-4 text-gray-400" />
              <input placeholder="Search..." className="bg-transparent text-sm outline-none w-40" />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
