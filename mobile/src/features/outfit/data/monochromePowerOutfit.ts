import type { Outfit } from '../model/types';

/**
 * Static content for the "Monochrome Power" outfit, matching the Figma
 * OutfitDetailScreen. Images are bundled from the Figma export
 * (`src/assets/*`).
 */
export const monochromePowerOutfit: Outfit = {
  id: 'monochrome-power',
  name: 'Monochrome Power',
  occasion: 'OFFICE',
  matchLabel: 'AIRA 97%',
  hero: require('../../../assets/hero.jpg'),
  reasoning:
    'This monochrome palette creates a clean power silhouette. The oversized blazer balances structured trousers. Confidence very high for your Office occasions.',
  items: [
    {
      id: 'blazer',
      name: 'Oversized Blazer',
      meta: 'Your Wardrobe · Match 96%',
      image: require('../../../assets/item-blazer.jpg'),
    },
    {
      id: 'trousers',
      name: 'Tailored Trousers',
      meta: 'Your Wardrobe · Match 96%',
      image: require('../../../assets/item-trousers.jpg'),
    },
    {
      id: 'shirt',
      name: 'White Shirt',
      meta: 'Your Wardrobe · Match 96%',
      image: require('../../../assets/item-shirt.jpg'),
    },
    {
      id: 'boots',
      name: 'Chelsea Boots',
      meta: 'Your Wardrobe · Match 96%',
      image: require('../../../assets/item-boots.jpg'),
    },
  ],
  relatedLooks: [
    {
      id: 'monochrome-power',
      name: 'MONOCHROME POWER',
      image: require('../../../assets/hero.jpg'),
      accent: '#D4FF1E',
    },
    {
      id: 'stark-contrast',
      name: 'STARK CONTRAST',
      image: require('../../../assets/look-stark.jpg'),
      accent: '#FF8C5A',
    },
    {
      id: 'weekend-utility',
      name: 'WEEKEND UTILITY',
      image: require('../../../assets/look-weekend.jpg'),
      accent: '#7FBBFF',
    },
  ],
};

/** Human-readable outfit description sent to the backend as `outfitName`. */
export const describeOutfit = (outfit: Outfit): string =>
  `${outfit.name} — ${outfit.items.map(item => item.name).join(', ')}`;
