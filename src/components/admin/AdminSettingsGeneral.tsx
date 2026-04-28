'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';

export default function AdminSettingsGeneral() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold">General Settings</h2>
        <p className="text-sm text-gray-500">Basic store configuration</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Store Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Store Name</Label>
              <Input defaultValue="Satnam Singh Chana" />
            </div>
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Input defaultValue="Premium Roasted Snacks" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Contact Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="hello@satnamsinghchana.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input defaultValue="+91 98765 43210" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>WhatsApp Number</Label>
              <Input defaultValue="+91 98765 43210" />
            </div>
            <div className="space-y-2">
              <Label>Store Address</Label>
              <Input defaultValue="Ahmedabad, Gujarat, India" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Business & Tax</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>GSTIN</Label>
              <Input defaultValue="24XXXXX1234X1ZX" />
            </div>
            <div className="space-y-2">
              <Label>PAN Number</Label>
              <Input defaultValue="XXXXX1234X" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Invoice Prefix</Label>
              <Input defaultValue="SSC-2024-" />
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Input defaultValue="Asia/Kolkata" />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Input defaultValue="INR" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Maintenance & Social</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Maintenance Mode</Label>
              <p className="text-xs text-gray-500">Temporarily disable the store</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Facebook URL</Label>
              <Input placeholder="https://facebook.com/..." />
            </div>
            <div className="space-y-2">
              <Label>Instagram URL</Label>
              <Input placeholder="https://instagram.com/..." />
            </div>
            <div className="space-y-2">
              <Label>Twitter URL</Label>
              <Input placeholder="https://twitter.com/..." />
            </div>
            <div className="space-y-2">
              <Label>YouTube URL</Label>
              <Input placeholder="https://youtube.com/..." />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="h-4 w-4 mr-2" /> Save Settings
        </Button>
      </div>
    </div>
  );
}
