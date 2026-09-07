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
});
