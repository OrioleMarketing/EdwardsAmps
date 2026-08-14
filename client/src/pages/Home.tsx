/*
Design Philosophy for Home.tsx
Workshop editorial with Southern modernism: warm low-key palette, asymmetrical composition,
print-catalog pacing, tone-led product discovery, and tactile boutique craftsmanship.
Does each choice reinforce the custom-shop atmosphere rather than a generic marketing site?
*/

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, Gauge, Menu, Minus, Music2, PhoneCall, ShieldCheck, ShoppingBag, Sparkles, Wrench, X } from "lucide-react";
import { motion } from "framer-motion";
import { ampProducts } from "@/lib/ampData";
import { useShopifyCart } from "@/hooks/useShopifyCart";
import { SHOPIFY_PRODUCT_OPTIONS } from "@shared/shopifyCatalog";

const shopAnchorCards = SHOPIFY_PRODUCT_OPTIONS.map((product) => {
  const amp = ampProducts.find((candidate) => candidate.slug === product.ampSlug);

  return {
    id: product.key,
    slug: product.ampSlug,
    handle: product.handle,
    name: product.displayName,
    eyebrow: product.eyebrow,
    subtitle: product.subtitle,
    priceLabel: product.fallbackPriceLabel,
    priceValue: product.fallbackPriceValue,
    description: product.description,
    image: amp?.heroImage ?? "",
    alt: amp?.heroAlt ?? product.displayName,
  };
});

const collaborationCardSubtitle = "Elusive Overdrive with Jon Kammerer custom guitar featuring TonePod™ technology";

const quantityLabel = (count: number) => `${count} ${count === 1 ? "item" : "items"}`;

const pillars = [
  {
    icon: Wrench,
    title: "Handcrafted construction",
    text: "Each amplifier is presented as a serious build object, with component quality and cabinet craftsmanship treated as part of the instrument experience.",
  },
  {
    icon: Gauge,
    title: "Tone-first voicing",
    text: "Each model is built around a distinct response under the fingers, making it easier to choose by feel and sound instead of chasing specs alone.",
  },
  {
    icon: ShieldCheck,
    title: "Direct builder access",
    text: "When players are ready to talk wattage, cabinets, availability, or custom direction, they can go straight to a real conversation with Edwards.",
  },
];

const tonePaths = [
  {
    label: "American clean to wild overdrive",
    recommendation: "Elusive Overdrive",
    summary: "For players chasing expressive cleans, broad gain range, and a flagship boutique voice.",
  },
  {
    label: "British chime and authority",
    recommendation: "King Richard",
    summary: "For players who want jumpable-channel complexity, bigger stage projection, and touch-sensitive punch.",
  },
  {
    label: "Portable recording and worship rig",
    recommendation: "Hot Mama",
    summary: "For guitarists who need mix-ready breakup, transportable size, and real-world versatility.",
  },
  {
    label: "Rootsy tweed character",
    recommendation: "Double Dee Tweed",
    summary: "For players after dynamic vintage feel, sweeter compression, and compact combo practicality.",
  },
];

const faqs = [
  {
    question: "How do I know which Edwards amp is right for me?",
    answer:
      "Start with the kind of sound you want most often. If you want sparkling cleans and a wide overdrive range, the Elusive Overdrive is the best place to begin. If you want more British character, faster breakup, or a smaller recording-friendly format, the other models will narrow the field quickly.",
  },
  {
    question: "Can Edwards help me choose the right wattage and speaker setup?",
    answer:
      "Yes. The consultation path is there for exactly that reason. Players can ask about wattage, cabinet pairing, venue size, and the kind of breakup they want, then get pointed toward the best fit instead of guessing from specs alone.",
  },
  {
    question: "What makes the Elusive Overdrive special?",
    answer:
      "It covers an unusually wide range without losing feel. You can get clear, blackface-style cleans, edge-of-breakup touch response, and a fuller overdrive voice from the same amp, which makes it a strong choice for players who want one amp to handle a lot of ground.",
  },
];

const collaborationFeature = {
  title: "Elusive Overdrive",
  subtitle: collaborationCardSubtitle,
  image:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/jon-kammerer-elusive-crossbrand_50cba937.png",
  alt: "Jon Kammerer custom guitar leaning against the Edwards Elusive Overdrive amplifier",
};

const sectionMotion = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function Home() {
  const { addToCart, cart, isAddingToCart, isUpdatingCart, products: liveShopifyProducts, productsByKey, updateCartLine } = useShopifyCart();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const cartLines = cart?.lines ?? [];
  const cartCount = cart?.totalQuantity ?? 0;
  const cartSubtotalLabel = cart?.subtotalLabel ?? "$0";
  const isCartBusy = isAddingToCart || isUpdatingCart;

  const liveProductsByHandle = useMemo(
    () => Object.fromEntries(liveShopifyProducts.map((product) => [product.handle, product])) as Record<string, (typeof liveShopifyProducts)[number]>,
    [liveShopifyProducts],
  );

  return (
    <Sheet>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground">
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] mix-blend-screen noise-overlay" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-6 py-4">
          <a href="#top" className="flex items-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/branding/edwards-logo-original-white_8e37cbec.png"
              alt="Edwards Amplification"
              className="h-[39.6px] w-auto sm:h-[44px] lg:h-[52.8px]"
            />
          </a>

          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.18em] text-foreground/72 lg:flex">
            <a href="#lineup" className="transition-colors hover:text-primary">Lineup</a>
            <a href="#craft" className="transition-colors hover:text-primary">Craft</a>
            <a href="#tone" className="transition-colors hover:text-primary">Find Your Sound</a>
            <a href="#shop" className="transition-colors hover:text-primary">Shop</a>
            <a href="#consultation" className="transition-colors hover:text-primary">Contact</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-card/80 text-foreground transition-colors hover:border-primary/40 hover:text-primary lg:hidden"
              aria-label={isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-site-navigation"
              aria-expanded={isMobileNavOpen}
              onClick={() => setIsMobileNavOpen((open) => !open)}
            >
              {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <SheetTrigger asChild>
              <Button variant="outline" className="rounded-none border border-white/15 bg-card/80 px-3 py-5 text-[0.7rem] uppercase tracking-[0.24em] text-foreground transition-colors hover:border-primary/40 hover:bg-card hover:text-primary sm:px-4">
                <ShoppingBag className="sm:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{`Cart · ${cartCount}`}</span>
                <span className="sr-only">{`Cart · ${cartCount}`}</span>
              </Button>
            </SheetTrigger>
          </div>
        </div>
        {isMobileNavOpen && (
          <nav id="mobile-site-navigation" aria-label="Mobile site navigation" className="border-t border-white/10 bg-[#11100e]/98 px-5 py-5 backdrop-blur-xl lg:hidden">
            <div className="container grid gap-1 px-0">
              {[
                ["Lineup", "#lineup"],
                ["Craft", "#craft"],
                ["Find Your Sound", "#tone"],
                ["Shop", "#shop"],
                ["Contact", "#consultation"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-4 text-sm uppercase tracking-[0.22em] text-foreground/82 transition-colors hover:text-primary"
                >
                  {label}
                  <ArrowRight className="h-4 w-4 text-primary" />
                </a>
              ))}
              <SheetTrigger asChild>
                <button
                  type="button"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="mt-3 flex items-center justify-between border border-primary/40 bg-primary/10 px-4 py-4 text-sm uppercase tracking-[0.22em] text-primary transition-colors hover:bg-primary/15"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingBag className="h-4 w-4" />
                    View cart
                  </span>
                  <span>{cartCount}</span>
                </button>
              </SheetTrigger>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/edwardsamps-hero-reference-igVrT9qU3v6WCBowpAQDUa.webp"
              alt="Boutique Edwards amplifier in a custom workshop setting"
              className="h-full w-full object-cover object-center opacity-35"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,0.94)_0%,rgba(8,8,7,0.8)_44%,rgba(8,8,7,0.36)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="container relative grid min-h-[calc(100vh-5rem)] items-end gap-16 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <motion.div {...sectionMotion} className="max-w-3xl pb-8 lg:pb-16">
              <p className="mb-5 inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-2 text-[0.7rem] uppercase tracking-[0.3em] text-foreground/72 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Handcrafted boutique tube amplifiers and pedals
              </p>

              <h1 className="font-display text-4xl leading-[0.94] text-balance text-foreground sm:text-6xl lg:text-7xl">
                Elusive Overdrive, the amp that can replace a room full of favorites.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/78 sm:text-xl">
                If you want one amp that can give you beautiful clean tones, smooth breakup, and bold overdrive without feeling harsh or stiff, the Elusive Overdrive is built for exactly that job. It has the clarity many players love in classic American amps, but with a much bigger gain range when you want to push it.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="rounded-none border border-primary/60 bg-primary px-7 py-6 text-[0.74rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90">
                  <a href="#lineup">
                    Explore the Lineup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-none border-white/20 bg-black/20 px-7 py-6 text-[0.74rem] uppercase tracking-[0.24em] text-foreground hover:bg-white/8">
                  <a href="#shop">Shop the Collection</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="relative ml-auto w-full max-w-2xl self-center"
            >
              <div className="relative overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(196,157,92,0.08),rgba(17,15,12,0.92)_58%,rgba(10,9,8,1)_100%)] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="relative aspect-[4/3] overflow-hidden border border-white/6 bg-black/20">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/elusive-overdrive-on-table-hero_a3fdf76a.png"
                    alt="The real Edwards Elusive Overdrive amplifier staged on a wooden workbench"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/50">Sound</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/78">Blackface-style cleans to mild or wild overdrive.</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/50">Power</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/78">Available in 24W or 40W with 6V6 or 6L6 tubes.</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/50">Starts at</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/78">$3,000 USD for a hand-built head.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.section {...sectionMotion} id="lineup" className="container py-20 lg:py-28">
          <div className="grid gap-8 lg:gap-10">
            <div className="max-w-6xl">
              <p className="section-kicker">The Lineup</p>
              <h2 className="section-title max-w-none">Five distinct amps, each built around a different feel, voice, and musical job.</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
              <div className="group relative overflow-hidden border border-white/10 bg-card/40 shadow-[0_24px_80px_rgba(0,0,0,0.38)] lg:min-h-[21rem]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(193,149,92,0.18),transparent_48%)] opacity-80" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-75" />
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/five-amp-stage-lineup-DDaiygu4dKpw9V2FhK3hz2.webp"
                  alt="All five Edwards amps grouped together in a dark stage-style environment"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex h-full items-center lg:pr-8">
                <p className="section-copy max-w-none">
                  From the wide-range Elusive Overdrive to more British and tweed-leaning options, the lineup is shaped so players can quickly understand what each amp does best and where it belongs in a real rig.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {ampProducts.map((amp, index) => (
              <a
                key={amp.slug}
                href={`/amps/${amp.slug}`}
                className="group relative overflow-hidden border border-white/10 bg-card/60 p-6 transition-transform duration-500 hover:-translate-y-1 hover:border-primary/35 hover:bg-card"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-foreground/45">0{index + 1}</p>
                    <h3 className="mt-3 font-display text-3xl leading-tight text-foreground">{amp.name}</h3>
                  </div>
                  <span className="border border-primary/25 bg-primary/10 px-3 py-2 text-sm uppercase tracking-[0.18em] text-primary">
                    {amp.price}
                  </span>
                </div>
                <p className="mt-6 text-lg leading-8 text-foreground/82">{amp.voice}</p>
                <div className="mt-6 grid gap-4 border-t border-white/8 pt-6 text-sm text-foreground/68 sm:grid-cols-2">
                  <p>{amp.format}</p>
                  <p>{amp.idealFor}</p>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-primary">
                  View product page
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </a>
            ))}

            <a
              href="#consultation"
              className="group relative flex h-full flex-col overflow-hidden border border-primary/22 bg-[linear-gradient(180deg,rgba(33,27,21,0.9)_0%,rgba(16,13,11,0.96)_100%)] p-6 transition-transform duration-500 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-65 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex flex-col items-start gap-4">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-foreground/45">06</p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-foreground">{collaborationFeature.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-foreground/64">
                    {collaborationFeature.subtitle}
                  </p>
                </div>
                <span className="whitespace-nowrap border border-primary/25 bg-primary/10 px-3 py-2 text-sm uppercase tracking-[0.18em] text-primary">
                  Featured pairing
                </span>
              </div>

              <div className="mt-6 overflow-hidden border border-white/8 bg-black/30">
                <img
                  src={collaborationFeature.image}
                  alt={collaborationFeature.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              <p className="mt-6 text-base leading-7 text-foreground/76">
                A premium crossover pairing that presents the Elusive Overdrive alongside Jon Kammerer&apos;s custom build for players who want a single setup that speaks to touch, craft, and statement tone.
              </p>

            </a>
          </div>
        </motion.section>

        <motion.section {...sectionMotion} id="craft" className="border-y border-white/10 bg-card/35">
          <div className="container grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-28">
            <div className="relative overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/edwardsamps-craftsmanship-HJUAA6HMUZrQzhD2J2uWFr.webp"
                alt="Amp builder assembling an Edwards amplifier chassis"
                className="aspect-[16/11] w-full object-cover"
              />
            </div>

            <div>
              <p className="section-kicker">Why Edwards</p>
              <h2 className="section-title">Edwards amps are voiced for players who hear nuance and feel response.</h2>
              <p className="section-copy mt-6">
                From clean headroom to blooming overdrive, the lineup is shaped around feel, projection, and musical range. Every model is built to sound musical, respond naturally, and stay useful long after the honeymoon period wears off.
              </p>

              <div className="mt-10 grid gap-6">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title} className="grid gap-4 border-b border-white/8 pb-6 sm:grid-cols-[auto_1fr] sm:items-start">
                      <div className="flex h-11 w-11 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl text-foreground">{pillar.title}</h3>
                        <p className="mt-2 max-w-2xl text-base leading-7 text-foreground/72">{pillar.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion} id="tone" className="container py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <p className="section-kicker">Find Your Sound</p>
              <h2 className="section-title">Find the amp that fits your touch, your volume needs, and the way you actually play.</h2>
            </div>
            <p className="section-copy lg:pt-12">
              Explore the lineup by the way you actually play: headroom, breakup point, response under the fingers, and where each amp sits best in a real rig.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {tonePaths.map((path) => (
              <div key={path.label} className="group border border-white/10 bg-card/50 p-6 transition-colors duration-500 hover:border-primary/35 hover:bg-card/90">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-foreground/46">Tone Path</p>
                <h3 className="mt-4 font-display text-3xl leading-tight text-foreground">{path.label}</h3>
                <p className="mt-5 text-base leading-7 text-foreground/72">{path.summary}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-5 text-sm uppercase tracking-[0.18em] text-primary">
                  <span>{path.recommendation}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 overflow-hidden border border-white/10 bg-card/40">
            <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r">
                <p className="section-kicker">Comparison Snapshot</p>
                <h3 className="mt-3 font-display text-3xl text-foreground">Quick comparison for players narrowing the field.</h3>
                <p className="mt-4 text-base leading-7 text-foreground/70">
                  Use this snapshot to compare voice, format, and best fit at a glance before digging deeper or reaching out.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-[0.68rem] uppercase tracking-[0.24em] text-foreground/48">
                      <th className="px-6 py-5 font-medium">Model</th>
                      <th className="px-6 py-5 font-medium">Voice</th>
                      <th className="px-6 py-5 font-medium">Format</th>
                      <th className="px-6 py-5 font-medium">Best fit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ampProducts.map((amp) => (
                      <tr key={amp.name} className="border-b border-white/8 align-top text-sm text-foreground/72 last:border-b-0">
                        <td className="px-6 py-5 font-medium text-foreground">{amp.name}</td>
                        <td className="px-6 py-5">{amp.voice}</td>
                        <td className="px-6 py-5">{amp.format}</td>
                        <td className="px-6 py-5">{amp.idealFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion} className="relative overflow-hidden border-y border-white/10">
          <div className="absolute inset-0">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/edwardsamps-tone-room-YiwF2TBhNyHCePGvzRvKoS.webp"
              alt="Moody listening room with Edwards amplifier and guitar"
              className="h-full w-full object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,0.84)_0%,rgba(8,8,7,0.92)_100%)]" />
          </div>

          <div className="container relative grid gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-16">
            <div>
              <p className="section-kicker">The Edwards Standard</p>
              <h2 className="section-title">Boutique American tone, refined into a lineup with clarity, authority, and feel.</h2>
            </div>
              <div className="space-y-6 text-lg leading-8 text-foreground/76">
              <p>
                Edwards Amplification belongs in the conversation with serious boutique builders: rich clean architecture, controlled breakup, and cabinets that project with weight and composure.
              </p>
              <p>
                This lineup is for players who want more than volume. It is for players chasing touch, shape, and an amp that feels musical at every setting.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion} id="consultation" className="container py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="border border-white/10 bg-card/45 p-8 lg:p-10">
              <p className="section-kicker">Talk With Edwards</p>
              <h2 className="section-title">Have questions about tone, wattage, or availability? Start with a real conversation.</h2>
              <p className="section-copy mt-6 max-w-2xl">
                Not every player needs the same wattage, cabinet, or amount of gain. Reach out for availability, custom options, or help choosing the model that best matches your style, stage volume, and tonal goals.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <a href="tel:+12566048721" className="group flex min-h-44 flex-col justify-between border border-primary/25 bg-primary/10 p-6 transition-colors duration-500 hover:bg-primary/15">
                  <div className="flex items-center justify-between">
                    <PhoneCall className="h-5 w-5 text-primary" />
                    <ArrowRight className="h-4 w-4 text-primary transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/52">Call Edwards</p>
                    <p className="mt-3 font-display text-3xl text-foreground">(256) 604-8721</p>
                    <p className="mt-3 text-sm leading-6 text-foreground/70">Talk through product fit, cabinet choices, and current availability.</p>
                  </div>
                </a>

                  <a href="/amps/elusive-overdrive" className="group flex min-h-44 flex-col justify-between border border-white/10 bg-card/60 p-6 transition-colors duration-500 hover:border-primary/30 hover:bg-card">

                  <div className="flex items-center justify-between">
                    <Music2 className="h-5 w-5 text-primary" />
                    <ArrowRight className="h-4 w-4 text-primary transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/52">Start with the lineup</p>
                    <p className="mt-3 font-display text-3xl text-foreground">Start with Elusive Overdrive</p>
                     <p className="mt-3 text-sm leading-6 text-foreground/70">Open the flagship product page first, then move through the rest of the lineup from a stronger reference point.</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="border border-white/10 bg-[#11100e] p-8 lg:p-10">
              <p className="section-kicker">Supportive FAQ</p>
              <h3 className="font-display text-4xl leading-tight text-foreground">Practical answers for players getting serious about an amp purchase.</h3>
              <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/68">
                These answers cover the questions that usually come up when players start thinking about wattage, speaker matching, model choice, and whether one amp can cover more ground than expected.
              </p>
              <Accordion type="single" collapsible defaultValue="item-0" className="mt-8 w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`item-${index}`} className="border-white/10">
                    <AccordionTrigger className="text-left font-sans text-base uppercase tracking-[0.14em] text-foreground/78 hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-2xl text-base leading-7 text-foreground/68">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion} id="shop" className="container pt-12 pb-3 lg:pt-16 lg:pb-4">
          <div className="flex flex-col gap-6 border border-white/10 bg-card/35 p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
            <div className="max-w-3xl">
              <p className="section-kicker">Shop</p>
              <h2 className="section-title">Built to be played, ready to be ordered.</h2>
              <p className="section-copy mt-6">
                Browse the full Edwards lineup, choose the format that fits your rig, and add it to the cart when you are ready.
              </p>
            </div>
            <SheetTrigger asChild>
              <Button className="rounded-none border border-primary/50 bg-primary px-6 py-5 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View cart · {cartCount}
              </Button>
            </SheetTrigger>
          </div>

          <div className="mt-8" id="shop-products">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.26em] text-primary/80">Full collection</p>
                <h3 className="mt-3 font-display text-4xl leading-tight text-foreground">Shop the Edwards lineup</h3>
              </div>
              <p className="max-w-xl text-sm leading-6 text-foreground/65">
                Every model is listed as its own product, including all four Elusive Overdrive options.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {shopAnchorCards.map((product) => {
                const liveProduct = productsByKey[product.id];
                const isAvailable = liveProduct?.availableForSale ?? true;

                return (
                  <article key={product.id} className="group flex h-full flex-col border border-white/10 bg-card/55 transition-colors duration-500 hover:border-primary/35 hover:bg-card">
                    <div className="aspect-[4/4.8] overflow-hidden border-b border-white/10 bg-black/40">
                      <img src={product.image} alt={product.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[0.65rem] uppercase tracking-[0.24em] text-primary/80">
                        {liveProduct?.availableForSale ? product.eyebrow : "Temporarily unavailable"}
                      </p>
                      <h4 className="mt-3 font-display text-3xl leading-tight text-foreground">{liveProduct?.name ?? product.name}</h4>
                      <p className="mt-3 text-sm leading-6 text-foreground/68">{product.subtitle}</p>
                      <p className="mt-5 text-[0.7rem] uppercase tracking-[0.24em] text-foreground/45">Starting at</p>
                      <p className="mt-2 font-display text-2xl text-primary">{liveProduct?.priceLabel ?? product.priceLabel}</p>
                      <p className="mt-4 flex-1 text-sm leading-6 text-foreground/62">{product.description}</p>

                      <div className="mt-8 flex flex-col gap-3">
                        <Button
                          className="rounded-none border border-primary/50 bg-primary px-5 py-5 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-foreground/45"
                          onClick={() => addToCart(product.id)}
                          disabled={!isAvailable || isCartBusy}
                        >
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          {isAvailable ? "Add to cart" : "Unavailable"}
                        </Button>
                        <Button asChild variant="outline" className="rounded-none border border-white/15 bg-transparent px-5 py-5 text-[0.7rem] uppercase tracking-[0.22em] text-foreground hover:border-primary/40 hover:text-primary">
                          <a href={`/amps/${product.slug}`}>View product</a>
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-white/10 bg-black/25">
        <div className="container grid gap-8 py-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/branding/edwards-logo-original-white_8e37cbec.png"
              alt="Edwards Amplification"
              className="h-[61.6px] w-auto sm:h-[70.4px]"
            />
            <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/66">
              Hand-built tube amplifiers shaped around feel, musical range, and direct builder access for players who care about real tone.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 text-sm uppercase tracking-[0.2em] text-foreground/54 lg:items-end">
            <a href="tel:+12566048721" className="transition-colors hover:text-primary">(256) 604-8721</a>
            <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              Back to top
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>

      <SheetContent side="right" className="w-full border-l border-white/10 bg-[#15120f] text-foreground sm:max-w-md">
        <SheetHeader className="border-b border-white/10 pb-6">
          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-primary/80">Cart</p>
          <SheetTitle className="font-display text-4xl leading-none text-foreground">Your cart</SheetTitle>
          <SheetDescription className="max-w-sm text-sm leading-6 text-foreground/62">
            Review the amps you have selected, adjust quantities, and head to checkout when you are ready.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-4">
          {cartLines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center border border-dashed border-white/15 bg-black/20 px-6 py-10 text-center">
              <ShoppingBag className="h-10 w-10 text-primary" />
              <h3 className="mt-5 font-display text-3xl leading-tight text-foreground">Your cart is still empty.</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-foreground/62">
                Add any Edwards amp from the Shop section to start building your order.
              </p>
              <p className="mt-6 text-[0.65rem] uppercase tracking-[0.24em] text-foreground/42">
                Every listed model can be ordered directly from the store.
              </p>
            </div>
          ) : (
            <div className="space-y-4 pt-6">
              {cartLines.map((line) => {
                const storefrontProduct = liveProductsByHandle[line.productHandle];
                const lineTitle = storefrontProduct?.name ?? line.productTitle;
                const lineSubtitle = storefrontProduct?.subtitle ?? line.variantTitle;

                return (
                  <div key={line.id} className="border border-white/10 bg-black/20 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.62rem] uppercase tracking-[0.24em] text-primary/80">Edwards Amplification</p>
                        <h4 className="mt-2 font-display text-2xl leading-tight text-foreground">{lineTitle}</h4>
                        <p className="mt-2 text-sm leading-6 text-foreground/62">{lineSubtitle}</p>
                      </div>
                      <p className="font-display text-2xl text-primary">{line.linePriceLabel}</p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                      <div className="flex items-center border border-white/10 bg-card/70">
                        <button
                          type="button"
                          aria-label={`Decrease quantity for ${lineTitle}`}
                          className="inline-flex h-10 w-10 items-center justify-center border-r border-white/10 text-foreground transition-colors hover:text-primary disabled:text-foreground/30"
                          onClick={() => updateCartLine(line.id, line.quantity - 1)}
                          disabled={isCartBusy}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="inline-flex min-w-12 items-center justify-center px-3 text-sm uppercase tracking-[0.18em] text-foreground/82">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity for ${lineTitle}`}
                          className="inline-flex h-10 w-10 items-center justify-center border-l border-white/10 text-foreground transition-colors hover:text-primary disabled:text-foreground/30"
                          onClick={() => storefrontProduct?.key && addToCart(storefrontProduct.key)}
                          disabled={isCartBusy || !storefrontProduct?.key}
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm uppercase tracking-[0.22em] text-foreground/48">{quantityLabel(line.quantity)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <SheetFooter className="border-t border-white/10 bg-[#100d0b]">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4 text-sm uppercase tracking-[0.22em] text-foreground/55">
              <span>Estimated subtotal</span>
              <span className="font-display text-2xl tracking-normal text-primary">{cartSubtotalLabel}</span>
            </div>
            <p className="text-sm leading-6 text-foreground/54">
              Review your current selection here, then continue to checkout when the order looks right.
            </p>
            {cart?.checkoutUrl ? (
              <Button asChild className="w-full rounded-none border border-primary/50 bg-primary px-5 py-5 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90">
                <a href={cart.checkoutUrl}>Proceed to checkout</a>
              </Button>
            ) : (
              <Button className="w-full rounded-none border border-primary/50 bg-primary px-5 py-5 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90" disabled>
                Proceed to checkout
              </Button>
            )}
            <p className="text-xs leading-5 text-foreground/42">
              Final shipping, taxes, and payment details are completed during checkout.
            </p>
          </div>
        </SheetFooter>
      </SheetContent>

      {cartCount > 0 ? (
        <div className="fixed right-5 bottom-5 z-40 hidden sm:block">
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-none border border-primary/35 bg-[#15120f]/95 px-5 py-4 text-[0.72rem] uppercase tracking-[0.24em] text-primary shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-primary/60 hover:bg-[#1d1915]"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>{`View cart · ${cartCount}`}</span>
              <span className="text-foreground/55">{cartSubtotalLabel}</span>
            </button>
          </SheetTrigger>
        </div>
      ) : null}
    </div>
    </Sheet>
  );
}
