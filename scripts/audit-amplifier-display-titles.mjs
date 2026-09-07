const domain = process.env.SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_ADMIN_API_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_ADMIN_API_CLIENT_SECRET;

const expectedTitlesByHandle = {
  "elusive-overdrive-amp-24-watt-combo": "Elusive Overdrive — 24 Watt Combo",
  "elusive-overdrive-amp-24-watt-head-1": "Elusive Overdrive — 24 Watt Head",
  "elusive-overdrive-amp-24-watt-head": "Elusive Overdrive — 40 Watt Combo",
  "elusive-overdrive-amp-24-watt": "Elusive Overdrive — 40 Watt Head",
  "king-richard-head": "King Richard Head",
  "hot-mama-amp-head": "Hot Mama Head",
  "hot-mama-combo": "Hot Mama Combo",
  "double-dee-tweed-amp": "Double Dee Tweed Combo",
  "lil-tyke-tweed-amp": "Lil Tyke Tweed Combo",
  "princess-reverb-combo": "Princess Reverb Combo",
  "queen-reverb-combo": "Queen Reverb Combo",
  "69-73-combo": "69/73 Combo",
};

if (!domain || !clientId || !clientSecret) {
  throw new Error("Shopify Admin credentials and store domain are required.");
}

const tokenResponse = await fetch(`https://${domain}/admin/oauth/access_token`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  }),
});

if (!tokenResponse.ok) {
  throw new Error(`Shopify token exchange failed with status ${tokenResponse.status}.`);
}

const { access_token: accessToken } = await tokenResponse.json();
const query = `query AmplifierTitleAudit($first: Int!) {
  products(first: $first) {
    nodes { id handle title status }
  }
}`;
const response = await fetch(`https://${domain}/admin/api/2026-07/graphql.json`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": accessToken },
  body: JSON.stringify({ query, variables: { first: 100 } }),
});
const payload = await response.json();
if (!response.ok || payload.errors?.length) {
  throw new Error(`Shopify title audit failed: ${JSON.stringify(payload.errors ?? response.status)}`);
}

const byHandle = new Map(payload.data.products.nodes.map((product) => [product.handle, product]));
const results = Object.entries(expectedTitlesByHandle).map(([handle, expectedTitle]) => {
  const product = byHandle.get(handle);
  return {
    handle,
    id: product?.id ?? null,
    currentTitle: product?.title ?? null,
    status: product?.status ?? null,
    expectedTitle,
    matchesExpectedTitle: product?.title === expectedTitle,
  };
});

if (results.some((result) => !result.id)) {
  throw new Error(`One or more expected amplifier products were not found: ${JSON.stringify(results)}`);
}

if (results.some((result) => !result.matchesExpectedTitle)) {
  throw new Error(`One or more amplifier titles do not match the approved standard: ${JSON.stringify(results)}`);
}

console.log(JSON.stringify(results, null, 2));
