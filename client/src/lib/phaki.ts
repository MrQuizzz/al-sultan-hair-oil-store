export const PHAKI_VARIANTS = [
  { size: "250g", price: 800 },
  { size: "500g", price: 1500 },
  { size: "1,000g", price: 3000 },
] as const;

export function getPhakiPrice(size: string) {
  return PHAKI_VARIANTS.find((variant) => variant.size === size)?.price ?? PHAKI_VARIANTS[0].price;
}

export function createPhakiWhatsAppMessage(size: string) {
  const price = getPhakiPrice(size);
  return `Assalam-o-Alaikum, I would like to order Al Sultan Phaki ${size} for PKR ${price.toLocaleString("en-PK")}. Please confirm delivery.`;
}
