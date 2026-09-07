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

      expect(product.image, `${key} image`).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.(png|webp)$/);
      expect(product.imageAlt, `${key} alt text`).toBeTruthy();
      expect(product.imageFit, `${key} product-preserving fit`).toBe("contain");
    }

    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["blackjack-overdrive-pedal"].image).toBeUndefined();
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["queen-reverb-combo"].image).toBeUndefined();
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["edwards-amps-effects-t-shirt"].image).toBeUndefined();
  });

  it("uses distinct staged scenes for the Elusive Overdrive 24 Watt and 40 Watt head variants", () => {
    const twentyFourWattHeadImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/bCQyoIDyqDYQJKcL.png";
    const fortyWattHeadImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/kWaZoNRRXBKhaLMH.png";
    const twentyFourWattHead = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-24w-head"];
    const fortyWattHead = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-40w-head"];

    expect(twentyFourWattHead.image).toBe(twentyFourWattHeadImage);
    expect(fortyWattHead.image).toBe(fortyWattHeadImage);
    expect(twentyFourWattHead.image).not.toBe(fortyWattHead.image);
    expect(twentyFourWattHead.imageAlt).toContain("wooden workshop platform");
    expect(fortyWattHead.imageAlt).toContain("traditional black vinyl");
    expect(fortyWattHead.imageAlt).toContain("bar counter");
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-24w-head"].imageFit).toBe("cover");
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-40w-head"].imageFit).toBe("cover");
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-24w-combo"].image).toBeUndefined();
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-40w-combo"].image).toBeUndefined();
  });

  it("uses the approved public coffee-shop scene for the 69/73 combo", () => {
    const approvedComboImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/YaXwzjrutnydogit.png";
    const combo = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["69-73-combo"];

    expect(combo.image).toBe(approvedComboImage);
    expect(combo.imageFit).toBe("cover");
    expect(combo.imageAlt).toContain("coffee-shop performance setting");
    expect(approvedComboImage).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.png$/);
  });

  it("uses the approved public British-pub scene only for the Hot Mama Head", () => {
    const approvedHeadImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/RfPFxYKPksLKfmbf.png";
    const head = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["hot-mama-head"];

    expect(head.image).toBe(approvedHeadImage);
    expect(head.imageFit).toBe("cover");
    expect(head.imageAlt).toContain("warm wooden pub table");
    expect(approvedHeadImage).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.png$/);
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["hot-mama-combo"].image).toBeUndefined();
  });
});
