'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, ArrowUp, ArrowDown, Image, Zap } from 'lucide-react';
import { useState } from 'react';

const mockBanners = [
  { id: '1', type: 'hero', title: 'Premium Roasted Snacks', subtitle: 'Handcrafted with love', active: true, sortOrder: 1 },
  { id: '2', type: 'hero', title: 'Masala Range — Now Available!', subtitle: 'Bold spices, satisfying crunch', active: true, sortOrder: 2 },
  { id: '3', type: 'promo', title: 'Flat ₹50 Off!', subtitle: 'Use code FIRST50', active: true, sortOrder: 1 },
];

const mockFlashSales = [
  { id: '1', name: 'New Year Sale', start: '2024-12-25', end: '2025-01-01', active: false, products: 3 },
];

export default function AdminBanners() {
  const currentView = useStore((s) => s.currentView);
  const isFlashSale = currentView === 'admin-flash-sales';
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{isFlashSale ? 'Flash Sales' : 'Banners'}</h2>
          <p className="text-sm text-gray-500">
            {isFlashSale ? `${mockFlashSales.length} flash sales` : `${mockBanners.length} banners`}
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" /> {isFlashSale ? 'Create Flash Sale' : 'Add Banner'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{isFlashSale ? 'Create Flash Sale' : 'Add Banner'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              {isFlashSale ? (
                <>
                  <div className="space-y-2">
                    <Label>Sale Name</Label>
                    <Input placeholder="e.g., Republic Day Sale" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input type="datetime-local" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select_ type="banner" />
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input placeholder="Banner title" />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Input placeholder="Banner subtitle" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>CTA Label</Label>
                      <Input placeholder="Shop Now" />
                    </div>
                    <div className="space-y-2">
                      <Label>CTA Link</Label>
                      <Input placeholder="#products" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Sort Order</Label>
                    <Input type="number" placeholder="1" />
                  </div>
                </>
              )}
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => setDialogOpen(false)}>
                {isFlashSale ? 'Create Flash Sale' : 'Add Banner'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Sort Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(isFlashSale ? mockFlashSales : mockBanners).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {isFlashSale ? <Zap className="h-3 w-3 mr-1" /> : <Image className="h-3 w-3 mr-1" alt="" />}
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-sm">{item.title || item.name}</TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {'subtitle' in item ? item.subtitle : `${('products' in item ? item.products : 0)} products`}
                    {'start' in item && <span className="block text-xs">{item.start} → {item.end}</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6"><ArrowUp className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><ArrowDown className="h-3 w-3" /></Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${item.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {item.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={item.active} />
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

import { useStore } from '@/stores/useStore';

function Select_({ type }: { type: string }) {
  return (
    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
      <option>hero</option>
      <option>promo</option>
      <option>category_strip</option>
      <option>popup</option>
    </select>
  );
}
