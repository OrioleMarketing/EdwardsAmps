import { describe, expect, it } from "vitest";
import { SHOPIFY_PRODUCT_OPTIONS_BY_KEY } from "../shared/shopifyCatalog";

const expectedImageKeys = [
  "princess-reverb-combo",
  "elusive-overdrive-pedal",
  "mystery-drive-pedal",
  "fuzzy-octave-pedal",
  "evil-grin-fuzz-pedal",
  "elusive-overdrive-t-shirt",
] as const;

describe("client product-image mapping", () => {
  it("assigns uploaded client photography only to clearly matched products", () => {
    for (const key of expectedImageKeys) {
      const product = SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key];

      expect(product.image, `${key} image`).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.webp$/);
      expect(product.imageAlt, `${key} alt text`).toBeTruthy();
      expect(product.imageFit, `${key} product-preserving fit`).toBe("contain");
    }

    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["blackjack-overdrive-pedal"].image).toBeUndefined();
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["queen-reverb-combo"].image).toBeUndefined();
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["edwards-amps-effects-t-shirt"].image).toBeUndefined();
  });
});
