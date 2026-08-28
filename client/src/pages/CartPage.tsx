import { Button } from "@/components/ui/button";
import { useShopifyCart } from "@/hooks/useShopifyCart";
import { getProductDetailPath, SHOPIFY_PRODUCT_OPTIONS_BY_HANDLE } from "@shared/shopifyCatalog";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag } from "lucide-react";

const quantityLabel = (count: number) => `${count} ${count === 1 ? "item" : "items"}`;

export default function CartPage() {
  const { addToCart, cart, isAddingToCart, isCartLoading, isUpdatingCart, productsByKey, updateCartLine } = useShopifyCart();
  const lines = cart?.lines ?? [];
  const isBusy = isAddingToCart || isUpdatingCart;

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
          <a href="/#shop" className="text-[0.7rem] uppercase tracking-[0.22em] text-foreground/68 transition-colors hover:text-primary">
            Continue shopping
          </a>
        </div>
      </header>

      <main className="container py-10 sm:py-14 lg:py-20">
        <a href="/#shop" className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-foreground/62 transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </a>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
          <section>
            <p className="section-kicker">Cart</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.98] text-foreground sm:text-6xl">Your selected gear.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/72">Review your selections, adjust quantities, and continue to secure checkout when you are ready.</p>

            {isCartLoading ? (
              <div className="mt-8 border border-white/10 bg-card/45 p-8 text-sm uppercase tracking-[0.22em] text-foreground/52">Loading your cart</div>
            ) : lines.length === 0 ? (
              <div className="mt-8 border border-dashed border-white/15 bg-card/35 p-8 sm:p-10">
                <ShoppingBag className="h-9 w-9 text-primary" />
                <h2 className="mt-5 font-display text-3xl leading-tight text-foreground">Your cart is empty.</h2>
                <p className="mt-4 max-w-md text-base leading-7 text-foreground/64">Browse the Edwards Shop to find the amplifier, cabinet, pedal, or apparel item that fits your rig.</p>
                <Button asChild className="mt-7 rounded-none border border-primary/50 bg-primary px-6 py-5 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90">
                  <a href="/#shop">Shop Edwards</a>
                </Button>
              </div>
            ) : (
              <div className="mt-8 space-y-4">
                {lines.map((line) => {
                  const product = SHOPIFY_PRODUCT_OPTIONS_BY_HANDLE[line.productHandle];
                  const liveProduct = product ? productsByKey[product.key] : undefined;
                  const title = liveProduct?.name ?? line.productTitle;
                  const productPath = product ? getProductDetailPath(product) : "/#shop";

                  return (
                    <article key={line.id} className="border border-white/10 bg-card/45 p-5 sm:p-6">
                      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-primary/80">Edwards Amplification</p>
                          <h2 className="mt-2 font-display text-3xl leading-tight text-foreground">{title}</h2>
                          {line.variantTitle !== "Default Title" ? <p className="mt-2 text-sm leading-6 text-foreground/62">{line.variantTitle}</p> : null}
                          <a href={productPath} className="mt-4 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-foreground/55 transition-colors hover:text-primary">
                            View product
                            <ArrowRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                        <p className="font-display text-3xl text-primary">{line.linePriceLabel}</p>
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                        <div className="flex items-center border border-white/10 bg-black/20">
                          <button
                            type="button"
                            aria-label={`Decrease quantity for ${title}`}
                            className="inline-flex h-10 w-10 items-center justify-center border-r border-white/10 text-foreground transition-colors hover:text-primary disabled:text-foreground/30"
                            onClick={() => updateCartLine(line.id, line.quantity - 1)}
                            disabled={isBusy}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="inline-flex min-w-12 items-center justify-center px-3 text-sm uppercase tracking-[0.18em] text-foreground/82">{line.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase quantity for ${title}`}
                            className="inline-flex h-10 w-10 items-center justify-center border-l border-white/10 text-foreground transition-colors hover:text-primary disabled:text-foreground/30"
                            onClick={() => product && addToCart(product.key)}
                            disabled={isBusy || !product}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm uppercase tracking-[0.2em] text-foreground/48">{quantityLabel(line.quantity)}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <aside className="border border-white/10 bg-[#14110e] p-6 sm:p-8 lg:sticky lg:top-28">
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-primary/80">Order summary</p>
            <div className="mt-6 flex items-end justify-between gap-4 border-b border-white/10 pb-5">
              <span className="text-sm uppercase tracking-[0.2em] text-foreground/55">Subtotal</span>
              <span className="font-display text-3xl text-primary">{cart?.subtotalLabel ?? "$0"}</span>
            </div>
            <p className="mt-5 text-sm leading-6 text-foreground/58">Shipping, taxes, and payment are confirmed during secure checkout.</p>
            {cart?.checkoutUrl ? (
              <Button asChild className="mt-7 w-full rounded-none border border-primary/50 bg-primary px-5 py-5 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90">
                <a href={cart.checkoutUrl}>Proceed to checkout</a>
              </Button>
            ) : (
              <Button className="mt-7 w-full rounded-none border border-primary/50 bg-primary px-5 py-5 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground" disabled>
                Proceed to checkout
              </Button>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
