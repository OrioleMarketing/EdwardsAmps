import { describe, expect, it } from "vitest";
import { STORE_PRODUCT_INFO_BY_KEY } from "../shared/storeProductInfo";

const suppliedPedalKeys = [
  "elusive-overdrive-pedal",
  "mystery-drive-pedal",
  "blackjack-overdrive-pedal",
  "fuzzy-octave-pedal",
  "evil-grin-fuzz-pedal",
] as const;

const suppliedAmpKeys = ["princess-reverb-combo", "queen-reverb-combo"] as const;

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

describe("supplied reverb amplifier product information", () => {
  it("retains the supplied narrative and complete technical specifications", () => {
    for (const key of suppliedAmpKeys) {
      const info = STORE_PRODUCT_INFO_BY_KEY[key];

      expect(info, `Missing product information for ${key}`).toBeTruthy();
      expect(info?.overview.length, `${key} overview`).toBeGreaterThan(220);
      expect(info?.features.length, `${key} features`).toBeGreaterThanOrEqual(4);
      expect(info?.specifications.length, `${key} specifications`).toBeGreaterThanOrEqual(14);
      expect(info?.specifications.map((spec) => spec.label)).toContain("Amplifier class");
      expect(info?.specifications.map((spec) => spec.label)).toContain("Shipping weight");
    }
  });

  it("keeps the correct power and channel configuration for each reverb model", () => {
    const princessSpecs = STORE_PRODUCT_INFO_BY_KEY["princess-reverb-combo"]?.specifications ?? [];
    const queenSpecs = STORE_PRODUCT_INFO_BY_KEY["queen-reverb-combo"]?.specifications ?? [];

    expect(princessSpecs).toContainEqual({ label: "Power", value: "17 watts" });
    expect(princessSpecs).toContainEqual({ label: "Channels", value: "One channel" });
    expect(queenSpecs).toContainEqual({ label: "Power", value: "24 watts" });
    expect(queenSpecs).toContainEqual({ label: "Channels", value: "Two channels" });
  });
});
