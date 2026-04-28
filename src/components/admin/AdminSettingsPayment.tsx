'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';

export default function AdminSettingsPayment() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Payment Gateway Settings</h2>
        <p className="text-sm text-gray-500">Configure payment methods</p>
      </div>

      {/* Razorpay */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Razorpay</CardTitle>
            <Switch defaultChecked={false} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">Supports UPI, Cards, Net Banking, Wallets, EMI</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Key ID</Label>
              <Input placeholder="rzp_test_..." />
            </div>
            <div className="space-y-2">
              <Label>Key Secret</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Webhook Secret</Label>
              <Input placeholder="Webhook secret" />
            </div>
            <div className="space-y-2">
              <Label>Mode</Label>
              <div className="flex items-center gap-3 mt-1">
                <Switch defaultChecked={true} />
                <span className="text-sm">Test Mode</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PayU */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">PayU</CardTitle>
            <Switch defaultChecked={false} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Merchant Key</Label>
              <Input placeholder="Merchant key" />
            </div>
            <div className="space-y-2">
              <Label>Salt</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch defaultChecked={true} />
            <span className="text-sm">Test Mode</span>
          </div>
        </CardContent>
      </Card>

      {/* Stripe */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Stripe</CardTitle>
            <Switch defaultChecked={false} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">Supports international cards</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Publishable Key</Label>
              <Input placeholder="pk_test_..." />
            </div>
            <div className="space-y-2">
              <Label>Secret Key</Label>
              <Input type="password" placeholder="sk_test_..." />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Webhook Endpoint Secret</Label>
            <Input placeholder="whsec_..." />
          </div>
        </CardContent>
      </Card>

      {/* COD */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Cash on Delivery (COD)</CardTitle>
            <Switch defaultChecked={true} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>COD Handling Fee (₹)</Label>
              <Input type="number" defaultValue="0" />
            </div>
            <div className="space-y-2">
              <Label>Min Order Value (₹)</Label>
              <Input type="number" defaultValue="0" />
            </div>
            <div className="space-y-2">
              <Label>Max Order Value (₹)</Label>
              <Input type="number" defaultValue="5000" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet/Store Credit */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Wallet / Store Credit</CardTitle>
            <Switch defaultChecked={true} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Credit-to-Currency Ratio</Label>
              <Input type="number" defaultValue="1" />
              <p className="text-xs text-gray-500">1 credit = ₹1</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="h-4 w-4 mr-2" /> Save Payment Settings
        </Button>
      </div>
    </div>
  );
}
