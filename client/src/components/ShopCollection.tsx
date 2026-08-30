import { useEffect, useMemo, useState } from "react";
import { Loader2, Music2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResponsiveImage from "@/components/ResponsiveImage";
import { ampProducts } from "@/lib/ampData";
import { getShopGroupLabel, getVisibleShopGroups, isShopCategoryFilter, SHOP_CATEGORY_FILTERS, type ShopCategoryFilter } from "@/lib/shopFilters";
import { getProductDetailPath, SHOPIFY_PRODUCT_OPTIONS, type ShopifyProductKey } from "@shared/shopifyCatalog";

const shopAnchorCards = SHOPIFY_PRODUCT_OPTIONS.map((product) => {
  const amp = product.ampSlug ? ampProducts.find((candidate) => candidate.slug === product.ampSlug) : undefined;

  return {
    ...product,
    id: product.key,
    name: product.displayName,
    priceLabel: product.fallbackPriceLabel,
    image: amp?.heroImage ?? product.image ?? "",
    mobileImage: amp?.heroImageMobile ?? product.image ?? "",
    alt: amp?.heroAlt ?? product.imageAlt ?? product.displayName,
    imageFit: amp ? "cover" : product.imageFit ?? "cover",
  };
});

type LiveProduct = {
  name: string;
  priceLabel: string;
  availableForSale: boolean;
};

type ShopCollectionProps = {
  cartCount: number;
  productsByKey: Record<string, LiveProduct>;
  isCartBusy: boolean;
  isAddingProductToCart: (productKey: ShopifyProductKey) => boolean;
  addToCart: (productKey: ShopifyProductKey) => Promise<void>;
};

export default function ShopCollection({
  cartCount,
  productsByKey,
  isCartBusy,
  isAddingProductToCart,
  addToCart,
}: ShopCollectionProps) {
  const [shopCategoryFilter, setShopCategoryFilter] = useState<ShopCategoryFilter>("all");
  const visibleShopGroups = useMemo(() => getVisibleShopGroups(shopCategoryFilter), [shopCategoryFilter]);
  const visibleShopProductCount = useMemo(
    () => shopAnchorCards.filter((product) => shopCategoryFilter === "all" || product.group === shopCategoryFilter).length,
    [shopCategoryFilter],
  );
  const selectedCategoryLabel = SHOP_CATEGORY_FILTERS.find((filter) => filter.value === shopCategoryFilter)?.label ?? "All products";

  useEffect(() => {
    const selectCategory = (event: Event) => {
      const category = (event as CustomEvent<unknown>).detail;
      if (isShopCategoryFilter(category)) setShopCategoryFilter(category);
    };

    window.addEventListener("edwards:select-shop-category", selectCategory);
    return () => window.removeEventListener("edwards:select-shop-category", selectCategory);
  }, []);

  return (
    <section id="shop" className="container border-b border-white/10 py-12 lg:py-16">
      <div className="flex flex-col gap-6 border border-white/10 bg-card/35 p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
        <div className="max-w-3xl">
          <p className="section-kicker">Shop</p>
          <h2 className="section-title">Built to be played, ready to be ordered.</h2>
          <p className="section-copy mt-6">Browse the full Edwards lineup, choose the format that fits your rig, and add it to the cart when you are ready.</p>
        </div>
        <a href="/cart" className="inline-flex items-center justify-center border border-primary/50 bg-primary px-6 py-5 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-primary/90">
          <ShoppingBag className="mr-2 h-4 w-4" />
          View cart · {cartCount}
        </a>
      </div>

      <div className="mt-8" id="shop-products">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-primary/80">Full collection</p>
            <h3 className="mt-3 font-display text-4xl leading-tight text-foreground">Shop the Edwards lineup</h3>
          </div>
          <p className="max-w-xl text-sm leading-6 text-foreground/65">Amplifiers, effects pedals, speaker cabinets, and Edwards merch are all listed as separate store items.</p>
        </div>

        <div className="mt-10 space-y-14">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter the Edwards shop by category">
            {SHOP_CATEGORY_FILTERS.map((filter) => {
              const isSelected = shopCategoryFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setShopCategoryFilter(filter.value)}
                  className={`rounded-none border px-4 py-3 text-[0.67rem] uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isSelected
                      ? "border-primary/70 bg-primary text-primary-foreground"
                      : "border-white/15 bg-black/20 text-foreground/70 hover:border-primary/45 hover:text-primary"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          <p className="-mt-7 text-sm text-foreground/55" aria-live="polite">
            Showing {visibleShopProductCount} {visibleShopProductCount === 1 ? "product" : "products"}
            {shopCategoryFilter === "all" ? " across the full collection." : ` in ${selectedCategoryLabel.toLowerCase()}.`}
          </p>

          {visibleShopGroups.map((group) => {
            const products = shopAnchorCards.filter((product) => product.group === group);
            if (products.length === 0) return null;

            return (
              <section key={group} aria-labelledby={`shop-group-${group.replaceAll(" ", "-").toLowerCase()}`}>
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="h-px w-8 bg-primary/65" />
                  <h4 id={`shop-group-${group.replaceAll(" ", "-").toLowerCase()}`} className="text-[0.7rem] uppercase tracking-[0.28em] text-foreground/60">
                    {getShopGroupLabel(group)}
                  </h4>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => {
                    const liveProduct = productsByKey[product.id];
                    const isAvailable = liveProduct?.availableForSale ?? true;
                    const isAddingProduct = isAddingProductToCart(product.id);

                    return (
                      <article key={product.id} className="group flex h-full flex-col border border-white/10 bg-card/55 transition-colors duration-500 hover:border-primary/35 hover:bg-card">
                        {product.image ? (
                          <div className="aspect-[4/4.8] overflow-hidden border-b border-white/10 bg-black/40">
                            <ResponsiveImage
                              desktopSrc={product.image}
                              mobileSrc={product.mobileImage || product.image}
                              alt={product.alt}
                              className={`h-full w-full ${product.imageFit === "contain" ? "object-contain p-3" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.03]`}
                              pictureClassName="block h-full w-full"
                            />
                          </div>
                        ) : (
                          <div className="flex aspect-[4/2.15] flex-col justify-between border-b border-white/10 bg-[radial-gradient(circle_at_78%_18%,rgba(196,157,92,0.15),transparent_38%),linear-gradient(135deg,rgba(34,29,24,0.88),rgba(7,7,6,0.96))] p-6">
                            <Music2 className="h-7 w-7 text-primary/85" />
                            <p className="max-w-[12rem] font-display text-3xl leading-tight text-foreground/88">{getShopGroupLabel(product.group)}</p>
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-6">
                          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-primary/80">{liveProduct?.availableForSale ? product.eyebrow : "Temporarily unavailable"}</p>
                          <h5 className="mt-3 font-display text-3xl leading-tight text-foreground">{liveProduct?.name ?? product.name}</h5>
                          <p className="mt-3 text-sm leading-6 text-foreground/68">{product.subtitle}</p>
                          <p className="mt-5 text-[0.7rem] uppercase tracking-[0.24em] text-foreground/45">Starting at</p>
                          <p className="mt-2 font-display text-2xl text-primary">{liveProduct?.priceLabel ?? product.priceLabel}</p>
                          <p className="mt-4 flex-1 text-sm leading-6 text-foreground/62">{product.description}</p>

                          <div className="mt-8 flex flex-col gap-3">
                            <Button
                              className="rounded-none border border-primary/50 bg-primary px-5 py-5 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-foreground/45"
                              onClick={() => addToCart(product.id)}
                              disabled={!isAvailable || isCartBusy || isAddingProduct}
                            >
                              {isAddingProduct ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingBag className="mr-2 h-4 w-4" />}
                              {!isAvailable ? "Unavailable" : isAddingProduct ? "Adding…" : "Add to cart"}
                            </Button>
                            <Button asChild variant="outline" className="rounded-none border border-white/15 bg-transparent px-5 py-5 text-[0.7rem] uppercase tracking-[0.22em] text-foreground hover:border-primary/40 hover:text-primary">
                              <a href={getProductDetailPath(product)}>View product</a>
                            </Button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
