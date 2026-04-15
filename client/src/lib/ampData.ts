/*
Design Philosophy for ampData.ts
Keep the content product-led, plain-spoken, and useful for players first. Technical data should support
buying confidence, but the tone should always feel like a finished boutique brand site rather than an archive dump.
*/

export type AmpSpec = {
  label: string;
  value: string;
};

export type AmpProduct = {
  slug: string;
  name: string;
  shortName: string;
  price: string;
  heroImage: string;
  heroAlt: string;
  eyebrow: string;
  summary: string;
  intro: string;
  voice: string;
  idealFor: string;
  format: string;
  highlights: string[];
  specs: AmpSpec[];
  story: string[];
  availabilityNote: string;
};

export const ampProducts: AmpProduct[] = [
  {
    slug: 'elusive-overdrive',
    name: 'Elusive Overdrive',
    shortName: 'Elusive Overdrive',
    price: 'From $3,000 USD',
    heroImage:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/elusive-overdrive-on-table-hero_a3fdf76a.png',
    heroAlt: 'Edwards Elusive Overdrive amplifier staged on a wooden workbench',
    eyebrow: 'American clean to wild overdrive',
    summary:
      'The Elusive Overdrive is the broadest-range amp in the Edwards lineup, built for players who want beautiful clean tone, smooth breakup, and a convincing lead voice from one hand-built platform.',
    intro:
      'If you want one amp that can cover clean, edge-of-breakup, and full overdrive without feeling stiff or harsh, this is the one built to spoil you. It starts with the sparkle and depth players love in classic American amps, then adds an overdrive section that can stay subtle or push all the way into a bigger lead sound.',
    voice:
      'Blackface-style cleans, smooth breakup, punchy low end, and an overdrive range that moves from mild to wild.',
    idealFor:
      'Players who want one serious boutique amp for studio work, club dates, and a wide range of songs without changing rigs.',
    format: 'Head format, with hand-built Edwards cabinets available separately.',
    highlights: [
      'Available in 24-watt and 40-watt versions.',
      'Offered with 6V6 or 6L6 output sections depending on the version.',
      'Classic-style EQ and feel with added gain flexibility built in.',
      'Effects loop and footswitch control for overdrive and preamp mid boost.',
      'Hand-built turret board, custom chassis, and custom Heyboer transformers.',
    ],
    specs: [
      { label: 'Amplifier class', value: 'Class AB, fixed bias' },
      { label: 'Power options', value: '24 watts or 40 watts' },
      { label: 'Channels', value: 'One channel with overdrive section' },
      {
        label: 'Controls',
        value:
          'Volume, bright, loose-tight rock-jazz, treble, mid, bass, overdrive volume and gain, master, presence, and overdrive master',
      },
      { label: 'Preamp tubes', value: '12AX7 x3' },
      { label: 'Output tubes', value: '24W 6V6 x2 or 40W 6V6 x4' },
      { label: 'Rectifier', value: 'Solid state' },
      { label: 'Speaker outputs', value: '4, 8, and 16 ohm taps with main and extension cab outputs' },
      { label: 'Board', value: '1/8 inch GPO-3 fiberboard with turrets' },
      { label: 'Transformers', value: 'Custom wound Heyboer transformers' },
      { label: 'Chassis', value: 'Custom built 0.90 aluminum' },
      { label: 'Cabinet', value: 'Custom built 3/4 inch birch plywood head cabinet' },
      { label: 'Shipping weight', value: 'About 30 lbs for the head' },
    ],
    story: [
      'The Elusive Overdrive is the amp for players who do not want to choose between great cleans and real drive. It stays articulate when played softly, opens up naturally as you lean in, and has enough gain on tap to cover much more ground than a traditional single-voice amp.',
      'It is also built like a serious long-term instrument. The turret-board construction, custom chassis work, and Heyboer transformers are not window dressing; they are part of why the amp feels stable, punchy, and musical under the fingers.',
    ],
    availabilityNote:
      'Base pricing starts at $3,000 USD. Reach out directly for wattage, cabinet options, and current build availability.',
  },
  {
    slug: 'king-richard',
    name: 'King Richard',
    shortName: 'King Richard',
    price: 'From $2,800 USD',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/king-richard-large-stage_1a0319a2.png',
    heroAlt: 'Edwards King Richard amplifier staged on a large performance stage',
    eyebrow: 'British chime and authority',
    summary:
      'King Richard is Edwards’ bigger British-leaning head, built for players who want punch, dimension, and the richer complexity that comes from running two distinct channels.',
    intro:
      'This is the amp for players who want more stage authority, more upper-mid character, and more interactive feel than a straightforward clean platform. The two channels can be jumped and blended, which opens up a wider range of response and texture before you ever touch a pedal.',
    voice:
      'Chime, punch, authority, and overdrive that feels wide and lively rather than flat.',
    idealFor:
      'Players who want a British-flavored boutique head for bigger rooms, expressive rhythm work, and touch-sensitive lead playing.',
    format: 'Head format.',
    highlights: [
      'Roughly 45 watts of EL84-based output.',
      'Two channels: one EF86 and one 12AX7.',
      'Channels can be jumped and blended for more tonal range.',
      'Tube rectified Class A design with hand-built construction.',
      'Custom chassis and custom Heyboer transformers.',
    ],
    specs: [
      { label: 'Amplifier class', value: 'Class A' },
      { label: 'Power', value: 'About 45 watts' },
      { label: 'Channels', value: 'Two channels, EF86 and 12AX7' },
      { label: 'Output section', value: 'EL84 based' },
      { label: 'Rectifier', value: 'Tube rectified' },
      { label: 'Format', value: 'Head' },
      { label: 'Build notes', value: 'Hand-built board, custom chassis, custom Heyboer transformers' },
    ],
    story: [
      'King Richard is the Edwards answer for players who hear “British” and want more than bright top end. It has weight, push, and the kind of dimensional response that makes chords feel alive and lead lines feel connected to the speaker.',
      'The jumpable channels are a big part of the appeal. Instead of one fixed response, players can blend textures and shape how much chime, body, and urgency they want in the room.',
    ],
    availabilityNote:
      'King Richard starts around $2,800 USD for the head. Reach out directly for current pricing and build timing.',
  },
  {
    slug: 'hot-mama',
    name: 'Hot Mama',
    shortName: 'Hot Mama',
    price: 'From $1,800 USD',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/hot-mama-church-rehearsal_ece6a7bf.png',
    heroAlt: 'Edwards Hot Mama combo amplifier staged in a warm church rehearsal room',
    eyebrow: 'Portable British sparkle',
    summary:
      'Hot Mama is the compact British-inspired amp in the lineup, built for players who want lively cleans, musical breakup, and a format that works as easily in a studio as it does onstage.',
    intro:
      'This model is for guitarists who want an amp that records beautifully, carries easily, and still has enough personality and projection for live use. It moves from chiming clean tones into overdrive without turning brittle, and it does that in a package that feels practical rather than oversized.',
    voice:
      'Chiming cleans, smooth gain, and a recording-friendly breakup character with enough strength for live work.',
    idealFor:
      'Players who need a versatile amp for church, sessions, rehearsals, and club stages without dragging around a larger rig.',
    format: 'Available as a head or 1x12 combo.',
    highlights: [
      'Around 18 watts of EL84-based power.',
      'Tube rectified Class A design.',
      'Interactive master volume for more flexible gain shaping.',
      'Strong option for recording, rehearsals, and portable live rigs.',
      'Original-site pricing listed for both head and combo versions.',
    ],
    specs: [
      { label: 'Amplifier class', value: 'Class A' },
      { label: 'Power', value: 'About 18 watts' },
      { label: 'Output section', value: 'EL84 based' },
      { label: 'Rectifier', value: 'Tube rectified' },
      { label: 'Formats', value: 'Head or 1x12 combo' },
      { label: 'Control note', value: 'Interactive master volume for shaping feel and breakup' },
    ],
    story: [
      'Hot Mama is the compact amp in the Edwards lineup that still sounds like a serious instrument. It has enough sparkle and cut to sit well in a mix, but it does not need punishing volume to come alive.',
      'That balance makes it a smart choice for players who split their time between home, studio, and smaller stages. It feels portable, but it does not sound small.',
    ],
    availabilityNote:
      'Hot Mama starts at $1,800 USD for the head and $2,000 USD for the combo. Reach out directly for current availability.',
  },
  {
    slug: 'double-dee-tweed',
    name: 'Double Dee Tweed',
    shortName: 'Double Dee Tweed',
    price: 'From $2,000 USD',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/double-dee-coffee-shop_ffb42f11.png',
    heroAlt: 'Edwards Double Dee Tweed combo amplifier staged for an intimate coffee shop performance',
    eyebrow: 'Rootsy tweed character',
    summary:
      'Double Dee Tweed takes the appeal of a classic tweed combo and gives players more usable range, more room before breakup, and enough personality to move from home to studio to stage.',
    intro:
      'This is the Edwards tweed-flavored combo for players who want sag, touch, and rootsy character, but not a one-dimensional vintage novelty. It keeps the spirit of a Tweed Deluxe while giving players a little more headroom and flexibility in real-world use.',
    voice:
      'Touch-sensitive tweed feel, sweeter compression, and singing drive with more usable range than many expect.',
    idealFor:
      'Players chasing roots, blues, vintage-flavored rock, and a combo that can still cover more than one lane well.',
    format: '1x12 combo.',
    highlights: [
      'About 18 watts from a 6V6-based push-pull design.',
      'Tube rectified for classic tweed feel and response.',
      'Inspired by tweed deluxe roots but built with extra real-world usability.',
      'Suited for bedroom practice, recording, and stage use.',
      'Hand-built cabinet and carefully chosen components.',
    ],
    specs: [
      { label: 'Power', value: 'About 18 watts' },
      { label: 'Output section', value: '6V6 based' },
      { label: 'Circuit style', value: 'Push-pull tweed-inspired design' },
      { label: 'Rectifier', value: 'Tube rectified' },
      { label: 'Format', value: '1x12 combo' },
      { label: 'Positioning', value: 'Tweed-style response with more range than a typical 5E3 expectation' },
    ],
    story: [
      'Double Dee Tweed was built from a love of classic tweed sounds, but it is not meant to be a museum piece. It gives players the chewy response and expressive compression they want while staying practical enough for modern playing situations.',
      'That makes it appealing to guitarists who want old-school character without being boxed into one narrow use case. It can feel intimate at home and still hold its own when the room gets louder.',
    ],
    availabilityNote:
      'Double Dee Tweed starts at $2,000 USD for the 1x12 combo. Reach out directly for current build timing and speaker options.',
  },
  {
    slug: 'lil-tyke-tweed',
    name: 'Lil Tyke Tweed Amp',
    shortName: 'Lil Tyke Tweed',
    price: 'Inquire for pricing',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/derAk44VGxZftPNYPv5eS4/lil-tyke-home-writing-room_6ca542a9.png',
    heroAlt: 'Edwards Lil Tyke Tweed combo amplifier staged in an intimate home writing room',
    eyebrow: 'Small tweed combo format',
    summary:
      'Lil Tyke is a compact tweed-style combo for players who want a smaller amp with direct response, vintage flavor, and a simple control set that gets out of the way.',
    intro:
      'Lil Tyke is the small tweed voice in the Edwards lineup, built for players who want an amp that feels immediate, touch-sensitive, and easy to dial in. It is aimed at stripped-back playing where the guitar, the hands, and the speaker response do most of the talking.',
    voice:
      'Small-format tweed character aimed at direct, uncomplicated playing feel.',
    idealFor:
      'Players interested in a simpler tweed-style combo and direct conversation with the builder about the exact configuration.',
    format: '5F1 tweed combo amplifier.',
    highlights: [
      'Built as the small-format tweed voice within the Edwards range.',
      'Presented as a compact tweed combo for direct, expressive playing.',
      'Best approached through direct inquiry because detailed public specifications were not exposed in the retrieved source text.',
    ],
    specs: [
      { label: 'Model type', value: '5F1 tweed combo amplifier' },
      { label: 'Availability details', value: 'Contact Edwards for the latest configuration, pricing, and build information' },
      { label: 'Next step', value: 'Contact Edwards for current specs, pricing, and build availability' },
    ],
    story: [
      'Lil Tyke gives the lineup a smaller tweed-flavored entry point, with the kind of direct response that makes low-volume practice, recording, and simple gig setups feel musical and alive.',
      'For players who want the finer details on current build options, cabinet choices, and availability, the best next step is to contact Edwards directly.',
    ],
    availabilityNote:
      'Contact Edwards directly for current pricing, detailed specifications, and build availability.',
  },
];

export const ampProductsBySlug = Object.fromEntries(ampProducts.map((product) => [product.slug, product])) as Record<string, AmpProduct>;
