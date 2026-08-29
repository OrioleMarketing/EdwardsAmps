import { createHash } from "node:crypto";

const fingerprint = (value) =>
  value ? createHash("sha256").update(value).digest("hex").slice(0, 12) : null;

const clientId = process.env.SHOPIFY_ADMIN_API_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_ADMIN_API_CLIENT_SECRET;

console.log(
  JSON.stringify(
    {
      storeDomain: process.env.SHOPIFY_STORE_DOMAIN ?? null,
      clientIdSuffix: clientId ? clientId.slice(-4) : null,
      clientIdFingerprint: fingerprint(clientId),
      clientSecretLength: clientSecret?.length ?? 0,
      clientSecretFingerprint: fingerprint(clientSecret),
      legacyAdminTokenConfigured: Boolean(process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN),
    },
    null,
    2,
  ),
);
