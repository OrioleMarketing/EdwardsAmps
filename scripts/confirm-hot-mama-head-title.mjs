const domain = process.env.SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_ADMIN_API_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_ADMIN_API_CLIENT_SECRET;

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
const query = `query ConfirmHotMamaHeadTitle {
  productByHandle(handle: "hot-mama-amp-head") {
    id
    title
    handle
    status
  }
}`;

const response = await fetch(`https://${domain}/admin/api/2026-07/graphql.json`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": accessToken },
  body: JSON.stringify({ query }),
});

const payload = await response.json();
if (!response.ok || payload.errors?.length || !payload.data?.productByHandle) {
  throw new Error(`Hot Mama Head title lookup failed: ${JSON.stringify(payload.errors ?? response.status)}`);
}

console.log(JSON.stringify(payload.data.productByHandle, null, 2));
