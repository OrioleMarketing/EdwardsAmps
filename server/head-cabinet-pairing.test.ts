import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ampProducts } from "../client/src/lib/ampData";
import { SHOPIFY_PRODUCT_OPTIONS_BY_KEY } from "../shared/shopifyCatalog";

const cabinetPairingNote = "This head is custom built to be paired with an Edwards Amplification Speaker Cabinet. Explore matching cabinet options to complete your rig.";

const headKeys = [
  "elusive-overdrive-24w-head",
  "elusive-overdrive-40w-head",
  "king-richard-head",
  "hot-mama-head",
] as const;

const comboKeys = [
  "elusive-overdrive-24w-combo",
  "elusive-overdrive-40w-combo",
  "hot-mama-combo",
  "double-dee-tweed-combo",
  "lil-tyke-tweed-combo",
  "princess-reverb-combo",
  "queen-reverb-combo",
  "69-73-combo",
] as const;

describe("head cabinet pairing information", () => {
  it("adds the exact Cabinet pairing note to every active Shopify head and excludes combo products", () => {
    for (const key of headKeys) {
      expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key].cabinetPairingNote).toBe(cabinetPairingNote);
    }

    for (const key of comboKeys) {
      expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key].cabinetPairingNote).toBeUndefined();
    }
  });

  it("adds matching Cabinet pairing information to every legacy page with an Edwards head format", () => {
    for (const slug of ["elusive-overdrive", "king-richard", "hot-mama"]) {
      const amp = ampProducts.find((candidate) => candidate.slug === slug);
      expect(amp?.cabinetPairingNote).toContain("custom built to be paired with an Edwards Amplification Speaker Cabinet");
    }

    for (const slug of ["double-dee-tweed", "lil-tyke-tweed"]) {
      const amp = ampProducts.find((candidate) => candidate.slug === slug);
      expect(amp?.cabinetPairingNote).toBeUndefined();
    }
  });

  it("renders the Cabinet pairing information on both product-page templates", () => {
    const shopProductSource = readFileSync("client/src/pages/ShopProduct.tsx", "utf8");
    const ampDetailSource = readFileSync("client/src/pages/AmpDetail.tsx", "utf8");

    expect(shopProductSource).toContain("product.cabinetPairingNote");
    expect(ampDetailSource).toContain("amp.cabinetPairingNote");
    expect(shopProductSource).toContain("Cabinet pairing");
    expect(ampDetailSource).toContain("Cabinet pairing");
  });
});
