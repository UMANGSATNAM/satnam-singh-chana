'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Save, Plus, X } from 'lucide-react';
import { useState } from 'react';

const defaultReasons = ['Wrong item received', 'Product damaged', 'Quality not as expected', 'Changed my mind', 'Other'];

export default function AdminSettingsShipping() {
  const [reasons, setReasons] = useState(defaultReasons);
  const [newReason, setNewReason] = useState('');

  const addReason = () => {
    if (newReason.trim() && !reasons.includes(newReason.trim())) {
      setReasons([...reasons, newReason.trim()]);
      setNewReason('');
    }
  };

  const removeReason = (reason: string) => {
    setReasons(reasons.filter(r => r !== reason));
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Shipping & Returns</h2>
        <p className="text-sm text-gray-500">Configure shipping rates and return policies</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Shipping Rates</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Free Shipping Above (₹)</Label>
              <Input type="number" defaultValue="500" />
              <p className="text-xs text-gray-500">Orders above this amount get free shipping</p>
            </div>
            <div className="space-y-2">
              <Label>Flat Rate Per Order (₹)</Label>
              <Input type="number" defaultValue="49" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Weight-based Rate (₹/kg)</Label>
              <Input type="number" defaultValue="20" />
            </div>
            <div className="space-y-2">
              <Label>Per Item Rate (₹)</Label>
              <Input type="number" defaultValue="15" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Express Delivery Surcharge (₹)</Label>
            <Input type="number" defaultValue="99" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Delivery Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Estimated Delivery Days</Label>
              <Input defaultValue="3-5" placeholder="3-5" />
            </div>
            <div className="space-y-2">
              <Label>Same-day Delivery Cutoff Time</Label>
              <Input type="time" defaultValue="12:00" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Same-day Delivery</Label>
              <p className="text-xs text-gray-500">Enable for orders placed before cutoff</p>
            </div>
            <Switch defaultChecked={false} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Next-day Delivery</Label>
              <p className="text-xs text-gray-500">Enable next-day delivery option</p>
            </div>
            <Switch defaultChecked={true} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Returns & Refunds</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Return Window (days after delivery)</Label>
            <Input type="number" defaultValue="7" />
          </div>
          <Separator />
          <div>
            <Label className="text-sm font-medium">Return Reasons</Label>
            <p className="text-xs text-gray-500 mb-3">Customize the reasons shown to customers</p>
            <div className="space-y-2">
              {reasons.map((reason) => (
                <div key={reason} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                  <span className="text-sm">{reason}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400 hover:text-red-600" onClick={() => removeReason(reason)}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <Input value={newReason} onChange={(e) => setNewReason(e.target.value)} placeholder="Add new reason..." className="flex-1" />
              <Button variant="outline" size="sm" onClick={addReason}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
          <Separator />
          <div>
            <Label className="text-sm font-medium">Refund Methods</Label>
            <div className="mt-3 space-y-2">
              {['Original payment method', 'Store credit', 'Bank transfer'].map((method) => (
                <div key={method} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                  <span className="text-sm">{method}</span>
                  <Switch defaultChecked={true} />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="h-4 w-4 mr-2" /> Save Shipping Settings
        </Button>
      </div>
    </div>
  );
}
