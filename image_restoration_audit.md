# Approved Amplifier Imagery — Restoration Verification

**Verification date:** 2026-08-28

The approved staged real-product imagery remains mapped to the five legacy amplifier models in `client/src/lib/ampData.ts`. The optimized desktop and mobile WebP versions are served from direct CDN URLs so they work in both the managed preview and the external Vercel deployment at `EdwardsAmps.com`.

Desktop visual verification confirmed that the images visibly render in the development preview for the homepage and all five legacy amplifier detail pages. The published homepage at `https://edwardsamp-derak44v.manus.space/` was also visually checked and displays the staged Elusive Overdrive scene.

## Public-domain repair

The broken image in the reported `EdwardsAmps.com` screenshot was caused by the external Vercel deployment treating the former relative `/manus-storage/...` image route as a client-side fallback and returning `index.html` rather than an image. The approved staged images now use direct CDN WebP URLs instead. The GitHub commit `e0aa4ed` triggered Vercel production deployment `dpl_58pgsEirz3BH6bdrGF8oR6nBXGs1`, and the public `https://www.edwardsamps.com/` homepage was visually verified with the Elusive Overdrive workbench photo restored in the top image frame.

The public King Richard page was also checked after the same production deployment and visibly renders its original staged performance scene. Its responsive picture element contains the direct desktop WebP source and the direct mobile WebP source behind the `(max-width: 767px)` media condition. All five corresponding mobile CDN image files were independently verified as valid `image/webp` responses before this production release.

The public Elusive Overdrive page was checked in the same way and exposes the approved direct desktop source together with its expected direct mobile WebP source behind the `(max-width: 767px)` media condition. The public homepage itself visually displays the same Elusive workbench image in its top product frame.

Finally, the public Hot Mama, Double Dee Tweed, and Lil Tyke Tweed routes were each verified to expose their expected direct desktop image and their expected direct mobile WebP source. Together with the public Elusive Overdrive and King Richard checks, this verifies the responsive delivery wiring for every approved staged amplifier scene on `EdwardsAmps.com`.

The public homepage was separately verified to expose the direct desktop Elusive Overdrive source and the expected mobile WebP source behind the `(max-width: 767px)` media condition.

| Product | Approved staged scene | Desktop and mobile image delivery | Existing website coverage |
| --- | --- | --- | --- |
| Elusive Overdrive | Wooden workbench | Confirmed | Homepage, detail page, Shop cards |
| King Richard | Large performance stage | Confirmed | Detail page, Shop cards |
| Hot Mama | Church rehearsal room | Confirmed | Detail page, Shop cards |
| Double Dee Tweed | Intimate coffee-shop performance | Confirmed | Detail page, Shop cards |
| Lil Tyke Tweed | Home writing room | Confirmed | Detail page, Shop cards |

No newly supplied client imagery was used for these legacy amplifier models. The next audit will identify products outside this approved staged set that have no dedicated visual treatment.
