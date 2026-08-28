import { describe, expect, it } from "vitest";
import { SHOPIFY_PRODUCT_OPTIONS } from "../shared/shopifyCatalog";
import { getShopifyCatalog } from "./shopify";

describe("Shopify catalog mapping", () => {
  it(
    "resolves every current Edwards store product to a live Shopify variant and price",
    async () => {
      const products = await getShopifyCatalog();

      expect(products).toHaveLength(SHOPIFY_PRODUCT_OPTIONS.length);

      for (const expected of SHOPIFY_PRODUCT_OPTIONS) {
        const product = products.find((entry) => entry.key === expected.key);

        expect(product, `Missing Shopify catalog entry for ${expected.key}`).toBeTruthy();
        expect(product?.handle, `Handle mismatch for ${expected.key}`).toBe(expected.handle);
        expect(product?.variantId, `Missing variant ID for ${expected.key}`).toBeTruthy();
        expect(product?.priceValue, `Missing positive price for ${expected.key}`).toBeGreaterThan(0);
      }
    },
    30000,
  );
});
