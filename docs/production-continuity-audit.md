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
| Product, category, logo, and homepage images | Edwards-controlled Amazon S3 bucket `edwardsamps` in `us-east-2` | 56 migrated S3 objects were verified by stored SHA-256 metadata and public HTTP response | **Independent** of Manus-managed image delivery. |

## Current conclusion

> **The website application, catalog, cart, and Shopify checkout path do not run on Manus hosting.** They are served through Vercel, Railway, and Shopify, respectively.

The site is therefore **not wholly dependent on Manus for visitor traffic or commerce**. If Manus project tools were unavailable, the already deployed Vercel frontend and Railway API should continue to operate as long as Vercel, Railway, Shopify, DNS, and their configured credentials remain available.

The former image-delivery continuity gap has been closed. The initial inventory contained 53 customer-facing `files.manuscdn.com` references representing 51 unique assets. A full customer-facing source scan also found 11 residual Manus-managed CloudFront references representing five shared logo and homepage assets. All 56 unique assets are now served from the Edwards-controlled Amazon S3 bucket in `us-east-2`; their bytes were verified against stored SHA-256 metadata and every public S3 URL returned a valid image response.

## Recommended hardening path

| Priority | Action | Outcome |
| --- | --- | --- |
| 1 | Copy all former managed CDN storefront images to the Edwards-controlled AWS S3 bucket and serve them through the existing public S3 origin. | **Completed:** removes the former Manus-managed image-delivery dependency. |
| 2 | Replace every public image mapping in the storefront with the new Edwards-controlled URLs and retain the current responsive desktop/mobile variants. | **Completed:** preserves image-loading performance and visual identity. |
| 3 | Confirm Vercel, Railway, Shopify, and DNS ownership access is documented outside Manus; keep Shopify Storefront credentials managed in Railway. | The secure operations guide records the required access locations and recovery settings. |
| 4 | Keep a current source backup in the external GitHub repository and export production environment-variable documentation without exposing secret values. | GitHub `main` is the independent source-of-truth and deployment branch. |

The migration keeps existing approved visual files and responsive variants intact; it changes only their delivery origin. Future image changes should use new immutable S3 keys and then update source mappings, rather than overwriting existing production objects.
