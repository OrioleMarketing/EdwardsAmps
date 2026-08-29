const domain = process.env.SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_ADMIN_API_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_ADMIN_API_CLIENT_SECRET;

const mediaUpdates = {
  "princess-reverb-combo": {
    originalSource: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/qtaRLFhLcgmVHfFc.webp",
    alt: "Edwards Princess Reverb Combo amplifier",
  },
  "elusive-overdrive-pedal": {
    originalSource: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/rkUmWrMSENMpokwY.webp",
    alt: "Edwards Elusive Overdrive Pedal",
  },
  "mystery-drive-pedal": {
    originalSource: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/nUXbJSDLafwECSjE.webp",
    alt: "Edwards Mystery Drive Pedal",
  },
  "fuzzy-octave-pedal": {
    originalSource: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/CNiUrceJvRPcxSSq.webp",
    alt: "Edwards Fuzzy Octave Pedal",
  },
  "evil-grin-fuzz-pedal": {
    originalSource: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/UYXjwLKBZkEYvSKf.webp",
    alt: "Edwards Evil Grin Fuzz Pedal",
  },
  "elusive-overdrive-t-shirt": {
    originalSource: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663047046836/AyTVAsPmrzAwCELY.webp",
    alt: "Edwards Elusive Overdrive T-Shirt",
  },
};

const descriptionUpdates = {
  "elusive-overdrive-pedal": `<p>The Elusive Overdrive Pedal pairs two independently voiced overdrive sides in one enclosure. Use either side on its own for rhythm or lead work, or combine them and shape the blend for a broader range of drive textures.</p><p>The blue left side carries more midrange and a little more gain, while the white right side is comparatively more scooped through the mids. Each side has independent volume, drive, and tone controls. Internal DIP switches set the gain structure for each side, and individual treble/presence trims set the desired brightness. Built to work across different guitar, amplifier, and pedal combinations.</p>`,
  "mystery-drive-pedal": `<p>The Mystery Drive was designed for clarity, definition, and drive, with the ability to add body to single-coil guitars without clouding the sound. It also works well with humbuckers and responds to a player’s touch and dynamics.</p><p>External controls are volume, drive, and tone. An internal trim adjustment adds or removes bass without changing the mid and high-frequency balance. The Mystery Drive is designed for country, blues, and rock applications.</p>`,
  "blackjack-overdrive-pedal": `<p>The Blackjack Drive is a higher-gain overdrive designed to deliver British-amp-style growl with focus, avoiding excessive harshness and loose low end. It covers a useful range from lower gain to more push and sustain while retaining texture and harmonic content.</p><p>Controls are volume, drive, tone, and voice. Use the range of controls to shape low- and higher-gain settings without losing focus.</p>`,
  "fuzzy-octave-pedal": `<p>The Fuzzy Octave combines an octave effect with a stand-alone fuzz voice. A switch selects the octave effect or fuzz mode, while the simple control set keeps the focus on the sound and response.</p><p>Controls are volume and fuzz, with a switch to select octave or stand-alone fuzz operation.</p>`,
  "evil-grin-fuzz-pedal": `<p>The Evil Grin Fuzz is an adjustable germanium fuzz design with an external bias control that moves the response from cleaner drive toward dirtier fuzz. Handpicked germanium transistors are fitted as standard.</p><p>Controls are volume, fuzz, and bias. Internal trim pots adjust the voltage supplied to the input and output transistors. Silicon transistors are available by request.</p>`,
};

const tokenResponse = await fetch(`https://${domain}/admin/oauth/access_token`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  }),
});
const tokenPayload = await tokenResponse.json();
if (!tokenResponse.ok || !tokenPayload.access_token) throw new Error("Unable to obtain Shopify Admin access token");

const graphql = async (query, variables) => {
  const response = await fetch(`https://${domain}/admin/api/2026-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": tokenPayload.access_token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const payload = await response.json();
  if (!response.ok || payload.errors?.length) throw new Error(JSON.stringify(payload.errors ?? "Shopify request failed"));
  return payload.data;
};

const handles = [...new Set([...Object.keys(mediaUpdates), ...Object.keys(descriptionUpdates)])];
const inventory = await graphql(
  `query ApprovedProductInventory { products(first: 100) { nodes { id handle title media(first: 50) { nodes { alt } } } } }`,
);
const productsByHandle = new Map(inventory.products.nodes.map((product) => [product.handle, product]));

const updateMutation = `mutation UpdateApprovedProduct($product: ProductUpdateInput!, $media: [CreateMediaInput!]) {
  productUpdate(product: $product, media: $media) {
    product {
      id
      title
      handle
      descriptionHtml
      media(first: 50) { nodes { alt mediaContentType preview { status } } }
    }
    userErrors { field message }
  }
}`;

const results = [];
for (const handle of handles) {
  const product = productsByHandle.get(handle);
  if (!product) throw new Error(`Expected Shopify product not found: ${handle}`);

  const media = mediaUpdates[handle] && !product.media.nodes.some((node) => node.alt === mediaUpdates[handle].alt)
    ? [{ ...mediaUpdates[handle], mediaContentType: "IMAGE" }]
    : undefined;
  const descriptionHtml = descriptionUpdates[handle];
  const data = await graphql(updateMutation, {
    product: {
      id: product.id,
      ...(descriptionHtml ? { descriptionHtml } : {}),
    },
    ...(media ? { media } : {}),
  });
  const result = data.productUpdate;
  if (result.userErrors.length) throw new Error(`${handle}: ${JSON.stringify(result.userErrors)}`);

  results.push({
    handle,
    title: result.product.title,
    descriptionUpdated: Boolean(descriptionHtml),
    mediaAdded: Boolean(media),
    media: result.product.media.nodes.map((node) => ({
      alt: node.alt,
      type: node.mediaContentType,
      status: node.preview?.status ?? null,
    })),
  });
}

console.log(JSON.stringify({ updated: results.length, results }, null, 2));
