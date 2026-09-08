import { describe, expect, it } from "vitest";
import { ampProducts } from "../client/src/lib/ampData";

const EDWARDS_S3_IMAGE_ORIGIN = "https://edwardsamps.s3.us-east-2.amazonaws.com/storefront-images/2026-09-08";

describe("responsive amplifier imagery", () => {
  it("uses externally reachable CDN image sources for desktop and mobile", () => {
    expect(ampProducts).toHaveLength(5);

    for (const amp of ampProducts) {
      expect(amp.heroImage, `${amp.name} desktop image`).toMatch(/^https:\/\/edwardsamps\.s3\.us-east-2\.amazonaws\.com\/storefront-images\/2026-09-08\/.+\.(png|webp)$/);
      expect(amp.heroImageMobile, `${amp.name} mobile image`).toMatch(/^https:\/\/edwardsamps\.s3\.us-east-2\.amazonaws\.com\/storefront-images\/2026-09-08\/.+\.(png|webp)$/);
    }
  });

  it("preserves the approved staged product-photo mapping for every legacy amplifier", () => {
    const imageSources = Object.fromEntries(
      ampProducts.map((amp) => [amp.slug, { desktop: amp.heroImage, mobile: amp.heroImageMobile }]),
    );

    expect(imageSources).toEqual({
      "elusive-overdrive": {
        desktop: `${EDWARDS_S3_IMAGE_ORIGIN}/AkIGNUKzXVdWQQRV.webp`,
        mobile: `${EDWARDS_S3_IMAGE_ORIGIN}/RerpBsxEpoTUjpDa.webp`,
      },
      "king-richard": {
        desktop: `${EDWARDS_S3_IMAGE_ORIGIN}/VKakUxtgcftJEoAU.webp`,
        mobile: `${EDWARDS_S3_IMAGE_ORIGIN}/dOBbgyGQynTzsgac.webp`,
      },
      "hot-mama": {
        desktop: `${EDWARDS_S3_IMAGE_ORIGIN}/iATUaSsbPuhgrdpr.webp`,
        mobile: `${EDWARDS_S3_IMAGE_ORIGIN}/UnUvJoTpPSvfSPxc.webp`,
      },
      "double-dee-tweed": {
        desktop: `${EDWARDS_S3_IMAGE_ORIGIN}/OIgQQWNzVtorOVlC.webp`,
        mobile: `${EDWARDS_S3_IMAGE_ORIGIN}/zOmfdgZmZQygMBIk.webp`,
      },
      "lil-tyke-tweed": {
        desktop: `${EDWARDS_S3_IMAGE_ORIGIN}/PmBhGnQSHJIpFbVC.webp`,
        mobile: `${EDWARDS_S3_IMAGE_ORIGIN}/qtgYJNyBHhKQkbDD.webp`,
      },
    });
  });
});
