# Public Image Delivery Repair

## Reported issue

On the externally hosted EdwardsAmps.com storefront, the newly generated King Richard and Elusive Overdrive wooden-platform scenes rendered as broken-image placeholders.

## Cause and repair

The prior image mappings used `/manus-storage/...` paths, which are valid only on the managed project host and are not reachable from the Vercel deployment. The repaired mappings use externally reachable `files.manuscdn.com` CDN URLs for both approved PNG assets.

## Verification evidence

- Both new CDN URLs returned HTTP `200` with `image/png` content.
- Type checking, all 21 regression tests, and the production build passed after the mapping update.
- Vercel deployment `dpl_D4iuyj3EfgUnBwt1KpY5sMr44JcS` for commit `2ca3cb5` reached `READY`.
- The automated browser’s public-page viewport remained blank with no console errors, so it did not provide an additional rendered visual confirmation. The direct CDN response and completed Vercel deployment confirm the path repair.
