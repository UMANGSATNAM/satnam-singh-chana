import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check for demo accounts
    if (email === 'demo@satnamsinghchana.com' && password === 'demo123') {
      return NextResponse.json({
        success: true,
        data: {
          id: 'demo-user-1',
          email: 'demo@satnamsinghchana.com',
          name: 'Demo Customer',
          phone: '+91 98765 43210',
          role: 'customer',
          avatar: undefined,
          loyaltyPoints: 250,
          storeCredits: 100,
          addresses: [
            {
              id: 'addr-1',
              label: 'Home',
              name: 'Demo Customer',
              phone: '+91 98765 43210',
              addressLine1: '123, MG Road',
              addressLine2: 'Near SBI Bank',
              city: 'Rajkot',
              state: 'Gujarat',
              pincode: '360001',
              country: 'India',
              isDefault: true,
            },
          ],
        },
      });
    }

    if (email === 'admin@satnamsinghchana.com' && password === 'admin123') {
      return NextResponse.json({
        success: true,
        data: {
          id: 'admin-user-1',
          email: 'admin@satnamsinghchana.com',
          name: 'Admin Singh',
          phone: '+91 98765 00000',
          role: 'admin',
          avatar: undefined,
          loyaltyPoints: 0,
          storeCredits: 0,
          addresses: [],
        },
      });
    }

    // Try database lookup
    try {
      const user = await db.user.findUnique({
        where: { email },
        include: { addresses: true },
      });

      if (user && user.password === password) {
        return NextResponse.json({
          success: true,
          data: {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone ?? undefined,
            role: user.role as 'customer' | 'admin' | 'super_admin',
            avatar: user.avatar ?? undefined,
            loyaltyPoints: user.loyaltyPoints,
            storeCredits: user.storeCredits,
            addresses: user.addresses.map((a) => ({
              id: a.id,
              label: a.label ?? undefined,
              name: a.name,
              phone: a.phone,
              addressLine1: a.addressLine1,
              addressLine2: a.addressLine2 ?? undefined,
              city: a.city,
              state: a.state,
              pincode: a.pincode,
              country: a.country,
              isDefault: a.isDefault,
            })),
          },
        });
      }
    } catch {
      // DB not available, skip
    }

    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
