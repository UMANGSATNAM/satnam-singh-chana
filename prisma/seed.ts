import { db } from '../src/lib/db';

async function seed() {
  console.log('🌱 Seeding database...');

  // Create categories
  const singCategory = await db.category.create({
    data: {
      name: 'Sing',
      slug: 'sing',
      description: 'Premium peanut-based snacks from Satnam Singh Chana',
      sortOrder: 1,
    },
  });

  const chanaCategory = await db.category.create({
    data: {
      name: 'Chana',
      slug: 'chana',
      description: 'Wholesome chickpea-based snacks from Satnam Singh Chana',
      sortOrder: 2,
    },
  });

  // Create products
  const products = [
    {
      productId: 'SSC-KS',
      name: 'Khari Sing',
      slug: 'khari-sing',
      description: 'Crispy and lightly salted peanuts, roasted to perfection. A classic snack loved across Gujarat.',
      tags: 'salty,crunchy,khari',
      categoryId: singCategory.id,
      badge: 'Best Seller',
      variants: {
        create: [
          { sku: 'SSC-KS-500', weight: '500g', price: 120, mrp: 140, stock: 100 },
          { sku: 'SSC-KS-250', weight: '250g', price: 60, mrp: 70, stock: 150 },
        ],
      },
    },
    {
      productId: 'SSC-KC',
      name: 'Khara Chana',
      slug: 'khara-chana',
      description: 'Salted whole chickpeas roasted for a crunchy, wholesome snack experience.',
      tags: 'salty,crunchy,khara',
      categoryId: chanaCategory.id,
      badge: 'Best Seller',
      variants: {
        create: [
          { sku: 'SSC-KC-500', weight: '500g', price: 100, mrp: 120, stock: 100 },
          { sku: 'SSC-KC-250', weight: '250g', price: 50, mrp: 60, stock: 150 },
        ],
      },
    },
    {
      productId: 'SSC-MC',
      name: 'Masala Chana',
      slug: 'masala-chana',
      description: 'Spiced chickpeas coated with a tangy masala mix. Bold flavour, satisfying crunch.',
      tags: 'spicy,masala,tangy',
      categoryId: chanaCategory.id,
      badge: 'New',
      variants: {
        create: [
          { sku: 'SSC-MC-500', weight: '500g', price: 120, mrp: 140, stock: 100 },
          { sku: 'SSC-MC-250', weight: '250g', price: 60, mrp: 70, stock: 150 },
        ],
      },
    },
    {
      productId: 'SSC-MS',
      name: 'Masala Sing',
      slug: 'masala-sing',
      description: 'Peanuts tossed in house-blend masala spices. Crispy, spicy, and highly addictive.',
      tags: 'spicy,masala,peanuts',
      categoryId: singCategory.id,
      badge: 'Sale',
      variants: {
        create: [
          { sku: 'SSC-MS-500', weight: '500g', price: 130, mrp: 150, stock: 100 },
          { sku: 'SSC-MS-250', weight: '250g', price: 70, mrp: 80, stock: 150 },
        ],
      },
    },
    {
      productId: 'SSC-MRS',
      name: 'Mori Sing',
      slug: 'mori-sing',
      description: 'Tender peanuts with a smooth, mildly seasoned coating. Light on spice, rich in taste.',
      tags: 'mild,soft,mori',
      categoryId: singCategory.id,
      variants: {
        create: [
          { sku: 'SSC-MRS-500', weight: '500g', price: 120, mrp: 140, stock: 100 },
          { sku: 'SSC-MRS-250', weight: '250g', price: 60, mrp: 70, stock: 150 },
        ],
      },
    },
    {
      productId: 'SSC-MRC',
      name: 'Mora Chana',
      slug: 'mora-chana',
      description: 'Soft-textured chickpeas with a delicate seasoning. Great for snacking any time of day.',
      tags: 'mild,soft,mora',
      categoryId: chanaCategory.id,
      variants: {
        create: [
          { sku: 'SSC-MRC-500', weight: '500g', price: 100, mrp: 120, stock: 100 },
          { sku: 'SSC-MRC-250', weight: '250g', price: 50, mrp: 60, stock: 150 },
        ],
      },
    },
  ];

  for (const product of products) {
    await db.product.create({ data: product });
  }

  // Create admin user
  await db.user.create({
    data: {
      email: 'admin@satnamsinghchana.com',
      name: 'Admin',
      role: 'super_admin',
      password: '$2a$10$dummyhashedpasswordforadmin',
    },
  });

  // Create a demo customer
  await db.user.create({
    data: {
      email: 'customer@example.com',
      name: 'Rahul Sharma',
      phone: '+919876543210',
      role: 'customer',
      password: '$2a$10$dummyhashedpasswordforuser',
    },
  });

  // Create promo codes
  await db.promoCode.create({
    data: {
      code: 'FIRST50',
      type: 'flat',
      value: 50,
      minOrderValue: 200,
      usageLimit: 1000,
      perUserLimit: 1,
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2025-12-31'),
      firstTimeOnly: true,
      showOnCheckout: true,
      isActive: true,
    },
  });

  await db.promoCode.create({
    data: {
      code: 'SAVE20',
      type: 'percentage',
      value: 20,
      minOrderValue: 300,
      maxDiscount: 100,
      usageLimit: 5000,
      perUserLimit: 3,
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2025-12-31'),
      showOnCheckout: true,
      isActive: true,
    },
  });

  await db.promoCode.create({
    data: {
      code: 'FLAT100',
      type: 'flat',
      value: 100,
      minOrderValue: 500,
      usageLimit: 2000,
      perUserLimit: 2,
      validFrom: new Date('2024-01-01'),
      validUntil: new Date('2025-12-31'),
      isActive: true,
    },
  });

  // Create banners
  await db.banner.create({
    data: {
      type: 'hero',
      title: 'Premium Roasted Snacks',
      subtitle: 'Handcrafted with love, roasted to perfection — Sing & Chana for every mood!',
      ctaLabel: 'Shop Now',
      ctaLink: '#products',
      sortOrder: 1,
      isActive: true,
    },
  });

  await db.banner.create({
    data: {
      type: 'hero',
      title: 'Masala Range — Now Available!',
      subtitle: 'Bold spices, satisfying crunch. Try our Masala Sing & Masala Chana today.',
      ctaLabel: 'Explore Masala',
      ctaLink: '#products',
      sortOrder: 2,
      isActive: true,
    },
  });

  await db.banner.create({
    data: {
      type: 'promo',
      title: 'Flat ₹50 Off on Your First Order!',
      subtitle: 'Use code FIRST50 at checkout',
      ctaLabel: 'Shop Now',
      ctaLink: '#products',
      sortOrder: 1,
      isActive: true,
    },
  });

  // Create homepage sections
  await db.homepageSection.createMany({
    data: [
      { type: 'featured_categories', heading: 'Shop by Category', source: 'manual', sortOrder: 1, isActive: true },
      { type: 'best_sellers', heading: 'Best Sellers', source: 'rule_based', ruleConfig: '{"sortBy":"orders","limit":4}', sortOrder: 2, isActive: true },
      { type: 'new_arrivals', heading: 'New Arrivals', source: 'rule_based', ruleConfig: '{"sortBy":"createdAt","limit":4}', sortOrder: 3, isActive: true },
      { type: 'flash_sale', heading: 'Flash Sale', source: 'manual', sortOrder: 4, isActive: false },
      { type: 'testimonials', heading: 'What Our Customers Say', source: 'manual', sortOrder: 5, isActive: true },
    ],
  });

  // Store settings
  const settings = [
    { key: 'store_name', value: '"Satnam Singh Chana"' },
    { key: 'store_tagline', value: '"Premium Roasted Snacks"' },
    { key: 'store_email', value: '"hello@satnamsinghchana.com"' },
    { key: 'store_phone', value: '"+91 98765 43210"' },
    { key: 'store_whatsapp', value: '"+91 98765 43210"' },
    { key: 'store_address', value: '"Ahmedabad, Gujarat, India"' },
    { key: 'store_gstin', value: '"24XXXXX1234X1ZX"' },
    { key: 'store_pan', value: '"XXXXX1234X"' },
    { key: 'invoice_prefix', value: '"SSC-2024-"' },
    { key: 'currency', value: '"INR"' },
    { key: 'timezone', value: '"Asia/Kolkata"' },
    { key: 'language', value: '"en"' },
    { key: 'maintenance_mode', value: 'false' },
    { key: 'free_shipping_above', value: '500' },
    { key: 'flat_shipping_rate', value: '49' },
    { key: 'cod_enabled', value: 'true' },
    { key: 'cod_handling_fee', value: '0' },
    { key: 'cod_min_order', value: '0' },
    { key: 'cod_max_order', value: '5000' },
    { key: 'razorpay_enabled', value: 'false' },
    { key: 'razorpay_key_id', value: '""' },
    { key: 'razorpay_key_secret', value: '""' },
    { key: 'razorpay_test_mode', value: 'true' },
    { key: 'payu_enabled', value: 'false' },
    { key: 'stripe_enabled', value: 'false' },
    { key: 'return_window_days', value: '7' },
    { key: 'return_reasons', value: '["Wrong item received","Product damaged","Quality not as expected","Changed my mind","Other"]' },
    { key: 'refund_methods', value: '["original","store_credit","bank_transfer"]' },
    { key: 'smtp_host', value: '""' },
    { key: 'smtp_port', value: '587' },
    { key: 'smtp_user', value: '""' },
    { key: 'smtp_password', value: '""' },
    { key: 'smtp_from_name', value: '"Satnam Singh Chana"' },
    { key: 'smtp_from_email', value: '"hello@satnamsinghchana.com"' },
    { key: 'sms_provider', value: '""' },
    { key: 'sms_api_key', value: '""' },
    { key: 'whatsapp_provider', value: '""' },
    { key: 'whatsapp_api_key', value: '""' },
    { key: 'whatsapp_phone_id', value: '""' },
    { key: 'ga4_tracking_id', value: '""' },
    { key: 'fb_pixel_id', value: '""' },
    { key: 'gtm_id', value: '""' },
    { key: 'social_facebook', value: '""' },
    { key: 'social_instagram', value: '""' },
    { key: 'social_twitter', value: '""' },
    { key: 'social_youtube', value: '""' },
  ];

  for (const setting of settings) {
    await db.storeSetting.create({ data: setting });
  }

  // Create notification templates
  const templates = [
    { type: 'email', event: 'order_confirmed', subject: 'Order Confirmed - #{{order_id}}', template: 'Hi {{customer_name}}, your order #{{order_id}} has been confirmed! Total: ₹{{total}}. We\'ll notify you when it ships.', variables: '["order_id","customer_name","total","product_list"]' },
    { type: 'email', event: 'shipped', subject: 'Your Order is on the Way! - #{{order_id}}', template: 'Hi {{customer_name}}, your order #{{order_id}} has been shipped! Track: {{tracking_link}}', variables: '["order_id","customer_name","tracking_link"]' },
    { type: 'email', event: 'delivered', subject: 'Order Delivered! - #{{order_id}}', template: 'Hi {{customer_name}}, your order #{{order_id}} has been delivered! Rate your experience: {{review_link}}', variables: '["order_id","customer_name","review_link"]' },
    { type: 'sms', event: 'order_confirmed', template: 'Hi {{name}}, order #{{order_id}} confirmed! Total: ₹{{amount}}. Track: {{link}}', variables: '["name","order_id","amount","link"]' },
    { type: 'sms', event: 'shipped', template: 'Order #{{order_id}} shipped! Track: {{tracking_link}}', variables: '["order_id","tracking_link"]' },
    { type: 'whatsapp', event: 'order_confirmed', template: 'Hi {{name}}, your order #{{order_id}} has been placed! Total: ₹{{amount}}. Track: {{link}}', variables: '["name","order_id","amount","link"]' },
    { type: 'whatsapp', event: 'shipped', template: 'Your order #{{order_id}} is on the way! Tracking: {{tracking_link}}', variables: '["order_id","tracking_link"]' },
    { type: 'whatsapp', event: 'delivered', template: 'Order #{{order_id}} delivered! Rate your experience: {{review_link}}', variables: '["order_id","review_link"]' },
    { type: 'whatsapp', event: 'abandoned_cart', template: 'You left items in your cart! Complete your purchase: {{cart_link}}', variables: '["cart_link"]' },
  ];

  for (const tpl of templates) {
    await db.notificationTemplate.create({ data: tpl });
  }

  console.log('✅ Database seeded successfully!');
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
