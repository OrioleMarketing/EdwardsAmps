const domain = process.env.SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_ADMIN_API_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_ADMIN_API_CLIENT_SECRET;

const targets = new Set([
  "princess-reverb-combo",
  "elusive-overdrive-pedal",
  "mystery-drive-pedal",
  "blackjack-overdrive-pedal",
  "fuzzy-octave-pedal",
  "evil-grin-fuzz-pedal",
  "elusive-overdrive-t-shirt",
]);

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
if (!tokenResponse.ok || !tokenPayload.access_token) throw new Error("Could not obtain Shopify Admin access token");

const response = await fetch(`https://${domain}/admin/api/2026-07/graphql.json`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": tokenPayload.access_token,
  },
  body: JSON.stringify({
    query: `query ApprovedProductInventory {
      products(first: 100) {
        nodes {
          id
          title
          handle
          descriptionHtml
          media(first: 50) {
            nodes {
              alt
              mediaContentType
              status
            }
          }
        }
      }
    }`,
  }),
});
const payload = await response.json();
if (!response.ok || payload.errors?.length) throw new Error(JSON.stringify(payload.errors ?? "Shopify inventory request failed"));

const matched = payload.data.products.nodes
  .filter((product) => targets.has(product.handle))
  .map((product) => ({
    id: product.id,
    title: product.title,
    handle: product.handle,
    descriptionLength: product.descriptionHtml?.replace(/<[^>]*>/g, "").trim().length ?? 0,
    media: product.media.nodes.map((media) => ({
      alt: media.alt,
      mediaContentType: media.mediaContentType,
      status: media.status,
    })),
  }));

console.log(JSON.stringify({ found: matched.length, products: matched }, null, 2));
