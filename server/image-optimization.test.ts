import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { SHOPIFY_PRODUCT_OPTIONS_BY_KEY } from "../shared/shopifyCatalog";

const EDWARDS_S3_IMAGE_ORIGIN = "https://edwardsamps.s3.us-east-2.amazonaws.com/storefront-images/2026-09-08";

const optimizedProductKeys = [
  "elusive-overdrive-24w-combo",
  "elusive-overdrive-24w-head",
  "elusive-overdrive-40w-combo",
  "elusive-overdrive-40w-head",
  "king-richard-head",
  "hot-mama-head",
  "princess-reverb-combo",
  "queen-reverb-combo",
  "69-73-combo",
  "elusive-overdrive-pedal",
  "mystery-drive-pedal",
  "blackjack-overdrive-pedal",
  "fuzzy-octave-pedal",
  "evil-grin-fuzz-pedal",
] as const;

describe("optimized storefront image delivery", () => {
  it("assigns matching Edwards-controlled S3 WebP desktop and mobile derivatives to each optimized product", () => {
    for (const key of optimizedProductKeys) {
      const product = SHOPIFY_PRODUCT_OPTIONS_BY_KEY[key];

      expect(product.image, `${key} desktop image`).toMatch(/^https:\/\/edwardsamps\.s3\.us-east-2\.amazonaws\.com\/storefront-images\/2026-09-08\/.+\.webp$/);
      expect(product.imageMobile, `${key} mobile image`).toMatch(/^https:\/\/edwardsamps\.s3\.us-east-2\.amazonaws\.com\/storefront-images\/2026-09-08\/.+\.webp$/);
    }
  });

  it("uses the smaller catalog source for mobile cards and product pages", () => {
    const shopCollection = readFileSync(resolve(process.cwd(), "client/src/components/ShopCollection.tsx"), "utf8");
    const productPage = readFileSync(resolve(process.cwd(), "client/src/pages/ShopProduct.tsx"), "utf8");

    expect(shopCollection).toContain("mobileImage: product.imageMobile ?? product.image ?? amp?.heroImageMobile ?? \"\"");
    expect(productPage).toContain("mobileSrc={product.imageMobile ?? product.image}");
  });

  it("contains no Manus CDN image URL in customer-facing image mappings", () => {
    const imageSources = [
      readFileSync(resolve(process.cwd(), "client/src/lib/ampData.ts"), "utf8"),
      readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8"),
      readFileSync(resolve(process.cwd(), "shared/shopifyCatalog.ts"), "utf8"),
    ];

    expect(imageSources.join("\n")).not.toContain("https://files.manuscdn.com/");
    expect(imageSources.join("\n")).toContain(EDWARDS_S3_IMAGE_ORIGIN);
  });

  it("declares WebP source type only when the supplied mobile source is WebP", () => {
    const responsiveImage = readFileSync(resolve(process.cwd(), "client/src/components/ResponsiveImage.tsx"), "utf8");

    expect(responsiveImage).toContain('type={mobileSrc.includes(".webp") ? "image/webp" : undefined}');
    expect(responsiveImage).toContain('loading={loadingStrategy ?? (priority ? "eager" : "lazy")}');
    expect(responsiveImage).toContain('decoding="async"');
  });
});
