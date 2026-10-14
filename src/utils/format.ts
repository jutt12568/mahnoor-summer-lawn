export const formatPKR = (amount: number): string => {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
};

export const FREE_DELIVERY_THRESHOLD = 3999;
export const STANDARD_DELIVERY_FEE = 250;

export const calculateShipping = (subtotal: number): number => {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
};
