export type ShopifyProductKey =
  | "elusive-overdrive-24w-combo"
  | "elusive-overdrive-24w-head"
  | "elusive-overdrive-40w-combo"
  | "elusive-overdrive-40w-head"
  | "king-richard-head"
  | "hot-mama-head"
  | "hot-mama-combo"
  | "double-dee-tweed-combo"
  | "lil-tyke-tweed-combo";

export type ShopifyProductOption = {
  key: ShopifyProductKey;
  ampSlug: "elusive-overdrive" | "king-richard" | "hot-mama" | "double-dee-tweed" | "lil-tyke-tweed";
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
    key: "elusive-overdrive-24w-combo",
    ampSlug: "elusive-overdrive",
    handle: "elusive-overdrive-amp-24-watt-combo",
    displayName: "Elusive Overdrive 24 Watt Combo",
    eyebrow: "Available to order",
    subtitle: "The 24-watt combo version for players who want the Elusive voice in one complete grab-and-go format.",
    description:
      "A broad-range Edwards build with sparkling clean tone, edge-of-breakup response, and a fuller overdrive voice in a self-contained combo format.",
    fallbackPriceLabel: "$3,500 USD",
    fallbackPriceValue: 3500,
  },
  {
    key: "elusive-overdrive-24w-head",
    ampSlug: "elusive-overdrive",
    handle: "elusive-overdrive-amp-24-watt-head-1",
    displayName: "Elusive Overdrive 24 Watt Head",
    eyebrow: "Available to order",
    subtitle: "The 24-watt head for players who want the Elusive circuit in a compact cabinet-ready format.",
    description:
      "Built for players who want beautiful cleans, smooth breakup, and a convincing lead voice with the flexibility to pair the head with their preferred cabinet.",
    fallbackPriceLabel: "$3,300 USD",
    fallbackPriceValue: 3300,
  },
  {
    key: "elusive-overdrive-40w-combo",
    ampSlug: "elusive-overdrive",
    handle: "elusive-overdrive-amp-24-watt-head",
    displayName: "Elusive Overdrive 40 Watt Combo",
    eyebrow: "Available to order",
    subtitle: "The higher-headroom combo for players who want more room, punch, and projection from the Elusive platform.",
    description:
      "A 40-watt Elusive Overdrive combo that keeps the line's wide tonal range while offering more authority for bigger rooms and louder bands.",
    fallbackPriceLabel: "$3,600 USD",
    fallbackPriceValue: 3600,
  },
  {
    key: "elusive-overdrive-40w-head",
    ampSlug: "elusive-overdrive",
    handle: "elusive-overdrive-amp-24-watt",
    displayName: "Elusive Overdrive 40 Watt Head",
    eyebrow: "Available to order",
    subtitle: "The 40-watt head for players who want the biggest Elusive platform with their own cabinet setup.",
    description:
      "Designed for players who want the Elusive Overdrive's clean-to-lead range with extra headroom and the flexibility of a separate cabinet rig.",
    fallbackPriceLabel: "$3,400 USD",
    fallbackPriceValue: 3400,
  },
  {
    key: "king-richard-head",
    ampSlug: "king-richard",
    handle: "king-richard-head",
    displayName: "King Richard Head",
    eyebrow: "Available to order",
    subtitle: "Edwards’ British-leaning stage head with punch, chime, and jumpable-channel depth.",
    description:
      "A hand-built head for players who want bigger projection, richer upper-mid character, and the expressive feel of a two-channel British-inspired design.",
    fallbackPriceLabel: "$2,800 USD",
    fallbackPriceValue: 2800,
  },
  {
    key: "hot-mama-head",
    ampSlug: "hot-mama",
    handle: "hot-mama-amp-head",
    displayName: "Hot Mama Head",
    eyebrow: "Available to order",
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
    displayName: "Hot Mama Combo",
    eyebrow: "Available to order",
    subtitle: "The self-contained Hot Mama for players who want one cabinet and one trip.",
    description:
      "A more self-contained Hot Mama setup for players who want British-inspired response, smooth breakup, and a practical footprint right out of the box.",
    fallbackPriceLabel: "$2,000 USD",
    fallbackPriceValue: 2000,
  },
  {
    key: "double-dee-tweed-combo",
    ampSlug: "double-dee-tweed",
    handle: "double-dee-tweed-amp",
    displayName: "Double Dee Tweed Amp",
    eyebrow: "Available to order",
    subtitle: "Rootsy tweed character with more usable range than a one-trick vintage piece.",
    description:
      "A tweed-flavored Edwards combo for players chasing touch-sensitive feel, sweeter compression, and a stage-ready cabinet that still records beautifully.",
    fallbackPriceLabel: "$2,000 USD",
    fallbackPriceValue: 2000,
  },
  {
    key: "lil-tyke-tweed-combo",
    ampSlug: "lil-tyke-tweed",
    handle: "lil-tyke-tweed-amp",
    displayName: "Lil Tyke Tweed Amp",
    eyebrow: "Available to order",
    subtitle: "A compact tweed-style combo with direct response and stripped-back charm.",
    description:
      "The smallest tweed voice in the Edwards lineup, built for players who want an immediate feel, vintage flavor, and a simple, expressive playing experience.",
    fallbackPriceLabel: "$1,800 USD",
    fallbackPriceValue: 1800,
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
