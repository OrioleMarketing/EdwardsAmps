import { useMemo, useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import type { ShopifyProductKey } from "@shared/shopifyCatalog";

export function useShopifyCart() {
  const utils = trpc.useUtils();
  const catalogQuery = trpc.shopify.catalog.useQuery();
  const cartQuery = trpc.shopify.cart.useQuery();
  const [pendingProductKeys, setPendingProductKeys] = useState<Set<ShopifyProductKey>>(new Set());

  const addToCartMutation = trpc.shopify.addToCart.useMutation({
    onSuccess: async () => {
      await cartQuery.refetch();
      toast("Added to cart.", {
        description: "Your selected amp has been added to the cart.",
      });
    },
    onError: (error) => {
      toast("Unable to add this amp right now.", {
        description: error.message,
      });
    },
  });

  const updateCartLineMutation = trpc.shopify.updateCartLine.useMutation({
    onSuccess: async () => {
      await utils.shopify.cart.invalidate();
    },
    onError: (error) => {
      toast("Unable to update the cart.", {
        description: error.message,
      });
    },
  });

  const products = catalogQuery.data?.products ?? [];
  const cart = cartQuery.data?.cart;

  const productsByKey = useMemo(
    () => Object.fromEntries(products.map((product) => [product.key, product])) as Record<string, (typeof products)[number]>,
    [products],
  );

  return {
    products,
    productsByKey,
    cart,
    isCatalogLoading: catalogQuery.isLoading,
    isCartLoading: cartQuery.isLoading,
    isAddingProductToCart: (productKey: ShopifyProductKey) => pendingProductKeys.has(productKey),
    isUpdatingCart: updateCartLineMutation.isPending,
    addToCart: async (productKey: ShopifyProductKey, quantity = 1) => {
      setPendingProductKeys(current => new Set(current).add(productKey));

      try {
        await addToCartMutation.mutateAsync({ productKey, quantity });
      } finally {
        setPendingProductKeys(current => {
          const next = new Set(current);
          next.delete(productKey);
          return next;
        });
      }
    },
    updateCartLine: (lineId: string, quantity: number) => updateCartLineMutation.mutate({ lineId, quantity }),
  };
}
