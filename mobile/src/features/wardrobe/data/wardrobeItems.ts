import type { ImageSourcePropType } from 'react-native';

export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  price: string;
  image: ImageSourcePropType;
}

export const wardrobeItems: WardrobeItem[] = [
  { id: 'blazer', name: 'Black Blazer', category: 'Tops', price: '£4.21', image: require('../../../assets/item-blazer.jpg') },
  { id: 'trousers', name: 'Wide-Leg Trousers', category: 'Bottoms', price: '£11.25', image: require('../../../assets/item-trousers.jpg') },
  { id: 'shirt', name: 'White Shirt', category: 'Tops', price: '£1.82', image: require('../../../assets/item-shirt.jpg') },
  { id: 'jacket', name: 'Leather Jacket', category: 'Outerwear', price: '£36.67', image: require('../../../assets/item-boots.jpg') },
  { id: 'dress', name: 'Navy Dress', category: 'Dresses', price: '£43.33', image: require('../../../assets/look-stark.jpg') },
  { id: 'cargo', name: 'Cargo Pants', category: 'Bottoms', price: '£7.27', image: require('../../../assets/look-weekend.jpg') },
  { id: 'boots', name: 'Chelsea Boots', category: 'Shoes', price: '£13.89', image: require('../../../assets/item-boots.jpg') },
  { id: 'bag', name: 'Mini Bag', category: 'Bags', price: '£22.22', image: require('../../../assets/item-trousers.jpg') },
  { id: 'tee', name: 'Ribbed Tee', category: 'Tops', price: '£2.67', image: require('../../../assets/item-shirt.jpg') },
];

export const wardrobeCategories = ['ALL', 'TOPS', 'BOTTOMS', 'DRESSES', 'OUTERWEAR'];
