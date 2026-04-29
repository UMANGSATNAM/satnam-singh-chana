'use client';

import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/stores/useStore';
import type { StoreSettings } from '@/types';

interface FooterProps {
  settings: StoreSettings | null;
}

export default function Footer({ settings }: FooterProps) {
  const { setView, setFilters } = useStore();

  const storeName = settings?.storeName || 'Satnam Singh Chana';
  const tagline = settings?.storeTagline || 'Premium Roasted Snacks Since 1965';
  const email = settings?.storeEmail || 'hello@satnamsinghchana.com';
  const phone = settings?.storePhone || '+91 98765 43210';
  const whatsapp = settings?.storeWhatsapp || '+91 98765 43210';
  const address = settings?.storeAddress || 'Main Market Road, Rajkot, Gujarat 360001';
  const freeShipping = settings?.freeShippingAbove || 500;

  const handleCategoryNav = (category: string) => {
    setFilters({ category });
    setView('products');
  };

  return (
    <footer className="mt-auto bg-black text-gray-300">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Truck className="h-5 w-5 shrink-0" />
              <span className="text-sm font-medium">Free Shipping on ₹{freeShipping}+</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <RotateCcw className="h-5 w-5 shrink-0" />
              <span className="text-sm font-medium">7-Day Easy Returns</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <span className="text-sm font-medium">100% Authentic Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                <span className="text-white font-bold text-xs">SS</span>
              </div>
              <span className="text-white font-bold text-lg">{storeName}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{tagline}</p>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Handcrafted with love in Gujarat. From our family to yours — the finest roasted Sing & Chana snacks since 1965.
            </p>
            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Shop by Category */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop by Category</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'All Products', action: () => { setFilters({}); setView('products'); } },
                { label: '🥜 Sing (Peanuts)', action: () => handleCategoryNav('sing') },
                { label: '🌰 Chana (Chickpeas)', action: () => handleCategoryNav('chana') },
                { label: '🍿 Mix & Namkeen', action: () => handleCategoryNav('mix-namkeen') },
                { label: '🌻 Roasted Seeds', action: () => handleCategoryNav('roasted-seeds') },
                { label: '⭐ Specialty', action: () => handleCategoryNav('specialty') },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <button className="hover:text-emerald-400 transition-colors">About Us</button>
              </li>
              <li>
                <button className="hover:text-emerald-400 transition-colors">Contact Us</button>
              </li>
              <li>
                <button className="hover:text-emerald-400 transition-colors">Shipping Policy</button>
              </li>
              <li>
                <button className="hover:text-emerald-400 transition-colors">Return & Refund Policy</button>
              </li>
              <li>
                <button className="hover:text-emerald-400 transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button className="hover:text-emerald-400 transition-colors">Terms & Conditions</button>
              </li>
              <li>
                <button
                  onClick={() => setView('orders')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Track My Order
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-4 w-4 shrink-0 text-emerald-500" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-emerald-400 transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MessageCircle className="h-4 w-4 shrink-0 text-green-500" />
                <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                  WhatsApp: {whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4 shrink-0 text-emerald-500" />
                <a href={`mailto:${email}`} className="hover:text-emerald-400 transition-colors">
                  {email}
                </a>
              </li>
            </ul>

            {/* Social links */}
            <div className="mt-5">
              <h4 className="text-white font-medium text-sm mb-3">Follow Us</h4>
              <div className="flex gap-2">
                {[
                  { icon: Facebook, href: settings?.socialFacebook },
                  { icon: Instagram, href: settings?.socialInstagram },
                  { icon: Twitter, href: settings?.socialTwitter },
                  { icon: Youtube, href: settings?.socialYoutube },
                ].map(({ icon: Icon, href }) => (
                  <Button
                    key={Icon.displayName}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-gray-800 hover:bg-emerald-600 text-gray-400 hover:text-white transition-colors"
                    asChild={!!href}
                  >
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        <Icon className="h-4 w-4" />
                      </a>
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {storeName}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <CreditCard className="h-3.5 w-3.5" />
              <span>COD • UPI • Cards</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
