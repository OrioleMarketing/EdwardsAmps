import type { ShopifyProductGroup } from "@shared/shopifyCatalog";

export type ShopCategoryFilter = "all" | ShopifyProductGroup;

export const SHOP_CATEGORY_FILTERS: ReadonlyArray<{ value: ShopCategoryFilter; label: string }> = [
  { value: "all", label: "All products" },
  { value: "Amplifiers", label: "Amplifiers" },
  { value: "Effects pedals", label: "Pedals" },
  { value: "Speaker cabinets", label: "Cabinets" },
  { value: "Apparel", label: "Merch" },
];

export const SHOP_PRODUCT_GROUPS: ShopifyProductGroup[] = ["Amplifiers", "Effects pedals", "Speaker cabinets", "Apparel"];

export function getVisibleShopGroups(filter: ShopCategoryFilter): ShopifyProductGroup[] {
  return filter === "all" ? SHOP_PRODUCT_GROUPS : [filter];
}

export function getShopGroupLabel(group: ShopifyProductGroup): string {
  return group === "Apparel" ? "Merch" : group;
}
