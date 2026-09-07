import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("homepage lineup copy", () => {
  it("describes a varied amplifier lineup without limiting the brand to five amps", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain("A lineup of distinct amps, each voiced for a different feel, sound, and musical job.");
    expect(homePage).not.toContain("Five distinct amps");
  });

  it("uses a dedicated stage image for the Speaker cabinets category card", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain('const speakerCabinetCategoryImage = "/manus-storage/speaker-cabinets-category-desktop_f9332c34.webp";');
    expect(homePage).toContain('const speakerCabinetCategoryImageMobile = "/manus-storage/speaker-cabinets-category-mobile_5aee3f6f.webp";');
    expect(homePage).toContain('desktopSrc: speakerCabinetCategoryImage');
    expect(homePage).toContain('mobileSrc: speakerCabinetCategoryImageMobile');
    expect(homePage).toContain('alt: "Edwards speaker cabinet on a warm performance stage, angled slightly left"');
  });

  it("uses a dedicated stage image for the Amplifiers category card", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain('const amplifiersCategoryImage = "/manus-storage/amplifiers-category-desktop_cd6c648a.webp";');
    expect(homePage).toContain('const amplifiersCategoryImageMobile = "/manus-storage/amplifiers-category-mobile_925db6de.webp";');
    expect(homePage).toContain('desktopSrc: amplifiersCategoryImage');
    expect(homePage).toContain('mobileSrc: amplifiersCategoryImageMobile');
    expect(homePage).toContain('alt: "Edwards amplifier and matching cabinet on a warm performance stage"');
  });

  it("uses the performer-view pedalboard scene only for the Effects pedals category", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain('const effectsPedalsCategoryImage = "/manus-storage/effects-pedals-category-desktop_20f9fa40.webp";');
    expect(homePage).toContain('const effectsPedalsCategoryImageMobile = "/manus-storage/effects-pedals-category-mobile_9c1e3c94.webp";');
    expect(homePage).toContain('desktopSrc: effectsPedalsCategoryImage');
    expect(homePage).toContain('mobileSrc: effectsPedalsCategoryImageMobile');
    expect(homePage).toContain('alt: "Edwards pedalboard on stage from a performer\'s viewpoint with Elusive Overdrive centered"');
    expect(homePage).toContain('imageClassName: "object-cover"');
  });

  it("features the Neville Guitar custom build with the Elusive Overdrive amp", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain('Elusive Overdrive with a Neville Guitar custom build');
    expect(homePage).toContain('image: "/manus-storage/neville-featured-pairing-desktop_33352faf.webp"');
    expect(homePage).toContain('mobileImage: "/manus-storage/neville-featured-pairing-mobile_539b087a.webp"');
    expect(homePage).toContain('alt: "Neville Guitar custom build paired with the Edwards Elusive Overdrive amplifier"');
    expect(homePage).toContain('Elusive Overdrive alongside a Neville Guitar custom build');
    expect(homePage).not.toContain("Jon Kammerer");
  });

  it("links the Neville Guitar featured pairing to the supplied external website", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain('href="https://www.nevilleguitars.com/"');
    expect(homePage).toContain('target="_blank"');
    expect(homePage).toContain('rel="noreferrer"');
    expect(homePage).toContain("Visit Neville Guitars");
  });
});
