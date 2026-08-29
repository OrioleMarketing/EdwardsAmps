import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ampDetailPath = fileURLToPath(new URL("../client/src/pages/AmpDetail.tsx", import.meta.url));
const faithfulLogoUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/branding/edwards-logo-original-white_8e37cbec.png";

describe("legacy amplifier product-page branding", () => {
  it("uses the faithful Edwards Amplification mark in both the header and footer", () => {
    const source = readFileSync(ampDetailPath, "utf8");
    const logoUsageCount = source.split(faithfulLogoUrl).length - 1;

    expect(logoUsageCount).toBe(2);
    expect(source).toContain('alt="Edwards Amplification"');
  });
});
