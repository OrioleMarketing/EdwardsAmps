import { describe, expect, it } from "vitest";
import { getVisibleShopGroups, SHOP_CATEGORY_FILTERS } from "../client/src/lib/shopFilters";

describe("shop category filtering", () => {
  it("offers all requested shopper categories and preserves the existing cabinet category", () => {
    expect(SHOP_CATEGORY_FILTERS.map((filter) => filter.label)).toEqual([
      "All products",
      "Amplifiers",
      "Pedals",
      "Apparel",
      "Cabinets",
    ]);
  });

  it("returns only the selected category or every category for the full collection", () => {
    expect(getVisibleShopGroups("Effects pedals")).toEqual(["Effects pedals"]);
    expect(getVisibleShopGroups("Apparel")).toEqual(["Apparel"]);
    expect(getVisibleShopGroups("all")).toEqual(["Amplifiers", "Speaker cabinets", "Effects pedals", "Apparel"]);
  });
});
