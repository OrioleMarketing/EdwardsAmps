const domain = process.env.SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_ADMIN_API_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_ADMIN_API_CLIENT_SECRET;

if (!domain || !clientId || !clientSecret) {
  throw new Error("Missing Shopify Admin configuration");
}

const tokenEndpoint = `https://${domain}/admin/oauth/access_token`;
const tokenResponse = await fetch(tokenEndpoint, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  }),
  redirect: "follow",
});

const tokenPayload = await tokenResponse.json();
if (!tokenResponse.ok || !tokenPayload.access_token) {
  console.log(
    JSON.stringify(
      {
        tokenEndpointRequested: tokenEndpoint,
        tokenEndpointFinalUrl: tokenResponse.url,
        tokenStatus: tokenResponse.status,
        tokenRedirected: tokenResponse.redirected,
        tokenError: tokenPayload.error ?? "unknown_error",
      },
      null,
      2,
    ),
  );
  process.exitCode = 1;
} else {
  const adminEndpoint = `https://${domain}/admin/api/2026-07/graphql.json`;
  const adminResponse = await fetch(adminEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": tokenPayload.access_token,
    },
    body: JSON.stringify({ query: "query AdminIdentity { shop { name myshopifyDomain } }" }),
    redirect: "follow",
  });
  const adminPayload = await adminResponse.json();

  console.log(
    JSON.stringify(
      {
        tokenEndpointRequested: tokenEndpoint,
        tokenEndpointFinalUrl: tokenResponse.url,
        tokenStatus: tokenResponse.status,
        tokenRedirected: tokenResponse.redirected,
        grantedScope: tokenPayload.scope ?? null,
        adminEndpointRequested: adminEndpoint,
        adminEndpointFinalUrl: adminResponse.url,
        adminStatus: adminResponse.status,
        adminRedirected: adminResponse.redirected,
        returnedShop: adminPayload.data?.shop?.myshopifyDomain ?? null,
        returnedShopName: adminPayload.data?.shop?.name ?? null,
        graphqlErrors: adminPayload.errors?.map((error) => error.message) ?? [],
      },
      null,
      2,
    ),
  );
}
