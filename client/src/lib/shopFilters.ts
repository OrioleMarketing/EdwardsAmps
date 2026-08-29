import type { ShopifyProductGroup } from "@shared/shopifyCatalog";

export type ShopCategoryFilter = "all" | ShopifyProductGroup;

export const SHOP_CATEGORY_FILTERS: ReadonlyArray<{ value: ShopCategoryFilter; label: string }> = [
  { value: "all", label: "All products" },
  { value: "Amplifiers", label: "Amplifiers" },
  { value: "Effects pedals", label: "Pedals" },
  { value: "Apparel", label: "Apparel" },
  { value: "Speaker cabinets", label: "Cabinets" },
];

export const SHOP_PRODUCT_GROUPS: ShopifyProductGroup[] = ["Amplifiers", "Speaker cabinets", "Effects pedals", "Apparel"];

export function getVisibleShopGroups(filter: ShopCategoryFilter): ShopifyProductGroup[] {
  return filter === "all" ? SHOP_PRODUCT_GROUPS : [filter];
}
