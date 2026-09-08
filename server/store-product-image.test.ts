import { describe, expect, it } from "vitest";
import { SHOPIFY_PRODUCT_OPTIONS_BY_KEY } from "../shared/shopifyCatalog";

const EDWARDS_S3_IMAGE_ORIGIN = "https://edwardsamps.s3.us-east-2.amazonaws.com/storefront-images/2026-09-08";

const expectedImageKeys = [
  "princess-reverb-combo",
  "elusive-overdrive-pedal",
  "mystery-drive-pedal",
  "blackjack-overdrive-pedal",
  "fuzzy-octave-pedal",
  "evil-grin-fuzz-pedal",
  "edwards-amps-effects-t-shirt",
  "elusive-overdrive-t-shirt",
  "elusive-1x12-oval-cabinet",
  "oval-2x12-cabinet",
  "oval-4x10-cabinet",
] as const;

describe("client product-image mapping", () => {
  it("assigns product-specific imagery only to clearly matched products", () => {
    for (const key of expectedImageKeys) {
      const product = SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key];

      expect(product.image, `${key} image`).toMatch(/^https:\/\/edwardsamps\.s3\.us-east-2\.amazonaws\.com\/storefront-images\/2026-09-08\/.+\.(jpg|png|webp)$/);
      expect(product.imageAlt, `${key} alt text`).toBeTruthy();
      expect(product.imageFit, `${key} product presentation fit`).toMatch(/^(contain|cover)$/);
    }
  });

  it("uses the supplied black Edwards Amps and Effects shirt image only for the matching apparel listing", () => {
    const shirt = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["edwards-amps-effects-t-shirt"];

    expect(shirt.image).toBe(`${EDWARDS_S3_IMAGE_ORIGIN}/uXmDiOvONEgvVbYi.jpg`);
    expect(shirt.imageAlt).toContain("Black Edwards Amps and Effects T-Shirt");
    expect(shirt.imageFit).toBe("contain");
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-t-shirt"].image).not.toBe(shirt.image);
  });

  it("uses the approved cabinet photographs for the three Speaker Cabinet listings", () => {
    const oneByTwelve = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-1x12-oval-cabinet"];
    const twoByTwelve = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["oval-2x12-cabinet"];
    const fourByTen = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["oval-4x10-cabinet"];

    expect(oneByTwelve.image).toBe(`${EDWARDS_S3_IMAGE_ORIGIN}/ejDVNotVyWAToWot.webp`);
    expect(oneByTwelve.imageMobile).toBe(`${EDWARDS_S3_IMAGE_ORIGIN}/KyVqUeZPGUfSfrMe.webp`);
    expect(oneByTwelve.imageAlt).toContain("rear on a clean hardwood workbench");
    expect(oneByTwelve.imageFit).toBe("cover");

    expect(twoByTwelve.image).toBe(`${EDWARDS_S3_IMAGE_ORIGIN}/DNvxQDBRYSZxHjAT.webp`);
    expect(twoByTwelve.imageAlt).toContain("embossed black covering");
    expect(twoByTwelve.imageFit).toBe("cover");

    expect(fourByTen.image).toBe(`${EDWARDS_S3_IMAGE_ORIGIN}/xGsXtDiARMawdoPk.webp`);
    expect(fourByTen.imageAlt).toContain("handcrafted workshop construction");
    expect(fourByTen.imageFit).toBe("cover");
  });

  it("keeps the professional pedal-image mapping exclusive to the five supplied pedal products", () => {
    const expectedProfessionalPedalImages = {
      "elusive-overdrive-pedal": `${EDWARDS_S3_IMAGE_ORIGIN}/fhbPESNqBjvZbMNG.webp`,
      "mystery-drive-pedal": `${EDWARDS_S3_IMAGE_ORIGIN}/XSAIqVVPeADveZdo.webp`,
      "blackjack-overdrive-pedal": `${EDWARDS_S3_IMAGE_ORIGIN}/qNdjzJzcBgJueXBp.webp`,
      "fuzzy-octave-pedal": `${EDWARDS_S3_IMAGE_ORIGIN}/TxOoNlhoEokFRYfg.webp`,
      "evil-grin-fuzz-pedal": `${EDWARDS_S3_IMAGE_ORIGIN}/MBKDeOcIFWKhSrOx.webp`,
    } as const;

    for (const [key, image] of Object.entries(expectedProfessionalPedalImages)) {
      expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key as keyof typeof SHOPIFY_PRODUCT_OPTIONS_BY_KEY].image).toBe(image);
      expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key as keyof typeof SHOPIFY_PRODUCT_OPTIONS_BY_KEY].imageAlt).toContain("professional studio product image");
      expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key as keyof typeof SHOPIFY_PRODUCT_OPTIONS_BY_KEY].imageFit).toBe("cover");
    }
  });

  it("uses the rehearsal-room scene only for the Princess Reverb Combo", () => {
    const princess = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["princess-reverb-combo"];

    expect(princess.image).toBe(`${EDWARDS_S3_IMAGE_ORIGIN}/ZIvLClynsIEkyIHG.webp`);
    expect(princess.imageMobile).toBe(`${EDWARDS_S3_IMAGE_ORIGIN}/vdPnzerNiGLHaOSH.webp`);
    expect(princess.imageAlt).toContain("late-night rehearsal room");
    expect(princess.imageFit).toBe("cover");
  });

  it("uses distinct staged scenes for the Elusive Overdrive 24 Watt and 40 Watt head variants", () => {
    const twentyFourWattHeadImage = `${EDWARDS_S3_IMAGE_ORIGIN}/nDzAqCYQcBnYIVOW.webp`;
    const fortyWattHeadImage = `${EDWARDS_S3_IMAGE_ORIGIN}/aGmjpTKSTMbsRtrf.webp`;
    const twentyFourWattHead = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-24w-head"];
    const fortyWattHead = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-40w-head"];

    expect(twentyFourWattHead.image).toBe(twentyFourWattHeadImage);
    expect(fortyWattHead.image).toBe(fortyWattHeadImage);
    expect(twentyFourWattHead.image).not.toBe(fortyWattHead.image);
    expect(twentyFourWattHead.imageAlt).toContain("warm live performance");
    expect(fortyWattHead.imageAlt).toContain("traditional black vinyl");
    expect(fortyWattHead.imageAlt).toContain("warm live performance");
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-24w-head"].imageFit).toBe("cover");
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-40w-head"].imageFit).toBe("cover");
  });

  it("uses the exact black client reference on the approved stage only for the Elusive Overdrive 24 Watt Combo", () => {
    const approvedComboImage = `${EDWARDS_S3_IMAGE_ORIGIN}/lcpRiWuUcvpfLgFD.webp`;
    const combo = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-24w-combo"];

    expect(combo.image).toBe(approvedComboImage);
    expect(combo.imageFit).toBe("cover");
    expect(combo.imageAlt).toContain("Exact black client");
    expect(combo.imageAlt).toContain("approved warm performance stage");
    expect(combo.imageAlt).toContain("Edwards script grille badge at the same upward-right angle as the client reference");
    expect(approvedComboImage).toMatch(/^https:\/\/edwardsamps\.s3\.us-east-2\.amazonaws\.com\/storefront-images\/2026-09-08\/.+\.webp$/);
  });

  it("uses the supplied blue floral client-reference stage scene only for the Elusive Overdrive 40 Watt Combo", () => {
    const approvedComboImage = `${EDWARDS_S3_IMAGE_ORIGIN}/cLJnqUkPCDJDGPgc.webp`;
    const combo = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-40w-combo"];

    expect(combo.image).toBe(approvedComboImage);
    expect(combo.imageFit).toBe("cover");
    expect(combo.imageAlt).toContain("blue floral Tolex");
    expect(combo.imageAlt).toContain("supplied blue floral Tolex covering");
    expect(combo.imageAlt).toContain("approved warm performance stage");
    expect(combo.imageAlt).toContain("Edwards script grille badge at the same upward-right angle as the client reference");
    expect(approvedComboImage).toMatch(/^https:\/\/edwardsamps\.s3\.us-east-2\.amazonaws\.com\/storefront-images\/2026-09-08\/.+\.webp$/);
  });

  it("uses the approved public coffee-shop scene for the 69/73 combo", () => {
    const approvedComboImage = `${EDWARDS_S3_IMAGE_ORIGIN}/ggLMfyLGOTmWMBOj.webp`;
    const combo = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["69-73-combo"];

    expect(combo.image).toBe(approvedComboImage);
    expect(combo.imageFit).toBe("cover");
    expect(combo.imageAlt).toContain("coffee-shop performance setting");
    expect(approvedComboImage).toMatch(/^https:\/\/edwardsamps\.s3\.us-east-2\.amazonaws\.com\/storefront-images\/2026-09-08\/.+\.webp$/);
  });

  it("uses the approved public British-pub scene only for the Hot Mama Head", () => {
    const approvedHeadImage = `${EDWARDS_S3_IMAGE_ORIGIN}/NnSnPXJouLnSLNXL.webp`;
    const head = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["hot-mama-head"];

    expect(head.image).toBe(approvedHeadImage);
    expect(head.imageFit).toBe("cover");
    expect(head.imageAlt).toContain("warm wooden pub table");
    expect(approvedHeadImage).toMatch(/^https:\/\/edwardsamps\.s3\.us-east-2\.amazonaws\.com\/storefront-images\/2026-09-08\/.+\.webp$/);
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["hot-mama-combo"].image).toBeUndefined();
  });

  it("uses the approved public college-dorm scene only for the Queen Reverb Combo", () => {
    const approvedQueenImage = `${EDWARDS_S3_IMAGE_ORIGIN}/TzhmtXmCjOcKnmoy.webp`;
    const queen = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["queen-reverb-combo"];

    expect(queen.image).toBe(approvedQueenImage);
    expect(queen.imageFit).toBe("cover");
    expect(queen.imageAlt).toContain("warm college dorm room");
    expect(approvedQueenImage).toMatch(/^https:\/\/edwardsamps\.s3\.us-east-2\.amazonaws\.com\/storefront-images\/2026-09-08\/.+\.webp$/);
  });
});
