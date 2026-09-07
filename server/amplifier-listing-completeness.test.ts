import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  AMPLIFIER_SHOP_DISPLAY_ORDER,
  orderShopProducts,
  SHOPIFY_PRODUCT_OPTIONS,
} from "../shared/shopifyCatalog";

describe("complete amplifier listings", () => {
  it("keeps all current amplifier products in the explicit public display order", () => {
    const amplifiers = orderShopProducts(
      SHOPIFY_PRODUCT_OPTIONS.filter((option) => option.group === "Amplifiers"),
    );

    expect(amplifiers.map((option) => option.key)).toEqual(AMPLIFIER_SHOP_DISPLAY_ORDER);
    expect(amplifiers.map((option) => option.displayName)).toEqual([
      "Elusive Overdrive — 24 Watt Head",
      "Elusive Overdrive — 40 Watt Head",
      "King Richard Head",
      "Hot Mama Head",
      "Elusive Overdrive — 24 Watt Combo",
      "Elusive Overdrive — 40 Watt Combo",
      "Hot Mama Combo",
      "Double Dee Tweed Combo",
      "Lil Tyke Tweed Combo",
      "Princess Reverb Combo",
      "Queen Reverb Combo",
      "69/73 Combo",
    ]);
  });

  it("makes each legacy amp page pair its direct-order formats with the rest of the current catalog", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/AmpDetail.tsx"), "utf8");

    expect(source).toContain('option.group === "Amplifiers" && option.ampSlug !== amp.slug');
    expect(source).toContain("Explore every other Edwards amp.");
    expect(source).toContain("Princess, Queen, and 69/73.");
    expect(source).toContain("href={`/shop/${product.handle}`}");
  });
});
