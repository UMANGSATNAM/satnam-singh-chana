'use client';

import { useStore } from '@/stores/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

const badges = ['None', 'New', 'Best Seller', 'Sale', 'Limited'];

interface VariantForm {
  sku: string;
  weight: string;
  price: string;
  mrp: string;
  stock: string;
}

export default function AdminAddProduct() {
  const setView = useStore((s) => s.setView);
  const products = useStore((s) => s.products);
  const selectedId = useStore((s) => s.selectedProductId);
  const isEdit = useView() === 'admin-edit-product';
  const editProduct = isEdit && selectedId ? products.find(p => p.id === selectedId) : null;

  const [name, setName] = useState(editProduct?.name || '');
  const [description, setDescription] = useState(editProduct?.description || '');
  const [category, setCategory] = useState(editProduct?.categorySlug || '');
  const [tags, setTags] = useState(editProduct?.tags?.join(', ') || '');
  const [badge, setBadge] = useState(editProduct?.badge || 'None');
  const [metaTitle, setMetaTitle] = useState(editProduct?.metaTitle || '');
  const [metaDesc, setMetaDesc] = useState(editProduct?.metaDesc || '');
  const [variants, setVariants] = useState<VariantForm[]>(
    editProduct?.variants?.map(v => ({
      sku: v.sku, weight: v.weight, price: String(v.price), mrp: String(v.mrp), stock: String(v.stock)
    })) || [{ sku: '', weight: '250g', price: '', mrp: '', stock: '' }]
  );

  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const addVariant = () => {
    setVariants([...variants, { sku: '', weight: '', price: '', mrp: '', stock: '' }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: keyof VariantForm, value: string) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setView('admin-products')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Khari Sing" />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={slug} readOnly className="bg-gray-50" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product description..." rows={4} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sing">Sing</SelectItem>
                  <SelectItem value="chana">Chana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="salty, crunchy, khari" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Badge</Label>
            <Select value={badge} onValueChange={setBadge}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {badges.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Variants</CardTitle>
            <Button size="sm" variant="outline" onClick={addVariant}>
              <Plus className="h-4 w-4 mr-1" /> Add Variant
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {variants.map((variant, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Variant {index + 1}</span>
                {variants.length > 1 && (
                  <Button size="sm" variant="ghost" onClick={() => removeVariant(index)} className="text-red-500 h-7">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">SKU</Label>
                  <Input value={variant.sku} onChange={(e) => updateVariant(index, 'sku', e.target.value)} placeholder="SSC-KS-500" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Weight</Label>
                  <Input value={variant.weight} onChange={(e) => updateVariant(index, 'weight', e.target.value)} placeholder="500g" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Price (₹)</Label>
                  <Input type="number" value={variant.price} onChange={(e) => updateVariant(index, 'price', e.target.value)} placeholder="120" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">MRP (₹)</Label>
                  <Input type="number" value={variant.mrp} onChange={(e) => updateVariant(index, 'mrp', e.target.value)} placeholder="140" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Stock</Label>
                  <Input type="number" value={variant.stock} onChange={(e) => updateVariant(index, 'stock', e.target.value)} placeholder="100" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Meta Title</Label>
            <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Custom meta title" />
          </div>
          <div className="space-y-2">
            <Label>Meta Description</Label>
            <Textarea value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} placeholder="Custom meta description" rows={2} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 justify-end">
        <Button variant="outline" onClick={() => setView('admin-products')}>Cancel</Button>
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Save className="h-4 w-4 mr-2" /> {isEdit ? 'Update Product' : 'Save Product'}
        </Button>
      </div>
    </div>
  );
}

function useView() {
  return useStore.getState().currentView;
}
