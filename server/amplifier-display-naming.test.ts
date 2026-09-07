import { describe, expect, it } from "vitest";
import { SHOPIFY_PRODUCT_OPTIONS_BY_KEY } from "../shared/shopifyCatalog";

const expectedDisplayNames = {
  "elusive-overdrive-24w-head": "Elusive Overdrive — 24 Watt Head",
  "elusive-overdrive-40w-head": "Elusive Overdrive — 40 Watt Head",
  "king-richard-head": "King Richard Head",
  "hot-mama-head": "Hot Mama Head",
  "elusive-overdrive-24w-combo": "Elusive Overdrive — 24 Watt Combo",
  "elusive-overdrive-40w-combo": "Elusive Overdrive — 40 Watt Combo",
  "hot-mama-combo": "Hot Mama Combo",
  "double-dee-tweed-combo": "Double Dee Tweed Combo",
  "lil-tyke-tweed-combo": "Lil Tyke Tweed Combo",
  "princess-reverb-combo": "Princess Reverb Combo",
  "queen-reverb-combo": "Queen Reverb Combo",
  "69-73-combo": "69/73 Combo",
} as const;

describe("amplifier display naming", () => {
  it("uses Head names without Amp and Combo names that explicitly include Combo", () => {
    for (const [key, expectedDisplayName] of Object.entries(expectedDisplayNames)) {
      const product = SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key as keyof typeof SHOPIFY_PRODUCT_OPTIONS_BY_KEY];

      expect(product.displayName, key).toBe(expectedDisplayName);
      expect(product.displayName, `${key} excludes Amp`).not.toMatch(/\bAmp\b/);
    }

    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-24w-head"].displayName).toMatch(/Head$/);
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-40w-head"].displayName).toMatch(/Head$/);
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["king-richard-head"].displayName).toMatch(/Head$/);
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["hot-mama-head"].displayName).toMatch(/Head$/);
  });
});
