import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const EDWARDS_S3_IMAGE_ORIGIN = "https://edwardsamps.s3.us-east-2.amazonaws.com/storefront-images/2026-09-08";

describe("homepage lineup copy", () => {
  it("describes a varied amplifier lineup without limiting the brand to five amps", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain("A lineup of distinct amps, each voiced for a different feel, sound, and musical job.");
    expect(homePage).not.toContain("Five distinct amps");
  });

  it("uses a dedicated stage image for the Speaker cabinets category card", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain(`const speakerCabinetCategoryImage = "${EDWARDS_S3_IMAGE_ORIGIN}/QZxNmKvYnOHoENlZ.webp";`);
    expect(homePage).toContain(`const speakerCabinetCategoryImageMobile = "${EDWARDS_S3_IMAGE_ORIGIN}/kZffwAGRJsOnchsO.webp";`);
    expect(homePage).toContain('desktopSrc: speakerCabinetCategoryImage');
    expect(homePage).toContain('mobileSrc: speakerCabinetCategoryImageMobile');
    expect(homePage).toContain('alt: "Edwards speaker cabinet on a warm performance stage, angled slightly left"');
  });

  it("uses a dedicated stage image for the Amplifiers category card", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain(`const amplifiersCategoryImage = "${EDWARDS_S3_IMAGE_ORIGIN}/ZPyYfaSjcTVZaqIP.webp";`);
    expect(homePage).toContain(`const amplifiersCategoryImageMobile = "${EDWARDS_S3_IMAGE_ORIGIN}/knqfHvhehEaCcoEx.webp";`);
    expect(homePage).toContain('desktopSrc: amplifiersCategoryImage');
    expect(homePage).toContain('mobileSrc: amplifiersCategoryImageMobile');
    expect(homePage).toContain('alt: "Edwards amplifier and matching cabinet on a warm performance stage"');
  });

  it("uses the performer-view pedalboard scene only for the Effects pedals category", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain(`const effectsPedalsCategoryImage = "${EDWARDS_S3_IMAGE_ORIGIN}/KeJvMTcYDDOXenQu.webp";`);
    expect(homePage).toContain(`const effectsPedalsCategoryImageMobile = "${EDWARDS_S3_IMAGE_ORIGIN}/hvLWdtudqPiJInKQ.webp";`);
    expect(homePage).toContain('desktopSrc: effectsPedalsCategoryImage');
    expect(homePage).toContain('mobileSrc: effectsPedalsCategoryImageMobile');
    expect(homePage).toContain('alt: "Edwards pedalboard on stage from a performer\'s viewpoint with Elusive Overdrive centered"');
    expect(homePage).toContain('imageClassName: "object-cover"');
  });

  it("features the Neville Guitar custom build with the Elusive Overdrive amp", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain('Elusive Overdrive with a Neville Guitar custom build');
    expect(homePage).toContain(`image: "${EDWARDS_S3_IMAGE_ORIGIN}/gfnyIPpyeyUrqmWb.webp"`);
    expect(homePage).toContain(`mobileImage: "${EDWARDS_S3_IMAGE_ORIGIN}/OiDEUFpMVypMFwSu.webp"`);
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
