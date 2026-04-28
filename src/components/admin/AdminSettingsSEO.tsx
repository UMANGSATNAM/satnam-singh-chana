'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

export default function AdminSettingsSEO() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold">SEO & Analytics</h2>
        <p className="text-sm text-gray-500">Configure meta tags, analytics, and tracking</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Global SEO</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Store Meta Title</Label>
            <Input defaultValue="Satnam Singh Chana — Premium Roasted Snacks" />
          </div>
          <div className="space-y-2">
            <Label>Store Meta Description</Label>
            <Textarea defaultValue="Handcrafted roasted Sing & Chana snacks. Crispy, spiced, and wholesome — delivered to your doorstep. Shop premium peanuts and chickpeas." rows={3} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Analytics & Tracking</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Google Analytics 4 Tracking ID</Label>
            <Input placeholder="G-XXXXXXXXXX" />
          </div>
          <div className="space-y-2">
            <Label>Facebook Pixel ID</Label>
            <Input placeholder="XXXXXXXXXXXXXXX" />
          </div>
          <div className="space-y-2">
            <Label>Google Tag Manager ID</Label>
            <Input placeholder="GTM-XXXXXXX" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Advanced</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Robots.txt Editor</Label>
            <Textarea
              defaultValue={`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://satnamsinghchana.com/sitemap.xml`}
              rows={6}
              className="font-mono text-sm"
            />
          </div>
          <Separator />
          <div className="space-y-3">
            <Label className="text-sm font-medium">Schema Markup</Label>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Product Schema</p>
                <p className="text-xs text-gray-500">Rich snippets for product pages</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">BreadcrumbList Schema</p>
                <p className="text-xs text-gray-500">Breadcrumb navigation in search</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Organization Schema</p>
                <p className="text-xs text-gray-500">Business info in search results</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Auto-generate XML Sitemap</p>
              <p className="text-xs text-gray-500">Updated automatically when products change</p>
            </div>
            <Switch defaultChecked={true} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Save className="h-4 w-4 mr-2" /> Save SEO Settings
        </Button>
      </div>
    </div>
  );
}
