# Storefront Image Delivery Validation

The approved public image renders were preserved and re-encoded as responsive WebP derivatives. The delivery scope contains **18** previously large PNG assets used by product cards, product pages, homepage category cards, and the featured pairing.

| Delivery set | Aggregate transferred bytes | Change from original PNG set |
| --- | ---: | ---: |
| Original approved PNGs | 96,086,603 | Baseline |
| Desktop WebP derivatives | 4,935,110 | 95.00% smaller |
| Mobile WebP derivatives | 1,125,652 | 99.00% smaller |

Desktop derivatives are capped at 1440 pixels wide and mobile derivatives at 720 pixels wide while retaining each source aspect ratio. The app now selects the mobile derivative below 768 pixels, retains asynchronous decoding and the existing loading shell, and only declares a WebP `source` type when the selected source is actually WebP.

Validation completed in the development storefront on 2026-09-07. Managed storage routes for representative desktop and mobile assets resolved with `200 image/webp` responses at their expected transfer sizes. Desktop and mobile rendered checks showed the approved imagery rather than placeholders. The new lower-right Back to top control appeared after scrolling, exposed the accessible name “Back to top,” and returned the page to its top position when activated.
