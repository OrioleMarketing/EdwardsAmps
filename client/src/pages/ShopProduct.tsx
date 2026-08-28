import { Button } from "@/components/ui/button";
import { useShopifyCart } from "@/hooks/useShopifyCart";
import { ArrowLeft, ArrowRight, Music2, ShoppingBag } from "lucide-react";
import { SHOPIFY_PRODUCT_OPTIONS_BY_HANDLE } from "@shared/shopifyCatalog";

export default function ShopProduct({ handle }: { handle: string }) {
  const product = SHOPIFY_PRODUCT_OPTIONS_BY_HANDLE[handle];
  const { addToCart, cart, isAddingToCart, isCatalogLoading, productsByKey } = useShopifyCart();

  if (!product) {
    return null;
  }

  const liveProduct = productsByKey[product.key];
  const title = liveProduct?.name ?? product.displayName;
  const priceLabel = liveProduct?.priceLabel ?? product.fallbackPriceLabel;
  const isAvailable = liveProduct?.availableForSale ?? !isCatalogLoading;
  const cartCount = cart?.totalQuantity ?? 0;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground">
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] mix-blend-screen noise-overlay" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-4 py-4">
          <a href="/" className="flex items-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/branding/edwards-logo-original-white_8e37cbec.png"
              alt="Edwards Amplification"
              className="h-[39.6px] w-auto sm:h-[44px]"
            />
          </a>
          <a href="/#shop" className="inline-flex items-center gap-2 border border-white/15 bg-card/80 px-4 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <ShoppingBag className="h-4 w-4" />
            <span>{`Cart · ${cartCount}`}</span>
          </a>
        </div>
      </header>

      <main>
        <section className="container py-10 sm:py-14 lg:py-20">
          <a href="/#shop" className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-foreground/62 transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </a>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <div className="flex min-h-72 flex-col justify-between border border-white/10 bg-[radial-gradient(circle_at_76%_18%,rgba(196,157,92,0.17),transparent_35%),linear-gradient(135deg,rgba(35,29,24,0.9),rgba(8,8,7,0.98))] p-8 sm:p-10">
              <Music2 className="h-9 w-9 text-primary" />
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-primary/80">{product.group}</p>
                <p className="mt-4 max-w-sm font-display text-4xl leading-tight text-foreground/90">Edwards Amplification</p>
              </div>
            </div>

            <div className="border border-white/10 bg-card/45 p-8 sm:p-10">
              <p className="section-kicker">{product.eyebrow}</p>
              <h1 className="mt-4 font-display text-5xl leading-[0.98] text-foreground sm:text-6xl">{title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/76">{product.subtitle}</p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/62">{product.description}</p>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-y border-white/10 py-6">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-foreground/48">Price</p>
                  <p className="mt-2 font-display text-3xl text-primary">{priceLabel}</p>
                </div>
                <p className={`text-[0.68rem] uppercase tracking-[0.24em] ${isAvailable ? "text-primary/85" : "text-foreground/45"}`}>
                  {isAvailable ? "Available to order" : "Temporarily unavailable"}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="rounded-none border border-primary/50 bg-primary px-6 py-6 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-foreground/45"
                  onClick={() => addToCart(product.key)}
                  disabled={!isAvailable || isAddingToCart}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {isAvailable ? "Add to cart" : "Unavailable"}
                </Button>
                <Button asChild variant="outline" className="rounded-none border border-white/15 bg-transparent px-6 py-6 text-[0.7rem] uppercase tracking-[0.22em] text-foreground hover:border-primary/40 hover:text-primary">
                  <a href="/#shop">
                    Continue shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
