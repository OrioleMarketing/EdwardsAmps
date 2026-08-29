import { describe, expect, it } from "vitest";

async function postWithRetry(
  url: string,
  body: BodyInit,
  headers: Record<string, string> = { "Content-Type": "application/json" },
) {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await fetch(url, {
        method: "POST",
        headers,
        body,
        signal: AbortSignal.timeout(30_000),
      });
    } catch (error) {
      lastError = error;
      if (attempt < 2) {
        await new Promise(resolve => setTimeout(resolve, 1_500 * (attempt + 1)));
      }
    }
  }

  throw lastError;
}

describe("Shopify Admin client credentials", () => {
  it("exchanges the configured app credentials for Admin API access and reads the confirmed Edwards store identity", async () => {
    const domain = process.env.SHOPIFY_STORE_DOMAIN;
    const clientId = process.env.SHOPIFY_ADMIN_API_CLIENT_ID;
    const clientSecret = process.env.SHOPIFY_ADMIN_API_CLIENT_SECRET;

    expect(domain).toBeTruthy();
    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    const tokenResponse = await postWithRetry(
      `https://${domain}/admin/oauth/access_token`,
      new URLSearchParams({
        client_id: clientId as string,
        client_secret: clientSecret as string,
        grant_type: "client_credentials",
      }),
      { "Content-Type": "application/x-www-form-urlencoded" },
    );

    expect(tokenResponse.ok).toBe(true);

    const tokenPayload = (await tokenResponse.json()) as {
      access_token?: string;
      scope?: string;
    };

    expect(tokenPayload.access_token).toBeTruthy();

    const response = await postWithRetry(
      `https://${domain}/admin/api/2026-07/graphql.json`,
      JSON.stringify({ query: "query AdminIdentity { shop { name myshopifyDomain } }" }),
      {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": tokenPayload.access_token as string,
      },
    );

    expect(response.ok).toBe(true);

    const payload = (await response.json()) as {
      data?: { shop?: { name?: string; myshopifyDomain?: string } };
      errors?: Array<{ message?: string }>;
    };

    expect(payload.errors ?? []).toHaveLength(0);
    expect(payload.data?.shop?.name).toBe("Edwards Amplification");
    expect(payload.data?.shop?.myshopifyDomain).toBe("nj1se1-w0.myshopify.com");
  }, 120_000);
});
