'use client';

import { useStore } from '@/stores/useStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';

const formatPrice = (amount: number) => `₹${amount}`;

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-emerald-100 text-emerald-700',
  'New': 'bg-emerald-100 text-emerald-700',
  'Sale': 'bg-red-100 text-red-700',
  'Limited': 'bg-purple-100 text-purple-700',
};

export default function AdminProducts() {
  const products = useStore((s) => s.products);
  const setView = useStore((s) => s.setView);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.productId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-sm text-gray-500">{products.length} products total</p>
        </div>
        <Button onClick={() => setView('admin-add-product')} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 focus:ring-emerald-500 focus:border-emerald-500" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-emerald-50">
                <TableHead className="text-emerald-700">Product</TableHead>
                <TableHead className="text-emerald-700">Category</TableHead>
                <TableHead className="text-emerald-700">Badge</TableHead>
                <TableHead className="text-emerald-700">Variants</TableHead>
                <TableHead className="text-emerald-700">Status</TableHead>
                <TableHead className="w-12 text-emerald-700"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id} className="cursor-pointer hover:bg-emerald-50/50" onClick={() => setView('admin-edit-product', product.id)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.productId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{product.categoryName}</Badge>
                  </TableCell>
                  <TableCell>
                    {product.badge ? (
                      <Badge className={`text-xs ${badgeColors[product.badge] || ''}`}>{product.badge}</Badge>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {product.variants.map(v => (
                        <div key={v.id} className="text-xs">
                          <span className="font-medium">{v.weight}</span>
                          <span className="text-gray-500 ml-1">{formatPrice(v.price)}</span>
                          <span className={`ml-1 ${v.stock < 20 ? 'text-red-500' : 'text-gray-400'}`}>({v.stock})</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-xs">Active</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setView('admin-edit-product', product.id); }}>
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Eye className="h-4 w-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
