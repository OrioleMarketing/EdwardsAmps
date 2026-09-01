const domain = process.env.SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_ADMIN_API_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_ADMIN_API_CLIENT_SECRET;

const productId = "gid://shopify/Product/9224320614574";
const variantId = "gid://shopify/ProductVariant/48959010308270";
const newPrice = "999.00";

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
const mutation = `mutation UpdateFourByTenCabinetPrice($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkUpdate(productId: $productId, variants: $variants) {
    product { id title handle }
    productVariants { id title price }
    userErrors { field message }
  }
}`;

const response = await fetch(`https://${domain}/admin/api/2026-07/graphql.json`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": accessToken },
  body: JSON.stringify({ query: mutation, variables: { productId, variants: [{ id: variantId, price: newPrice }] } }),
});

const payload = await response.json();
const result = payload.data?.productVariantsBulkUpdate;
if (!response.ok || payload.errors?.length || result?.userErrors?.length) {
  throw new Error(`4x10 cabinet price update failed: ${JSON.stringify(payload.errors ?? result?.userErrors ?? response.status)}`);
}

const updatedVariant = result.productVariants.find((variant) => variant.id === variantId);
if (result.product?.id !== productId || updatedVariant?.price !== newPrice) {
  throw new Error("Shopify did not return the expected 4x10 cabinet product and $999.00 variant price.");
}

console.log(JSON.stringify({ product: result.product, variant: updatedVariant }, null, 2));
