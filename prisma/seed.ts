import { db } from '../src/lib/db';

async function seed() {
  console.log('🌱 Seeding database...');

  // ═══════════════════════════════════════════════════════════════
  // CATEGORIES (5 categories)
  // ═══════════════════════════════════════════════════════════════

  const singCategory = await db.category.create({
    data: {
      name: 'Sing (Peanuts)',
      slug: 'sing',
      description: 'Premium roasted peanut snacks — crispy, crunchy, and flavoured to perfection',
      sortOrder: 1,
    },
  });

  const chanaCategory = await db.category.create({
    data: {
      name: 'Chana (Chickpeas)',
      slug: 'chana',
      description: 'Wholesome roasted chickpea snacks — protein-packed and deliciously spiced',
      sortOrder: 2,
    },
  });

  const mixCategory = await db.category.create({
    data: {
      name: 'Mix & Namkeen',
      slug: 'mix-namkeen',
      description: 'Classic Indian mix and namkeen combos — the perfect tea-time companion',
      sortOrder: 3,
    },
  });

  const seedsCategory = await db.category.create({
    data: {
      name: 'Roasted Seeds',
      slug: 'roasted-seeds',
      description: 'Nutrient-dense roasted seeds and superfood puffs for healthy snacking',
      sortOrder: 4,
    },
  });

  const specialtyCategory = await db.category.create({
    data: {
      name: 'Specialty',
      slug: 'specialty',
      description: 'Curated diet, protein, and organic blends for the health-conscious snacker',
      sortOrder: 5,
    },
  });

  // ═══════════════════════════════════════════════════════════════
  // PRODUCTS (28 products across 5 categories)
  // Badge distribution: 5 Best Seller, 5 New, 3 Sale, 3 Popular, 1 Limited, 11 null
  // Pricing: 250g = 500g/2, MRP ≈ 15-20% above selling price
  // ═══════════════════════════════════════════════════════════════

  const products = [
    // ──── SING (PEANUTS) — 8 products, range ₹60-160 ────

    {
      productId: 'SSC-KS',
      name: 'Khari Sing',
      slug: 'khari-sing',
      description: 'Crispy and lightly salted peanuts, roasted to perfection. A classic snack loved across Gujarat.',
      tags: 'salty,crunchy,khari,peanuts',
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
      productId: 'SSC-MS',
      name: 'Masala Sing',
      slug: 'masala-sing',
      description: 'Peanuts tossed in house-blend masala spices. Crispy, spicy, and highly addictive.',
      tags: 'spicy,masala,peanuts,crunchy',
      categoryId: singCategory.id,
      badge: 'Popular',
      variants: {
        create: [
          { sku: 'SSC-MS-500', weight: '500g', price: 130, mrp: 155, stock: 100 },
          { sku: 'SSC-MS-250', weight: '250g', price: 65, mrp: 75, stock: 150 },
        ],
      },
    },
    {
      productId: 'SSC-MRS',
      name: 'Mori Sing',
      slug: 'mori-sing',
      description: 'Tender peanuts with a smooth, mildly seasoned coating. Light on spice, rich in taste.',
      tags: 'mild,soft,mori,peanuts',
      categoryId: singCategory.id,
      badge: null,
      variants: {
        create: [
          { sku: 'SSC-MRS-500', weight: '500g', price: 120, mrp: 140, stock: 100 },
          { sku: 'SSC-MRS-250', weight: '250g', price: 60, mrp: 70, stock: 150 },
        ],
      },
    },
    {
      productId: 'SSC-KLS',
      name: 'Kala Sing',
      slug: 'kala-sing',
      description: 'Bold black pepper seasoned peanuts with an intense kick. For those who love it hot and earthy.',
      tags: 'spicy,black-pepper,kala,peanuts',
      categoryId: singCategory.id,
      badge: 'New',
      variants: {
        create: [
          { sku: 'SSC-KLS-500', weight: '500g', price: 140, mrp: 165, stock: 80 },
          { sku: 'SSC-KLS-250', weight: '250g', price: 70, mrp: 80, stock: 120 },
          { sku: 'SSC-KLS-1000', weight: '1kg', price: 260, mrp: 305, stock: 50 },
        ],
      },
    },
    {
      productId: 'SSC-HS',
      name: 'Haldi Sing',
      slug: 'haldi-sing',
      description: 'Golden turmeric-infused peanuts with warm, earthy flavours and anti-inflammatory goodness.',
      tags: 'turmeric,haldi,healthy,peanuts',
      categoryId: singCategory.id,
      badge: null,
      variants: {
        create: [
          { sku: 'SSC-HS-500', weight: '500g', price: 120, mrp: 140, stock: 90 },
          { sku: 'SSC-HS-250', weight: '250g', price: 60, mrp: 70, stock: 140 },
        ],
      },
    },
    {
      productId: 'SSC-LS',
      name: 'Lasan Sing',
      slug: 'lasan-sing',
      description: 'Garlic-flavoured roasted peanuts with a bold, aromatic punch. A garlic lover\'s dream snack.',
      tags: 'garlic,lasan,flavoured,peanuts',
      categoryId: singCategory.id,
      badge: null,
      variants: {
        create: [
          { sku: 'SSC-LS-500', weight: '500g', price: 130, mrp: 150, stock: 100 },
          { sku: 'SSC-LS-250', weight: '250g', price: 65, mrp: 75, stock: 150 },
          { sku: 'SSC-LS-1000', weight: '1kg', price: 240, mrp: 280, stock: 50 },
        ],
      },
    },
    {
      productId: 'SSC-PPS',
      name: 'Peri Peri Sing',
      slug: 'peri-peri-sing',
      description: 'Fiery peri peri seasoned peanuts with a tangy, spicy twist. Dare to snack differently!',
      tags: 'peri-peri,spicy,tangy,peanuts',
      categoryId: singCategory.id,
      badge: 'New',
      variants: {
        create: [
          { sku: 'SSC-PPS-500', weight: '500g', price: 150, mrp: 175, stock: 70 },
          { sku: 'SSC-PPS-250', weight: '250g', price: 75, mrp: 90, stock: 110 },
        ],
      },
    },
    {
      productId: 'SSC-CCS',
      name: 'Chocolate Coated Sing',
      slug: 'chocolate-coated-sing',
      description: 'Premium peanuts enrobed in rich, velvety chocolate. The ultimate sweet-meets-savoury indulgence.',
      tags: 'chocolate,sweet,premium,peanuts',
      categoryId: singCategory.id,
      badge: 'Best Seller',
      variants: {
        create: [
          { sku: 'SSC-CCS-500', weight: '500g', price: 160, mrp: 190, stock: 60 },
          { sku: 'SSC-CCS-250', weight: '250g', price: 80, mrp: 95, stock: 100 },
        ],
      },
    },

    // ──── CHANA (CHICKPEAS) — 6 products, range ₹50-140 ────

    {
      productId: 'SSC-KC',
      name: 'Khara Chana',
      slug: 'khara-chana',
      description: 'Salted whole chickpeas roasted for a crunchy, wholesome snack experience.',
      tags: 'salty,crunchy,khara,chickpeas',
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
      tags: 'spicy,masala,tangy,chickpeas',
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
      productId: 'SSC-MRC',
      name: 'Mora Chana',
      slug: 'mora-chana',
      description: 'Soft-textured chickpeas with a delicate seasoning. Great for snacking any time of day.',
      tags: 'mild,soft,mora,chickpeas',
      categoryId: chanaCategory.id,
      badge: null,
      variants: {
        create: [
          { sku: 'SSC-MRC-500', weight: '500g', price: 100, mrp: 115, stock: 100 },
          { sku: 'SSC-MRC-250', weight: '250g', price: 50, mrp: 58, stock: 150 },
        ],
      },
    },
    {
      productId: 'SSC-LC',
      name: 'Lasan Chana',
      slug: 'lasan-chana',
      description: 'Garlic-infused roasted chickpeas with a robust, savoury flavour that keeps you coming back.',
      tags: 'garlic,lasan,savoury,chickpeas',
      categoryId: chanaCategory.id,
      badge: 'Sale',
      variants: {
        create: [
          { sku: 'SSC-LC-500', weight: '500g', price: 130, mrp: 155, stock: 80 },
          { sku: 'SSC-LC-250', weight: '250g', price: 65, mrp: 75, stock: 120 },
        ],
      },
    },
    {
      productId: 'SSC-HC',
      name: 'Haldi Chana',
      slug: 'haldi-chana',
      description: 'Turmeric-spiced chickpeas offering golden warmth and wholesome goodness in every bite.',
      tags: 'turmeric,haldi,healthy,chickpeas',
      categoryId: chanaCategory.id,
      badge: null,
      variants: {
        create: [
          { sku: 'SSC-HC-500', weight: '500g', price: 110, mrp: 130, stock: 90 },
          { sku: 'SSC-HC-250', weight: '250g', price: 55, mrp: 65, stock: 140 },
        ],
      },
    },
    {
      productId: 'SSC-PC',
      name: 'Pudina Chana',
      slug: 'pudina-chana',
      description: 'Refreshing mint-flavoured chickpeas with a cool, zesty twist. Uniquely refreshing!',
      tags: 'mint,pudina,refreshing,chickpeas',
      categoryId: chanaCategory.id,
      badge: 'Popular',
      variants: {
        create: [
          { sku: 'SSC-PC-500', weight: '500g', price: 125, mrp: 145, stock: 80 },
          { sku: 'SSC-PC-250', weight: '250g', price: 62, mrp: 72, stock: 130 },
          { sku: 'SSC-PC-1000', weight: '1kg', price: 230, mrp: 265, stock: 40 },
        ],
      },
    },

    // ──── MIX & NAMKEEN — 6 products, range ₹70-180 ────

    {
      productId: 'SSC-CSM',
      name: 'Chana Sing Mix',
      slug: 'chana-sing-mix',
      description: 'The best of both worlds — crunchy peanuts and roasted chickpeas in one irresistible mix.',
      tags: 'mix,peanuts,chickpea,crunchy',
      categoryId: mixCategory.id,
      badge: 'Best Seller',
      variants: {
        create: [
          { sku: 'SSC-CSM-500', weight: '500g', price: 130, mrp: 155, stock: 100 },
          { sku: 'SSC-CSM-250', weight: '250g', price: 65, mrp: 75, stock: 150 },
        ],
      },
    },
    {
      productId: 'SSC-BM',
      name: 'Bombay Mix',
      slug: 'bombay-mix',
      description: 'A vibrant Mumbai-style mixture with sev, peanuts, chivda, and spicy surprises in every handful.',
      tags: 'bombay,spicy,mixture,sev',
      categoryId: mixCategory.id,
      badge: null,
      variants: {
        create: [
          { sku: 'SSC-BM-500', weight: '500g', price: 150, mrp: 175, stock: 80 },
          { sku: 'SSC-BM-250', weight: '250g', price: 75, mrp: 90, stock: 120 },
          { sku: 'SSC-BM-1000', weight: '1kg', price: 280, mrp: 320, stock: 40 },
        ],
      },
    },
    {
      productId: 'SSC-GM',
      name: 'Gujarati Mix',
      slug: 'gujarati-mix',
      description: 'Sweet, salty, and spicy — authentic Gujarati farsan mix capturing the spirit of Gujarat.',
      tags: 'gujarati,sweet,spicy,farsan',
      categoryId: mixCategory.id,
      badge: null,
      variants: {
        create: [
          { sku: 'SSC-GM-500', weight: '500g', price: 140, mrp: 165, stock: 90 },
          { sku: 'SSC-GM-250', weight: '250g', price: 70, mrp: 80, stock: 130 },
        ],
      },
    },
    {
      productId: 'SSC-NM',
      name: 'Navratna Mix',
      slug: 'navratna-mix',
      description: 'A regal nine-ingredient mix of premium nuts, lentils, and spices. Fit for royalty!',
      tags: 'navratna,premium,nuts,lentils',
      categoryId: mixCategory.id,
      badge: 'New',
      variants: {
        create: [
          { sku: 'SSC-NM-500', weight: '500g', price: 160, mrp: 190, stock: 70 },
          { sku: 'SSC-NM-250', weight: '250g', price: 80, mrp: 95, stock: 110 },
        ],
      },
    },
    {
      productId: 'SSC-CVD',
      name: 'Chevdo',
      slug: 'chevdo',
      description: 'Thin, crispy flattened rice snack with peanuts, raisins, and aromatic spices. A Gujarati staple.',
      tags: 'chevdo,flattened-rice,crispy,gujarati',
      categoryId: mixCategory.id,
      badge: 'Sale',
      variants: {
        create: [
          { sku: 'SSC-CVD-500', weight: '500g', price: 120, mrp: 140, stock: 100 },
          { sku: 'SSC-CVD-250', weight: '250g', price: 60, mrp: 70, stock: 150 },
        ],
      },
    },
    {
      productId: 'SSC-GTH',
      name: 'Gathia',
      slug: 'gathia',
      description: 'Crispy, deep-fried besan strands seasoned lightly. Perfect with tea or as a standalone crunch.',
      tags: 'gathia,besan,crispy,tea-time',
      categoryId: mixCategory.id,
      badge: null,
      variants: {
        create: [
          { sku: 'SSC-GTH-500', weight: '500g', price: 100, mrp: 115, stock: 100 },
          { sku: 'SSC-GTH-250', weight: '250g', price: 50, mrp: 58, stock: 150 },
        ],
      },
    },

    // ──── ROASTED SEEDS — 4 products, range ₹80-200 ────

    {
      productId: 'SSC-RFS',
      name: 'Roasted Flax Seeds',
      slug: 'roasted-flax-seeds',
      description: 'Omega-3 rich roasted flax seeds with a nutty flavour. A superfood boost to your daily routine.',
      tags: 'flax,omega-3,superfood,healthy',
      categoryId: seedsCategory.id,
      badge: 'New',
      variants: {
        create: [
          { sku: 'SSC-RFS-500', weight: '500g', price: 160, mrp: 190, stock: 70 },
          { sku: 'SSC-RFS-250', weight: '250g', price: 80, mrp: 95, stock: 110 },
        ],
      },
    },
    {
      productId: 'SSC-RSS',
      name: 'Roasted Sunflower Seeds',
      slug: 'roasted-sunflower-seeds',
      description: 'Lightly salted sunflower seeds roasted for a satisfying, nutrient-packed crunch.',
      tags: 'sunflower,vitamin-e,crunchy,healthy',
      categoryId: seedsCategory.id,
      badge: null,
      variants: {
        create: [
          { sku: 'SSC-RSS-500', weight: '500g', price: 140, mrp: 165, stock: 80 },
          { sku: 'SSC-RSS-250', weight: '250g', price: 70, mrp: 80, stock: 120 },
        ],
      },
    },
    {
      productId: 'SSC-RPS',
      name: 'Roasted Pumpkin Seeds',
      slug: 'roasted-pumpkin-seeds',
      description: 'Premium pumpkin seeds roasted and seasoned — rich in zinc, magnesium, and crunch!',
      tags: 'pumpkin,zinc,magnesium,premium',
      categoryId: seedsCategory.id,
      badge: 'Best Seller',
      variants: {
        create: [
          { sku: 'SSC-RPS-500', weight: '500g', price: 180, mrp: 210, stock: 60 },
          { sku: 'SSC-RPS-250', weight: '250g', price: 90, mrp: 105, stock: 100 },
          { sku: 'SSC-RPS-1000', weight: '1kg', price: 340, mrp: 395, stock: 30 },
        ],
      },
    },
    {
      productId: 'SSC-QP',
      name: 'Quinoa Puffs',
      slug: 'quinoa-puffs',
      description: 'Light, airy quinoa puffs with a subtle savoury seasoning. Gluten-free guilt-free snacking.',
      tags: 'quinoa,gluten-free,puffs,healthy',
      categoryId: seedsCategory.id,
      badge: null,
      variants: {
        create: [
          { sku: 'SSC-QP-500', weight: '500g', price: 200, mrp: 235, stock: 50 },
          { sku: 'SSC-QP-250', weight: '250g', price: 100, mrp: 120, stock: 80 },
        ],
      },
    },

    // ──── SPECIALTY — 4 products, range ₹100-250 ────

    {
      productId: 'SSC-DRM',
      name: 'Diet Roasted Mix',
      slug: 'diet-roasted-mix',
      description: 'Low-calorie blend of roasted peanuts, chickpeas, and seeds. Snack smart without compromise.',
      tags: 'diet,low-calorie,roasted,healthy',
      categoryId: specialtyCategory.id,
      badge: 'Sale',
      variants: {
        create: [
          { sku: 'SSC-DRM-500', weight: '500g', price: 180, mrp: 210, stock: 60 },
          { sku: 'SSC-DRM-250', weight: '250g', price: 90, mrp: 105, stock: 100 },
          { sku: 'SSC-DRM-1000', weight: '1kg', price: 340, mrp: 395, stock: 30 },
        ],
      },
    },
    {
      productId: 'SSC-PM',
      name: 'Protein Mix',
      slug: 'protein-mix',
      description: 'High-protein blend of roasted chana, peanuts, and seeds. Power up your day, the tasty way.',
      tags: 'protein,high-protein,energy,blend',
      categoryId: specialtyCategory.id,
      badge: 'Popular',
      variants: {
        create: [
          { sku: 'SSC-PM-500', weight: '500g', price: 220, mrp: 255, stock: 50 },
          { sku: 'SSC-PM-250', weight: '250g', price: 110, mrp: 130, stock: 80 },
          { sku: 'SSC-PM-1000', weight: '1kg', price: 410, mrp: 475, stock: 25 },
        ],
      },
    },
    {
      productId: 'SSC-SFS',
      name: 'Sugar Free Sing',
      slug: 'sugar-free-sing',
      description: 'Zero-sugar roasted peanuts with natural seasoning. Diabetic-friendly snacking at its finest.',
      tags: 'sugar-free,diabetic,natural,peanuts',
      categoryId: specialtyCategory.id,
      badge: null,
      variants: {
        create: [
          { sku: 'SSC-SFS-500', weight: '500g', price: 150, mrp: 180, stock: 70 },
          { sku: 'SSC-SFS-250', weight: '250g', price: 75, mrp: 90, stock: 110 },
        ],
      },
    },
    {
      productId: 'SSC-OC',
      name: 'Organic Chana',
      slug: 'organic-chana',
      description: '100% certified organic roasted chickpeas — pure, unadulterated, and sustainably sourced.',
      tags: 'organic,certified,sustainable,chickpeas',
      categoryId: specialtyCategory.id,
      badge: 'Limited',
      variants: {
        create: [
          { sku: 'SSC-OC-500', weight: '500g', price: 250, mrp: 290, stock: 40 },
          { sku: 'SSC-OC-250', weight: '250g', price: 125, mrp: 145, stock: 60 },
          { sku: 'SSC-OC-1000', weight: '1kg', price: 470, mrp: 545, stock: 20 },
        ],
      },
    },
  ];

  for (const product of products) {
    await db.product.create({ data: product });
  }

  console.log(`✅ Created ${products.length} products`);

  // ═══════════════════════════════════════════════════════════════
  // USERS (admin + demo customer)
  // ═══════════════════════════════════════════════════════════════

  await db.user.create({
    data: {
      email: 'admin@satnamsinghchana.com',
      name: 'Admin',
      role: 'super_admin',
      password: '$2a$10$dummyhashedpasswordforadmin',
    },
  });

  await db.user.create({
    data: {
      email: 'customer@example.com',
      name: 'Rahul Sharma',
      phone: '+919876543210',
      role: 'customer',
      password: '$2a$10$dummyhashedpasswordforuser',
    },
  });

  // ═══════════════════════════════════════════════════════════════
  // PROMO CODES (3 codes)
  // ═══════════════════════════════════════════════════════════════

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

  // ═══════════════════════════════════════════════════════════════
  // BANNERS (3 banners)
  // ═══════════════════════════════════════════════════════════════

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

  // ═══════════════════════════════════════════════════════════════
  // HOMEPAGE SECTIONS (5 sections)
  // ═══════════════════════════════════════════════════════════════

  await db.homepageSection.createMany({
    data: [
      { type: 'featured_categories', heading: 'Shop by Category', source: 'manual', sortOrder: 1, isActive: true },
      { type: 'best_sellers', heading: 'Best Sellers', source: 'rule_based', ruleConfig: '{"sortBy":"orders","limit":4}', sortOrder: 2, isActive: true },
      { type: 'new_arrivals', heading: 'New Arrivals', source: 'rule_based', ruleConfig: '{"sortBy":"createdAt","limit":4}', sortOrder: 3, isActive: true },
      { type: 'flash_sale', heading: 'Flash Sale', source: 'manual', sortOrder: 4, isActive: false },
      { type: 'testimonials', heading: 'What Our Customers Say', source: 'manual', sortOrder: 5, isActive: true },
    ],
  });

  // ═══════════════════════════════════════════════════════════════
  // STORE SETTINGS (44 settings)
  // ═══════════════════════════════════════════════════════════════

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

  // ═══════════════════════════════════════════════════════════════
  // NOTIFICATION TEMPLATES (9 templates)
  // ═══════════════════════════════════════════════════════════════

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
  console.log('   📦 5 categories, 28 products, 2 users, 3 promo codes');
  console.log('   🎯 3 banners, 5 homepage sections, 44 store settings, 9 notification templates');
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
