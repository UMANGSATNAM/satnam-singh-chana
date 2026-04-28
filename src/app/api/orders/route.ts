import { NextResponse } from 'next/server';

// In-memory store for demo orders
const orders: Record<string, unknown[]> = {};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const userOrders = (orders[userId] || []) as Record<string, unknown>[];

    return NextResponse.json({
      success: true,
      data: userOrders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, address, paymentMethod, promoCode, userId } = body;

    const subtotal = items.reduce((sum: number, item: Record<string, number>) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 500 ? 0 : 49;
    const discount = 0;
    const codFee = paymentMethod === 'cod' ? 30 : 0;
    const total = subtotal + shipping + codFee - discount;

    const orderNumber = `SSC-${Date.now().toString().slice(-6)}`;

    const order = {
      id: `order-${Date.now()}`,
      orderNumber,
      userId: userId || 'guest',
      addressId: address?.id || 'addr-new',
      status: 'placed',
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
      subtotal,
      discount,
      shipping,
      codFee,
      total,
      promoCode: promoCode || undefined,
      notes: undefined,
      trackingNumber: undefined,
      trackingLink: undefined,
      deliveryPartner: undefined,
      items: items.map((item: Record<string, unknown>, idx: number) => ({
        id: `oi-${Date.now()}-${idx}`,
        productId: item.productId,
        variantId: item.variantId,
        productName: item.productName,
        variantWeight: item.variantWeight,
        quantity: item.quantity,
        price: item.price,
        mrp: item.mrp,
        total: (item.price as number) * (item.quantity as number),
      })),
      address: address || {
        id: 'addr-new',
        name: 'Customer',
        phone: '',
        addressLine1: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        isDefault: false,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store in memory
    const uid = userId || 'guest';
    if (!orders[uid]) orders[uid] = [];
    orders[uid].unshift(order);

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create order' },
      { status: 500 }
    );
  }
}
