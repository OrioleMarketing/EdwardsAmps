import { describe, expect, it } from "vitest";
import { getShopGroupLabel, getVisibleShopGroups, HERO_SHOP_CATEGORIES, isShopCategoryFilter, SHOP_CATEGORY_FILTERS } from "../client/src/lib/shopFilters";

describe("shop category filtering", () => {
  it("offers all requested shopper categories and preserves the existing cabinet category", () => {
    expect(SHOP_CATEGORY_FILTERS.map((filter) => filter.label)).toEqual([
      "All products",
      "Amplifiers",
      "Pedals",
      "Cabinets",
      "Merch",
    ]);
  });

  it("returns only the selected category or every category for the full collection", () => {
    expect(getVisibleShopGroups("Effects pedals")).toEqual(["Effects pedals"]);
    expect(getVisibleShopGroups("Apparel")).toEqual(["Apparel"]);
    expect(getVisibleShopGroups("all")).toEqual(["Amplifiers", "Effects pedals", "Speaker cabinets", "Apparel"]);
  });

  it("uses Merch for customer-facing Apparel labels while retaining the Shopify group value", () => {
    expect(getShopGroupLabel("Apparel")).toBe("Merch");
    expect(getShopGroupLabel("Effects pedals")).toBe("Effects pedals");
  });

  it("keeps the hero category pathway in the requested order", () => {
    expect(HERO_SHOP_CATEGORIES.map((category) => category.value)).toEqual([
      "Amplifiers",
      "Effects pedals",
      "Speaker cabinets",
    ]);
    expect(isShopCategoryFilter("Effects pedals")).toBe(true);
    expect(isShopCategoryFilter("Not a category")).toBe(false);
  });
});
