# EdwardsAmps.com Production Continuity Audit

## Scope and limitation

This audit traces the currently deployed production request path. It does **not** simulate a real Manus outage, because intentionally disabling a production provider would be disruptive. The conclusions below distinguish dependencies that were verified as independently reachable from dependencies that remain under managed Manus delivery.

## Verified production dependency map

| Site capability | Current production provider/path | Observed result | Manus-outage exposure |
| --- | --- | --- | --- |
| Public website pages and routing | `edwardsamps.com` served by Vercel | `200`; Vercel response headers were present | **Independent** of the Manus web-hosting runtime. |
| Storefront API route | Vercel `/api/*` rewrite to `edwardsamps-production.up.railway.app` | Direct Railway catalog request returned `200`; the Vercel-rewritten route also returned `200` | **Independent** of the Manus web-hosting runtime. |
| Live product catalog | Railway server calls Shopify Storefront API | The public catalog request returned 22 mapped products | **Independent** of Manus, subject to Railway and Shopify availability. |
| Cart and Shopify checkout handoff | Railway server calls Shopify Storefront API | The live server contains the Shopify cart create/update and checkout URL path; direct Shopify storefront was reachable with `200` | **Independent** of Manus, subject to Railway and Shopify availability. |
| Three legacy homepage images | Direct `edwardsamps.s3.us-east-2.amazonaws.com` object URLs | All three checked assets returned `200 image/webp` | **Independent** of Manus if the bucket remains available. |
| Most product and category images | Public `files.manuscdn.com` URLs | The 1x12 Cabinet derivative returned `200 image/webp`; source inventory contains 53 unique Manus CDN asset URLs | **Potential Manus dependency.** The page will continue to load, but these images could fail if the managed CDN is unavailable. |

## Current conclusion

> **The website application, catalog, cart, and Shopify checkout path do not run on Manus hosting.** They are served through Vercel, Railway, and Shopify, respectively.

The site is therefore **not wholly dependent on Manus for visitor traffic or commerce**. If Manus project tools were unavailable, the already deployed Vercel frontend and Railway API should continue to operate as long as Vercel, Railway, Shopify, DNS, and their configured credentials remain available.

The remaining continuity gap is **image delivery**. The source inventory currently contains 53 public `files.manuscdn.com` image URLs. They are externally reachable today, but an outage affecting that managed CDN could leave the site functional with missing product and category imagery. The three direct Amazon S3 assets already demonstrate the preferred independent-delivery pattern.

## Recommended hardening path

| Priority | Action | Outcome |
| --- | --- | --- |
| 1 | Copy all current `files.manuscdn.com` storefront images to an Edwards-controlled AWS S3 bucket and serve them through CloudFront or the existing public S3 origin. | Removes the meaningful remaining Manus runtime delivery dependency. |
| 2 | Replace every public image mapping in the storefront with the new Edwards-controlled URLs and retain the current responsive desktop/mobile variants. | Preserves image loading performance and visual identity. |
| 3 | Confirm Vercel, Railway, Shopify, and DNS ownership access is documented outside Manus; keep Shopify Storefront credentials managed in Railway. | Preserves the independently hosted application, catalog, cart, and checkout path. |
| 4 | Keep a current source backup in the external GitHub repository and export production environment-variable documentation without exposing secret values. | Ensures future maintenance does not rely on a single platform workspace. |

No live architecture change was made as part of this audit. Migrating image assets should be done as a deliberate follow-up after confirming access to the Edwards-controlled Amazon S3 bucket.
