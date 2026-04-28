'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Tag, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const mockPromos = [
  { id: '1', code: 'FIRST50', type: 'flat', value: 50, minOrder: 200, maxDiscount: null, usageLimit: 1000, usedCount: 245, perUserLimit: 1, validUntil: '2025-12-31', firstTimeOnly: true, showOnCheckout: true, autoApply: false, active: true },
  { id: '2', code: 'SAVE20', type: 'percentage', value: 20, minOrder: 300, maxDiscount: 100, usageLimit: 5000, usedCount: 1230, perUserLimit: 3, validUntil: '2025-12-31', firstTimeOnly: false, showOnCheckout: true, autoApply: false, active: true },
  { id: '3', code: 'FLAT100', type: 'flat', value: 100, minOrder: 500, maxDiscount: null, usageLimit: 2000, usedCount: 567, perUserLimit: 2, validUntil: '2025-12-31', firstTimeOnly: false, showOnCheckout: false, autoApply: false, active: true },
];

export default function AdminPromoCodes() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [code, setCode] = useState('');
  const [type, setType] = useState('flat');
  const [value, setValue] = useState('');
  const [minOrder, setMinOrder] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Promo Codes</h2>
          <p className="text-sm text-gray-500">{mockPromos.length} active promo codes</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" /> Create Promo Code
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Promo Code</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Promo Code</Label>
                <Input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="e.g., SAVE20" className="focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="focus:ring-emerald-500"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">Flat (₹)</SelectItem>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder={type === 'flat' ? '100' : '20'} className="focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Min Order Value (₹)</Label>
                  <Input type="number" value={minOrder} onChange={(e) => setMinOrder(e.target.value)} placeholder="200" className="focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div className="space-y-2">
                  <Label>Max Discount (₹)</Label>
                  <Input type="number" placeholder="For % codes" className="focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Total Usage Limit</Label>
                  <Input type="number" placeholder="1000" className="focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div className="space-y-2">
                  <Label>Per User Limit</Label>
                  <Input type="number" placeholder="1" className="focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Valid From</Label>
                  <Input type="date" className="focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div className="space-y-2">
                  <Label>Valid Until</Label>
                  <Input type="date" className="focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">First-time users only</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Show on checkout page</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Auto-apply</Label>
                  <Switch />
                </div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => setDialogOpen(false)}>
                Create Promo Code
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-emerald-50">
                <TableHead className="text-emerald-700">Code</TableHead>
                <TableHead className="text-emerald-700">Type</TableHead>
                <TableHead className="text-emerald-700">Value</TableHead>
                <TableHead className="text-emerald-700">Min Order</TableHead>
                <TableHead className="text-emerald-700">Usage</TableHead>
                <TableHead className="text-emerald-700">Valid Until</TableHead>
                <TableHead className="text-emerald-700">Status</TableHead>
                <TableHead className="w-20 text-emerald-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPromos.map((promo) => (
                <TableRow key={promo.id} className="hover:bg-emerald-50/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-emerald-600" />
                      <span className="font-mono font-bold text-sm">{promo.code}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm capitalize">{promo.type}</TableCell>
                  <TableCell className="text-sm font-medium text-emerald-600">
                    {promo.type === 'flat' ? `₹${promo.value}` : `${promo.value}%`}
                    {promo.maxDiscount && <span className="text-xs text-gray-500 block">Max ₹{promo.maxDiscount}</span>}
                  </TableCell>
                  <TableCell className="text-sm">₹{promo.minOrder}</TableCell>
                  <TableCell className="text-sm">
                    <span>{promo.usedCount}/{promo.usageLimit}</span>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${(promo.usedCount / (promo.usageLimit || 1)) * 100}%` }} />
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{promo.validUntil}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${promo.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {promo.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-emerald-600 hover:text-emerald-700"><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
