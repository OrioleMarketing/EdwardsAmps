export type StoreProductInfo = {
  overview: string;
  features: string[];
  controls: string[];
  internalAdjustments?: string;
  availabilityNote?: string;
};

export const STORE_PRODUCT_INFO_BY_KEY: Partial<Record<string, StoreProductInfo>> = {
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
