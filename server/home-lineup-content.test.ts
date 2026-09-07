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

    expect(homePage).toContain('const speakerCabinetCategoryImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/oyCouNzgwsXcCoCJ.png";');
    expect(homePage).toContain('desktopSrc: speakerCabinetCategoryImage');
    expect(homePage).toContain('mobileSrc: speakerCabinetCategoryImage');
    expect(homePage).toContain('alt: "Edwards speaker cabinet on a warm performance stage, angled slightly left"');
  });

  it("uses a dedicated stage image for the Amplifiers category card", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain('const amplifiersCategoryImage = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/HxWvXrXByRutKLRu.png";');
    expect(homePage).toContain('desktopSrc: amplifiersCategoryImage');
    expect(homePage).toContain('mobileSrc: amplifiersCategoryImage');
    expect(homePage).toContain('alt: "Edwards amplifier and matching cabinet on a warm performance stage"');
  });

  it("uses the performer-view pedalboard scene only for the Effects pedals category", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain('desktopSrc: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/neTvaNnewbtGWlJi.png"');
    expect(homePage).toContain('mobileSrc: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/neTvaNnewbtGWlJi.png"');
    expect(homePage).toContain('alt: "Edwards pedalboard on stage from a performer\'s viewpoint with Elusive Overdrive centered"');
    expect(homePage).toContain('imageClassName: "object-cover"');
  });

  it("features the Neville Guitar custom build with the Elusive Overdrive amp", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain('Elusive Overdrive with a Neville Guitar custom build');
    expect(homePage).toContain('image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/yAHIhJMJHoggjcEH.png"');
    expect(homePage).toContain('alt: "Neville Guitar custom build paired with the Edwards Elusive Overdrive amplifier"');
    expect(homePage).not.toContain("Jon Kammerer custom guitar");
  });
});
