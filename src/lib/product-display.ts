// Shared product display utilities — emojis & gradients for all 28 products across 5 categories

export const categoryEmojis: Record<string, string> = {
  sing: '🥜',
  chana: '🌰',
  'mix-namkeen': '🍿',
  'roasted-seeds': '🌻',
  specialty: '⭐',
};

export const productEmojis: Record<string, string> = {
  'khari-sing': '🥜',
  'masala-sing': '🌶️',
  'mori-sing': '🥜',
  'kala-sing': '⚫',
  'haldi-sing': '💛',
  'lasan-sing': '🧄',
  'peri-peri-sing': '🌶️',
  'chocolate-coated-sing': '🍫',
  'khara-chana': '🌰',
  'masala-chana': '🌶️',
  'mora-chana': '🌰',
  'lasan-chana': '🧄',
  'haldi-chana': '💛',
  'pudina-chana': '🌿',
  'chana-sing-mix': '🍿',
  'bombay-mix': '🍿',
  'gujarati-mix': '🍿',
  'navratna-mix': '🎪',
  'chevdo': '🍿',
  'gathia': '🥨',
  'roasted-flax-seeds': '🌻',
  'roasted-sunflower-seeds': '🌻',
  'roasted-pumpkin-seeds': '🌻',
  'quinoa-puffs': '🌾',
  'diet-roasted-mix': '💪',
  'protein-mix': '💪',
  'sugar-free-sing': '🥜',
  'organic-chana': '🌿',
};

export const categoryGradients: Record<string, string> = {
  sing: 'from-emerald-50 via-green-50 to-emerald-100',
  chana: 'from-amber-50 via-yellow-50 to-amber-100',
  'mix-namkeen': 'from-orange-50 via-red-50 to-orange-100',
  'roasted-seeds': 'from-lime-50 via-green-50 to-lime-100',
  specialty: 'from-teal-50 via-cyan-50 to-teal-100',
};

export const categoryCardGradients: Record<string, string> = {
  sing: 'from-emerald-500 to-emerald-700',
  chana: 'from-amber-500 to-amber-700',
  'mix-namkeen': 'from-orange-500 to-red-600',
  'roasted-seeds': 'from-lime-500 to-green-600',
  specialty: 'from-teal-500 to-cyan-600',
};

export const categoryNames: Record<string, string> = {
  sing: 'Sing',
  chana: 'Chana',
  'mix-namkeen': 'Mix & Namkeen',
  'roasted-seeds': 'Roasted Seeds',
  specialty: 'Specialty',
};

export const categorySubtitles: Record<string, string> = {
  sing: 'Roasted Peanuts',
  chana: 'Roasted Chickpeas',
  'mix-namkeen': 'Snack Mixes',
  'roasted-seeds': 'Healthy Seeds',
  specialty: 'Premium Blends',
};

export const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-green-600 text-white',
  'New': 'bg-blue-600 text-white',
  'Sale': 'bg-red-500 text-white',
  'Popular': 'bg-emerald-600 text-white',
  'Limited': 'bg-purple-600 text-white',
};

export const allCategories = [
  { slug: 'sing', name: 'Sing', subtitle: 'Roasted Peanuts', emoji: '🥜', gradient: 'from-emerald-500 to-emerald-700' },
  { slug: 'chana', name: 'Chana', subtitle: 'Roasted Chickpeas', emoji: '🌰', gradient: 'from-amber-500 to-amber-700' },
  { slug: 'mix-namkeen', name: 'Mix & Namkeen', subtitle: 'Snack Mixes', emoji: '🍿', gradient: 'from-orange-500 to-red-600' },
  { slug: 'roasted-seeds', name: 'Roasted Seeds', subtitle: 'Healthy Seeds', emoji: '🌻', gradient: 'from-lime-500 to-green-600' },
  { slug: 'specialty', name: 'Specialty', subtitle: 'Premium Blends', emoji: '⭐', gradient: 'from-teal-500 to-cyan-600' },
];

export function getProductEmoji(slug: string, categorySlug?: string): string {
  return productEmojis[slug] || (categorySlug ? categoryEmojis[categorySlug] : '🥜');
}

export function getCategoryGradient(slug: string): string {
  return categoryGradients[slug] || 'from-emerald-50 via-green-50 to-emerald-100';
}
