import { describe, expect, it } from "vitest";
import { getShopGroupLabel, getVisibleShopGroups, HERO_SHOP_CATEGORIES, isShopCategoryFilter, SHOP_CATEGORY_FILTERS } from "../client/src/lib/shopFilters";
import { orderShopProducts, SHOPIFY_PRODUCT_OPTIONS } from "../shared/shopifyCatalog";

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

  it("shows Elusive, King Richard, and Hot Mama heads before the matching combo formats", () => {
    const amplifierKeys = orderShopProducts(
      SHOPIFY_PRODUCT_OPTIONS.filter((product) => product.group === "Amplifiers"),
    ).map((product) => product.key);

    expect(amplifierKeys).toEqual([
      "elusive-overdrive-24w-head",
      "elusive-overdrive-40w-head",
      "king-richard-head",
      "hot-mama-head",
      "elusive-overdrive-24w-combo",
      "elusive-overdrive-40w-combo",
      "hot-mama-combo",
      "double-dee-tweed-combo",
      "lil-tyke-tweed-combo",
      "princess-reverb-combo",
      "queen-reverb-combo",
      "69-73-combo",
    ]);
  });
});
