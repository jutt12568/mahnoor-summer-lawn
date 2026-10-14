export type SuitCategory = 'all' | 'unstitched' | 'pret' | 'festive' | 'daily';

export type StitchType = 'Unstitched' | 'Stitched';
export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface ProductFabricDetails {
  shirt: string;
  dupatta: string;
  trouser: string;
  technique: string;
  lawnCount: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  collection: string;
  category: SuitCategory;
  categoryLabel: string;
  pricePKR: number;
  originalPricePKR?: number;
  image: string;
  description: string;
  fabric: ProductFabricDetails;
  colorName: string;
  colorHex: string;
  stitchOptions: StitchType[];
  availableSizes: ClothingSize[];
  isNew?: boolean;
  isBestseller?: boolean;
  tag?: string;
  stockCount: number;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  image: string;
  pricePKR: number;
  stitchType: StitchType;
  size?: ClothingSize;
  quantity: number;
  sku: string;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  postalCode?: string;
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer';
  orderNotes?: string;
}

export interface PlacedOrder {
  orderId: string;
  trackingNumber: string;
  courier: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharges: number;
  total: number;
  customer: CheckoutFormData;
  date: string;
  estimatedDelivery: string;
}
