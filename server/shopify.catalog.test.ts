import { describe, expect, it } from "vitest";
import { getShopifyCatalog } from "./shopify";

describe("Shopify catalog mapping", () => {
  it("resolves the Edwards direct-order products to live Shopify variants", async () => {
    const products = await getShopifyCatalog();

    const hotMamaHead = products.find((product) => product.key === "hot-mama-head");
    const hotMamaCombo = products.find((product) => product.key === "hot-mama-combo");
    const doubleDee = products.find((product) => product.key === "double-dee-tweed-combo");

    expect(products).toHaveLength(3);
    expect(hotMamaHead?.variantId).toBeTruthy();
    expect(hotMamaCombo?.variantId).toBeTruthy();
    expect(doubleDee?.variantId).toBeTruthy();
    expect(hotMamaHead?.priceValue).toBeGreaterThan(0);
    expect(hotMamaCombo?.priceValue).toBeGreaterThan(0);
    expect(doubleDee?.priceValue).toBeGreaterThan(0);
  }, 30000);
});
