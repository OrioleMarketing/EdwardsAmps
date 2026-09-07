const domain = process.env.SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_ADMIN_API_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_ADMIN_API_CLIENT_SECRET;
const productId = "gid://shopify/Product/9077352988846";
const title = "Hot Mama Amp — Head";

if (!domain || !clientId || !clientSecret) {
  throw new Error("Shopify Admin credentials and store domain are required.");
}

const tokenResponse = await fetch(`https://${domain}/admin/oauth/access_token`, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, grant_type: "client_credentials" }),
});

if (!tokenResponse.ok) {
  throw new Error(`Shopify token exchange failed with status ${tokenResponse.status}.`);
}

const { access_token: accessToken } = await tokenResponse.json();
const mutation = `mutation UpdateHotMamaHeadTitle($product: ProductUpdateInput!) {
  productUpdate(product: $product) {
    product { id title handle }
    userErrors { field message }
  }
}`;

const response = await fetch(`https://${domain}/admin/api/2026-07/graphql.json`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": accessToken },
  body: JSON.stringify({ query: mutation, variables: { product: { id: productId, title } } }),
});

const payload = await response.json();
const result = payload.data?.productUpdate;
if (!response.ok || payload.errors?.length || result?.userErrors?.length || !result?.product) {
  throw new Error(`Hot Mama Head title update failed: ${JSON.stringify(payload.errors ?? result?.userErrors ?? response.status)}`);
}

console.log(JSON.stringify(result.product, null, 2));
