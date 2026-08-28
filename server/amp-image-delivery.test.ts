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
});
