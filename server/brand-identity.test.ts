import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const cartPagePath = fileURLToPath(new URL("../client/src/pages/CartPage.tsx", import.meta.url));
const homePagePath = fileURLToPath(new URL("../client/src/pages/Home.tsx", import.meta.url));
const indexHtmlPath = fileURLToPath(new URL("../client/index.html", import.meta.url));
const faviconPath = fileURLToPath(new URL("../client/public/favicon.png", import.meta.url));
const faithfulLogoUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/branding/edwards-logo-original-white_8e37cbec.png";

describe("storefront brand identity", () => {
  it("uses the faithful logo in both cart-page header and footer", () => {
    const source = readFileSync(cartPagePath, "utf8");

    expect(source.split(faithfulLogoUrl).length - 1).toBe(2);
    expect(source).toContain('alt="Edwards Amplification"');
  });

  it("uses a compact complete mark on mobile headers", () => {
    const homeSource = readFileSync(homePagePath, "utf8");
    const cartSource = readFileSync(cartPagePath, "utf8");

    expect(homeSource).toContain('className="h-8 w-auto sm:h-[44px] lg:h-[52.8px]"');
    expect(cartSource).toContain('className="h-8 w-auto sm:h-[44px]"');
  });

  it("ships a derived Edwards favicon and references it from the page head", () => {
    const indexHtml = readFileSync(indexHtmlPath, "utf8");

    expect(existsSync(faviconPath)).toBe(true);
    expect(indexHtml).toContain('rel="icon" type="image/png" sizes="128x128" href="/favicon.png"');
  });
});
