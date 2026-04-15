# Shopify Storefront Handoff

## Catalog mapping from the uploaded Shopify export

The uploaded product export at `/home/ubuntu/upload/products_export_1.csv` maps to the current Edwards site in two layers: **direct-order products** that now feed the live mini cart, and **consultation-first products** that remain visible on the site but are not yet wired into checkout.

| Shopify handle | Shopify title | Price in export | Edwards site model | Current site behavior |
| --- | --- | ---: | --- | --- |
| `hot-mama-amp-head` | Hot Mama AMP - head | $1,800 | Hot Mama | **Direct order**. Wired to the homepage Shop section and Hot Mama detail page as **Hot Mama Head**. |
| `hot-mama-combo` | Hot Mama - Combo | $2,000 | Hot Mama | **Direct order**. Wired to the homepage Shop section and Hot Mama detail page as **Hot Mama 1x12 Combo**. |
| `double-dee-tweed-amp` | Double Dee Tweed Amp | $2,000 | Double Dee Tweed | **Direct order**. Wired to the homepage Shop section and Double Dee Tweed detail page as **Double Dee Tweed 1x12 Combo**. |
| `lil-tyke-tweed-amp` | Lil Tyke Tweed Amp | $1,800 | Lil Tyke Tweed | **Consultation-first** on the site for now. Present in the lineup and product page, but not connected to checkout. |
| `king-richard-head` | King Richard Head - | $2,800 | King Richard | **Consultation-first** on the site for now. Present in the lineup and product page, but not connected to checkout. |
| `elusive-overdrive-amp-24-watt-combo` | Elusive Overdrive Amp - 24 Watt Combo | $3,500 | Elusive Overdrive | **Consultation-first** on the site for now, despite existing Shopify products. |
| `elusive-overdrive-amp-24-watt-head-1` | Elusive Overdrive Amp - 24 Watt Head | $3,300 | Elusive Overdrive | **Consultation-first** on the site for now, despite existing Shopify products. |
| `elusive-overdrive-amp-24-watt-head` | Elusive Overdrive Amp - 40 Watt Combo | $3,600 | Elusive Overdrive | **Consultation-first** on the site for now, despite existing Shopify products. |
| `elusive-overdrive-amp-24-watt` | Elusive Overdrive Amp - 40 Watt Head | $3,400 | Elusive Overdrive | **Consultation-first** on the site for now, despite existing Shopify products. |

## What is now live in the Edwards site

The site now uses the **Shopify Storefront API** for the direct-order flow. The homepage Shop section pulls live product availability and pricing for the mapped direct-order products, the mini cart is backed by a real Shopify cart stored with a secure cookie, and eligible amp detail pages now include direct add-to-cart entry points that feed the same cart.

| Site surface | What changed |
| --- | --- |
| Homepage header | The **Book a Build Consultation** button was removed. The cart button remains as the persistent shopping entry point. |
| Homepage Shop section | Direct-order cards now use live Shopify pricing/availability instead of only local placeholder values. |
| Mini cart drawer | Quantity changes and checkout handoff now go to a real Shopify cart and checkout URL. |
| Amp detail pages | Hot Mama and Double Dee Tweed pages now expose direct-order options that add products into the same mini cart. |

## Remaining Shopify-side steps for Bruce

A few merchant-side settings should still be confirmed in Shopify Admin so the launch path is smooth.

| Step | Where to check in Shopify | Why it matters |
| --- | --- | --- |
| Confirm checkout contact fields | **Settings → Checkout** | Ensure the phone-number requirement matches the business process you want for amp orders. The Edwards copy currently assumes Shopify will collect required contact details during checkout. |
| Review shipping profiles | **Settings → Shipping and delivery** | The site hands off shipping entirely to Shopify, so the product weights, zones, and rates need to be correct there. |
| Review tax settings | **Settings → Taxes and duties** | The mini cart stays on Edwards, but tax calculation is finalized in Shopify checkout. |
| Confirm inventory behavior | Product detail pages / inventory settings | All mapped direct-order products currently rely on Shopify availability. If inventory is zero and policy is `deny`, the site will show them as unavailable. |
| Keep storefront credentials managed as secrets | Project settings / secrets management | The site should continue using **`SHOPIFY_STORE_DOMAIN`** and **`SHOPIFY_STOREFRONT_ACCESS_TOKEN`** only. The private Admin token should not be exposed to the frontend storefront flow. |

## Recommendation for the next Shopify iteration

The next clean expansion would be to decide whether **Elusive Overdrive**, **King Richard**, or **Lil Tyke Tweed** should stay permanently consultation-first or be promoted into direct checkout with specific Shopify variants. If you want that, I can map those exact Shopify handles into the site next without changing the visual design language.
