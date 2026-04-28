'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Send, Mail, MessageSquare, Phone } from 'lucide-react';

const emailTemplates = [
  { event: 'order_confirmed', label: 'Order Confirmed', active: true },
  { event: 'shipped', label: 'Shipped', active: true },
  { event: 'delivered', label: 'Delivered', active: true },
  { event: 'cancelled', label: 'Cancelled', active: true },
  { event: 'refund_initiated', label: 'Refund Initiated', active: true },
  { event: 'password_reset', label: 'Password Reset', active: true },
  { event: 'welcome', label: 'Welcome Email', active: true },
];

const smsTemplates = [
  { event: 'otp', label: 'OTP', active: true },
  { event: 'order_confirmed', label: 'Order Confirmed', active: true },
  { event: 'shipped', label: 'Shipped', active: true },
  { event: 'delivered', label: 'Delivered', active: true },
];

const whatsappTemplates = [
  { event: 'order_confirmed', label: 'Order Confirmed', active: true },
  { event: 'shipped', label: 'Shipped', active: true },
  { event: 'delivered', label: 'Delivered', active: true },
  { event: 'abandoned_cart', label: 'Abandoned Cart', active: false },
];

export default function AdminSettingsNotifications() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Notification Settings</h2>
        <p className="text-sm text-gray-500">Configure email, SMS, and WhatsApp notifications</p>
      </div>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-amber-600" />
            <CardTitle className="text-base">Email Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Provider</Label>
            <Select defaultValue="smtp">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="smtp">Custom SMTP</SelectItem>
                <SelectItem value="sendgrid">SendGrid</SelectItem>
                <SelectItem value="mailgun">Mailgun</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>SMTP Host</Label>
              <Input placeholder="smtp.gmail.com" />
            </div>
            <div className="space-y-2">
              <Label>SMTP Port</Label>
              <Input defaultValue="587" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From Name</Label>
              <Input defaultValue="Satnam Singh Chana" />
            </div>
            <div className="space-y-2">
              <Label>From Email</Label>
              <Input defaultValue="hello@satnamsinghchana.com" />
            </div>
          </div>
          <Separator />
          <div>
            <Label className="text-sm font-medium">Email Templates</Label>
            <div className="mt-3 space-y-2">
              {emailTemplates.map((tpl) => (
                <div key={tpl.event} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                  <span className="text-sm">{tpl.label}</span>
                  <div className="flex items-center gap-2">
                    <Switch checked={tpl.active} />
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Send className="h-3.5 w-3.5" /> Send Test Email
          </Button>
        </CardContent>
      </Card>

      {/* SMS Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-base">SMS Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Provider</Label>
              <Select defaultValue="msg91">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="msg91">MSG91</SelectItem>
                  <SelectItem value="fast2sms">Fast2SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Sender ID</Label>
            <Input placeholder="SSCIND" />
          </div>
          <Separator />
          <div>
            <Label className="text-sm font-medium">SMS Templates</Label>
            <div className="mt-3 space-y-2">
              {smsTemplates.map((tpl) => (
                <div key={tpl.event} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                  <span className="text-sm">{tpl.label}</span>
                  <div className="flex items-center gap-2">
                    <Switch checked={tpl.active} />
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Send className="h-3.5 w-3.5" /> Send Test SMS
          </Button>
        </CardContent>
      </Card>

      {/* WhatsApp Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            <CardTitle className="text-base">WhatsApp Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Provider</Label>
              <Select defaultValue="interakt">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="interakt">Interakt</SelectItem>
                  <SelectItem value="wati">WATI</SelectItem>
                  <SelectItem value="twilio">Twilio WhatsApp</SelectItem>
                  <SelectItem value="aisensy">AiSensy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Phone Number ID</Label>
            <Input placeholder="Phone Number ID from Meta" />
          </div>
          <Separator />
          <div>
            <Label className="text-sm font-medium">WhatsApp Templates (Pre-approved by Meta)</Label>
            <div className="mt-3 space-y-2">
              {whatsappTemplates.map((tpl) => (
                <div key={tpl.event} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                  <span className="text-sm">{tpl.label}</span>
                  <div className="flex items-center gap-2">
                    <Switch checked={tpl.active} />
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Send className="h-3.5 w-3.5" /> Send Test Message
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Save className="h-4 w-4 mr-2" /> Save Notification Settings
        </Button>
      </div>
    </div>
  );
}
