/*
Design Philosophy for Home.tsx
Workshop editorial with Southern modernism: warm low-key palette, asymmetrical composition,
print-catalog pacing, tone-led product discovery, and tactile boutique craftsmanship.
Does each choice reinforce the custom-shop atmosphere rather than a generic marketing site?
*/

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Gauge, Music2, PhoneCall, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const amps = [
  {
    name: "Elusive Overdrive",
    price: "$3,300",
    voice: "American clean headroom that opens into rich, articulate overdrive.",
    build: "24W or 40W · 6V6/6L6 platform · head or combo",
    vibe: "The flagship for players who want blackface-style cleans with a wider gain range.",
  },
  {
    name: "King Richard",
    price: "$2,800",
    voice: "British authority with chime, punch, and jumpable-channel complexity.",
    build: "~45W · EL84 platform · EF86 + 12AX7 channels",
    vibe: "A bigger voice for players who want dimensional cleans and commanding live feel.",
  },
  {
    name: "Hot Mama",
    price: "$1,800",
    voice: "Portable British sparkle with recording-friendly breakup and surprising stage strength.",
    build: "~18W · EL84 platform · head or 1x12 combo",
    vibe: "The versatile small-format amp for session work, church, club stages, and everyday playing.",
  },
  {
    name: "Double Dee Tweed",
    price: "$2,000",
    voice: "Touch-sensitive tweed response with extra headroom and singing drive.",
    build: "~18W · 6V6 platform · 1x12 combo",
    vibe: "A compact tweed-inspired voice that moves from rootsy cleans into Texas-style grind.",
  },
];

const pillars = [
  {
    icon: Wrench,
    title: "Handcrafted construction",
    text: "Each amplifier is presented as a serious build object, with component quality and cabinet craftsmanship treated as part of the instrument experience.",
  },
  {
    icon: Gauge,
    title: "Tone-first voicing",
    text: "The lineup is organized by tonal destination so players can move quickly toward the right platform instead of decoding dense spec blocks first.",
  },
  {
    icon: ShieldCheck,
    title: "Confidence in the buying path",
    text: "The site turns contact into a guided consultation, helping visitors move toward availability questions, custom options, and product fit without dead ends.",
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
    question: "How should the new site handle buying if inventory changes?",
    answer:
      "The experience is built around clear intent rather than forcing every visitor through a store-first path. In-stock items can point to direct purchase later, while limited runs and options-heavy builds can move through availability and consultation calls to action.",
  },
  {
    question: "Can the site support both flagship storytelling and model comparison?",
    answer:
      "Yes. The homepage leads with brand story and atmosphere, then turns into a practical discovery flow with lineup cards, tonal recommendations, and a comparison table so musicians can move from emotion to decision.",
  },
  {
    question: "Why emphasize a workshop-editorial visual style?",
    answer:
      "Because Edwards sits in boutique territory. The design should feel handcrafted and trustworthy, with warmth, restraint, and material texture that support premium pricing and builder credibility.",
  },
];

const sectionMotion = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground">
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] mix-blend-screen noise-overlay" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-6 py-4">
          <a href="#top" className="flex flex-col leading-none">
            <span className="font-display text-2xl uppercase tracking-[0.18em] text-primary">Edwards</span>
            <span className="font-sans text-[0.68rem] uppercase tracking-[0.34em] text-foreground/65">
              Amplification
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.18em] text-foreground/72 lg:flex">
            <a href="#lineup" className="transition-colors hover:text-primary">Lineup</a>
            <a href="#craft" className="transition-colors hover:text-primary">Craft</a>
            <a href="#tone" className="transition-colors hover:text-primary">Find Your Sound</a>
            <a href="#consultation" className="transition-colors hover:text-primary">Consultation</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="rounded-none border border-primary/50 bg-primary px-5 py-5 text-[0.72rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90">
              <a href="#consultation">Book a Build Consultation</a>
            </Button>
          </div>
        </div>
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
                Built like a custom shop. Voiced like an instrument.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/78 sm:text-xl">
                Edwards Amplification blends boutique craftsmanship, premium component choices, and tone-led design into a lineup for players who care about feel as much as frequency.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="rounded-none border border-primary/60 bg-primary px-7 py-6 text-[0.74rem] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90">
                  <a href="#lineup">
                    Explore the Lineup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-none border-white/20 bg-black/20 px-7 py-6 text-[0.74rem] uppercase tracking-[0.24em] text-foreground hover:bg-white/8">
                  <a href="#craft">Inside the Workshop</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="relative ml-auto w-full max-w-2xl self-center"
            >
              <div className="absolute -left-4 top-8 hidden h-[76%] w-[74%] border border-primary/35 lg:block" />
              <div className="relative overflow-hidden border border-white/10 bg-card/55 p-3 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/edwardsamps-product-detail-GoYXGF8YcsycLES4bbvahs.webp"
                  alt="Close-up premium Edwards amplifier product photograph"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/50">Craft focus</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/78">Premium cabinets, refined voicing, and builder-first credibility.</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/50">Use cases</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/78">Studio sessions, worship stages, clubs, and player rigs that need nuance.</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/50">Buying path</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/78">Lineup discovery, tonal guidance, and consultation-driven conversion.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.section {...sectionMotion} id="lineup" className="container py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="section-kicker">The Lineup</p>
              <h2 className="section-title">Four voices, each framed around the way players actually search for tone.</h2>
            </div>
            <p className="section-copy max-w-3xl lg:justify-self-end">
              Instead of burying buyers in a single long scroll, the rebuilt experience introduces every core model with a tonal identity, a quick specification snapshot, and a clearer path toward availability or consultation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {amps.map((amp, index) => (
              <article
                key={amp.name}
                className="group relative overflow-hidden border border-white/10 bg-card/60 p-6 transition-transform duration-500 hover:-translate-y-1 hover:border-primary/35 hover:bg-card"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-foreground/45">0{index + 1}</p>
                    <h3 className="mt-3 font-display text-3xl leading-tight text-foreground">{amp.name}</h3>
                  </div>
                  <span className="border border-primary/25 bg-primary/10 px-3 py-2 text-sm uppercase tracking-[0.18em] text-primary">
                    From {amp.price}
                  </span>
                </div>
                <p className="mt-6 text-lg leading-8 text-foreground/82">{amp.voice}</p>
                <div className="mt-6 grid gap-4 border-t border-white/8 pt-6 text-sm text-foreground/68 sm:grid-cols-2">
                  <p>{amp.build}</p>
                  <p>{amp.vibe}</p>
                </div>
              </article>
            ))}
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
              <h2 className="section-title">A boutique brand world should feel as deliberate as the circuitry inside the amp.</h2>
              <p className="section-copy mt-6">
                The rebuild treats Edwards as a premium small-batch builder, not a generic storefront. Every major section is designed to surface what matters most in this category: craftsmanship, tonal point of view, component credibility, and an easier path from curiosity to serious inquiry.
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
              <h2 className="section-title">The site helps players identify the right platform by feel, venue, and response.</h2>
            </div>
            <p className="section-copy lg:pt-12">
              Tone discovery is one of the strongest improvements in this rebuild. The content shifts from heavy paragraph blocks into practical guidance that mirrors the questions players actually ask before they reach out.
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
                <h3 className="mt-3 font-display text-3xl text-foreground">Quick guidance without losing the boutique feel.</h3>
                <p className="mt-4 text-base leading-7 text-foreground/70">
                  The comparison block keeps spec literacy intact, but frames it in a clearer format so buyers can narrow options faster.
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
                    {amps.map((amp) => (
                      <tr key={amp.name} className="border-b border-white/8 align-top text-sm text-foreground/72 last:border-b-0">
                        <td className="px-6 py-5 font-medium text-foreground">{amp.name}</td>
                        <td className="px-6 py-5">{amp.voice}</td>
                        <td className="px-6 py-5">{amp.build}</td>
                        <td className="px-6 py-5">{amp.vibe}</td>
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

          <div className="container relative grid gap-10 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-28">
            <div>
              <p className="section-kicker">The Shop Story</p>
              <h2 className="section-title">A premium rebuild should let players feel the workshop behind the product.</h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-foreground/76">
              <p>
                Edwards already has the raw material for a strong brand story: hand-built cabinets, custom chassis work, premium transformer choices, and a lineup described in the language of musicians instead of generic retail copy.
              </p>
              <p>
                This website translates that authenticity into a more modern editorial experience, where the brand can speak with clarity, confidence, and restraint while keeping the handmade character intact.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion} id="consultation" className="container py-20 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="border border-white/10 bg-card/45 p-8 lg:p-10">
              <p className="section-kicker">Consultation Path</p>
              <h2 className="section-title">From first curiosity to serious inquiry, the site keeps the next step obvious.</h2>
              <p className="section-copy mt-6 max-w-2xl">
                This concept favors a guided, consultation-ready buying path over a broken or ambiguous store flow. It gives players a cleaner way to ask about availability, custom builds, or the right model for their rig.
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
                    <p className="mt-3 text-sm leading-6 text-foreground/70">For product fit, custom direction, and direct conversation.</p>
                  </div>
                </a>

                <a href="#lineup" className="group flex min-h-44 flex-col justify-between border border-white/10 bg-card/60 p-6 transition-colors duration-500 hover:border-primary/30 hover:bg-card">
                  <div className="flex items-center justify-between">
                    <Music2 className="h-5 w-5 text-primary" />
                    <ArrowRight className="h-4 w-4 text-primary transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.26em] text-foreground/52">Start with the lineup</p>
                    <p className="mt-3 font-display text-3xl text-foreground">Match the voice first</p>
                    <p className="mt-3 text-sm leading-6 text-foreground/70">Use the tone-led cards above to narrow down the right platform before reaching out.</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="border border-white/10 bg-[#11100e] p-8 lg:p-10">
              <p className="section-kicker">Supportive FAQ</p>
              <h3 className="font-display text-4xl leading-tight text-foreground">Practical answers that remove friction from premium purchases.</h3>
              <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/68">
                The rebuilt site is meant to answer the practical questions that usually sit between admiration and action. Opening one answer by default makes the support area feel more alive and more useful at first glance.
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
      </main>

      <footer className="border-t border-white/10 bg-black/25">
        <div className="container grid gap-8 py-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-display text-3xl uppercase tracking-[0.18em] text-primary">Edwards Amplification</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/66">
              A boutique website concept focused on modern craftsmanship, tonal clarity, and consultation-ready conversion for a premium guitar amp brand.
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
    </div>
  );
}
