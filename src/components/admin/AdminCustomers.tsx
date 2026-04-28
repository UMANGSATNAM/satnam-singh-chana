'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, MoreVertical, Ban, CheckCircle, Download } from 'lucide-react';
import { useState } from 'react';

const mockCustomers = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', orders: 8, totalSpent: 3420, status: 'active', joined: '2024-06-15', loyalty: 342 },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 87654 32109', orders: 5, totalSpent: 2180, status: 'active', joined: '2024-07-22', loyalty: 218 },
  { id: '3', name: 'Amit Desai', email: 'amit@example.com', phone: '+91 76543 21098', orders: 12, totalSpent: 5640, status: 'active', joined: '2024-03-10', loyalty: 564 },
  { id: '4', name: 'Sneha Joshi', email: 'sneha@example.com', phone: '+91 65432 10987', orders: 3, totalSpent: 960, status: 'active', joined: '2024-09-05', loyalty: 96 },
  { id: '5', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 54321 09876', orders: 0, totalSpent: 0, status: 'blocked', joined: '2024-11-20', loyalty: 0 },
  { id: '6', name: 'Meera Nair', email: 'meera@example.com', phone: '+91 43210 98765', orders: 2, totalSpent: 480, status: 'active', joined: '2024-10-15', loyalty: 48 },
];

export default function AdminCustomers() {
  const [search, setSearch] = useState('');

  const filtered = mockCustomers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Customers</h2>
          <p className="text-sm text-gray-500">{mockCustomers.length} registered customers</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Loyalty Pts</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{customer.phone}</TableCell>
                  <TableCell className="text-sm">{customer.orders}</TableCell>
                  <TableCell className="font-medium text-sm">₹{customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{customer.loyalty}</TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${customer.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{customer.joined}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <CheckCircle className="h-4 w-4 mr-2" /> View Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {customer.status === 'active' ? (
                            <><Ban className="h-4 w-4 mr-2" /> Block</>
                          ) : (
                            <><CheckCircle className="h-4 w-4 mr-2" /> Unblock</>
                          )}
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
