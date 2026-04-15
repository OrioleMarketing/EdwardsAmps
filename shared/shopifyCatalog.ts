export type ShopifyProductKey =
  | "hot-mama-head"
  | "hot-mama-combo"
  | "double-dee-tweed-combo";

export type ShopifyProductOption = {
  key: ShopifyProductKey;
  ampSlug: "hot-mama" | "double-dee-tweed";
  handle: string;
  displayName: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  fallbackPriceLabel: string;
  fallbackPriceValue: number;
};

export const SHOPIFY_PRODUCT_OPTIONS: ShopifyProductOption[] = [
  {
    key: "hot-mama-head",
    ampSlug: "hot-mama",
    handle: "hot-mama-amp-head",
    displayName: "Hot Mama Head",
    eyebrow: "Ready for direct checkout",
    subtitle: "Portable British sparkle in the most travel-friendly format in the lineup.",
    description:
      "For players who want the Hot Mama voice in a compact head that can move easily between rehearsals, church dates, sessions, and small stages.",
    fallbackPriceLabel: "$1,800 USD",
    fallbackPriceValue: 1800,
  },
  {
    key: "hot-mama-combo",
    ampSlug: "hot-mama",
    handle: "hot-mama-combo",
    displayName: "Hot Mama 1x12 Combo",
    eyebrow: "Ready for direct checkout",
    subtitle: "The grab-and-go combo version for players who want one cabinet and one trip.",
    description:
      "A more self-contained Hot Mama setup for players who want British-inspired response, smooth breakup, and a practical footprint right out of the box.",
    fallbackPriceLabel: "$2,000 USD",
    fallbackPriceValue: 2000,
  },
  {
    key: "double-dee-tweed-combo",
    ampSlug: "double-dee-tweed",
    handle: "double-dee-tweed-amp",
    displayName: "Double Dee Tweed 1x12 Combo",
    eyebrow: "Ready for direct checkout",
    subtitle: "Rootsy tweed character with more usable range than a one-trick vintage piece.",
    description:
      "A strong direct-order candidate for players chasing touch-sensitive tweed feel, sweeter compression, and a combo that can cover home, studio, and stage use.",
    fallbackPriceLabel: "$2,000 USD",
    fallbackPriceValue: 2000,
  },
];

export const SHOPIFY_PRODUCT_OPTIONS_BY_KEY = Object.fromEntries(
  SHOPIFY_PRODUCT_OPTIONS.map((product) => [product.key, product]),
) as Record<ShopifyProductKey, ShopifyProductOption>;

export const SHOPIFY_PRODUCT_OPTIONS_BY_AMP = SHOPIFY_PRODUCT_OPTIONS.reduce<Record<string, ShopifyProductOption[]>>(
  (collection, product) => {
    collection[product.ampSlug] = [...(collection[product.ampSlug] ?? []), product];
    return collection;
  },
  {},
);
