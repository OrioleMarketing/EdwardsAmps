import { describe, expect, it } from "vitest";
import { ampProducts } from "../client/src/lib/ampData";

describe("responsive amplifier imagery", () => {
  it("uses optimized storage-backed WebP sources for desktop and mobile", () => {
    expect(ampProducts).toHaveLength(5);

    for (const amp of ampProducts) {
      expect(amp.heroImage, `${amp.name} desktop image`).toMatch(/^\/manus-storage\/.+-desktop_.+\.webp$/);
      expect(amp.heroImageMobile, `${amp.name} mobile image`).toMatch(/^\/manus-storage\/.+-mobile_.+\.webp$/);
    }
  });

  it("preserves the approved staged product-photo mapping for every legacy amplifier", () => {
    const imageSources = Object.fromEntries(
      ampProducts.map((amp) => [amp.slug, { desktop: amp.heroImage, mobile: amp.heroImageMobile }]),
    );

    expect(imageSources).toEqual({
      "elusive-overdrive": {
        desktop: "/manus-storage/elusive-overdrive-desktop_233d5f72.webp",
        mobile: "/manus-storage/elusive-overdrive-mobile_578da0fe.webp",
      },
      "king-richard": {
        desktop: "/manus-storage/king-richard-desktop_fac541b7.webp",
        mobile: "/manus-storage/king-richard-mobile_ee8f5283.webp",
      },
      "hot-mama": {
        desktop: "/manus-storage/hot-mama-desktop_25bf73fd.webp",
        mobile: "/manus-storage/hot-mama-mobile_a645f7cb.webp",
      },
      "double-dee-tweed": {
        desktop: "/manus-storage/double-dee-tweed-desktop_0737c2fa.webp",
        mobile: "/manus-storage/double-dee-tweed-mobile_2e28879c.webp",
      },
      "lil-tyke-tweed": {
        desktop: "/manus-storage/lil-tyke-tweed-desktop_37c04d2e.webp",
        mobile: "/manus-storage/lil-tyke-tweed-mobile_59078403.webp",
      },
    });
  });
});
