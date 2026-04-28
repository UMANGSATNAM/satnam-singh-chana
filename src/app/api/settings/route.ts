import { NextResponse } from 'next/server';
import type { StoreSettings } from '@/types';

const defaultSettings: StoreSettings = {
  storeName: 'Satnam Singh Chana',
  storeTagline: 'Premium Roasted Snacks Since 1965',
  storeEmail: 'hello@satnamsinghchana.com',
  storePhone: '+91 98765 43210',
  storeWhatsapp: '+91 98765 43210',
  storeAddress: 'Main Market Road, Rajkot, Gujarat 360001',
  storeGstin: '24AABCS1234F1Z5',
  storePan: 'AABCS1234F',
  invoicePrefix: 'SSC',
  currency: 'INR',
  timezone: 'Asia/Kolkata',
  language: 'en',
  maintenanceMode: false,
  freeShippingAbove: 500,
  flatShippingRate: 49,
  codEnabled: true,
  codHandlingFee: 30,
  codMinOrder: 200,
  codMaxOrder: 5000,
  razorpayEnabled: false,
  razorpayKeyId: '',
  razorpayKeySecret: '',
  razorpayTestMode: true,
  payuEnabled: false,
  stripeEnabled: false,
  returnWindowDays: 7,
  returnReasons: ['Defective product', 'Wrong item delivered', 'Product expired', 'Changed my mind'],
  refundMethods: ['Original payment method', 'Store credit'],
  socialFacebook: 'https://facebook.com/satnamsinghchana',
  socialInstagram: 'https://instagram.com/satnamsinghchana',
  socialTwitter: 'https://twitter.com/satnamsinghchana',
  socialYoutube: 'https://youtube.com/@satnamsinghchana',
  ga4TrackingId: '',
  fbPixelId: '',
  gtmId: '',
};

export async function GET() {
  try {
    // In a real app, we'd fetch from DB
    // For now, return default settings
    return NextResponse.json({
      success: true,
      data: defaultSettings,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({
      success: true,
      data: defaultSettings,
    });
  }
}
