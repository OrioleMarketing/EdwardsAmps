export type ShopifyProductKey =
  | "elusive-overdrive-24w-combo"
  | "elusive-overdrive-24w-head"
  | "elusive-overdrive-40w-combo"
  | "elusive-overdrive-40w-head"
  | "king-richard-head"
  | "hot-mama-head"
  | "hot-mama-combo"
  | "double-dee-tweed-combo"
  | "lil-tyke-tweed-combo"
  | "princess-reverb-combo"
  | "queen-reverb-combo"
  | "69-73-head"
  | "69-73-combo"
  | "elusive-1x12-oval-cabinet"
  | "oval-2x12-cabinet"
  | "oval-4x10-cabinet"
  | "elusive-overdrive-pedal"
  | "mystery-drive-pedal"
  | "blackjack-overdrive-pedal"
  | "fuzzy-octave-pedal"
  | "evil-grin-fuzz-pedal"
  | "edwards-amps-effects-t-shirt"
  | "elusive-overdrive-t-shirt";

export type ShopifyProductGroup = "Amplifiers" | "Speaker cabinets" | "Effects pedals" | "Apparel";

export type ShopifyProductOption = {
  key: ShopifyProductKey;
  ampSlug?: "elusive-overdrive" | "king-richard" | "hot-mama" | "double-dee-tweed" | "lil-tyke-tweed";
  handle: string;
  displayName: string;
  group: ShopifyProductGroup;
  eyebrow: string;
  subtitle: string;
  description: string;
  fallbackPriceLabel: string;
  fallbackPriceValue: number;
};

const STORE_PATH = (handle: string) => `/shop/${handle}`;

export const SHOPIFY_PRODUCT_OPTIONS: ShopifyProductOption[] = [
  {
    key: "elusive-overdrive-24w-combo",
    ampSlug: "elusive-overdrive",
    handle: "elusive-overdrive-amp-24-watt-combo",
    displayName: "Elusive Overdrive Amp — 24 Watt Combo",
    group: "Amplifiers",
    eyebrow: "Elusive Overdrive",
    subtitle: "24 watts of Elusive range in a self-contained combo.",
    description: "A compact all-in-one format with clear cleans, smooth breakup, and a wide overdrive voice.",
    fallbackPriceLabel: "$3,200 USD",
    fallbackPriceValue: 3200,
  },
  {
    key: "elusive-overdrive-24w-head",
    ampSlug: "elusive-overdrive",
    handle: "elusive-overdrive-amp-24-watt-head-1",
    displayName: "Elusive Overdrive Amp — 24 Watt Head",
    group: "Amplifiers",
    eyebrow: "Elusive Overdrive",
    subtitle: "The compact Elusive head for a cabinet-ready rig.",
    description: "A versatile 24-watt head with sparkling clean response, touch sensitivity, and a convincing lead voice.",
    fallbackPriceLabel: "$3,000 USD",
    fallbackPriceValue: 3000,
  },
  {
    key: "elusive-overdrive-40w-combo",
    ampSlug: "elusive-overdrive",
    handle: "elusive-overdrive-amp-24-watt-head",
    displayName: "Elusive Overdrive Amp — 40 Watt Combo",
    group: "Amplifiers",
    eyebrow: "Elusive Overdrive",
    subtitle: "Higher headroom and projection in one complete combo.",
    description: "The 40-watt combo carries the Elusive clean-to-lead range with more authority for larger rooms and louder bands.",
    fallbackPriceLabel: "$3,600 USD",
    fallbackPriceValue: 3600,
  },
  {
    key: "elusive-overdrive-40w-head",
    ampSlug: "elusive-overdrive",
    handle: "elusive-overdrive-amp-24-watt",
    displayName: "Elusive Overdrive Amp — 40 Watt Head",
    group: "Amplifiers",
    eyebrow: "Elusive Overdrive",
    subtitle: "The high-headroom Elusive platform for a separate cabinet rig.",
    description: "A 40-watt head that pairs the Elusive Overdrive’s broad gain range with the flexibility of a separate cabinet setup.",
    fallbackPriceLabel: "$3,400 USD",
    fallbackPriceValue: 3400,
  },
  {
    key: "king-richard-head",
    ampSlug: "king-richard",
    handle: "king-richard-head",
    displayName: "King Richard Head",
    group: "Amplifiers",
    eyebrow: "King Richard",
    subtitle: "A British-leaning stage head with punch, chime, and depth.",
    description: "A hand-built head for players who want big projection, rich upper-mid character, and expressive two-channel response.",
    fallbackPriceLabel: "$2,799 USD",
    fallbackPriceValue: 2799,
  },
  {
    key: "hot-mama-head",
    ampSlug: "hot-mama",
    handle: "hot-mama-amp-head",
    displayName: "Hot Mama Amp — Head",
    group: "Amplifiers",
    eyebrow: "Hot Mama",
    subtitle: "Portable British sparkle in a compact head format.",
    description: "A travel-friendly head with chiming cleans, smooth gain, and a recording-ready breakup character.",
    fallbackPriceLabel: "$1,999 USD",
    fallbackPriceValue: 1999,
  },
  {
    key: "hot-mama-combo",
    ampSlug: "hot-mama",
    handle: "hot-mama-combo",
    displayName: "Hot Mama — Combo",
    group: "Amplifiers",
    eyebrow: "Hot Mama",
    subtitle: "The self-contained Hot Mama for one cabinet and one trip.",
    description: "A complete Hot Mama setup for players who want British-inspired response in a practical combo footprint.",
    fallbackPriceLabel: "$2,199 USD",
    fallbackPriceValue: 2199,
  },
  {
    key: "double-dee-tweed-combo",
    ampSlug: "double-dee-tweed",
    handle: "double-dee-tweed-amp",
    displayName: "Double Dee Tweed Amp",
    group: "Amplifiers",
    eyebrow: "Double Dee Tweed",
    subtitle: "Rootsy tweed character with a useful, musical range.",
    description: "A tweed-flavored Edwards combo for touch-sensitive response, sweeter compression, and stage-ready feel.",
    fallbackPriceLabel: "$2,199 USD",
    fallbackPriceValue: 2199,
  },
  {
    key: "lil-tyke-tweed-combo",
    ampSlug: "lil-tyke-tweed",
    handle: "lil-tyke-tweed-amp",
    displayName: "Lil Tyke Tweed Amp",
    group: "Amplifiers",
    eyebrow: "Lil Tyke Tweed",
    subtitle: "A compact tweed-style combo with direct response and stripped-back charm.",
    description: "The smallest tweed voice in the Edwards lineup, built for immediate feel, vintage flavor, and expressive playing.",
    fallbackPriceLabel: "$1,499 USD",
    fallbackPriceValue: 1499,
  },
  {
    key: "princess-reverb-combo",
    handle: "princess-reverb-combo",
    displayName: "Princess Reverb Combo",
    group: "Amplifiers",
    eyebrow: "Edwards Amplification",
    subtitle: "A reverb-equipped Edwards combo.",
    description: "The Princess Reverb Combo is a distinct Edwards amplifier configuration available through the store.",
    fallbackPriceLabel: "$2,199 USD",
    fallbackPriceValue: 2199,
  },
  {
    key: "queen-reverb-combo",
    handle: "queen-reverb-combo",
    displayName: "Queen Reverb Combo",
    group: "Amplifiers",
    eyebrow: "Edwards Amplification",
    subtitle: "A larger reverb-equipped Edwards combo.",
    description: "The Queen Reverb Combo is a distinct Edwards amplifier configuration available through the store.",
    fallbackPriceLabel: "$2,499 USD",
    fallbackPriceValue: 2499,
  },
  {
    key: "69-73-head",
    handle: "69-73-head",
    displayName: "69.73 Head",
    group: "Amplifiers",
    eyebrow: "Edwards Amplification",
    subtitle: "The 69.73 in a head format.",
    description: "A distinct Edwards head configuration available through the store.",
    fallbackPriceLabel: "$2,199 USD",
    fallbackPriceValue: 2199,
  },
  {
    key: "69-73-combo",
    handle: "69-73-combo",
    displayName: "69/73 Combo",
    group: "Amplifiers",
    eyebrow: "Edwards Amplification",
    subtitle: "The 69/73 in a complete combo format.",
    description: "A distinct Edwards combo configuration available through the store.",
    fallbackPriceLabel: "$2,399 USD",
    fallbackPriceValue: 2399,
  },
  {
    key: "elusive-1x12-oval-cabinet",
    handle: "1x12-elusive-oval-open-back-speaker-cabinet",
    displayName: "1x12 Elusive Oval Open-Back Speaker Cabinet",
    group: "Speaker cabinets",
    eyebrow: "Speaker cabinet",
    subtitle: "A 1x12 open-back cabinet for an Elusive head rig.",
    description: "An Edwards 1x12 oval open-back speaker cabinet, listed as its own store item.",
    fallbackPriceLabel: "$599 USD",
    fallbackPriceValue: 599,
  },
  {
    key: "oval-2x12-cabinet",
    handle: "2-12-oval-open-back-speaker-cabinet",
    displayName: "2x12 Oval Open-Back Speaker Cabinet",
    group: "Speaker cabinets",
    eyebrow: "Speaker cabinet",
    subtitle: "A 2x12 open-back cabinet for more spread and presence.",
    description: "An Edwards 2x12 oval open-back speaker cabinet, listed as its own store item.",
    fallbackPriceLabel: "$799 USD",
    fallbackPriceValue: 799,
  },
  {
    key: "oval-4x10-cabinet",
    handle: "4x10-oval-open-back-speaker-cabinet",
    displayName: "4x10 Oval Open-Back Speaker Cabinet",
    group: "Speaker cabinets",
    eyebrow: "Speaker cabinet",
    subtitle: "A 4x10 open-back cabinet for a broader stage footprint.",
    description: "An Edwards 4x10 oval open-back speaker cabinet, listed as its own store item.",
    fallbackPriceLabel: "$229 USD",
    fallbackPriceValue: 229,
  },
  {
    key: "elusive-overdrive-pedal",
    handle: "elusive-overdrive-pedal",
    displayName: "Elusive Overdrive Pedal",
    group: "Effects pedals",
    eyebrow: "Effects pedal",
    subtitle: "Edwards overdrive in a pedal format.",
    description: "The Elusive Overdrive Pedal is listed as a distinct Edwards store item.",
    fallbackPriceLabel: "$599 USD",
    fallbackPriceValue: 599,
  },
  {
    key: "mystery-drive-pedal",
    handle: "mystery-drive-pedal",
    displayName: "Mystery Drive Pedal",
    group: "Effects pedals",
    eyebrow: "Effects pedal",
    subtitle: "A distinct Edwards drive pedal.",
    description: "The Mystery Drive Pedal is listed as a distinct Edwards store item.",
    fallbackPriceLabel: "$229 USD",
    fallbackPriceValue: 229,
  },
  {
    key: "blackjack-overdrive-pedal",
    handle: "blackjack-overdrive-pedal",
    displayName: "Blackjack Overdrive Pedal",
    group: "Effects pedals",
    eyebrow: "Effects pedal",
    subtitle: "A distinct Edwards overdrive pedal.",
    description: "The Blackjack Overdrive Pedal is listed as a distinct Edwards store item.",
    fallbackPriceLabel: "$229 USD",
    fallbackPriceValue: 229,
  },
  {
    key: "fuzzy-octave-pedal",
    handle: "fuzzy-octave-pedal",
    displayName: "Fuzzy Octave Pedal",
    group: "Effects pedals",
    eyebrow: "Effects pedal",
    subtitle: "A distinct Edwards octave fuzz pedal.",
    description: "The Fuzzy Octave Pedal is listed as a distinct Edwards store item.",
    fallbackPriceLabel: "$229 USD",
    fallbackPriceValue: 229,
  },
  {
    key: "evil-grin-fuzz-pedal",
    handle: "evil-grin-fuzz-pedal",
    displayName: "Evil Grin Fuzz Pedal",
    group: "Effects pedals",
    eyebrow: "Effects pedal",
    subtitle: "A distinct Edwards fuzz pedal.",
    description: "The Evil Grin Fuzz Pedal is listed as a distinct Edwards store item.",
    fallbackPriceLabel: "$229 USD",
    fallbackPriceValue: 229,
  },
  {
    key: "edwards-amps-effects-t-shirt",
    handle: "edwards-amps-and-effects-t-shirt",
    displayName: "Edwards Amps and Effects T-Shirt",
    group: "Apparel",
    eyebrow: "Apparel",
    subtitle: "Edwards Amps and Effects apparel.",
    description: "An Edwards Amps and Effects T-Shirt listed as its own store item.",
    fallbackPriceLabel: "$24 USD",
    fallbackPriceValue: 24,
  },
  {
    key: "elusive-overdrive-t-shirt",
    handle: "elusive-overdrive-t-shirt",
    displayName: "Elusive Overdrive T-Shirt",
    group: "Apparel",
    eyebrow: "Apparel",
    subtitle: "Elusive Overdrive apparel.",
    description: "An Elusive Overdrive T-Shirt listed as its own store item.",
    fallbackPriceLabel: "$24 USD",
    fallbackPriceValue: 24,
  },
];

export function getProductDetailPath(product: ShopifyProductOption) {
  return product.ampSlug ? `/amps/${product.ampSlug}` : STORE_PATH(product.handle);
}

export const SHOPIFY_PRODUCT_OPTIONS_BY_KEY = Object.fromEntries(
  SHOPIFY_PRODUCT_OPTIONS.map((product) => [product.key, product]),
) as Record<ShopifyProductKey, ShopifyProductOption>;

export const SHOPIFY_PRODUCT_OPTIONS_BY_HANDLE = Object.fromEntries(
  SHOPIFY_PRODUCT_OPTIONS.map((product) => [product.handle, product]),
) as Record<string, ShopifyProductOption>;

export const SHOPIFY_PRODUCT_OPTIONS_BY_AMP = SHOPIFY_PRODUCT_OPTIONS.reduce<Record<string, ShopifyProductOption[]>>(
  (collection, product) => {
    if (!product.ampSlug) return collection;
    collection[product.ampSlug] = [...(collection[product.ampSlug] ?? []), product];
    return collection;
  },
  {},
);
