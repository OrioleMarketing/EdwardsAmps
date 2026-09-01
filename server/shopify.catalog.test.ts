import { describe, expect, it } from "vitest";
import { SHOPIFY_PRODUCT_OPTIONS, SHOPIFY_PRODUCT_OPTIONS_BY_KEY } from "../shared/shopifyCatalog";
import { getShopifyCatalog } from "./shopify";

describe("Shopify catalog mapping", () => {
  it("uses the approved $999 USD fallback for the 4x10 Oval Open-Back Speaker Cabinet", () => {
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["oval-4x10-cabinet"]).toMatchObject({
      handle: "4x10-oval-open-back-speaker-cabinet",
      fallbackPriceLabel: "$999 USD",
      fallbackPriceValue: 999,
    });
  });

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

      expect(products.find((entry) => entry.key === "oval-4x10-cabinet")).toMatchObject({
        handle: "4x10-oval-open-back-speaker-cabinet",
        priceLabel: "$999 USD",
        priceValue: 999,
        currencyCode: "USD",
      });
    },
    30000,
  );
});
