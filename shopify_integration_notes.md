# Shopify Storefront API Notes

## Official flow confirmed

The Shopify headless cart flow uses the **Storefront API Cart API** rather than the legacy checkout flow. The documented pattern is to create a cart with `cartCreate`, persist the full cart ID, retrieve it with the `cart` query, update quantities with cart line mutations such as `cartLinesUpdate`, and send shoppers to Shopify using the cart's `checkoutUrl` when they are ready to finish payment and shipping.

A critical implementation detail is that the full cart ID includes both the token and a secret key. Shopify warns that mutations fail without the full ID and that the secret portion should be treated like a password rather than exposed publicly.

## Token and setup guidance confirmed

Shopify's getting-started guide states that the Storefront API requires an access token tied to a specific store. The guide also indicates that merchants need Storefront API access enabled, appropriate permissions managed, and request headers set correctly before making queries.

For this EdwardsAmps integration, that means the remaining merchant-side requirement is a valid Shopify Storefront access token plus confirmation that the relevant products and variants are published to the channel used by the headless storefront.
