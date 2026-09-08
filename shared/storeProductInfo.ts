export type StoreProductInfo = {
  sectionKicker?: string;
  sectionHeading?: string;
  overview: string;
  features: string[];
  controls?: string[];
  specifications?: Array<{
    label: string;
    value: string;
  }>;
  internalAdjustments?: string;
  availabilityNote?: string;
};

export const STORE_PRODUCT_INFO_BY_KEY: Partial<Record<string, StoreProductInfo>> = {
  "princess-reverb-combo": {
    sectionKicker: "Princess Reverb details",
    sectionHeading: "A more flexible take on the single-channel blackface combo.",
    overview:
      "The Princess Reverb is Edwards' 17-watt take on the classic single-channel blackface combo, refined with a more controllable reverb and tremolo deep enough to create a seasick-style modulation. It carries the headroom to stand up on stage, then moves into a more pleasing overdrive when pushed, giving players the familiar sounds they want with a wider range to explore.",
    features: [
      "Single-channel, 17-watt Class A circuit with cathode-biased 6V6 output tubes.",
      "More controllable reverb and tremolo with a deep, expressive modulation range.",
      "Built for usable headroom on stage and a more pleasing overdrive when pushed.",
      "Finger-jointed white-pine 1x12 cabinet, available in a choice of tolex and grill-cloth options.",
    ],
    specifications: [
      { label: "Amplifier class", value: "Class A, cathode biased" },
      { label: "Power", value: "17 watts" },
      { label: "Channels", value: "One channel" },
      { label: "Controls", value: "Volume, Bass, Treble, Reverb, Tremolo Speed, Tremolo Intensity" },
      { label: "Preamp tubes", value: "Three 12AX7s; one 12AT7" },
      { label: "Output tubes", value: "Two 6V6s" },
      { label: "Rectifier", value: "Tube rectifier: one 5U4GB" },
      { label: "Speaker outputs", value: "8-ohm main and extension" },
      { label: "Board", value: "Black fiberboard with eyelets" },
      { label: "Transformers", value: "Custom-wound Heyboer" },
      { label: "Chassis", value: "18-gauge steel" },
      { label: "Cabinet", value: "Finger-jointed white pine" },
      { label: "Speaker", value: "WGS G12C, 8 ohm" },
      { label: "Shipping weight", value: "Approximately 32 lb" },
    ],
    availabilityNote: "Choose from available tolex and grill-cloth options to make the 1x12 cabinet your own.",
  },
  "queen-reverb-combo": {
    sectionKicker: "Queen Reverb details",
    sectionHeading: "A broader, two-channel take on the blackface combo.",
    overview:
      "The Queen Reverb is Edwards' 24-watt take on the classic two-channel blackface combo, refined with a more controllable reverb and tremolo capable of seasick-style modulation. With the headroom to stand up on stage and a more pleasing overdrive when pushed, it retains the sought-after character of the original platform while putting more sounds within reach.",
    features: [
      "Two-channel, 24-watt Class AB circuit with fixed-biased 6V6 output tubes.",
      "More controllable reverb and tremolo with a deep, expressive modulation range.",
      "Designed for confident stage headroom and a musical overdrive when pushed.",
      "Finger-jointed white-pine 1x12 cabinet, available in a choice of tolex and grill-cloth options.",
    ],
    specifications: [
      { label: "Amplifier class", value: "Class AB, fixed biased" },
      { label: "Power", value: "24 watts" },
      { label: "Channels", value: "Two channels" },
      { label: "Controls", value: "Volume (2), Bass (2), Treble (2), Reverb, Tremolo Speed, Tremolo Intensity" },
      { label: "Preamp tubes", value: "Four 12AX7s; two 12AT7s" },
      { label: "Output tubes", value: "Two 6V6s" },
      { label: "Rectifier", value: "Tube rectifier: one GZ34" },
      { label: "Speaker outputs", value: "8-ohm main and extension" },
      { label: "Board", value: "Black fiberboard with eyelets" },
      { label: "Transformers", value: "Custom-wound Heyboer" },
      { label: "Chassis", value: "18-gauge steel" },
      { label: "Cabinet", value: "Finger-jointed white pine" },
      { label: "Speaker", value: "WGS G12C, 8 ohm" },
      { label: "Shipping weight", value: "Approximately 36 lb" },
    ],
    availabilityNote: "Choose from available tolex and grill-cloth options to make the 1x12 cabinet your own.",
  },
  "69-73-combo": {
    sectionKicker: "69/73 details",
    sectionHeading: "Classic recording character with practical gain control.",
    overview:
      "The 69/73 Amp was designed to sound like the recordings on Led Zeppelin I and II. Its 24-watt, Class A cathode-biased circuit has plenty of headroom for cleans and moves into a pleasing amp overdrive when pushed. Squash the Master Volume and turn up the Volume for bedroom-level overdrive, then use the Hi Cut, rotary bass-shelf tone control, pull boost, and bright switch to tailor the response. The result sounds great with single coils and humbuckers alike.",
    features: [
      "24-watt, Class A cathode-biased circuit with one channel.",
      "Plenty of clean headroom with a pleasing overdrive when pushed.",
      "Master Volume and Volume control work together for bedroom-level overdrive.",
      "Hi Cut, rotary bass-shelf tone control, pull boost, and bright switch for practical tonal adjustment.",
      "1x12 birch-ply combo cabinet available in a range of tolex and grill-cloth options.",
    ],
    specifications: [
      { label: "Amplifier class", value: "Class A, cathode biased" },
      { label: "Power option", value: "24 watts" },
      { label: "Channels", value: "One channel" },
      { label: "Controls", value: "Master Volume, Hi Cut, rotary bass-shelf tone control, Volume with pull boost, bright switch" },
      { label: "Preamp tubes", value: "One EF86; one 12AX7" },
      { label: "Output tubes", value: "Two 6973s" },
      { label: "Rectifier", value: "Tube rectifier: one 5U4GB" },
      { label: "Speaker output", value: "8 ohm and 16 ohm" },
      { label: "Board", value: "GPO-3 fiberboard with turrets" },
      { label: "Transformers", value: "Custom-wound Heyboer" },
      { label: "Chassis", value: "0.90 aluminum" },
      { label: "Cabinet", value: "1x12 combo birch ply" },
      { label: "Speaker", value: "WGS Veteran 30, 8 ohm" },
      { label: "Shipping weight", value: "Approximately 36 lb" },
    ],
    availabilityNote: "The 1x12 birch-ply combo cabinet is available in a range of tolex and grill-cloth options.",
  },
  "elusive-overdrive-pedal": {
    overview:
      "The Elusive Overdrive Pedal pairs two independently voiced overdrive sides in one enclosure. Use either side on its own for rhythm or lead work, or combine them and shape the blend for a broader range of drive textures.",
    features: [
      "Blue left side carries more midrange and a little more gain.",
      "White right side is comparatively more scooped through the mids.",
      "Each side is designed to work independently or in combination with the other.",
      "Built to work across different guitar, amplifier, and pedal combinations.",
    ],
    controls: [
      "Blue side: independent volume, drive, and tone controls.",
      "White side: independent volume, drive, and tone controls.",
    ],
    internalAdjustments:
      "Each side has its own internal DIP switch for gain structure and a treble/presence trim to set the desired brightness.",
  },
  "mystery-drive-pedal": {
    overview:
      "The Mystery Drive was designed for clarity, definition, and drive, with the ability to add body to single-coil guitars without clouding the sound. It also works well with humbuckers and responds to a player’s touch and dynamics.",
    features: [
      "Designed with Nashville players in mind.",
      "Adds girth to single-coil guitars without mud.",
      "Works across country, blues, and rock applications.",
      "Responsive to playing dynamics and touch.",
    ],
    controls: ["Volume", "Drive", "Tone"],
    internalAdjustments:
      "An internal trim adjustment adds or removes bass without changing the mid and high-frequency balance.",
  },
  "blackjack-overdrive-pedal": {
    overview:
      "The Blackjack Drive is a higher-gain overdrive designed to deliver British-amp-style growl with focus, avoiding excessive harshness and loose low end. It covers a useful range from lower gain to more push and sustain while retaining texture and harmonic content.",
    features: [
      "Higher-gain overdrive voice with a full, focused response.",
      "Designed for growl and sustain without harsh top end or low-end flub.",
      "Covers lower to higher gain settings without losing definition.",
    ],
    controls: ["Volume", "Drive", "Tone", "Voice"],
  },
  "fuzzy-octave-pedal": {
    overview:
      "The Fuzzy Octave combines an octave effect with a stand-alone fuzz voice. A switch selects the octave effect or fuzz mode, while the simple control set keeps the focus on the sound and response.",
    features: [
      "Works as an octave effect or as a dedicated fuzz.",
      "Mode switch changes between octave and stand-alone fuzz operation.",
      "Designed to offer a range of usable fuzz tones.",
    ],
    controls: ["Volume", "Fuzz", "Octave/fuzz mode switch"],
  },
  "evil-grin-fuzz-pedal": {
    overview:
      "The Evil Grin Fuzz is an adjustable germanium fuzz design with an external bias control that moves the response from cleaner drive toward dirtier fuzz. Handpicked germanium transistors are fitted as standard.",
    features: [
      "Adjustable classic-style fuzz response.",
      "External bias control moves from cleaner to dirtier drive.",
      "Handpicked germanium transistors installed as standard.",
    ],
    controls: ["Volume", "Fuzz", "Bias"],
    internalAdjustments:
      "Internal trim pots adjust the voltage supplied to the input and output transistors.",
    availabilityNote: "Silicon transistors are available by request.",
  },
};
