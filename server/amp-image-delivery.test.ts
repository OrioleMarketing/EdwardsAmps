import { describe, expect, it } from "vitest";
import { ampProducts } from "../client/src/lib/ampData";

describe("responsive amplifier imagery", () => {
  it("uses optimized direct WebP sources for desktop and mobile", () => {
    expect(ampProducts).toHaveLength(5);

    for (const amp of ampProducts) {
      expect(amp.heroImage, `${amp.name} desktop image`).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.webp$/);
      expect(amp.heroImageMobile, `${amp.name} mobile image`).toMatch(/^https:\/\/files\.manuscdn\.com\/.+\.webp$/);
    }
  });

  it("preserves the approved staged product-photo mapping for every legacy amplifier", () => {
    const imageSources = Object.fromEntries(
      ampProducts.map((amp) => [amp.slug, { desktop: amp.heroImage, mobile: amp.heroImageMobile }]),
    );

    expect(imageSources).toEqual({
      "elusive-overdrive": {
        desktop: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/AkIGNUKzXVdWQQRV.webp",
        mobile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/RerpBsxEpoTUjpDa.webp",
      },
      "king-richard": {
        desktop: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/FskotkbyWnSwzneo.webp",
        mobile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/DqgMMemmxyyfaHUl.webp",
      },
      "hot-mama": {
        desktop: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/iATUaSsbPuhgrdpr.webp",
        mobile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/UnUvJoTpPSvfSPxc.webp",
      },
      "double-dee-tweed": {
        desktop: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/OIgQQWNzVtorOVlC.webp",
        mobile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/zOmfdgZmZQygMBIk.webp",
      },
      "lil-tyke-tweed": {
        desktop: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/PmBhGnQSHJIpFbVC.webp",
        mobile: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/qtgYJNyBHhKQkbDD.webp",
      },
    });
  });
});
