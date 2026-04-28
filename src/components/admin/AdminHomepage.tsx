'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowUp, ArrowDown, Layout, Star, Zap, MessageSquare } from 'lucide-react';

const mockSections = [
  { id: '1', type: 'featured_categories', heading: 'Shop by Category', source: 'manual', active: true, sortOrder: 1 },
  { id: '2', type: 'best_sellers', heading: 'Best Sellers', source: 'rule_based', active: true, sortOrder: 2 },
  { id: '3', type: 'new_arrivals', heading: 'New Arrivals', source: 'rule_based', active: true, sortOrder: 3 },
  { id: '4', type: 'flash_sale', heading: 'Flash Sale', source: 'manual', active: false, sortOrder: 4 },
  { id: '5', type: 'testimonials', heading: 'What Our Customers Say', source: 'manual', active: true, sortOrder: 5 },
];

const typeIcons: Record<string, React.ReactNode> = {
  featured_categories: <Layout className="h-4 w-4" />,
  best_sellers: <Star className="h-4 w-4" />,
  new_arrivals: <Star className="h-4 w-4" />,
  flash_sale: <Zap className="h-4 w-4" />,
  testimonials: <MessageSquare className="h-4 w-4" />,
};

export default function AdminHomepage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Homepage Sections</h2>
        <p className="text-sm text-gray-500">Manage the layout and content of your homepage</p>
      </div>

      <div className="space-y-3">
        {mockSections.map((section) => (
          <Card key={section.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6"><ArrowUp className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6"><ArrowDown className="h-3.5 w-3.5" /></Button>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  {typeIcons[section.type] || <Layout className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">{section.heading}</h3>
                    <Badge variant="secondary" className="text-xs">{section.type.replace(/_/g, ' ')}</Badge>
                    <Badge variant="outline" className="text-xs">{section.source.replace(/_/g, ' ')}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Section #{section.sortOrder}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Switch checked={section.active} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
