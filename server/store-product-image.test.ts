import { describe, expect, it } from "vitest";
import { SHOPIFY_PRODUCT_OPTIONS_BY_KEY } from "../shared/shopifyCatalog";

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

      expect(product.image, `${key} image`).toMatch(/^(\/manus-storage\/.+|https:\/\/files\.manuscdn\.com\/.+\.(jpg|png|webp))$/);
      expect(product.imageAlt, `${key} alt text`).toBeTruthy();
      expect(product.imageFit, `${key} product presentation fit`).toMatch(/^(contain|cover)$/);
    }
  });

  it("uses the supplied black Edwards Amps and Effects shirt image only for the matching apparel listing", () => {
    const shirt = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["edwards-amps-effects-t-shirt"];

    expect(shirt.image).toBe("https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/uXmDiOvONEgvVbYi.jpg");
    expect(shirt.imageAlt).toContain("Black Edwards Amps and Effects T-Shirt");
    expect(shirt.imageFit).toBe("contain");
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-t-shirt"].image).not.toBe(shirt.image);
  });

  it("uses the supplied cabinet photographs for the three Speaker Cabinet listings", () => {
    const oneByTwelve = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-1x12-oval-cabinet"];
    const twoByTwelve = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["oval-2x12-cabinet"];
    const fourByTen = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["oval-4x10-cabinet"];

    expect(oneByTwelve.image).toBe("https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/QckMXgUVOqlWXGaC.jpg");
    expect(oneByTwelve.imageAlt).toContain("British Vintage speaker");
    expect(oneByTwelve.imageFit).toBe("contain");

    expect(twoByTwelve.image).toBe("https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/DNvxQDBRYSZxHjAT.webp");
    expect(twoByTwelve.imageAlt).toContain("embossed black covering");
    expect(twoByTwelve.imageFit).toBe("cover");

    expect(fourByTen.image).toBe("https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/xGsXtDiARMawdoPk.webp");
    expect(fourByTen.imageAlt).toContain("handcrafted workshop construction");
    expect(fourByTen.imageFit).toBe("cover");
  });

  it("keeps the professional pedal-image mapping exclusive to the five supplied pedal products", () => {
    const expectedProfessionalPedalImages = {
      "elusive-overdrive-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/fhbPESNqBjvZbMNG.webp",
      "mystery-drive-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/XSAIqVVPeADveZdo.webp",
      "blackjack-overdrive-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/qNdjzJzcBgJueXBp.webp",
      "fuzzy-octave-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/TxOoNlhoEokFRYfg.webp",
      "evil-grin-fuzz-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/MBKDeOcIFWKhSrOx.webp",
    } as const;

    for (const [key, image] of Object.entries(expectedProfessionalPedalImages)) {
      expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key as keyof typeof SHOPIFY_PRODUCT_OPTIONS_BY_KEY].image).toBe(image);
      expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key as keyof typeof SHOPIFY_PRODUCT_OPTIONS_BY_KEY].imageAlt).toContain("professional studio product image");
      expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key as keyof typeof SHOPIFY_PRODUCT_OPTIONS_BY_KEY].imageFit).toBe("cover");
    }
  });

  it("uses the rehearsal-room scene only for the Princess Reverb Combo", () => {
    const princess = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["princess-reverb-combo"];

    expect(princess.image).toBe("https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/ZIvLClynsIEkyIHG.webp");
    expect(princess.imageMobile).toBe("https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/vdPnzerNiGLHaOSH.webp");
    expect(princess.imageAlt).toContain("late-night rehearsal room");
    expect(princess.imageFit).toBe("cover");
  });

  it("uses distinct staged scenes for the Elusive Overdrive 24 Watt and 40 Watt head variants", () => {
    const twentyFourWattHeadImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/nDzAqCYQcBnYIVOW.webp";
    const fortyWattHeadImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/aGmjpTKSTMbsRtrf.webp";
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
    const approvedComboImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/lcpRiWuUcvpfLgFD.webp";
    const combo = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-24w-combo"];

    expect(combo.image).toBe(approvedComboImage);
    expect(combo.imageFit).toBe("cover");
    expect(combo.imageAlt).toContain("Exact black client");
    expect(combo.imageAlt).toContain("approved warm performance stage");
    expect(combo.imageAlt).toContain("Edwards script grille badge at the same upward-right angle as the client reference");
    expect(approvedComboImage).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.webp$/);
  });

  it("uses the supplied blue floral client-reference stage scene only for the Elusive Overdrive 40 Watt Combo", () => {
    const approvedComboImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/cLJnqUkPCDJDGPgc.webp";
    const combo = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-40w-combo"];

    expect(combo.image).toBe(approvedComboImage);
    expect(combo.imageFit).toBe("cover");
    expect(combo.imageAlt).toContain("blue floral Tolex");
    expect(combo.imageAlt).toContain("supplied blue floral Tolex covering");
    expect(combo.imageAlt).toContain("approved warm performance stage");
    expect(combo.imageAlt).toContain("Edwards script grille badge at the same upward-right angle as the client reference");
    expect(approvedComboImage).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.webp$/);
  });

  it("uses the approved public coffee-shop scene for the 69/73 combo", () => {
    const approvedComboImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/ggLMfyLGOTmWMBOj.webp";
    const combo = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["69-73-combo"];

    expect(combo.image).toBe(approvedComboImage);
    expect(combo.imageFit).toBe("cover");
    expect(combo.imageAlt).toContain("coffee-shop performance setting");
    expect(approvedComboImage).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.webp$/);
  });

  it("uses the approved public British-pub scene only for the Hot Mama Head", () => {
    const approvedHeadImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/NnSnPXJouLnSLNXL.webp";
    const head = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["hot-mama-head"];

    expect(head.image).toBe(approvedHeadImage);
    expect(head.imageFit).toBe("cover");
    expect(head.imageAlt).toContain("warm wooden pub table");
    expect(approvedHeadImage).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.webp$/);
    expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY["hot-mama-combo"].image).toBeUndefined();
  });

  it("uses the approved public college-dorm scene only for the Queen Reverb Combo", () => {
    const approvedQueenImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/TzhmtXmCjOcKnmoy.webp";
    const queen = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["queen-reverb-combo"];

    expect(queen.image).toBe(approvedQueenImage);
    expect(queen.imageFit).toBe("cover");
    expect(queen.imageAlt).toContain("warm college dorm room");
    expect(approvedQueenImage).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.webp$/);
  });
});
