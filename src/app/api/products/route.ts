import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const products = await db.product.findMany({
      where: { isActive: true },
      include: {
        category: true,
        variants: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
        reviews: { where: { isActive: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const categories = await db.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    const formattedProducts = products.map((p) => {
      const avgRating = p.reviews.length > 0
        ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
        : undefined;

      return {
        id: p.id,
        productId: p.productId,
        name: p.name,
        slug: p.slug,
        description: p.description,
        tags: p.tags ? p.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        categoryId: p.categoryId,
        categoryName: p.category.name,
        categorySlug: p.category.slug,
        images: JSON.parse(p.images || '[]'),
        metaTitle: p.metaTitle ?? undefined,
        metaDesc: p.metaDesc ?? undefined,
        badge: p.badge ?? undefined,
        isDigital: p.isDigital,
        relatedProducts: JSON.parse(p.relatedProducts || '[]'),
        isActive: p.isActive,
        variants: p.variants.map((v) => ({
          id: v.id,
          sku: v.sku,
          weight: v.weight,
          price: v.price,
          mrp: v.mrp,
          stock: v.stock,
          isActive: v.isActive,
        })),
        averageRating: avgRating,
        reviewCount: p.reviews.length,
        createdAt: p.createdAt.toISOString(),
      };
    });

    const formattedCategories = categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description ?? undefined,
      image: c.image ?? undefined,
      productCount: 0,
    }));

    // Update product counts
    for (const cat of formattedCategories) {
      cat.productCount = formattedProducts.filter((p) => p.categoryId === cat.id).length;
    }

    return NextResponse.json({
      success: true,
      data: {
        products: formattedProducts,
        categories: formattedCategories,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return mock data if database is empty
    return NextResponse.json({
      success: true,
      data: {
        products: getMockProducts(),
        categories: getMockCategories(),
      },
    });
  }
}

function getMockProducts() {
  return [
    {
      id: 'prod-1',
      productId: 'SSC-KS',
      name: 'Kala Sing (Black Peanuts)',
      slug: 'kala-sing-black-peanuts',
      description: 'Premium roasted Kala Sing with the perfect blend of traditional spices. Crunchy, flavorful, and irresistibly delicious. Our signature product made from handpicked black peanuts sourced from the finest farms of Gujarat.',
      tags: ['peanuts', 'sing', 'roasted', 'spicy', 'kala sing', 'bestseller'],
      categoryId: 'cat-sing',
      categoryName: 'Sing',
      categorySlug: 'sing',
      images: [],
      badge: 'Best Seller',
      isDigital: false,
      relatedProducts: ['prod-2', 'prod-3'],
      isActive: true,
      variants: [
        { id: 'v-1-1', sku: 'SSC-KS-250', weight: '250g', price: 89, mrp: 120, stock: 150, isActive: true },
        { id: 'v-1-2', sku: 'SSC-KS-500', weight: '500g', price: 159, mrp: 230, stock: 100, isActive: true },
      ],
      averageRating: 4.5,
      reviewCount: 48,
      createdAt: '2024-06-15T10:00:00Z',
    },
    {
      id: 'prod-2',
      productId: 'SSC-LS',
      name: 'Lal Sing (Red Peanuts)',
      slug: 'lal-sing-red-peanuts',
      description: 'Fiery red-skinned peanuts roasted to perfection with a special spice mix. A classic Indian snack that pairs perfectly with evening chai. Bold flavor, satisfying crunch.',
      tags: ['peanuts', 'sing', 'roasted', 'red', 'spicy', 'lal sing'],
      categoryId: 'cat-sing',
      categoryName: 'Sing',
      categorySlug: 'sing',
      images: [],
      badge: 'New',
      isDigital: false,
      relatedProducts: ['prod-1', 'prod-4'],
      isActive: true,
      variants: [
        { id: 'v-2-1', sku: 'SSC-LS-250', weight: '250g', price: 85, mrp: 115, stock: 120, isActive: true },
        { id: 'v-2-2', sku: 'SSC-LS-500', weight: '500g', price: 149, mrp: 220, stock: 80, isActive: true },
      ],
      averageRating: 4.3,
      reviewCount: 22,
      createdAt: '2024-08-20T10:00:00Z',
    },
    {
      id: 'prod-3',
      productId: 'SSC-SS',
      name: 'Safed Sing (White Peanuts)',
      slug: 'safed-sing-white-peanuts',
      description: 'Clean, lightly salted white peanuts for those who prefer a milder taste. Premium quality, perfectly roasted for maximum crunch. Great for health-conscious snackers.',
      tags: ['peanuts', 'sing', 'roasted', 'white', 'salted', 'mild'],
      categoryId: 'cat-sing',
      categoryName: 'Sing',
      categorySlug: 'sing',
      images: [],
      badge: undefined,
      isDigital: false,
      relatedProducts: ['prod-1', 'prod-2'],
      isActive: true,
      variants: [
        { id: 'v-3-1', sku: 'SSC-SS-250', weight: '250g', price: 79, mrp: 110, stock: 200, isActive: true },
        { id: 'v-3-2', sku: 'SSC-SS-500', weight: '500g', price: 139, mrp: 210, stock: 130, isActive: true },
      ],
      averageRating: 4.1,
      reviewCount: 15,
      createdAt: '2024-07-10T10:00:00Z',
    },
    {
      id: 'prod-4',
      productId: 'SSC-MC',
      name: 'Masala Chana (Spiced Chickpeas)',
      slug: 'masala-chana-spiced-chickpeas',
      description: 'The iconic Indian snack! Crunchy roasted chana coated with our secret masala blend. Every bite delivers an explosion of flavor. Perfect as a tea-time companion.',
      tags: ['chana', 'chickpeas', 'roasted', 'masala', 'spicy', 'classic'],
      categoryId: 'cat-chana',
      categoryName: 'Chana',
      categorySlug: 'chana',
      images: [],
      badge: 'Best Seller',
      isDigital: false,
      relatedProducts: ['prod-5', 'prod-6'],
      isActive: true,
      variants: [
        { id: 'v-4-1', sku: 'SSC-MC-250', weight: '250g', price: 75, mrp: 100, stock: 180, isActive: true },
        { id: 'v-4-2', sku: 'SSC-MC-500', weight: '500g', price: 135, mrp: 190, stock: 120, isActive: true },
      ],
      averageRating: 4.7,
      reviewCount: 72,
      createdAt: '2024-05-01T10:00:00Z',
    },
    {
      id: 'prod-5',
      productId: 'SSC-SC',
      name: 'Safed Chana (White Chickpeas)',
      slug: 'safed-chana-white-chickpeas',
      description: 'Simple, wholesome roasted white chickpeas with just the right amount of salt. A protein-packed snack that keeps you going throughout the day. Clean eating never tasted so good.',
      tags: ['chana', 'chickpeas', 'roasted', 'white', 'salted', 'protein'],
      categoryId: 'cat-chana',
      categoryName: 'Chana',
      categorySlug: 'chana',
      images: [],
      badge: undefined,
      isDigital: false,
      relatedProducts: ['prod-4', 'prod-6'],
      isActive: true,
      variants: [
        { id: 'v-5-1', sku: 'SSC-SC-250', weight: '250g', price: 69, mrp: 95, stock: 160, isActive: true },
        { id: 'v-5-2', sku: 'SSC-SC-500', weight: '500g', price: 125, mrp: 180, stock: 100, isActive: true },
      ],
      averageRating: 4.2,
      reviewCount: 31,
      createdAt: '2024-06-25T10:00:00Z',
    },
    {
      id: 'prod-6',
      productId: 'SSC-KC',
      name: 'Kala Chana (Black Chickpeas)',
      slug: 'kala-chana-black-chickpeas',
      description: 'Nutrient-rich black chickpeas, slow-roasted with traditional spices. Earthy flavor, firm texture, and packed with protein and fiber. The healthiest snack in our collection.',
      tags: ['chana', 'chickpeas', 'roasted', 'black', 'healthy', 'protein'],
      categoryId: 'cat-chana',
      categoryName: 'Chana',
      categorySlug: 'chana',
      images: [],
      badge: 'Sale',
      isDigital: false,
      relatedProducts: ['prod-4', 'prod-5'],
      isActive: true,
      variants: [
        { id: 'v-6-1', sku: 'SSC-KC-250', weight: '250g', price: 65, mrp: 105, stock: 90, isActive: true },
        { id: 'v-6-2', sku: 'SSC-KC-500', weight: '500g', price: 119, mrp: 200, stock: 60, isActive: true },
      ],
      averageRating: 4.4,
      reviewCount: 38,
      createdAt: '2024-09-01T10:00:00Z',
    },
    {
      id: 'prod-7',
      productId: 'SSC-MS',
      name: 'Masala Sing (Mixed Spice Peanuts)',
      slug: 'masala-sing-mixed-spice-peanuts',
      description: 'Our premium peanuts coated with an irresistible mix of Indian spices — chat masala, black salt, and a hint of lime. The ultimate flavor bomb for spice lovers!',
      tags: ['peanuts', 'sing', 'roasted', 'masala', 'spicy', 'chat masala'],
      categoryId: 'cat-sing',
      categoryName: 'Sing',
      categorySlug: 'sing',
      images: [],
      badge: 'Limited',
      isDigital: false,
      relatedProducts: ['prod-1', 'prod-2'],
      isActive: true,
      variants: [
        { id: 'v-7-1', sku: 'SSC-MS-250', weight: '250g', price: 99, mrp: 130, stock: 50, isActive: true },
        { id: 'v-7-2', sku: 'SSC-MS-500', weight: '500g', price: 179, mrp: 250, stock: 30, isActive: true },
      ],
      averageRating: 4.6,
      reviewCount: 19,
      createdAt: '2024-10-15T10:00:00Z',
    },
    {
      id: 'prod-8',
      productId: 'SSC-CC',
      name: 'Crunchy Chana Mix',
      slug: 'crunchy-chana-mix',
      description: 'A special blend of roasted chana with flattened rice, sev, and aromatic spices. This Gujarati-style mix is perfect for festive snacking and gifting. Limited edition!',
      tags: ['chana', 'mix', 'roasted', 'gujarati', 'festive', 'sev'],
      categoryId: 'cat-chana',
      categoryName: 'Chana',
      categorySlug: 'chana',
      images: [],
      badge: 'New',
      isDigital: false,
      relatedProducts: ['prod-4', 'prod-5'],
      isActive: true,
      variants: [
        { id: 'v-8-1', sku: 'SSC-CC-250', weight: '250g', price: 95, mrp: 130, stock: 70, isActive: true },
        { id: 'v-8-2', sku: 'SSC-CC-500', weight: '500g', price: 169, mrp: 250, stock: 45, isActive: true },
      ],
      averageRating: 4.5,
      reviewCount: 8,
      createdAt: '2024-11-01T10:00:00Z',
    },
  ];
}

function getMockCategories() {
  return [
    {
      id: 'cat-sing',
      name: 'Sing',
      slug: 'sing',
      description: 'Premium roasted peanuts — the perfect crunchy companion',
      image: undefined,
      productCount: 4,
    },
    {
      id: 'cat-chana',
      name: 'Chana',
      slug: 'chana',
      description: 'Wholesome roasted chickpeas — healthy and delicious',
      image: undefined,
      productCount: 4,
    },
  ];
}
