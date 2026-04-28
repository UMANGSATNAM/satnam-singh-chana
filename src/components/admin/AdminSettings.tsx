'use client';

import { useStore } from '@/stores/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, CreditCard, Bell, Truck, Globe, Store } from 'lucide-react';

const settingCards = [
  { view: 'admin-settings-general' as const, title: 'General', description: 'Store name, contact info, GST, invoice settings', icon: Store, color: 'bg-amber-100 text-amber-700' },
  { view: 'admin-settings-payment' as const, title: 'Payment Gateways', description: 'Razorpay, PayU, Stripe, COD configuration', icon: CreditCard, color: 'bg-emerald-100 text-emerald-700' },
  { view: 'admin-settings-notifications' as const, title: 'Notifications', description: 'Email, SMS, WhatsApp templates and settings', icon: Bell, color: 'bg-blue-100 text-blue-700' },
  { view: 'admin-settings-shipping' as const, title: 'Shipping & Returns', description: 'Zones, rates, delivery slots, return policy', icon: Truck, color: 'bg-purple-100 text-purple-700' },
  { view: 'admin-settings-seo' as const, title: 'SEO & Analytics', description: 'Meta tags, GA4, Facebook Pixel, sitemap', icon: Globe, color: 'bg-orange-100 text-orange-700' },
];

export default function AdminSettings() {
  const setView = useStore((s) => s.setView);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="text-sm text-gray-500">Configure your store settings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.view}
              className="cursor-pointer hover:shadow-md transition-all hover:border-amber-300"
              onClick={() => setView(card.view)}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{card.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
