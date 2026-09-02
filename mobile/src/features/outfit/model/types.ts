import type { ImageSourcePropType } from 'react-native';

export interface OutfitItem {
  id: string;
  name: string;
  meta: string;
  image: ImageSourcePropType;
}

export interface RelatedLook {
  id: string;
  name: string;
  image: ImageSourcePropType;
  accent: string;
}

export interface Outfit {
  id: string;
  name: string;
  occasion: string;
  matchLabel: string;
  hero: ImageSourcePropType;
  /** The app's own static reasoning, shown before a try-on is generated. */
  reasoning: string;
  items: OutfitItem[];
  relatedLooks: RelatedLook[];
}
