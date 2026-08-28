import { describe, expect, it } from "vitest";
import { STORE_PRODUCT_INFO_BY_KEY } from "../shared/storeProductInfo";

const suppliedPedalKeys = [
  "elusive-overdrive-pedal",
  "mystery-drive-pedal",
  "blackjack-overdrive-pedal",
  "fuzzy-octave-pedal",
  "evil-grin-fuzz-pedal",
] as const;

describe("supplied pedal product information", () => {
  it("retains an overview and control information for every supplied pedal", () => {
    for (const key of suppliedPedalKeys) {
      const info = STORE_PRODUCT_INFO_BY_KEY[key];

      expect(info, `Missing product information for ${key}`).toBeTruthy();
      expect(info?.overview.length, `${key} overview`).toBeGreaterThan(80);
      expect(info?.controls.length, `${key} controls`).toBeGreaterThan(0);
      expect(info?.features.length, `${key} features`).toBeGreaterThan(1);
    }
  });
});
