import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const banners = await db.banner.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: { banners },
    });
  } catch (error) {
    console.error('Error fetching banners:', error);
    // Fallback to mock data
    return NextResponse.json({
      success: true,
      data: {
        banners: [
          {
            id: '1',
            type: 'hero',
            title: 'Premium Roasted Snacks',
            subtitle: 'Handcrafted with traditional spices since 1965',
            ctaLabel: 'Shop Now',
            ctaLink: '/products',
            imageDesktop: '/hero-banner.png',
            sortOrder: 0,
            isActive: true,
          },
          {
            id: '2',
            type: 'hero',
            title: 'Crispy, Crunchy & Delicious',
            subtitle: 'From farm-fresh peanuts & chickpeas to your doorstep',
            ctaLabel: 'Explore Products',
            ctaLink: '/products',
            sortOrder: 1,
            isActive: true,
          },
          {
            id: '3',
            type: 'promo',
            title: 'Flat 25% OFF on Kala Chana!',
            subtitle: 'Use code KALA25 at checkout',
            ctaLabel: 'Shop Now',
            ctaLink: '/products?category=chana',
            sortOrder: 2,
            isActive: true,
          },
        ],
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const banner = await db.banner.create({
      data: {
        type: body.type,
        title: body.title,
        subtitle: body.subtitle,
        ctaLabel: body.ctaLabel,
        ctaLink: body.ctaLink,
        imageDesktop: body.imageDesktop,
        imageMobile: body.imageMobile,
        sortOrder: body.sortOrder || 0,
        isActive: body.isActive ?? true,
        startAt: body.startAt ? new Date(body.startAt) : null,
        endAt: body.endAt ? new Date(body.endAt) : null,
        popupDelay: body.popupDelay,
      },
    });

    return NextResponse.json({
      success: true,
      data: banner,
      message: 'Banner created successfully',
    });
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'CREATE_FAILED', message: 'Failed to create banner' },
    }, { status: 500 });
  }
}
