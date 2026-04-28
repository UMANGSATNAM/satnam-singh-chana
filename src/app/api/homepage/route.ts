import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const sections = await db.homepageSection.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: { sections },
    });
  } catch (error) {
    console.error('Error fetching homepage sections:', error);
    // Fallback to mock data
    return NextResponse.json({
      success: true,
      data: {
        sections: [
          { id: '1', type: 'announcement_bar', heading: 'Announcement Bar', isActive: true, sortOrder: 0 },
          { id: '2', type: 'hero', heading: 'Hero Banner', isActive: true, sortOrder: 1 },
          { id: '3', type: 'featured_categories', heading: 'Shop by Category', isActive: true, sortOrder: 2 },
          { id: '4', type: 'best_sellers', heading: 'Best Sellers', isActive: true, sortOrder: 3 },
          { id: '5', type: 'flash_sale', heading: 'Flash Sale', isActive: true, sortOrder: 4 },
          { id: '6', type: 'brand_spotlight', heading: 'Why Choose Us', isActive: true, sortOrder: 5 },
          { id: '7', type: 'new_arrivals', heading: 'New Arrivals', isActive: true, sortOrder: 6 },
          { id: '8', type: 'testimonials', heading: 'Customer Reviews', isActive: true, sortOrder: 7 },
          { id: '9', type: 'blog', heading: 'Brand Story', isActive: true, sortOrder: 8 },
          { id: '10', type: 'custom_html', heading: 'Social Connect', isActive: true, sortOrder: 9 },
          { id: '11', type: 'recommended', heading: 'Newsletter', isActive: true, sortOrder: 10 },
        ],
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const section = await db.homepageSection.create({
      data: {
        type: body.type,
        heading: body.heading,
        source: body.source || 'manual',
        ruleConfig: body.ruleConfig,
        content: body.content,
        productIds: body.productIds ? JSON.stringify(body.productIds) : '[]',
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder || 0,
      },
    });

    return NextResponse.json({
      success: true,
      data: section,
      message: 'Homepage section created successfully',
    });
  } catch (error) {
    console.error('Error creating homepage section:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'CREATE_FAILED', message: 'Failed to create homepage section' },
    }, { status: 500 });
  }
}
