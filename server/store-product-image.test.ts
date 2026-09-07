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
] as const;

describe("client product-image mapping", () => {
  it("assigns product-specific imagery only to clearly matched products", () => {
    for (const key of expectedImageKeys) {
      const product = SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key];

      expect(product.image, `${key} image`).toMatch(/^(\/manus-storage\/|https:\/\/files\.manuscdn\.com\/.+\.(jpg|png|webp))$/);
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

  it("keeps the professional pedal-image mapping exclusive to the five supplied pedal products", () => {
    const expectedProfessionalPedalImages = {
      "elusive-overdrive-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/JSHSnkrQfwrskOmq.png",
      "mystery-drive-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/UKXgPRWjTOPghZqv.png",
      "blackjack-overdrive-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/JenULkvLoYWtSgAx.png",
      "fuzzy-octave-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/koAMOaCtVLfXRpWf.png",
      "evil-grin-fuzz-pedal": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/YTRvttdlyAenIgMH.png",
    } as const;

    for (const [key, image] of Object.entries(expectedProfessionalPedalImages)) {
      expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key as keyof typeof SHOPIFY_PRODUCT_OPTIONS_BY_KEY].image).toBe(image);
      expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key as keyof typeof SHOPIFY_PRODUCT_OPTIONS_BY_KEY].imageAlt).toContain("professional studio product image");
      expect(SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key as keyof typeof SHOPIFY_PRODUCT_OPTIONS_BY_KEY].imageFit).toBe("cover");
    }
  });

  it("uses the rehearsal-room scene only for the Princess Reverb Combo", () => {
    const princess = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["princess-reverb-combo"];

    expect(princess.image).toBe("https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/jwOShzdTobsIfyDg.png");
    expect(princess.imageAlt).toContain("late-night rehearsal room");
    expect(princess.imageFit).toBe("cover");
  });

  it("uses distinct staged scenes for the Elusive Overdrive 24 Watt and 40 Watt head variants", () => {
    const twentyFourWattHeadImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/DZCtJmZcueXeWWHH.png";
    const fortyWattHeadImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/SAaBUSeQdkolQktJ.png";
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

  it("uses the honky-tonk stage scene only for the Elusive Overdrive 24 Watt Combo", () => {
    const approvedComboImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/NCjaDFQyAjNcjxrk.png";
    const combo = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-24w-combo"];

    expect(combo.image).toBe(approvedComboImage);
    expect(combo.imageFit).toBe("cover");
    expect(combo.imageAlt).toContain("elevated honky-tonk performance stage");
    expect(approvedComboImage).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.png$/);
  });

  it("uses the blue floral stage scene only for the Elusive Overdrive 40 Watt Combo", () => {
    const approvedComboImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/wygYIWtLgoHSlazm.png";
    const combo = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["elusive-overdrive-40w-combo"];

    expect(combo.image).toBe(approvedComboImage);
    expect(combo.imageFit).toBe("cover");
    expect(combo.imageAlt).toContain("blue floral Tolex");
    expect(combo.imageAlt).toContain("angled slightly left");
    expect(approvedComboImage).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.png$/);
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

  it("uses the approved public college-dorm scene only for the Queen Reverb Combo", () => {
    const approvedQueenImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/CKMthZKxMRyQquQv.png";
    const queen = SHOPIFY_PRODUCT_OPTIONS_BY_KEY["queen-reverb-combo"];

    expect(queen.image).toBe(approvedQueenImage);
    expect(queen.imageFit).toBe("cover");
    expect(queen.imageAlt).toContain("warm college dorm room");
    expect(approvedQueenImage).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.png$/);
  });
});
