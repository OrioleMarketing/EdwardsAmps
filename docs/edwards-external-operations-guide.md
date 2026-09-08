# Edwards Amplification External Operations Guide

**Purpose.** This document records the independently managed production services for EdwardsAmps.com, their verified settings, the access that must be retained, and a practical recovery path. It intentionally **does not contain passwords, API tokens, secret keys, private keys, or recovery codes**. Store those only in the appropriate service’s secrets manager, password manager, or access-control system.

> **Continuity principle:** EdwardsAmps.com is independently served by Vercel, Railway, Shopify, Amazon S3, SiteGround DNS, and GitHub. Manus is used for project work, but should not be the sole owner of production hosting, application source, images, DNS, catalog, checkout, or credentials.

## Production architecture

| Layer | Verified provider | Current setting | Owner access to retain | Recovery role |
| --- | --- | --- | --- | --- |
| Public website | Vercel | `edwardsamps.com` and `www.edwardsamps.com` | Vercel team/project administrator | Serves the React storefront and routes `/api/*` requests. |
| Storefront API | Railway | `https://edwardsamps-production.up.railway.app` | Railway project/service administrator | Hosts Shopify Storefront API integration and cart endpoints. |
| Catalog, cart, checkout, shipping | Shopify | Storefront: `edwards-amplification.myshopify.com` | Shopify store owner/staff with appropriate product and app permissions | Holds product availability, pricing, checkout, payment, and shipping configuration. |
| Product, category, logo, and marketing images | Amazon S3 | Bucket: `edwardsamps`; Region: `us-east-2`; migration prefixes: `storefront-images/2026-09-08/` and `storefront-images/2026-09-08/core/` | AWS account administrator plus least-privilege image-maintenance IAM user | Serves the independent public image library. |
| DNS | SiteGround nameservers | `ns1.siteground.net`, `ns2.siteground.net` | Registrar/DNS-zone administrator | Maps the domain to Vercel and preserves mail-related DNS records. |
| Source control | GitHub | `OrioleMarketing/EdwardsAmps`, branch `main` | Organization owner and at least two repository administrators | Independent source backup and normal deployment source. |

## Vercel

| Item | Verified setting | What to keep secure | Operational note |
| --- | --- | --- | --- |
| Production project | Edwards Amps Vercel project | Team/project administrator access | Keep at least two organization members with deployment and domain-management rights. |
| Primary domain | `edwardsamps.com` | Domain-management authorization | Vercel must retain the domain assignment and TLS certificate. |
| Secondary hostname | `www.edwardsamps.com` | Domain-management authorization | Keep it attached to the same production project. |
| API routing | `vercel.json` rewrites `/api/:path*` to `https://edwardsamps-production.up.railway.app/api/:path*` | None in this file | Do not remove this rewrite unless the API is moved from Railway. |
| Git source | GitHub `OrioleMarketing/EdwardsAmps`, `main` | GitHub integration authorization | Confirm the Vercel project is connected to the GitHub repository so production source changes can build normally. |

The public homepage returned `200` with Vercel response headers during the 2026-09-08 continuity audit. The configuration is intentionally simple: non-API requests fall back to Vite’s `index.html`, while API requests are forwarded to Railway.

**Recovery steps.** If the website is unavailable but Railway is healthy, inspect the Vercel production deployment and domain settings first. If the Vercel project must be recreated, import the GitHub repository, set the output/build settings used by the project, restore the `/api/*` rewrite from `vercel.json`, then assign `edwardsamps.com` and `www.edwardsamps.com` after DNS is confirmed.

## Railway

| Item | Verified setting | Credential or setting location | Operational note |
| --- | --- | --- | --- |
| Production service | `edwardsamps-production.up.railway.app` | Railway project dashboard | This is the public origin used by Vercel’s `/api/*` rewrite. |
| Deployment source | GitHub repository `OrioleMarketing/EdwardsAmps`, branch `main` | Railway service settings | Auto-deploy should remain enabled for the production service. |
| Runtime port | Railway-provided `PORT` environment variable | Railway runtime | Do not hardcode a port; the application already reads the provider port. |
| Shopify domain | `SHOPIFY_STORE_DOMAIN` | Railway service variables | Store only the storefront domain; no secret value belongs in source control. |
| Shopify Storefront token | `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Railway service variables | Required for catalog, cart, and checkout URL creation. Treat as a secret. |
| Environment | `NODE_ENV=production` | Railway service variables | Ensure production mode for stable static/API behavior. |

The direct Railway catalog endpoint and the same endpoint accessed through Vercel both returned `200` during the 2026-09-08 audit; the live catalog returned 22 products. This validates the current Railway-to-Shopify request path without exposing the Storefront token.

**Recovery steps.** If catalog or cart calls fail while Vercel pages still load, check Railway deployment health and variables. Restore the two Shopify variables above, redeploy from GitHub `main`, and verify `https://edwardsamps-production.up.railway.app/api/trpc/shopify.catalog` through the normal application request path.

## Shopify

| Item | Verified setting | Owner access to retain | Operational note |
| --- | --- | --- | --- |
| Storefront domain | `edwards-amplification.myshopify.com` | Shopify store owner | Used by the public Storefront API endpoint. |
| Admin identity | Shopify Admin; the app may report the canonical admin identity `nj1se1-w0.myshopify.com` | Store owner plus app administrator | This canonical admin identity is distinct from the customer-facing storefront domain. |
| Catalog source | Shopify products and variants | Product-management permissions | Shopify controls live title, price, availability, variants, and product handles. |
| Checkout and shipping | Shopify checkout | Checkout, payments, and shipping permissions | EdwardsAmps.com retains the mini cart; checkout hands off to Shopify. |
| Storefront integration | Storefront API custom app/access token | App-development permissions | Rotate the Storefront token through Shopify and update Railway only. Never commit it to GitHub. |

**Recovery steps.** Maintain at least two Store owner or full staff accounts. If the catalog becomes unavailable, confirm the Storefront API token, sales-channel publication, product handles, and product availability in Shopify. If a token is rotated, replace it in Railway and redeploy; do not add the token to frontend code or repository files.

## DNS and domain routing

| Record | Verified value on 2026-09-08 | Purpose | Change guidance |
| --- | --- | --- | --- |
| Nameservers | `ns1.siteground.net`, `ns2.siteground.net` | SiteGround hosts the authoritative DNS zone | Keep registrar and SiteGround DNS access documented separately. |
| Apex `A` record | `edwardsamps.com` → `216.150.1.1` | Routes the apex domain to Vercel | Do not replace unless Vercel provides a new required target. |
| `www` `CNAME` | `www.edwardsamps.com` → `6f40b87dbf28205b.vercel-dns-016.com` | Routes `www` to Vercel | Keep the record assigned to the production Vercel project. |
| Observed TTL | 300 seconds | Cache duration | Lower only for a scheduled migration; restore a reasonable production TTL afterward. |
| Mail/autodiscover records | Existing DNS-zone records | Email delivery and client discovery | Do not delete unrelated MX, SPF, DKIM, DMARC, `autodiscover`, or `autoconfig` records when changing website routing. |

**Recovery steps.** If the site is unreachable at the domain but works on the Vercel deployment URL, verify the apex A record, `www` CNAME, Vercel domain verification, and certificate status. DNS changes can take time to propagate according to TTL and resolver caching.

## Amazon S3 image library

| Item | Verified setting | Access requirement | Operational note |
| --- | --- | --- | --- |
| Bucket | `edwardsamps` | AWS account administrator | This is the independent image origin. |
| Region | `us-east-2` | AWS IAM/S3 access | Keep the region unchanged for the current public URL pattern. |
| New object prefix | `storefront-images/2026-09-08/` | Least-privilege object access | Holds the migrated responsive storefront assets. |
| IAM migration user | Dedicated Edwards image-maintenance IAM user | `s3:ListBucket` on the bucket; `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject` on bucket objects | Use an IAM user or role limited to this bucket, not an account-wide administrator key. |
| Cache policy | `public, max-age=31536000, immutable` | Bucket/object configuration | Image filenames are stable and content-addressed by their existing names; replace visuals by uploading a new key rather than overwriting in-place. |

The image migration copies every former managed image reference to the S3 prefixes above. The initial `files.manuscdn.com` inventory contained 53 customer-facing references resolving to 51 unique files because two assets are reused in multiple locations. A complete source scan found 11 additional Manus-managed CloudFront references resolving to five shared logo and homepage assets. All 56 unique migrated S3 objects were verified against stored SHA-256 metadata and their public URLs returned image responses.

**Recovery steps.** Keep the bucket publicly readable only for the intended image prefix or serve it via CloudFront. Preserve versioning and a lifecycle policy appropriate for original/derivative assets. Never store AWS access-key values in this guide, in GitHub, or in frontend code.

## GitHub source backup

| Item | Required setting | Why it matters |
| --- | --- | --- |
| Repository | `OrioleMarketing/EdwardsAmps` | Independent, externally hosted production-source backup. |
| Default branch | `main` | Production branch used for releases and provider automation. |
| Access | At least two organization owners or repository administrators | Prevents a single-person or single-platform access dependency. |
| Secret handling | Enable secret scanning and keep `.env*` files excluded | Prevents Shopify, AWS, Railway, and Vercel secrets from being committed. |
| Branch protection | Require reviews/status checks as the team grows | Reduces accidental production regressions. |

**Recovery steps.** Clone the repository, restore secrets only in the Vercel/Railway dashboards, and redeploy. Confirm `git status` is clean and remote `main` includes the current production commit before treating the backup as current.

## Credential register template

Use a password manager or business secrets vault for actual values. Record the named owner, backup owner, last rotation date, and recovery method for each entry.

| Secret or access item | Store it in | Never store it in |
| --- | --- | --- |
| AWS IAM access key and secret | AWS IAM / password manager | GitHub, source code, product documentation, browser notes |
| Shopify Storefront API token | Shopify app configuration and Railway variables | Frontend code, GitHub, Vercel public variables |
| Shopify Admin API token | Shopify app configuration and approved server-side secrets | Browser code, issue trackers, documentation files |
| Railway account and service access | Business password manager with MFA recovery | Shared plaintext documents |
| Vercel team access and deployment tokens | Vercel team settings / password manager | Repository files or frontend environment variables |
| DNS registrar/SiteGround credentials | Business password manager with MFA recovery | Repository files or public documentation |
| GitHub organization recovery codes | Business password manager with restricted access | Repository files or chat messages |

## Quarterly continuity checklist

1. Confirm Vercel, Railway, Shopify, AWS, SiteGround, and GitHub each have at least two approved administrators.
2. Verify `edwardsamps.com`, the Railway catalog endpoint, Shopify storefront, and a sample S3 image each return successfully.
3. Confirm `main` in GitHub matches the latest production release and no secrets are committed.
4. Review AWS IAM keys and Shopify Storefront tokens; revoke unused credentials and rotate according to company policy.
5. Export a fresh inventory of product images and retain the original source imagery in Edwards-controlled storage.

## References

1. [Vercel project documentation](https://vercel.com/docs/projects/overview)
2. [Railway documentation](https://docs.railway.com/)
3. [Shopify Storefront API documentation](https://shopify.dev/docs/api/storefront)
4. [AWS S3 IAM policy examples](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-policies-s3.html)
5. [SiteGround DNS Zone Editor documentation](https://www.siteground.com/kb/dns-zone-editor/)
6. [GitHub repository backup guidance](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository)
