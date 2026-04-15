import { describe, expect, it } from "vitest";
import { getShopifyCatalog } from "./shopify";

const EXPECTED_PRODUCT_KEYS = [
  "elusive-overdrive-24w-combo",
  "elusive-overdrive-24w-head",
  "elusive-overdrive-40w-combo",
  "elusive-overdrive-40w-head",
  "king-richard-head",
  "hot-mama-head",
  "hot-mama-combo",
  "double-dee-tweed-combo",
  "lil-tyke-tweed-combo",
] as const;

describe("Shopify catalog mapping", () => {
  it(
    "resolves the Edwards store products to live Shopify variants",
    async () => {
      const products = await getShopifyCatalog();

      expect(products).toHaveLength(EXPECTED_PRODUCT_KEYS.length);

      for (const key of EXPECTED_PRODUCT_KEYS) {
        const product = products.find((entry) => entry.key === key);

        expect(product, `Missing Shopify catalog entry for ${key}`).toBeTruthy();
        expect(product?.variantId, `Missing variant ID for ${key}`).toBeTruthy();
        expect(product?.priceValue, `Missing positive price for ${key}`).toBeGreaterThan(0);
      }
    },
    30000,
  );
});
