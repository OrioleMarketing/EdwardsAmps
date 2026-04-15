/*
Design Philosophy for AmpDetail.tsx
Every product page should feel like a finished boutique catalog spread: tactile imagery, clear player-focused
copy, elegant spacing, and calm confidence. The page should sell the amp itself, not explain the website.
*/

import { Button } from "@/components/ui/button";
import { useShopifyCart } from "@/hooks/useShopifyCart";
import { ampProducts, ampProductsBySlug } from "@/lib/ampData";
import { ArrowLeft, ArrowRight, Music2, PhoneCall, ShoppingBag } from "lucide-react";
import { SHOPIFY_PRODUCT_OPTIONS_BY_AMP } from "@shared/shopifyCatalog";

export default function AmpDetail({ slug }: { slug: string }) {
  const amp = ampProductsBySlug[slug];

  if (!amp) {
    return null;
  }

  const { addToCart, isAddingToCart, productsByKey } = useShopifyCart();
  const relatedAmps = ampProducts.filter((product) => product.slug !== amp.slug);
  const directOrderOptions = SHOPIFY_PRODUCT_OPTIONS_BY_AMP[amp.slug] ?? [];
  const isDirectCheckout = directOrderOptions.length > 0;
  const headerCtaLabel = isDirectCheckout ? "Shop This Amp" : "Ask About This Amp";
  const headerCtaHref = isDirectCheckout ? "#shop-path" : "#inquiry";
  const heroPrimaryLabel = isDirectCheckout ? "View direct order options" : "View specifications";
  const heroPrimaryHref = isDirectCheckout ? "#shop-path" : "#specs";
  const heroSecondaryLabel = "Talk with Edwards";
  const heroSecondaryHref = "#inquiry";
  const heroCommerceNote = isDirectCheckout
    ? "This model now connects into the live Shopify-backed mini cart without leaving the Edwards atmosphere first. Customers can choose a direct-order format here, then move into Shopify checkout only when they are ready."
    : "This model remains consultation-first so pricing, configuration, and build timing can stay accurate before checkout is introduced.";

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground">
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] mix-blend-screen noise-overlay" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-6 py-4">
          <a href="/" className="flex flex-col leading-none">
            <span className="font-display text-2xl uppercase tracking-[0.18em] text-primary">Edwards</span>
            <span className="font-sans text-[0.68rem] uppercase tracking-[0.34em] text-foreground/65">Amplification</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.18em] text-foreground/72 lg:flex">
            <a href="/" className="transition-colors hover:text-primary">Home</a>
            <a href="#overview" className="transition-colors hover:text-primary">Overview</a>
            <a href="#specs" className="transition-colors hover:text-primary">Specifications</a>
            <a href="/#shop" className="transition-colors hover:text-primary">Shop</a>
            <a href="#inquiry" className="transition-colors hover:text-primary">Inquiry</a>
          </nav>

          <Button asChild className="rounded-none border border-primary/50 bg-primary px-5 py-5 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90">
            <a href={headerCtaHref}>{headerCtaLabel}</a>
          </Button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <img
              src={amp.heroImage}
              alt={amp.heroAlt}
              className="h-full w-full object-cover object-center opacity-18"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,0.96)_0%,rgba(8,8,7,0.88)_48%,rgba(8,8,7,0.72)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="container relative grid gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24">
            <div className="max-w-3xl">
              <a
                href="/#lineup"
                className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-foreground/62 transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to lineup
              </a>

              <p className="mt-6 section-kicker">{amp.eyebrow}</p>
              <h1 className="max-w-4xl font-display text-5xl leading-[1] text-foreground sm:text-6xl lg:text-7xl">
                {amp.name}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-foreground/80">{amp.summary}</p>

              <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/50">Starting price</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/78">{amp.price}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/50">Format</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/78">{amp.format}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/50">Best for</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/78">{amp.idealFor}</p>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="rounded-none border border-primary/60 bg-primary px-7 py-6 text-[0.74rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90">
                  <a href={heroPrimaryHref}>
                    {heroPrimaryLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-none border-white/20 bg-black/20 px-7 py-6 text-[0.74rem] uppercase tracking-[0.24em] text-foreground hover:bg-white/8">
                  <a href={heroSecondaryHref}>{heroSecondaryLabel}</a>
                </Button>
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-6 text-foreground/58">{heroCommerceNote}</p>
            </div>

            <div className="relative ml-auto w-full max-w-2xl">
              <div className="relative overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(196,157,92,0.08),rgba(17,15,12,0.92)_58%,rgba(10,9,8,1)_100%)] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="relative aspect-[5/4] overflow-hidden border border-white/6 bg-black/20">
                  <img src={amp.heroImage} alt={amp.heroAlt} className="h-full w-full object-cover object-center" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="overview" className="container py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="section-kicker">Overview</p>
              <h2 className="section-title">What this amp feels like in the room and why players choose it.</h2>
            </div>
            <div>
              <p className="section-copy max-w-none">{amp.intro}</p>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <div className="border border-white/10 bg-card/55 p-6">
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/48">Voice</p>
                  <p className="mt-4 text-lg leading-8 text-foreground/80">{amp.voice}</p>
                </div>
                <div className="border border-white/10 bg-card/55 p-6">
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/48">Ideal for</p>
                  <p className="mt-4 text-lg leading-8 text-foreground/80">{amp.idealFor}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-card/35">
          <div className="container grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:py-28">
            <div>
              <p className="section-kicker">Why players look twice</p>
              <h2 className="section-title">Hand-built details are there to support feel, reliability, and musical range.</h2>
            </div>

            <div className="grid gap-4">
              {amp.highlights.map((highlight, index) => (
                <div key={highlight} className="grid gap-4 border-b border-white/8 pb-5 sm:grid-cols-[auto_1fr] sm:items-start">
                  <div className="flex h-11 w-11 items-center justify-center border border-primary/30 bg-primary/10 text-sm uppercase tracking-[0.18em] text-primary">
                    0{index + 1}
                  </div>
                  <p className="text-lg leading-8 text-foreground/80">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="specs" className="container py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="section-kicker">Specifications</p>
              <h2 className="section-title">The technical side – at a glance.</h2>
              <p className="section-copy mt-6">
                A straightforward view of the key details players usually want first: power, format, core controls, and the build choices that shape how the amp feels in use.
              </p>
            </div>

            <div className="overflow-hidden border border-white/10 bg-card/45">
              <table className="w-full border-collapse text-left">
                <tbody>
                  {amp.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-white/8 align-top last:border-b-0">
                      <th className="w-[34%] px-6 py-5 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-foreground/48">
                        {spec.label}
                      </th>
                      <td className="px-6 py-5 text-base leading-7 text-foreground/76">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,0.86)_0%,rgba(8,8,7,0.94)_100%)]" />
          <div className="container relative grid gap-10 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:py-28">
            <div>
              <p className="section-kicker">In plain English</p>
              <h2 className="section-title">What all of this means once a guitar is plugged in.</h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-foreground/76">
              {amp.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="inquiry" className="container py-20 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="border border-white/10 bg-card/45 p-8 lg:p-10">
              <p className="section-kicker">Ask about {amp.shortName}</p>
              <h2 className="section-title">Talk through availability, wattage, cabinet choices, and whether this model fits your style.</h2>
              <p className="section-copy mt-6 max-w-2xl">{amp.availabilityNote}</p>

              <div id="shop-path" className="mt-8 border border-white/10 bg-[#14110e] p-5">
                <p className="text-[0.68rem] uppercase tracking-[0.26em] text-primary/78">Shop path</p>
                <p className="mt-3 text-sm leading-6 text-foreground/68">
                  {isDirectCheckout
                    ? "This amp is one of the models now connected to the live Shopify mini cart. Choose the direct-order format below to add it immediately without leaving the Edwards site yet."
                    : "This amp stays inquiry-led. The Shop section still features it, but the site intentionally routes this model through conversation instead of generic checkout."}
                </p>

                {isDirectCheckout ? (
                  <div className="mt-6 grid gap-3">
                    {directOrderOptions.map((option) => {
                      const liveProduct = productsByKey[option.key];
                      const isAvailable = liveProduct?.availableForSale ?? true;

                      return (
                        <div key={option.key} className="border border-white/10 bg-black/20 p-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-primary/78">Direct-order option</p>
                              <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">{liveProduct?.name ?? option.displayName}</h3>
                              <p className="mt-2 text-sm leading-6 text-foreground/66">{option.subtitle}</p>
                            </div>
                            <p className="font-display text-2xl text-primary">{liveProduct?.priceLabel ?? option.fallbackPriceLabel}</p>
                          </div>
                          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            <Button
                              className="rounded-none border border-primary/50 bg-primary px-5 py-5 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-foreground/45"
                              onClick={() => addToCart(option.key)}
                              disabled={!isAvailable || isAddingToCart}
                            >
                              <ShoppingBag className="mr-2 h-4 w-4" />
                              {isAvailable ? "Add to cart" : "Unavailable"}
                            </Button>
                            <Button asChild variant="outline" className="rounded-none border border-white/15 bg-transparent px-5 py-5 text-[0.7rem] uppercase tracking-[0.22em] text-foreground hover:border-primary/40 hover:text-primary">
                              <a href="/#shop">Open shop section</a>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <a href="tel:+12566048721" className="group flex min-h-44 flex-col justify-between border border-primary/25 bg-primary/10 p-6 transition-colors duration-500 hover:bg-primary/15">
                  <div className="flex items-center justify-between">
                    <PhoneCall className="h-5 w-5 text-primary" />
                    <ArrowRight className="h-4 w-4 text-primary transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/52">Call Edwards</p>
                    <p className="mt-3 font-display text-3xl leading-tight text-foreground">(256) 604-8721</p>
                    <p className="mt-3 text-sm leading-6 text-foreground/70">Talk directly about current builds, cabinets, or how this amp compares with the rest of the lineup.</p>
                  </div>
                </a>

                <a href="/#lineup" className="group flex min-h-44 flex-col justify-between border border-white/10 bg-card/60 p-6 transition-colors duration-500 hover:border-primary/30 hover:bg-card">
                  <div className="flex items-center justify-between">
                    <Music2 className="h-5 w-5 text-primary" />
                    <ArrowRight className="h-4 w-4 text-primary transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/52">Compare models</p>
                    <p className="mt-3 font-display text-3xl leading-tight text-foreground">Back to the lineup</p>
                    <p className="mt-3 text-sm leading-6 text-foreground/70">Return to the main lineup overview and compare this amp against the rest of the Edwards range.</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="border border-white/10 bg-[#11100e] p-8 lg:p-10">
              <p className="section-kicker">Other Edwards models</p>
              <h3 className="font-display text-4xl leading-[1.08] text-foreground">Explore the rest of the lineup.</h3>
              <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/68">
                Every Edwards amp is built around a different response and use case. If this is not the exact fit, the rest of the lineup gives you a different path without leaving the same build philosophy behind.
              </p>

              <div className="mt-8 grid gap-4">
                {relatedAmps.map((product) => (
                  <a
                    key={product.slug}
                    href={`/amps/${product.slug}`}
                    className="group flex items-start justify-between gap-6 border border-white/10 bg-card/45 p-5 transition-colors duration-500 hover:border-primary/30 hover:bg-card/75"
                  >
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-foreground/46">{product.eyebrow}</p>
                      <p className="mt-2 font-display text-2xl leading-[1.08] text-foreground">{product.name}</p>
                      <p className="mt-3 text-sm leading-6 text-foreground/68">{product.summary}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/25">
        <div className="container grid gap-8 py-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-display text-3xl uppercase tracking-[0.18em] text-primary">Edwards Amplification</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/66">
              Hand-built tube amplifiers shaped around feel, musical range, and direct builder access for players who care about real tone.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 text-sm uppercase tracking-[0.2em] text-foreground/54 lg:items-end">
            <a href="tel:+12566048721" className="transition-colors hover:text-primary">(256) 604-8721</a>
            <a href="/" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              Home
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
