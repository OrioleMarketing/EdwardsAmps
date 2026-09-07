import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("homepage lineup copy", () => {
  it("describes a varied amplifier lineup without limiting the brand to five amps", () => {
    const homePage = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(homePage).toContain("A lineup of distinct amps, each voiced for a different feel, sound, and musical job.");
    expect(homePage).not.toContain("Five distinct amps");
  });
});
