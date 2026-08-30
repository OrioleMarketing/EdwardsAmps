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

const query = `query CabinetMediaInventory {
  oneByTwelve: productByHandle(handle: "1x12-elusive-oval-open-back-speaker-cabinet") {
    title
    media(first: 5) {
      nodes {
        alt
        mediaContentType
        status
        preview { image { url altText } }
      }
    }
  }
  twoByTwelve: productByHandle(handle: "2-12-oval-open-back-speaker-cabinet") {
    title
    media(first: 5) {
      nodes {
        alt
        mediaContentType
        status
        preview { image { url altText } }
      }
    }
  }
  fourByTen: productByHandle(handle: "4x10-oval-open-back-speaker-cabinet") {
    title
    media(first: 5) {
      nodes {
        alt
        mediaContentType
        status
        preview { image { url altText } }
      }
    }
  }
}`;

const response = await fetch(`https://${domain}/admin/api/2026-07/graphql.json`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": accessToken,
  },
  body: JSON.stringify({ query }),
});

const payload = await response.json();
if (!response.ok || payload.errors?.length) {
  throw new Error(`Shopify cabinet media inventory failed: ${JSON.stringify(payload.errors ?? response.status)}`);
}

const summary = Object.values(payload.data).map((product) => ({
  title: product?.title ?? null,
  media: (product?.media?.nodes ?? []).map((media) => ({
    type: media.mediaContentType,
    status: media.status,
    alt: media.alt ?? media.preview?.image?.altText ?? null,
    url: media.preview?.image?.url ?? null,
  })),
}));

console.log(JSON.stringify(summary, null, 2));
