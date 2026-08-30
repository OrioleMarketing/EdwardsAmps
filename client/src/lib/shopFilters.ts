import type { ShopifyProductGroup } from "@shared/shopifyCatalog";

export type ShopCategoryFilter = "all" | ShopifyProductGroup;
export type HeroShopCategory = "Amplifiers" | "Effects pedals" | "Speaker cabinets";

export const SHOP_CATEGORY_FILTERS: ReadonlyArray<{ value: ShopCategoryFilter; label: string }> = [
  { value: "all", label: "All products" },
  { value: "Amplifiers", label: "Amplifiers" },
  { value: "Effects pedals", label: "Pedals" },
  { value: "Speaker cabinets", label: "Cabinets" },
  { value: "Apparel", label: "Merch" },
];

export const SHOP_PRODUCT_GROUPS: ShopifyProductGroup[] = ["Amplifiers", "Effects pedals", "Speaker cabinets", "Apparel"];

export const HERO_SHOP_CATEGORIES: ReadonlyArray<{
  value: HeroShopCategory;
  title: string;
  description: string;
  action: string;
}> = [
  { value: "Amplifiers", title: "Amplifiers", description: "Find the Edwards voice and format that fits your rig.", action: "Shop amplifiers" },
  { value: "Effects pedals", title: "Pedals", description: "Shape drive, fuzz, and octave character from the floor up.", action: "Shop pedals" },
  { value: "Speaker cabinets", title: "Speaker cabinets", description: "Build the cabinet foundation for an Edwards head rig.", action: "Shop cabinets" },
];

export function getVisibleShopGroups(filter: ShopCategoryFilter): ShopifyProductGroup[] {
  return filter === "all" ? SHOP_PRODUCT_GROUPS : [filter];
}

export function getShopGroupLabel(group: ShopifyProductGroup): string {
  return group === "Apparel" ? "Merch" : group;
}

export function isShopCategoryFilter(value: unknown): value is ShopCategoryFilter {
  return value === "all" || SHOP_PRODUCT_GROUPS.includes(value as ShopifyProductGroup);
}
