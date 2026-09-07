const domain = process.env.SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_ADMIN_API_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_ADMIN_API_CLIENT_SECRET;

const requestedTitles = [
  ["gid://shopify/Product/9077350498478", "Elusive Overdrive — 24 Watt Combo"],
  ["gid://shopify/Product/9077349482670", "Elusive Overdrive — 24 Watt Head"],
  ["gid://shopify/Product/9077347057838", "Elusive Overdrive — 40 Watt Combo"],
  ["gid://shopify/Product/9077342503086", "Elusive Overdrive — 40 Watt Head"],
  ["gid://shopify/Product/9077351547054", "King Richard Head"],
  ["gid://shopify/Product/9077352988846", "Hot Mama Head"],
  ["gid://shopify/Product/9077353709742", "Hot Mama Combo"],
  ["gid://shopify/Product/9077354823854", "Double Dee Tweed Combo"],
  ["gid://shopify/Product/9077355905198", "Lil Tyke Tweed Combo"],
];

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
const mutation = `mutation StandardizeAmplifierTitle($product: ProductUpdateInput!) {
  productUpdate(product: $product) {
    product { id handle title }
    userErrors { field message }
  }
}`;

const updatedProducts = [];
for (const [id, title] of requestedTitles) {
  const response = await fetch(`https://${domain}/admin/api/2026-07/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": accessToken },
    body: JSON.stringify({ query: mutation, variables: { product: { id, title } } }),
  });
  const payload = await response.json();
  const result = payload.data?.productUpdate;
  if (!response.ok || payload.errors?.length || result?.userErrors?.length || !result?.product) {
    throw new Error(`Title update failed for ${id}: ${JSON.stringify(payload.errors ?? result?.userErrors ?? response.status)}`);
  }
  updatedProducts.push(result.product);
}

console.log(JSON.stringify(updatedProducts, null, 2));
