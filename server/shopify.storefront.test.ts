import { describe, expect, it } from "vitest";

describe("Shopify Storefront credentials", () => {
  it("can access the Shopify Storefront API with the configured public token", async () => {
    const domain = process.env.SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    expect(domain).toBeTruthy();
    expect(token).toBeTruthy();

    const response = await fetch(`https://${domain}/api/2025-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token as string,
      },
      body: JSON.stringify({
        query: `query StoreIdentity { shop { name primaryDomain { url } } }`,
      }),
    });

    expect(response.ok).toBe(true);

    const payload = (await response.json()) as {
      data?: { shop?: { name?: string; primaryDomain?: { url?: string } } };
      errors?: Array<{ message?: string }>;
    };

    expect(payload.errors ?? []).toHaveLength(0);
    expect(payload.data?.shop?.name).toBeTruthy();
    expect(payload.data?.shop?.primaryDomain?.url).toBeTruthy();
  }, 30000);
});
