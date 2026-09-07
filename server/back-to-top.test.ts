import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Back to top control", () => {
  it("is rendered globally by the app shell", () => {
    const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");

    expect(app).toContain('import BackToTop from "@/components/BackToTop"');
    expect(app).toContain("<BackToTop />");
  });

  it("uses an accessible, threshold-based control that honors reduced-motion preferences", () => {
    const component = readFileSync(resolve(process.cwd(), "client/src/components/BackToTop.tsx"), "utf8");

    expect(component).toContain("const SCROLL_THRESHOLD = 400");
    expect(component).toContain('window.addEventListener("scroll", updateVisibility, { passive: true })');
    expect(component).toContain('aria-label="Back to top"');
    expect(component).toContain('window.matchMedia("(prefers-reduced-motion: reduce)").matches');
    expect(component).toContain('window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })');
    expect(component).toContain("focus-visible:ring-2");
  });
});
